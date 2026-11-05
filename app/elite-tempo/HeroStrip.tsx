"use client";

import { useEffect, useRef, useState } from "react";
import useReducedMotion from "./useReducedMotion";

/* The hero's looping strip of app screens (Eric, 11-04, from his Figma note: "a
 * looping carousel of multiple images... a dragging interaction to scroll through
 * images"). The cards run the full width of the hero, bottom aligned, and grow
 * taller toward the middle. It advances on its own while on screen and pauses on
 * touch or hover; drag, swipe, tap a side card or use the arrow keys to move it.
 * Reduce Motion stops the auto advance and the transitions.
 *
 * Positions are in units of the center card's width (--u), so the whole strip
 * scales with the screen. Cards more than four places from the center are hidden,
 * and a card that wraps around the loop jumps without animating across. */

export type StripImage = { src: string; alt: string; focus?: string };

const STEP_MS = 3200;
/* Height and width per distance from the center, as fractions of the center card. */
const SIZES = [
  { h: 1, w: 1 },
  { h: 0.76, w: 0.74 },
  { h: 0.6, w: 0.74 },
  { h: 0.46, w: 0.74 },
  { h: 0.32, w: 0.6 },
];
const GAP = 0.08;
const VISIBLE = 4;

/* Center of the card at `offset`, in center-card widths from the strip's middle. */
function centerX(offset: number) {
  const n = Math.abs(offset);
  if (n === 0) return 0;
  let x = SIZES[0].w / 2 + GAP;
  for (let k = 1; k < n; k++) x += SIZES[Math.min(k, SIZES.length - 1)].w + GAP;
  x += SIZES[Math.min(n, SIZES.length - 1)].w / 2;
  return Math.sign(offset) * x;
}

export default function HeroStrip({ images }: { images: StripImage[] }) {
  const count = images.length;
  /* `prev` is the center before the last move, so a card that wraps around the loop
     can jump instead of sliding across the strip. */
  const [pos, setPos] = useState({ front: 0, prev: 0 });
  const front = pos.front;
  const setFront = (next: number | ((f: number) => number)) =>
    setPos((p) => ({ front: typeof next === "function" ? next(p.front) : next, prev: p.front }));
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(true);
  const still = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const press = useRef<{ x: number; id: number } | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const seen = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  useEffect(() => {
    if (still || held || !visible) return;
    const t = setInterval(() => setFront((f) => (f + 1) % count), STEP_MS);
    return () => clearInterval(t);
  }, [still, held, visible, count]);

  const go = (by: number) => setFront((f) => (((f + by) % count) + count) % count);

  return (
    <div
      ref={box}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Elite Tempo app screens"
      className="relative mt-[clamp(40px,6vw,72px)] h-[calc(var(--u)*1.72)] touch-pan-y select-none overflow-hidden outline-none [--u:clamp(150px,21vw,290px)] focus-visible:ring-2 focus-visible:ring-[#F9C832]"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHeld(false)}
      onDragStart={(e) => e.preventDefault()}
      onPointerDown={(e) => {
        press.current = { x: e.clientX, id: e.pointerId };
        if (e.pointerType !== "mouse") setHeld(true);
      }}
      onPointerUp={(e) => {
        const start = press.current;
        press.current = null;
        if (e.pointerType !== "mouse") setHeld(false);
        if (!start || start.id !== e.pointerId) return;
        const dx = e.clientX - start.x;
        if (Math.abs(dx) < 40) return;
        const unit = box.current?.querySelector<HTMLElement>("[data-center]")?.offsetWidth || 200;
        const steps = Math.max(1, Math.round(Math.abs(dx) / (unit * 0.8)));
        go(dx < 0 ? steps : -steps);
      }}
      onPointerCancel={() => {
        press.current = null;
        setHeld(false);
      }}
    >
      {images.map((img, i) => {
        const offsetFor = (center: number) => {
          let o = (i - center + count) % count;
          if (o > count / 2) o -= count;
          return o;
        };
        const offset = offsetFor(front);
        const jumped = Math.abs(offset - offsetFor(pos.prev)) > 1;
        const size = SIZES[Math.min(Math.abs(offset), SIZES.length - 1)];
        const hidden = Math.abs(offset) > VISIBLE;
        return (
          <button
            key={img.src}
            type="button"
            tabIndex={-1}
            data-center={offset === 0 ? "" : undefined}
            aria-hidden={offset !== 0}
            onClick={() => offset !== 0 && setFront(i)}
            className="absolute bottom-0 left-1/2 cursor-pointer overflow-hidden rounded-[clamp(14px,1.6vw,22px)] border-0 bg-[#E8E8E2] p-0 shadow-[0_1px_2px_rgba(20,21,24,0.06),0_18px_40px_-18px_rgba(20,21,24,0.35)]"
            style={{
              width: `calc(var(--u) * ${size.w})`,
              height: `calc(var(--u) * 1.72 * ${size.h})`,
              transform: `translateX(calc(var(--u) * ${centerX(offset)} - 50%))`,
              opacity: hidden ? 0 : 1,
              zIndex: 10 - Math.abs(offset),
              transition:
                still || jumped
                  ? "none"
                  : "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), width 0.7s cubic-bezier(0.16, 1, 0.3, 1), height 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={offset === 0 ? img.alt : ""}
              width={600}
              height={1150}
              draggable={false}
              loading={Math.abs(offset) <= 2 ? "eager" : "lazy"}
              className="pointer-events-none block h-full w-full object-cover"
              style={{ objectPosition: img.focus ?? "50% 30%" }}
            />
          </button>
        );
      })}
    </div>
  );
}
