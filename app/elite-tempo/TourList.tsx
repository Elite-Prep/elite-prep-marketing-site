"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { INK, MUTED } from "./theme";
import useReducedMotion from "./useReducedMotion";
import { getAudio, latency, ready, tick } from "./tickAudio";

/* The tour player list. Modeled on Acquired's episode list (one quiet round play
 * button per row) over a Retool style bar list with a one line key.
 *
 * Every bar is drawn to one time scale, so one point of bar is the same fraction of
 * a second for every player. On scroll the rows fill once, one after another, in
 * real time and silent. The play button replays one swing with three soft ticks at
 * takeaway, top and impact; sound only ever starts from a tap.
 *
 * The bars are CSS width transitions set straight on the elements, so the browser
 * runs them without React redrawing the list every frame (the first version did,
 * and it stuttered on iPhone). A tapped row starts its bars at the moment its first
 * tick reaches the speaker, so the picture and the sound line up. */

export type TourRow = {
  slug: string;
  player: string;
  detail: string;
  back: number;
  down: number;
  ratio: string;
};

const GOLD = "#F9C832";
const STAGGER_MS = 180;
const LEAD_S = 0.05;

export default function TourList({ rows }: { rows: TourRow[] }) {
  const longest = Math.max(...rows.map((r) => r.back + r.down));
  const box = useRef<HTMLDivElement>(null);
  const backs = useRef<(HTMLDivElement | null)[]>([]);
  const downs = useRef<(HTMLDivElement | null)[]>([]);
  const still = useReducedMotion();
  /* Only a row someone tapped lights its button; the silent scroll pass lights none. */
  const [lit, setLit] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  /* One quiet nudge toward the first play button: after the silent pass ends, it
     glows gold once and stops (Eric, 11-04, instead of a "Try it" arrow). */
  const [nudge, setNudge] = useState(false);
  const litTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const widths = (i: number) => ({
    b: (rows[i].back / longest) * 100,
    d: (rows[i].down / longest) * 100,
  });

  /* Empty a row's bars at once, then fill them in real time after `delay` seconds. */
  function playRow(i: number, delay: number) {
    const b = backs.current[i];
    const d = downs.current[i];
    if (!b || !d) return;
    const { b: bw, d: dw } = widths(i);
    const r = rows[i];
    b.style.transition = "none";
    d.style.transition = "none";
    b.style.width = "0%";
    d.style.width = "0%";
    void b.offsetWidth;
    b.style.transition = `width ${r.back}s linear ${delay}s`;
    d.style.transition = `width ${r.down}s linear ${delay + r.back}s`;
    b.style.width = `${bw}%`;
    d.style.width = `${dw}%`;
  }

  /* Before the list is seen, the bars wait empty; then every row fills once. */
  useEffect(() => {
    if (still) return;
    const el = box.current;
    if (!el) return;
    rows.forEach((_, i) => {
      const b = backs.current[i];
      const d = downs.current[i];
      if (b && d) {
        b.style.width = "0%";
        d.style.width = "0%";
      }
    });
    let nudgeTimer: ReturnType<typeof setTimeout> | undefined;
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        seen.disconnect();
        rows.forEach((_, i) => playRow(i, 0.2 + (i * STAGGER_MS) / 1000));
        const passEnd = Math.max(
          ...rows.map(
            (r, i) => 200 + i * STAGGER_MS + (r.back + r.down) * 1000,
          ),
        );
        nudgeTimer = setTimeout(() => setNudge(true), passEnd + 300);
      },
      { threshold: 0.2 },
    );
    seen.observe(el);
    return () => {
      seen.disconnect();
      if (nudgeTimer) clearTimeout(nudgeTimer);
    };
    // playRow only reads refs and rows.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still, rows]);

  function replay(i: number) {
    setTouched(true);
    setLit(i);
    const r = rows[i];
    const ctx = getAudio();
    const light = (delay: number) => {
      if (litTimer.current) clearTimeout(litTimer.current);
      litTimer.current = setTimeout(
        () => setLit(null),
        (delay + r.back + r.down) * 1000 + 400,
      );
    };
    if (!ctx) {
      if (!still) playRow(i, 0);
      light(0);
      return;
    }
    void ready(ctx).then(() => {
      const base = ctx.currentTime + LEAD_S;
      tick(ctx, base, false);
      tick(ctx, base + r.back, false);
      tick(ctx, base + r.back + r.down, true);
      const delay = LEAD_S + latency(ctx);
      if (!still) playRow(i, delay);
      light(delay);
    });
  }

  useEffect(
    () => () => {
      if (litTimer.current) clearTimeout(litTimer.current);
    },
    [],
  );

  return (
    <div ref={box} className="mt-8">
      <style>{`@keyframes et-nudge { 0% { box-shadow: 0 0 0 0 rgba(249,200,50,0.75); background: ${GOLD}; } 70% { box-shadow: 0 0 0 16px rgba(249,200,50,0); background: ${GOLD}; } 100% { box-shadow: 0 0 0 16px rgba(249,200,50,0); } } .et-nudge { animation: et-nudge 1.4s ease-out 1; }`}</style>
      {/* The key. The invitation to listen lives in the heading above (Eric, 11-04:
          a small play icon above the real play buttons read awkward). */}
      <p className="m-0 flex gap-5 text-[16px]" style={{ color: MUTED }}>
        <span className="inline-flex items-center gap-2">
          <i
            className="inline-block h-2 w-[18px] rounded"
            style={{ background: INK }}
            aria-hidden
          />
          Backswing
        </span>
        <span className="inline-flex items-center gap-2">
          <i
            className="inline-block h-2 w-[18px] rounded"
            style={{ background: GOLD }}
            aria-hidden
          />
          Downswing
        </span>
      </p>
      <ul className="m-0 mt-2 list-none p-0">
        {rows.map((r, i) => {
          const { b: bw, d: dw } = widths(i);
          return (
            <li
              key={r.slug}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-2 border-t py-4 first:border-t-0 md:grid-cols-[minmax(0,14em)_minmax(0,1fr)_6.5ch_44px]"
              style={{ borderColor: "#ECECE7" }}
            >
              <div className="min-w-0">
                <Link
                  href={`/tempo/${r.slug}`}
                  className="font-semibold no-underline hover:underline"
                  style={{ color: INK }}
                >
                  {r.player}
                </Link>
                <p className="m-0 text-[16px]" style={{ color: MUTED }}>
                  {r.detail}
                </p>
              </div>
              <div className="col-start-1 row-start-2 min-w-0 md:col-start-auto md:row-start-auto">
                <div
                  className="relative h-3"
                  role="img"
                  aria-label={`Backswing ${r.back.toFixed(2)}s, downswing ${r.down.toFixed(2)}s.`}
                >
                  <div
                    ref={(el) => {
                      backs.current[i] = el;
                    }}
                    className="absolute inset-y-0 left-0"
                    style={{
                      width: `${bw}%`,
                      background: INK,
                      borderRadius: "6px 0 0 6px",
                    }}
                  />
                  <div
                    ref={(el) => {
                      downs.current[i] = el;
                    }}
                    className="absolute inset-y-0"
                    style={{
                      left: `${bw}%`,
                      width: `${dw}%`,
                      background: GOLD,
                      borderRadius: "0 6px 6px 0",
                    }}
                  />
                </div>
              </div>
              <p className="col-start-2 row-start-1 m-0 text-right text-[30px] font-semibold tracking-[-0.02em] [font-variant-numeric:tabular-nums] md:col-start-auto md:row-start-auto">
                {r.ratio}
              </p>
              <button
                type="button"
                onClick={() => replay(i)}
                aria-label={`Play ${r.player}'s timing with sound`}
                className={`col-start-2 row-start-2 grid h-11 w-11 cursor-pointer touch-manipulation place-items-center self-center justify-self-end rounded-full border-0 transition-colors md:col-start-auto md:row-start-auto md:self-center ${nudge && i === 0 && !touched ? "et-nudge" : ""}`}
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
          );
        })}
      </ul>
    </div>
  );
}
