"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/* useLayoutEffect warns during SSR, and on the server the no-op is exactly what
   we want: the markup keeps the real value. */
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/* A timing number that counts up to its value when it scrolls into view.
   On-brand for a tempo app, and purposeful: the number "settles" the way a
   measured swing does. Reduced-motion shows the final value immediately, and
   it's tabular so there's no layout shift while it ticks.

   The initial state is `value`, not 0, and that is load-bearing. It was 0, so
   the server-rendered HTML said "0.00" and the true number existed only after
   hydration plus a scroll into view. Googlebot rendered the page mid-animation
   and indexed Tiger's 3.17 ratio as "0.74:1", every stat frozen at 23% of its
   real value, which left the crawled copy contradicting the FAQ text a few
   sections below and gave AI engines wrong figures to quote. Zeroing now happens
   in a layout effect, which runs before the browser paints, so a human still
   sees the full count-up while a crawler that never runs JS reads the truth. */
export default function CountUp({
  value,
  decimals = 2,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const primed = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (primed.current || reduce) return;
    primed.current = true;
    setDisplay(0);
  }, [reduce]);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 950;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic — fast, then settles
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(step);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
