"use client";

import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";
import { getAudio, latency, ready, tick } from "./tickAudio";

export type DarkShot = {
  area: string;
  player: string;
  detail: string;
  back: number;
  down: number;
  ratio: string;
};

/* The bar's full width in seconds, so every part of the game is drawn to one scale. */
const SCALE = 1.2;

function secs(n: number) {
  return `${n.toFixed(2)}s`;
}

/* How long each part of the game shows before the board rolls on to the next. */
const CYCLE_MS = 4000;

/* Pick a part of the game, press play, and hear a real tournament shot's timing:
   a tick at takeaway and at the top, a higher one at impact, six times through.
   Until someone touches it, the board rolls through the parts of the game on its
   own like a scoreboard, while it is on screen; Reduce Motion keeps it still. */
export default function DarkTimingPlayer({ shots }: { shots: DarkShot[] }) {
  const [area, setArea] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [head, setHead] = useState(0);
  const [touched, setTouched] = useState(false);
  const [visible, setVisible] = useState(false);
  const raf = useRef<number | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const seen = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 },
    );
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  useEffect(() => {
    if (still || touched || playing || !visible) return;
    const timer = setInterval(
      () => setArea((a) => (a + 1) % shots.length),
      CYCLE_MS,
    );
    return () => clearInterval(timer);
  }, [still, touched, playing, visible, shots.length]);

  const shot = shots[area];
  const total = shot.back + shot.down;

  /* The first time the card is half in view, the playhead runs once through the
     swing in real time, silent, so the card shows what it does without a tap
     (2026-11-04 review: five frames over 1.6 s were identical). */
  const swept = useRef(false);
  const sweeping = useRef(false);
  useEffect(() => {
    if (!visible || still || swept.current) return;
    swept.current = true;
    sweeping.current = true;
    const start = performance.now() + 400;
    const frame = (now: number) => {
      if (!sweeping.current) return;
      const t = (now - start) / 1000;
      if (t >= total + 0.6) {
        sweeping.current = false;
        setHead(0);
        return;
      }
      setHead(Math.min(Math.max(t, 0), total));
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [visible, still, total]);

  /* The ticks for one Play go through this node, so Stop can silence the passes
     that are already scheduled. */
  const bus = useRef<GainNode | null>(null);

  function stop() {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
    bus.current?.disconnect();
    bus.current = null;
    setPlaying(false);
    setHead(0);
  }

  useEffect(
    () => () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    },
    [],
  );

  /* Six passes, all scheduled on the audio clock up front; the playhead starts when
     the first tick reaches the speaker, so it never drifts from the sound. */
  function play() {
    sweeping.current = false;
    setTouched(true);
    setPlaying(true);
    const gap = 1.1;
    const passes = 6;
    const ctx = getAudio();
    const run = (delayS: number) => {
      const start = performance.now() + delayS * 1000;
      const frame = (now: number) => {
        const elapsed = (now - start) / 1000;
        const pass = Math.floor(Math.max(elapsed, 0) / (total + gap));
        if (pass >= passes) {
          stop();
          return;
        }
        const t = Math.max(elapsed, 0) - pass * (total + gap);
        setHead(Math.min(t, total));
        raf.current = requestAnimationFrame(frame);
      };
      raf.current = requestAnimationFrame(frame);
    };
    if (!ctx) {
      run(0);
      return;
    }
    void ready(ctx).then(() => {
      const lead = 0.05;
      const out = ctx.createGain();
      out.connect(ctx.destination);
      bus.current = out;
      const base = ctx.currentTime + lead;
      for (let p = 0; p < passes; p++) {
        const at = base + p * (total + gap);
        tick(ctx, at, false, out);
        tick(ctx, at + shot.back, false, out);
        tick(ctx, at + total, true, out);
      }
      run(lead + latency(ctx));
    });
  }

  const backW = (shot.back / SCALE) * 100;
  const downW = (shot.down / SCALE) * 100;
  const num =
    "m-0 text-[clamp(34px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em] [font-variant-numeric:tabular-nums]";

  return (
    <div
      ref={box}
      className="mt-10 rounded-[28px] p-[clamp(22px,4vw,52px)] text-left text-white"
      style={{
        background:
          "radial-gradient(60% 90% at 88% 0%, rgba(249, 200, 50, 0.28) 0%, rgba(249, 200, 50, 0) 70%), #141518",
      }}
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-5">
        <Stat value={secs(shot.back)} label="Backswing" className={num} />
        <Stat value={secs(shot.down)} label="Downswing" className={num} gold />
        <Stat value={secs(total)} label="Total time" className={num} />
        <Stat value={shot.ratio} label="Tempo" className={num} />
      </div>
      <div
        className="relative mt-6 h-14"
        role="img"
        aria-label={`Timing bar: backswing ${secs(shot.back)}, downswing ${secs(shot.down)}.`}
      >
        <div
          className="absolute inset-x-0 top-5 h-4 rounded-lg"
          style={{ background: "rgba(255,255,255,0.1)" }}
        />
        <div
          className="et-ease absolute left-0 top-5 h-4 rounded-l-lg bg-white"
          style={{ width: `${backW}%` }}
        />
        <div
          className="et-ease absolute top-5 h-4 rounded-r-lg"
          style={{
            left: `${backW}%`,
            width: `${downW}%`,
            background: "#F9C832",
          }}
        />
        <div
          className="absolute top-2 -ml-0.5 h-10 w-1 rounded-sm bg-white"
          style={{ left: `${(head / SCALE) * 100}%` }}
        />
      </div>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p
            key={`p${area}`}
            className="et-rise m-0 text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.1] tracking-[-0.025em]"
          >
            {shot.player}
          </p>
          {/* No words in the picture beyond the numbers and the name (Pinterest, 11-04). */}
        </div>
        <button
          type="button"
          onClick={() => (playing ? stop() : play())}
          className="min-h-[54px] min-w-[156px] cursor-pointer rounded-full border-0 bg-white px-[26px] text-[17px] font-semibold text-[#141518]"
        >
          {playing ? "Stop" : "Play timing"}
        </button>
      </div>
      {/* The parts of the game come last: the heading promises four numbers, so
          the numbers lead and these choose whose numbers they are. */}
      {shots.length > 1 && (
        <div
          className="mt-8 flex flex-wrap gap-2 border-t pt-6"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          {shots.map((s, i) => (
            <button
              key={s.area}
              type="button"
              aria-pressed={i === area}
              onClick={() => {
                if (raf.current) cancelAnimationFrame(raf.current);
                raf.current = null;
                setTouched(true);
                setArea(i);
                setPlaying(false);
                setHead(0);
              }}
              className="min-h-11 cursor-pointer rounded-full border-0 px-5 text-base font-medium"
              style={{
                background: i === area ? "#F7C948" : "rgba(255,255,255,0.1)",
                color: i === area ? "#141518" : "#FFFFFF",
              }}
            >
              {s.area}
            </button>
          ))}
        </div>
      )}
      <style>{ROLL_CSS}</style>
    </div>
  );
}

