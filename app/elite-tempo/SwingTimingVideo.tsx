"use client";

import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";

/* Eric's driver from the app's onboarding (the gray shirt), timed the way the app
 * times it (11-04): the video plays, freezes at the top and shows the backswing,
 * freezes at impact and shows the downswing, then finishes the follow-through and
 * shows the total and the tempo. `marks` are the app's own (takeaway 0.50s, top
 * 1.15s, impact 1.37s on the original clip) and set the numbers. `freeze` is where
 * the cut web clip stops: the middle of the exact top and impact frames, checked
 * frame by frame, so the picture never stops a frame early or late. The four numbers sit in one strip under the video,
 * with the app's own short labels (Back, Down, Total, Tempo). Plays only while on screen; Reduce Motion shows the top of the
 * swing with all four numbers. */

export type SwingMarks = { takeaway: number; top: number; impact: number };
export type Freeze = { top: number; impact: number; fps: number };

const FREEZE_MS = 1600;
const HOLD_MS = 2600;

export default function SwingTimingVideo({
  src,
  poster,
  stillPoster,
  marks,
  freeze,
  label,
}: {
  src: string;
  poster: string;
  stillPoster: string;
  marks: SwingMarks;
  freeze: Freeze;
  label: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const still = useReducedMotion();
  /* 0 nothing yet, 1 backswing, 2 downswing, 3 total and tempo. */
  const [stage, setStage] = useState(0);
  /* Until the clip first plays, all four numbers show in full; pale gray before
     that read as broken (blind review, 11-04). */
  const [started, setStarted] = useState(false);
  const stageRef = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const back = marks.top - marks.takeaway;
  const down = marks.impact - marks.top;
  const total = back + down;
  const cells = [
    { label: "Backswing", value: `${back.toFixed(2)}s`, at: 1, pos: "left-3 top-3" },
    { label: "Downswing", value: `${down.toFixed(2)}s`, at: 2, gold: true, pos: "bottom-3 left-3" },
    { label: "Total", value: `${total.toFixed(2)}s`, at: 2, pos: "bottom-3 right-3" },
    { label: "Tempo", value: `${(back / down).toFixed(1)}:1`, at: 3, pos: "right-3 top-3" },
  ];

  useEffect(() => {
    const v = video.current;
    if (!v || still) return;
    let raf = 0;
    let visible = false;
    const set = (n: number) => {
      stageRef.current = n;
      setStage(n);
    };
    const later = (ms: number, fn: () => void) =>
      timers.current.push(setTimeout(fn, ms));
    const freezeAt = (t: number, n: number) => {
      v.pause();
      v.currentTime = t;
      set(n);
      later(FREEZE_MS, () => visible && void v.play().catch(() => {}));
    };
    const watch = () => {
      const t = v.currentTime;
      /* Stop as soon as the frame is reached, then land on its middle. */
      const half = 0.5 / freeze.fps;
      if (stageRef.current === 0 && t >= freeze.top - half)
        freezeAt(freeze.top, 1);
      else if (stageRef.current === 1 && t >= freeze.impact - half)
        freezeAt(freeze.impact, 2);
      raf = requestAnimationFrame(watch);
    };
    const restart = () => {
      setStarted(true);
      set(0);
      v.currentTime = 0;
      void v.play().catch(() => {});
    };
    const onEnded = () => {
      set(3);
      later(HOLD_MS, () => visible && restart());
    };
    v.addEventListener("ended", onEnded);
    const seen = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) {
          restart();
          raf = requestAnimationFrame(watch);
        } else {
          v.pause();
          cancelAnimationFrame(raf);
          timers.current.forEach(clearTimeout);
          timers.current = [];
        }
      },
      { threshold: 0.5 },
    );
    seen.observe(v);
    return () => {
      seen.disconnect();
      v.removeEventListener("ended", onEnded);
      cancelAnimationFrame(raf);
      timers.current.forEach(clearTimeout);
    };
  }, [still, freeze.top, freeze.impact, freeze.fps]);

  return (
    <div className="mx-auto w-full md:max-w-[440px] md:py-12">
      <div className="relative">
      <video
        ref={video}
        src={still ? undefined : src}
        poster={still ? stillPoster : poster}
        muted
        playsInline
        preload="metadata"
        aria-label={label}
        width={640}
        height={800}
        className="block aspect-[4/5] w-full bg-[#DCDCD6] object-cover md:rounded-[22px]"
      />
      {/* Labels build up as the swing plays (Eric, 11-05), one in each corner so the
          four make a square: backswing top left at the top, downswing bottom left and
          the total (the two added) bottom right together at impact, tempo top right at
          the finish. Each stays until the clip restarts. */}
      {(still || started) &&
        cells
          .filter((c) => still || stage >= c.at)
          .map((c) => (
            <div key={c.label} aria-hidden className={`et-freeze absolute min-w-[96px] rounded-2xl bg-[rgba(20,21,24,0.72)] px-4 py-2.5 text-center text-white backdrop-blur-md ${c.pos}`}>
              <div className="text-[13px] font-medium text-white/75">{c.label}</div>
              <div className="mt-0.5 text-[26px] font-semibold leading-none tracking-[-0.02em] [font-variant-numeric:tabular-nums]" style={{ color: c.gold ? "#F9C832" : "#fff" }}>
                {c.value}
              </div>
            </div>
          ))}
      </div>
      <style>{`@keyframes et-freeze { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } } .et-freeze { animation: et-freeze 0.2s ease-out both; }`}</style>
    </div>
  );
}
