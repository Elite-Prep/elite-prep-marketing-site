"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { INK, MUTED } from "./theme";
import useReducedMotion from "./useReducedMotion";

/* The tour player list, 2026-11-04 round 3. Modeled on Acquired's episode list (one
 * quiet round play button per row) over a Retool style bar list with a one line key.
 *
 * Every bar is drawn to one time scale, so one point of bar is the same fraction of
 * a second for every player. On scroll the rows play once, one after another, in
 * real time and silent. The play button replays one swing with three soft ticks at
 * takeaway, top and impact; sound only ever starts from a tap. */

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

export default function TourList({ rows }: { rows: TourRow[] }) {
  const longest = Math.max(...rows.map((r) => r.back + r.down));
  const box = useRef<HTMLDivElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const still = useReducedMotion();
  /* Per row: when its current pass started (ms), or null when it rests full. */
  const [starts, setStarts] = useState<(number | null)[]>(() =>
    rows.map(() => null),
  );
  const [now, setNow] = useState(0);
  const [armed, setArmed] = useState(false);
  /* Only a row someone tapped lights its button; the silent scroll pass lights none. */
  const [tapped, setTapped] = useState<number | null>(null);
  const raf = useRef<number | null>(null);

  /* Clock that only runs while any row is playing. */
  const running = starts.some((s) => s !== null);
  useEffect(() => {
    if (!running) return;
    const frame = (t: number) => {
      setNow(t);
      setStarts((prev) =>
        prev.map((s, i) =>
          s !== null && t - s > (rows[i].back + rows[i].down) * 1000 + 50
            ? null
            : s,
        ),
      );
      raf.current = requestAnimationFrame(frame);
    };
    raf.current = requestAnimationFrame(frame);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [running, rows]);

  /* Play every row once, silently, the first time a fifth of the list is in view. */
  useEffect(() => {
    if (still) return;
    const el = box.current;
    if (!el) return;
    setArmed(true);
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const t0 = performance.now() + 200;
        setNow(performance.now());
        setStarts(rows.map((_, i) => t0 + i * STAGGER_MS));
        seen.disconnect();
      },
      { threshold: 0.2 },
    );
    seen.observe(el);
    return () => seen.disconnect();
  }, [still, rows]);

  function tick(at: number, hard: boolean) {
    const c = audio.current;
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.frequency.value = hard ? 1320 : 880;
    g.gain.setValueAtTime(0.25, at);
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.09);
    o.connect(g);
    g.connect(c.destination);
    o.start(at);
    o.stop(at + 0.1);
  }

  function replay(i: number, at: number) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (Ctx && !audio.current) audio.current = new Ctx();
    audio.current?.resume();
    const r = rows[i];
    const lead = 0.12;
    if (audio.current) {
      const base = audio.current.currentTime + lead;
      tick(base, false);
      tick(base + r.back, false);
      tick(base + r.back + r.down, true);
    }
    setTapped(i);
    if (still) return;
    const t = at;
    setNow(t);
    setStarts((prev) => prev.map((s, j) => (j === i ? t + lead * 1000 : s)));
  }

  /* How much of each part is drawn, 0 to 1. A row that is not playing rests full,
     except before its first pass, when it rests empty. */
  function fill(i: number) {
    const s = starts[i];
    if (s === null) return armed && now === 0 ? { b: 0, d: 0 } : { b: 1, d: 1 };
    const t = Math.max(0, (now - s) / 1000);
    const r = rows[i];
    return {
      b: Math.min(1, t / r.back),
      d: Math.min(1, Math.max(0, (t - r.back) / r.down)),
    };
  }

  return (
    <div ref={box} className="mt-8">
      {/* The key on the left; on the right, a prompt that points at the play buttons
          below it, so nobody misses that every swing can be heard (Eric, 11-04). */}
      <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
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
        <p
          className="m-0 inline-flex items-center gap-2 text-[16px] font-semibold"
          style={{ color: INK }}
        >
          Try listening below
          <span
            className="grid h-7 w-7 place-items-center rounded-full"
            style={{ background: GOLD }}
            aria-hidden
          >
            <svg
              viewBox="0 0 10 12"
              width="8"
              height="10"
              style={{ marginLeft: 1 }}
            >
              <path d="M0 0l10 6-10 6z" fill={INK} />
            </svg>
          </span>
        </p>
      </div>
      <ul className="m-0 mt-2 list-none p-0">
        {rows.map((r, i) => {
          const f = fill(i);
          const bw = (r.back / longest) * 100;
          const dw = (r.down / longest) * 100;
          const playing = tapped === i && starts[i] !== null;
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
                    className="absolute inset-y-0 left-0 rounded-l-md"
                    style={{
                      width: `${bw * f.b}%`,
                      background: INK,
                      borderRadius: f.d > 0 ? "6px 0 0 6px" : 6,
                    }}
                  />
                  <div
                    className="absolute inset-y-0 rounded-r-md"
                    style={{
                      left: `${bw}%`,
                      width: `${dw * f.d}%`,
                      background: GOLD,
                    }}
                  />
                </div>
                <p
                  className="m-0 mt-1.5 text-[16px] [font-variant-numeric:tabular-nums]"
                  style={{ color: MUTED }}
                >
                  {r.back.toFixed(2)}s back, {r.down.toFixed(2)}s down
                </p>
              </div>
              <p className="col-start-2 row-start-1 m-0 text-right text-[30px] md:col-start-auto md:row-start-auto font-semibold tracking-[-0.02em] [font-variant-numeric:tabular-nums]">
                {r.ratio}
              </p>
              <button
                type="button"
                onClick={(e) => replay(i, e.timeStamp)}
                aria-label={`Play ${r.player}'s timing with sound`}
                className="col-start-2 row-start-2 grid h-11 w-11 cursor-pointer place-items-center self-center justify-self-end rounded-full border-0 transition-colors md:col-start-auto md:row-start-auto md:self-center"
                style={{ background: playing ? GOLD : "#F0F0EC" }}
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