const ROLL_CSS = `
@keyframes et-roll { from { transform: translateY(105%); } to { transform: translateY(0); } }
@keyframes et-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.et-roll { animation: et-roll 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
.et-rise { animation: et-rise 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
.et-ease { transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1), left 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
@media (prefers-reduced-motion: reduce) { .et-roll, .et-rise { animation: none; } .et-ease { transition: none; } }
`;

/* Each character sits in its own clipped slot and rolls up into place when the
   value changes, left to right, like a scoreboard. Characters that did not change
   stay put. */
function Roll({ value }: { value: string }) {
  /* The value shown before this one, kept with React's "store the previous prop"
     pattern so only characters that changed roll. */
  const [shown, setShown] = useState(value);
  const [before, setBefore] = useState(value);
  if (shown !== value) {
    setBefore(shown);
    setShown(value);
  }
  return (
    <span>
      <span className="sr-only">{value}</span>
      {[...value].map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
        >
          <span
            key={before[i] === ch ? `same${i}` : `${value}${i}`}
            className={
              before[i] === ch ? "inline-block" : "et-roll inline-block"
            }
            style={{ animationDelay: `${i * 45}ms` }}
          >
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}

function Stat({
  value,
  label,
  className,
  gold = false,
}: {
  value: string;
  label: string;
  className: string;
  gold?: boolean;
}) {
  return (
    <div>
      <p className={className} style={gold ? { color: "#F9C832" } : undefined}>
        <Roll value={value} />
      </p>
      <p
        className="mt-1.5 text-base"
        style={{ color: "rgba(255,255,255,0.7)" }}
      >
        {label}
      </p>
    </div>
  );
}
