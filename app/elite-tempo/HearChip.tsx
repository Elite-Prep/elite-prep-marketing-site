"use client";

import { useRef, useState } from "react";
import { getAudio, latency, ready, tick } from "./tickAudio";

/* A floating label that is also a play button: tap it and hear a swing's timing as
 * three ticks (takeaway, top, impact) in real time. It lights gold while playing.
 * Kept from the old tour list (Eric liked hearing Tiger) in the photo-card form. */
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
      className="inline-flex min-h-11 cursor-pointer touch-manipulation items-center gap-2 whitespace-nowrap rounded-xl border-0 px-3 py-2 text-[14px] font-semibold text-[#141518] shadow-[0_6px_18px_rgba(20,21,24,0.14)] transition-colors [font-variant-numeric:tabular-nums]"
      style={{ background: on ? "#F9C832" : "#FFFFFF" }}
    >
      <span className="grid h-6 w-6 place-items-center rounded-full" style={{ background: on ? "#141518" : "#F9C832" }} aria-hidden>
        <svg viewBox="0 0 10 12" width="8" height="10" style={{ marginLeft: 1 }}>
          <path d="M0 0l10 6-10 6z" fill={on ? "#F9C832" : "#141518"} />
        </svg>
      </span>
      {label}
    </button>
  );
}
