"use client";

import { useRef, useState } from "react";
import { getAudio, latency, ready, tick } from "./tickAudio";
import { CHIP } from "./PhotoStage";

/* A floating label that is also a play button: tap it and hear a swing's timing as
 * three ticks (takeaway, top, impact) in real time. It is drawn exactly like the
 * other labels (same height, corners, type and shadow); only its icon is a gold
 * play button, and the whole label turns gold while it plays. The tap area reaches
 * 44 points with an invisible margin, so it looks the same size as the others. */
export default function HearChip({ label, back, down }: { label: string; back: number; down: number }) {
  const [on, setOn] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function play() {
    const ctx = getAudio();
    setOn(true);
    const done = (delay: number) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setOn(false), (delay + back + down) * 1000 + 400);
    };
    if (!ctx) return done(0);
    void ready(ctx).then(() => {
      const base = ctx.currentTime + 0.05;
      tick(ctx, base, false);
      tick(ctx, base + back, false);
      tick(ctx, base + back + down, true);
      done(0.05 + latency(ctx));
    });
  }

  return (
    <button
      type="button"
      onClick={play}
      aria-label={`${label}: play the timing with sound`}
      className={`${CHIP} relative cursor-pointer touch-manipulation border-0 transition-colors before:absolute before:-inset-1 before:content-['']`}
      style={{ background: on ? "#F9C832" : "#FFFFFF" }}
    >
      <span className="grid h-4 w-4 place-items-center rounded-full" style={{ background: on ? "#141518" : "#F9C832" }} aria-hidden>
        <svg viewBox="0 0 10 12" width="6" height="7" style={{ marginLeft: 1 }}>
          <path d="M0 0l10 6-10 6z" fill={on ? "#F9C832" : "#141518"} />
        </svg>
      </span>
      {label}
    </button>
  );
}
