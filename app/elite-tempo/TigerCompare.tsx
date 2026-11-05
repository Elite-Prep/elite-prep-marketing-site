"use client";

import { useRef, useState } from "react";
import { getAudio, latency, ready, tick } from "./tickAudio";
import useReducedMotion from "./useReducedMotion";

/* "Hear Tiger's timing": a piece of the app on the soft card, the way Pinterest
 * shows its skin-tone picker (11-04). Two drivers, Tiger's 2000 Open and Eric's own,
 * on one time scale. Tap play to hear a swing as three ticks (takeaway, top,
 * impact) while its bar fills in real time. No photo of Tiger: using a famous
 * player's image to sell a product needs his permission. */

export type CompareRow = {
  name: string;
  detail: string;
  back: number;
  down: number;
};

const GOLD = "#F9C832";
const INK = "#141518";

export default function TigerCompare({ rows }: { rows: CompareRow[] }) {
  const longest = Math.max(...rows.map((r) => r.back + r.down));
  const still = useReducedMotion();
  const backs = useRef<(HTMLDivElement | null)[]>([]);
  const downs = useRef<(HTMLDivElement | null)[]>([]);
  const [lit, setLit] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function fill(i: number, delay: number) {
    const b = backs.current[i];
    const d = downs.current[i];
    if (!b || !d || still) return;
    const r = rows[i];
    b.style.transition = d.style.transition = "none";
    b.style.width = d.style.width = "0%";
    void b.offsetWidth;
    b.style.transition = `width ${r.back}s linear ${delay}s`;
    d.style.transition = `width ${r.down}s linear ${delay + r.back}s`;
    b.style.width = `${(r.back / longest) * 100}%`;
    d.style.width = `${(r.down / longest) * 100}%`;
  }

  function play(i: number) {
    const r = rows[i];
    setLit(i);
    const finish = (delay: number) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(
        () => setLit(null),
        (delay + r.back + r.down) * 1000 + 500,
      );
    };
    const ctx = getAudio();
    if (!ctx) {
      fill(i, 0);
      return finish(0);
    }
    void ready(ctx).then(() => {
      const base = ctx.currentTime + 0.05;
      tick(ctx, base, false);
      tick(ctx, base + r.back, false);
      tick(ctx, base + r.back + r.down, true);
      const delay = 0.05 + latency(ctx);
      fill(i, delay);
      finish(delay);
    });
  }

  return (
    <div className="mx-auto w-full max-w-[420px] px-[6%] py-[clamp(28px,5vw,48px)] sm:px-0">
      {/* The key, so black and gold mean something on first sight. */}
      <p className="m-0 mb-3 flex justify-center gap-5 text-[14px] text-[#55565C]">
        <span className="inline-flex items-center gap-2">
          <i
            className="inline-block h-2 w-4 rounded-full"
            style={{ background: INK }}
            aria-hidden
          />
          Backswing
        </span>
        <span className="inline-flex items-center gap-2">
          <i
            className="inline-block h-2 w-4 rounded-full"
            style={{ background: GOLD }}
            aria-hidden
          />
          Downswing
        </span>
      </p>
      <ul className="m-0 list-none rounded-[22px] bg-white p-0 shadow-[0_1px_2px_rgba(20,21,24,0.05),0_12px_32px_rgba(20,21,24,0.08)]">
        {rows.map((r, i) => (
          <li
            key={r.name}
            className="flex items-center gap-4 border-t border-[#EFEFEA] px-5 py-5 first:border-t-0"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <p className="m-0 text-[16px] font-semibold text-[#141518]">
                  {r.name}
                </p>
                <p className="m-0 text-[19px] font-semibold tracking-[-0.02em] text-[#141518] [font-variant-numeric:tabular-nums]">
                  {(r.back / r.down).toFixed(2)}:1
                </p>
              </div>
              <p className="m-0 mt-0.5 text-[14px] text-[#6B6D72]">
                {r.detail}
              </p>
              <div
                className="relative mt-3 h-2.5"
                role="img"
                aria-label={`Backswing ${r.back.toFixed(2)}s, downswing ${r.down.toFixed(2)}s.`}
              >
                <div className="absolute inset-0 rounded-full bg-[#F0F0EC]" />
                <div
                  ref={(el) => {
                    backs.current[i] = el;
                  }}
                  className="absolute inset-y-0 left-0 rounded-l-full"
                  style={{
                    width: `${(r.back / longest) * 100}%`,
                    background: INK,
                  }}
                />
                <div
                  ref={(el) => {
                    downs.current[i] = el;
                  }}
                  className="absolute inset-y-0 rounded-r-full"
                  style={{
                    left: `${(r.back / longest) * 100}%`,
                    width: `${(r.down / longest) * 100}%`,
                    background: GOLD,
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => play(i)}
              aria-label={`Play ${r.name}'s timing with sound`}
              className="grid h-11 w-11 shrink-0 cursor-pointer touch-manipulation place-items-center rounded-full border-0 transition-colors"
              style={{ background: lit === i ? GOLD : "#F0F0EC" }}
            >
              <svg
                viewBox="0 0 10 12"
                width="11"
                height="13"
                aria-hidden
                style={{ marginLeft: 2 }}
              >
                <path d="M0 0l10 6-10 6z" fill={INK} />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
