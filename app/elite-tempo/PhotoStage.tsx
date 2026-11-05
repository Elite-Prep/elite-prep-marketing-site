import type { ReactNode } from "react";

/* A feature picture in Pinterest's style (11-04): one real photo, centered in the
 * soft card, with two or three small app labels floating on it. The photos are
 * Eric's own range footage, and every number on a label is a real reading from the
 * app.
 *
 * The labels follow one strict system, copied from Pinterest's ("Cherry red",
 * "Knit sweater"): the same height, radius, type and shadow; an icon on every one;
 * and they always straddle the photo's left or right edge, a third outside, at one
 * of three heights. Nothing is placed by eye. */

export type Spot = "top-right" | "middle-left" | "bottom-right" | "top-left" | "bottom-left";

const SPOTS: Record<Spot, React.CSSProperties> = {
  "top-left": { top: "12%", left: 0, transform: "translateX(-34%)" },
  "top-right": { top: "12%", right: 0, transform: "translateX(34%)" },
  "middle-left": { top: "47%", left: 0, transform: "translateX(-34%)" },
  "bottom-left": { bottom: "10%", left: 0, transform: "translateX(-34%)" },
  "bottom-right": { bottom: "10%", right: 0, transform: "translateX(34%)" },
};

export type Chip = { spot: Spot; children: ReactNode };

export function PhotoStage({
  src,
  alt,
  width,
  height,
  chips,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  chips: Chip[];
}) {
  return (
    <div className="flex justify-center px-[20%] py-[clamp(32px,5vw,52px)] sm:px-0">
      <div className="relative w-full sm:w-[300px]" style={{ aspectRatio: `${width} / ${height}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={width} height={height} loading="lazy" className="block h-full w-full rounded-[22px] object-cover" />
        {chips.map((c) => (
          <div key={c.spot} className="absolute" style={SPOTS[c.spot]}>
            {c.children}
          </div>
        ))}
      </div>
    </div>
  );
}

/* The one label style. 36 points tall, 12 point corners, 14 point semibold, a 16
   point icon on the left. Exported so the play label matches it exactly. */
export const CHIP =
  "inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-xl bg-white pl-2.5 pr-3 text-[14px] font-semibold leading-none text-[#141518] shadow-[0_1px_2px_rgba(20,21,24,0.06),0_8px_20px_rgba(20,21,24,0.12)] [font-variant-numeric:tabular-nums]";

export function ChipLabel({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <span className={CHIP}>
      <ChipIcon name={icon} />
      {children}
    </span>
  );
}

export type IconName = "back" | "down" | "tempo" | "target" | "clock" | "you";

/* 16 point icons drawn on one grid, all ink with gold only where gold means the
   downswing, as it does in the app. */
export function ChipIcon({ name }: { name: IconName }) {
  const common = { width: 16, height: 16, viewBox: "0 0 16 16", "aria-hidden": true } as const;
  switch (name) {
    case "back":
      return (
        <svg {...common}>
          <rect x="1" y="6" width="14" height="4" rx="2" fill="#141518" />
        </svg>
      );
    case "down":
      return (
        <svg {...common}>
          <rect x="1" y="6" width="14" height="4" rx="2" fill="#F9C832" />
        </svg>
      );
    case "tempo":
      return (
        <svg {...common}>
          <rect x="1" y="6" width="10" height="4" rx="2" fill="#141518" />
          <rect x="10" y="6" width="5" height="4" rx="2" fill="#F9C832" />
        </svg>
      );
    case "target":
      return (
        <svg {...common} fill="none" stroke="#141518" strokeWidth="1.6">
          <circle cx="8" cy="8" r="6.2" />
          <circle cx="8" cy="8" r="2.4" fill="#141518" stroke="none" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common} fill="none" stroke="#141518" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="8" cy="8" r="6.2" />
          <path d="M8 4.6V8l2.3 1.6" />
        </svg>
      );
    case "you":
      return (
        <svg {...common}>
          <circle cx="8" cy="5.2" r="2.8" fill="#141518" />
          <path d="M2.6 14.2c.6-3 2.8-4.6 5.4-4.6s4.8 1.6 5.4 4.6" fill="#141518" />
        </svg>
      );
  }
}
