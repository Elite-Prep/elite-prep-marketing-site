"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ACCENT } from "./theme";

/* The Elite Tempo beat-tick motif as a live equalizer. Used in the wordmark
   (small) and as section dividers (large). Bars bounce in a staggered loop;
   Reduce Motion freezes them at their resting heights. */
export default function BeatTicks({
  heights = [7, 12, 7, 17, 7, 12, 7],
  barWidth = 2.5,
  gap = 2.5,
  color = ACCENT,
  className,
}: {
  heights?: number[];
  barWidth?: number;
  gap?: number;
  color?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span
      aria-hidden
      className={className}
      style={{ display: "inline-flex", alignItems: "flex-end", gap }}
    >
      {heights.map((h, i) => (
        <motion.span
          key={i}
          style={{
            width: barWidth,
            height: h,
            background: color,
            borderRadius: 2,
            display: "block",
            transformOrigin: "bottom",
          }}
          animate={reduce ? undefined : { scaleY: [0.55, 1.3, 0.55] }}
          transition={
            reduce
              ? undefined
              : { duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.11 }
          }
        />
      ))}
    </span>
  );
}
