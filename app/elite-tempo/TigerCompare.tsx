"use client";

import { useEffect, useRef, useState } from "react";
import { getAudio, latency, ready, tick } from "./tickAudio";
import useReducedMotion from "./useReducedMotion";

/* "You against Tiger" (blind review, 11-05): the page's most distinctive idea, moved
 * up to sit right under the hero and made the loudest thing on the page. A dark card,
 * each swing's tempo in big type, and a thick bar per swing on one time scale. When
 * the card first scrolls into view both bars fill in real time, Tiger then you, so the
 * difference is seen without a tap. Tap play to hear a swing as three ticks (takeaway,
 * top, impact). No photo of Tiger: using a famous player's image to sell a product
 * needs his permission. */

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
  const card = useRef<HTMLDivElement | null>(null);
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

  /* The one silent run-through: bars empty on load, then fill in turn the first time
     most of the card is on screen. Sound needs a tap, so this one is picture only. */
  useEffect(() => {
    const el = card.current;
    if (!el || still || !("IntersectionObserver" in window)) return;
    [...backs.current, ...downs.current].forEach((bar) => {
      if (bar) {
        bar.style.transition = "none";
        bar.style.width = "0%";
      }
    });
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        let at = 0.3;
        rows.forEach((r, i) => {
          fill(i, at);
          at += r.back + r.down + 0.5;
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still]);

  function play(i: number) {
    const r = rows[i];
    setLit(i);
    const finish = (delay: number) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setLit(null), (delay + r.back + r.down) * 1000 + 500);
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
    <div ref={card} className="overflow-hidden rounded-[28px] px-5 py-7 text-white sm:px-8 sm:py-9" style={{ background: INK }}>
      <ul className="m-0 flex list-none flex-col gap-9 p-0">
        {rows.map((r, i) => (
          <li key={r.name}>
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="m-0 text-[19px] font-semibold">{r.name}</p>
                <p className="m-0 mt-0.5 text-[15px] text-white/60">{r.detail}</p>
              </div>
              <p className="m-0 text-[clamp(40px,6vw,52px)] font-semibold leading-none tracking-[-0.03em] [font-variant-numeric:tabular-nums]" style={{ color: i === 0 ? GOLD : "#fff" }}>
                {(r.back / r.down).toFixed(2)}
                <span className="text-[0.5em] text-white/60">:1</span>
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div
                className="relative h-4 flex-1"
                role="img"
                aria-label={`Backswing ${r.back.toFixed(2)} seconds, downswing ${r.down.toFixed(2)} seconds.`}
              >
                <div className="absolute inset-0 rounded-full bg-white/10" />
                <div
                  ref={(el) => {
                    backs.current[i] = el;
                  }}
                  className="absolute inset-y-0 left-0 rounded-l-full bg-white"
                  style={{ width: `${(r.back / longest) * 100}%` }}
                />
                <div
                  ref={(el) => {
                    downs.current[i] = el;
                  }}
                  className="absolute inset-y-0 rounded-r-full"
                  style={{ left: `${(r.back / longest) * 100}%`, width: `${(r.down / longest) * 100}%`, background: GOLD }}
                />
              </div>
              <button
                type="button"
                onClick={() => play(i)}
                aria-label={`Play ${r.name}'s timing with sound`}
                className="grid h-11 w-11 shrink-0 cursor-pointer touch-manipulation place-items-center rounded-full border-0 transition-colors"
                style={{ background: lit === i ? GOLD : "rgba(255,255,255,0.14)" }}
              >
                <svg viewBox="0 0 10 12" width="11" height="13" aria-hidden style={{ marginLeft: 2 }}>
                  <path d="M0 0l10 6-10 6z" fill={lit === i ? INK : "#fff"} />
                </svg>
              </button>
            </div>
            <div className="mt-2 flex justify-between pr-14 text-[14px] text-white/60 [font-variant-numeric:tabular-nums]">
              <span>Backswing {r.back.toFixed(2)}s</span>
              <span>Downswing {r.down.toFixed(2)}s</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
