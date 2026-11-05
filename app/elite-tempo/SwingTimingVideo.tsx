"use client";

import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";

/* Eric's 8 iron, timed the way the app times it (11-04): the video plays, freezes
 * at the top and shows the backswing, freezes at impact and shows the downswing,
 * then finishes the follow-through and shows the total and the tempo. The marks are
 * the app's own (takeaway 0.10s, top 0.85s, impact 1.12s in this clip), so every
 * number is a real reading. The four numbers sit in one strip under the video,
 * with the app's own short labels (Back, Down, Total, Tempo). Plays only while on screen; Reduce Motion shows the top of the
 * swing with all four numbers. */

export type SwingMarks = { takeaway: number; top: number; impact: number };

const FREEZE_MS = 1000;
const HOLD_MS = 2600;

export default function SwingTimingVideo({
  src,
  poster,
  stillPoster,
  marks,
  label,
}: {
  src: string;
  poster: string;
  stillPoster: string;
  marks: SwingMarks;
  label: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const still = useReducedMotion();
  /* 0 nothing yet, 1 backswing, 2 downswing, 3 total and tempo. */
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const back = marks.top - marks.takeaway;
  const down = marks.impact - marks.top;
  const total = back + down;
  const cells = [
    { label: "Back", value: `${back.toFixed(2)}s`, at: 1 },
    { label: "Down", value: `${down.toFixed(2)}s`, at: 2, gold: true },
    { label: "Total", value: `${total.toFixed(2)}s`, at: 3 },
    { label: "Tempo", value: `${(back / down).toFixed(1)}:1`, at: 3 },
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
    const later = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));
    const freezeAt = (t: number, n: number) => {
      v.pause();
      v.currentTime = t;
      set(n);
      later(FREEZE_MS, () => visible && void v.play().catch(() => {}));
    };
    const watch = () => {
      const t = v.currentTime;
      if (stageRef.current === 0 && t >= marks.top) freezeAt(marks.top, 1);
      else if (stageRef.current === 1 && t >= marks.impact) freezeAt(marks.impact, 2);
      raf = requestAnimationFrame(watch);
    };
    const restart = () => {
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
  }, [still, marks.top, marks.impact]);

  const shown = still ? 3 : stage;

  return (
    <div className="mx-auto w-full max-w-[340px] px-[9%] py-[clamp(28px,5vw,48px)] sm:px-0">
      <video
        ref={video}
        src={still ? undefined : src}
        poster={still ? stillPoster : poster}
        muted
        playsInline
        preload="metadata"
        aria-label={label}
        width={600}
        height={750}
        className="block aspect-[4/5] w-full rounded-[22px] bg-[#DCDCD6] object-cover"
      />
      <dl className="m-0 mt-3 grid grid-cols-4 rounded-2xl bg-white px-1 py-3 text-center">
        {cells.map((c) => {
          const on = shown >= c.at;
          return (
            <div key={c.label} className="min-w-0">
              <dt className="text-[12px] font-medium text-[#6B6D72]">{c.label}</dt>
              <dd
                className="m-0 mt-1 text-[20px] font-semibold leading-none tracking-[-0.02em] transition-colors duration-300 [font-variant-numeric:tabular-nums]"
                style={{ color: on ? (c.gold ? "#C99A12" : "#141518") : "#D5D5CF" }}
              >
                {c.value}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
