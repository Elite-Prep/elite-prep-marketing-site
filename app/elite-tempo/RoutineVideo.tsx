"use client";

import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";

/* Eric's driver pre-shot routine in real time (11-04): the step he is on lights up
 * as he reaches it and the clock runs to impact, against the 40 seconds the USGA
 * and The R&A recommend. Step names and times were marked by Eric on this clip.
 * The running clock sits on the video in the app's own timer pill; under the video,
 * the current step and the seven dots the app shows (the last turns gold at impact).
 * Plays only while on screen; Reduce Motion shows the finished routine. */

export type Step = { at: number; title: string };

const HOLD_MS = 2600;

/* The app's clock format: 00:12.4. */
function clock(t: number) {
  const m = Math.floor(t / 60);
  const sec = (t - m * 60).toFixed(1).padStart(4, "0");
  return `${String(m).padStart(2, "0")}:${sec}`;
}

export default function RoutineVideo({
  src,
  poster,
  steps,
  impact,
  limit,
  label,
}: {
  src: string;
  poster: string;
  steps: Step[];
  impact: number;
  limit: number;
  label: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const still = useReducedMotion();
  const [t, setT] = useState(still ? impact : 0);

  useEffect(() => {
    const v = video.current;
    if (!v || still) return;
    let raf = 0;
    let hold: ReturnType<typeof setTimeout> | undefined;
    let visible = false;
    const tickClock = () => {
      setT(v.currentTime);
      raf = requestAnimationFrame(tickClock);
    };
    const onEnded = () => {
      setT(impact);
      hold = setTimeout(() => {
        if (!visible) return;
        v.currentTime = 0;
        void v.play().catch(() => {});
      }, HOLD_MS);
    };
    v.addEventListener("ended", onEnded);
    const seen = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) {
          void v.play().catch(() => {});
          raf = requestAnimationFrame(tickClock);
        } else {
          v.pause();
          cancelAnimationFrame(raf);
          if (hold) clearTimeout(hold);
        }
      },
      { threshold: 0.5 },
    );
    seen.observe(v);
    return () => {
      seen.disconnect();
      v.removeEventListener("ended", onEnded);
      cancelAnimationFrame(raf);
      if (hold) clearTimeout(hold);
    };
  }, [still, impact]);

  const done = t >= impact;
  const shownT = Math.min(t, impact);
  /* -1 until the first marked step starts. */
  let current = -1;
  steps.forEach((s, i) => {
    if (shownT >= s.at) current = i;
  });

  return (
    <div className="mx-auto w-full max-w-[340px] px-[9%] py-[clamp(28px,5vw,48px)] sm:px-0">
      <div className="relative">
        <video
          ref={video}
          src={still ? undefined : src}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          aria-label={label}
          width={480}
          height={600}
          className="block aspect-[4/5] w-full rounded-[22px] bg-[#DCDCD6] object-cover"
        />
        {/* The app's timer pill, top left on the video. */}
        <p
          className="absolute left-3 top-3 m-0 rounded-full px-3 py-1.5 text-[15px] font-semibold text-[#141518] shadow-[0_1px_2px_rgba(20,21,24,0.08)] [font-variant-numeric:tabular-nums]"
          style={{ background: done ? "#F9C832" : "rgba(255,255,255,0.92)" }}
          aria-hidden
        >
          {clock(shownT)}
        </p>
      </div>
      <div className="mt-3 rounded-2xl bg-white px-4 py-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="m-0 min-w-0 truncate text-[16px] font-semibold text-[#141518]">
            {done ? "Impact" : current < 0 ? "Ready" : steps[current].title}
          </p>
          <p className="m-0 shrink-0 text-[14px] font-medium text-[#6B6D72] [font-variant-numeric:tabular-nums]">
            {done ? `${impact.toFixed(1)}s of ${limit}s` : current < 0 ? `${steps.length} steps` : `Step ${current + 1} of ${steps.length}`}
          </p>
        </div>
        <div className="mt-3 flex items-center gap-1.5" aria-hidden>
          {steps.map((s, i) => (
            <span
              key={`${s.at}-${s.title}`}
              className="h-1.5 flex-1 rounded-full transition-colors duration-300"
              style={{
                background: done && i === steps.length - 1 ? "#F9C832" : shownT >= s.at ? "#141518" : "#E3E3DD",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
