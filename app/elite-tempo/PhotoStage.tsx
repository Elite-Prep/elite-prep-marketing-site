import type { ReactNode } from "react";

/* A feature picture in Pinterest's style (11-04): one real photo, centered in the
 * soft card, with two or three small app labels floating on it. The photos are
 * Eric's own range footage, and every number on a label is a real reading from the
 * app. Pinterest's feature screens measured about four times more color than ours
 * did when our pictures were numbers and bars; a photo fixes that. */

export type Chip = {
  /* Where the label floats, as CSS offsets relative to the photo. */
  at: React.CSSProperties;
  children: ReactNode;
};

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
    <div className="flex justify-center px-[18%] py-[clamp(28px,5vw,48px)] sm:px-0">
      <div className="relative w-full sm:w-[300px]" style={{ aspectRatio: `${width} / ${height}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={width} height={height} loading="lazy" className="block h-full w-full rounded-[22px] object-cover" />
        {chips.map((c, i) => (
          <div key={i} className="absolute" style={c.at}>
            {c.children}
          </div>
        ))}
      </div>
    </div>
  );
}

/* The floating label itself: white, rounded, a soft shadow, one short line. */
export function ChipLabel({ swatch, children }: { swatch?: string; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-white px-3 py-2 text-[14px] font-semibold text-[#141518] shadow-[0_6px_18px_rgba(20,21,24,0.14)] [font-variant-numeric:tabular-nums]">
      {swatch && <i className="inline-block h-2.5 w-2.5 rounded-[3px]" style={{ background: swatch }} aria-hidden />}
      {children}
    </span>
  );
}
