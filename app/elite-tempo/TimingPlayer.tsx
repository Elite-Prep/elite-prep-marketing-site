"use client";

import { useEffect, useRef, useState } from "react";
import { ACCENT, BG, CARD, FONT_NUMERALS, HAIRLINE, INK, MUTED, ON_ACCENT } from "./theme";

export type TimingShot = {
  area: string;
  player: string;
  detail: string;
  back: number;
  down: number;
  total: number;
  ratio: string;
};

/* Every shot is drawn on the same clock, so a putt visibly takes less time than a
   driver. Scaling each bar to its own length would hide the thing the bar is for. */
const SCALE_S = 1.2;
const PAUSE_S = 1.1;
const PASSES = 6;

const seconds = (n: number) => `${n.toFixed(2)}s`;

/* Three ticks a pass: takeaway, top, impact. Impact is pitched higher because it is
   the one a golfer is listening for. */
function tick(ctx: AudioContext, at: number, high: boolean) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = high ? 1320 : 880;
  gain.gain.setValueAtTime(0.3, at);
  gain.gain.exponentialRampToValueAtTime(0.001, at + 0.09);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(at);
  osc.stop(at + 0.1);
}

export default function TimingPlayer({ shots }: { shots: TimingShot[] }) {
  const [picked, setPicked] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [head, setHead] = useState(0);
  const frame = useRef<number | null>(null);
  const audio = useRef<AudioContext | null>(null);

  const shot = shots[picked];

  function stop() {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    setPlaying(false);
    setHead(0);
  }

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  function play() {
    const ctx = audio.current ?? new AudioContext();
    audio.current = ctx;
    void ctx.resume();

    const cycle = shot.total + PAUSE_S;
    const start = performance.now() + 120;
    let nextPass = 0;
    setPlaying(true);

    const step = (now: number) => {
      const elapsed = Math.max((now - start) / 1000, 0);
      const pass = Math.floor(elapsed / cycle);
      if (pass >= PASSES) {
        stop();
        return;
      }
      if (pass >= nextPass) {
        const base = ctx.currentTime + 0.03;
        tick(ctx, base, false);
        tick(ctx, base + shot.back, false);
        tick(ctx, base + shot.total, true);
        nextPass = pass + 1;
      }
      setHead(Math.min(elapsed - pass * cycle, shot.total));
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  }

  const stats = [
    { value: seconds(shot.back), label: "Backswing", chip: MUTED },
    { value: seconds(shot.down), label: "Downswing", chip: ACCENT },
    { value: seconds(shot.total), label: "Total time" },
    { value: shot.ratio, label: "Tempo ratio" },
  ];

  return (
    <div className="mt-8 rounded-[20px] p-5 sm:p-10" style={{ background: CARD }}>
      <div className="flex flex-wrap gap-2">
        {shots.map((s, i) => (
          <button
            key={s.area}
            type="button"
            aria-pressed={i === picked}
            onClick={() => {
              stop();
              setPicked(i);
            }}
            className="min-h-11 cursor-pointer rounded-full px-5 text-[15px] font-semibold"
            style={{
              background: i === picked ? INK : HAIRLINE,
              color: i === picked ? BG : INK,
            }}
          >
            {s.area}
          </button>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[28px] font-semibold leading-tight" style={{ color: INK }}>
            {shot.player}
          </p>
          <p className="mt-0.5 text-[15px]" style={{ color: MUTED }}>
            {shot.detail}
          </p>
        </div>
        <button
          type="button"
          onClick={() => (playing ? stop() : play())}
          className="min-h-13 min-w-[150px] cursor-pointer rounded-full px-6 text-[15px] font-semibold"
          style={{ background: ACCENT, color: ON_ACCENT }}
        >
          {playing ? "Stop" : "Play timing"}
        </button>
      </div>

      <div
        className="relative mt-6 h-16"
        role="img"
        aria-label={`Timing bar: backswing ${seconds(shot.back)}, downswing ${seconds(shot.down)}.`}
      >
        <div className="absolute inset-x-0 top-[30px] h-1" style={{ background: HAIRLINE }} />
        <div
          className="absolute left-0 top-[18px] h-7"
          style={{ width: `${(shot.back / SCALE_S) * 100}%`, background: MUTED }}
        />
        <div
          className="absolute top-[18px] h-7"
          style={{
            left: `${(shot.back / SCALE_S) * 100}%`,
            width: `${(shot.down / SCALE_S) * 100}%`,
            background: ACCENT,
          }}
        />
        <div
          className="absolute top-1.5 -ml-px h-[52px] w-[3px]"
          style={{ left: `${(head / SCALE_S) * 100}%`, background: INK }}
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-5 md:grid-cols-4">
        {stats.map(({ value, label, chip }) => (
          <div key={label}>
            <p
              className="text-[clamp(28px,3.4vw,48px)] font-semibold leading-[1.1]"
              style={{ color: INK, fontFamily: FONT_NUMERALS, fontVariantNumeric: "tabular-nums" }}
            >
              {value}
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-[15px]" style={{ color: MUTED }}>
              {chip && <span className="h-3 w-3" style={{ background: chip }} aria-hidden />}
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
