"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

/* Server HTML renders its children finished, so nothing is hidden if scripts never
   run. Once hydrated it sets data-motion="armed" (the page's CSS draws the start
   state), then "play" the first time it is half on screen. Reduce Motion skips both
   and leaves the finished state alone. */
const useBeforePaint = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function PlayInView({ children, className = "" }: { children: ReactNode; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [motion, setMotion] = useState<"armed" | "play" | undefined>();

  useBeforePaint(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = box.current;
    if (!el) return;
    setMotion("armed");
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        /* One frame in the armed state first, or the browser skips the transition. */
        requestAnimationFrame(() => requestAnimationFrame(() => setMotion("play")));
        seen.disconnect();
      },
      { threshold: 0.5 },
    );
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  return (
    <div ref={box} className={className} data-motion={motion}>
      {children}
    </div>
  );
}
