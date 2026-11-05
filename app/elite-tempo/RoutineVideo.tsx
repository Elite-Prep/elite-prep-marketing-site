"use client";

import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";

/* Eric's driver pre-shot routine in real time (11-04): the step he is on lights up
 * as he reaches it and the clock runs to impact, against the 40 seconds the USGA
 * and The R&A recommend. Step names and times were marked by Eric on this clip.
 * The running clock sits on the video in the app's own timer pill; under the video,
 * the current step's name, one at a time.
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
  const under = done && impact <= limit;
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
        {/* The clock out of the limit (Eric chose option A, 11-04): white while the
            routine runs, green with a check once impact lands under the limit. Green
            is used only here, on purpose, to mean "under". */}
        <p
          className="absolute left-3 top-3 m-0 flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[15px] font-semibold shadow-[0_1px_2px_rgba(20,21,24,0.08)] transition-colors duration-300 [font-variant-numeric:tabular-nums]"
          style={{ background: under ? "#2FA35A" : "rgba(255,255,255,0.94)", color: under ? "#FFFFFF" : "#141518" }}
          aria-hidden
        >
          {under && <span>&#10003;</span>}
          {clock(shownT)}
          <span className="font-medium" style={{ color: under ? "rgba(255,255,255,0.82)" : "#6B6D72" }}>
            / {clock(limit).replace(".0", "")}
          </span>
        </p>
      </div>
      {/* One step at a time, full width, nothing else (Eric, 11-04: thirteen small
          dashes read as clutter on a phone). The name fades in as each step starts. */}
      <div className="mt-3 rounded-2xl bg-white px-4 py-4 text-center">
        <p key={done ? "impact" : current} className="et-step m-0 text-[18px] font-semibold leading-snug text-[#141518]" aria-live="polite">
          {done ? "Impact" : current < 0 ? "Ready" : steps[current].title}
        </p>
        <style>{`@keyframes et-step { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } } .et-step { animation: et-step 0.3s ease-out both; } @media (prefers-reduced-motion: reduce) { .et-step { animation: none; } }`}</style>
      </div>
    </div>
  );
}
