"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import useReducedMotion from "./useReducedMotion";

/* The hero's app screens on a 3D ring: the front one sits flat and full size, the
   ones beside it turn away and shrink. It moves on every few seconds, can be swiped
   or tapped, and pauses while a finger or pointer is on it or it is off screen.
   Reduce Motion stops the timer and the transitions; swiping and the dots still work. */

const STEP_MS = 3200;
/* Per distance from the front: sideways shift (in phone widths), turn, size, fade.
   The front screen is magnified and the two beside it kept small so it clearly
   leads; the outer pair tuck in behind those two instead of widening the ring. */
const RING = [
  { x: 0, turn: 0, scale: 1.1, opacity: 1 },
  { x: 0.6, turn: 36, scale: 0.7, opacity: 0.92 },
  { x: 0.74, turn: 50, scale: 0.56, opacity: 0.35 },
];

export default function HeroCarousel({ slides, labels }: { slides: ReactNode[]; labels: string[] }) {
  const count = slides.length;
  const [front, setFront] = useState(0);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(true);
  const still = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const press = useRef<{ x: number; id: number } | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const seen = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  useEffect(() => {
    if (still || held || !visible) return;
    const timer = setInterval(() => {
      if (!document.hidden) setFront((f) => (f + 1) % count);
    }, STEP_MS);
    return () => clearInterval(timer);
  }, [still, held, visible, count]);

  const go = (by: number) => setFront((f) => (f + by + count) % count);

  return (
    <div
      ref={box}
      className="relative mt-12 h-[clamp(440px,62vw,680px)] touch-pan-y select-none [perspective:1400px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Elite Tempo app screens"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHeld(false)}
      /* A screenshot is an image, and dragging it would start the browser's own image
         drag and cancel the swipe. */
      onDragStart={(e) => e.preventDefault()}
      onPointerDown={(e) => {
        press.current = { x: e.clientX, id: e.pointerId };
        e.currentTarget.setPointerCapture(e.pointerId);
        if (e.pointerType !== "mouse") setHeld(true);
      }}
      onPointerUp={(e) => {
        const start = press.current;
        press.current = null;
        if (e.pointerType !== "mouse") setHeld(false);
        if (!start || start.id !== e.pointerId) return;
        const dx = e.clientX - start.x;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
      onPointerCancel={() => {
        press.current = null;
        setHeld(false);
      }}
    >
      {slides.map((slide, i) => {
        /* Shortest way round the ring, so -2..2 for five screens. */
        let offset = (i - front + count) % count;
        if (offset > count / 2) offset -= count;
        const step = RING[Math.min(Math.abs(offset), RING.length - 1)];
        const side = Math.sign(offset);
        return (
          <div
            key={i}
            aria-hidden={offset !== 0}
            onClick={() => offset !== 0 && setFront(i)}
            className={`absolute left-1/2 top-0 w-[clamp(200px,28vw,350px)] ${offset === 0 ? "" : "cursor-pointer"}`}
            style={{
              zIndex: 10 - Math.abs(offset),
              opacity: step.opacity,
              transform: `translateX(calc(-50% + ${side * step.x * 100}%)) rotateY(${-side * step.turn}deg) scale(${step.scale})`,
              transformOrigin: "50% 30%",
              transition: still ? "none" : "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease",
            }}
          >
            {slide}
          </div>
        );
      })}
      {/* The dots sit over the front screen, so they get the header's frosted pill. */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-1 rounded-full px-1.5 backdrop-blur" style={{ background: "rgba(255,255,255,0.72)" }}>
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-label={`Show ${label}`}
            aria-current={i === front}
            onClick={() => setFront(i)}
            className="flex h-6 w-6 items-center justify-center"
          >
            <span
              className="block h-2 rounded-full transition-all duration-300"
              style={{ width: i === front ? 20 : 8, background: i === front ? "#121417" : "rgba(18,20,23,0.28)" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
