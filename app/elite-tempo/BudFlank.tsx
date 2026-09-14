const ACCENT = "#FFB300";

/* An AirPod flanking the phone in the hands-free section, ringed by static gold
   sonar rings — the beat radiating into your ears (Ladder-style).

   Pure CSS: the rings are plain <span> circles with fixed radii and opacity, so
   they render on every device including mobile Safari with Reduce Motion on (an
   earlier framer-motion version failed to paint there).

   topPct positions the bud's vertical center as a % of the phone height so the
   two buds straddle the Live Activity card across breakpoints. */
const RINGS = [
  { size: 56, opacity: 0.6 },
  { size: 90, opacity: 0.36 },
  { size: 126, opacity: 0.18 },
];

export default function BudFlank({
  src,
  side,
  topPct = 50,
}: {
  src: string;
  side: "left" | "right";
  topPct?: number;
}) {
  const isLeft = side === "left";
  return (
    /* `left-3` rather than `left-0` on small screens. The rings are centred on a
       58px-wide bud, so the 126px outer ring reaches 34px past each side of it —
       and with the bud flush to the container edge that put 34px of ring beyond a
       viewport with only 24px of page padding. The result was a page that scrolled
       10px sideways on an iPhone (scrollWidth 400 against a 390 viewport), which
       reads as a rubber-band wobble. Insetting the bud 12px keeps the whole ring
       inside the padding; from `sm` up there is room to spare. */
    <div
      className={`pointer-events-none absolute z-10 -translate-y-1/2 ${
        isLeft ? "left-3 sm:-left-1" : "right-3 sm:-right-1"
      }`}
      style={{ top: `${topPct}%` }}
      aria-hidden
    >
      <div className="relative grid place-items-center">
        {/* Concentric gold sonar rings */}
        {RINGS.map((r, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: r.size,
              height: r.size,
              border: `2px solid ${ACCENT}`,
              opacity: r.opacity,
              boxShadow: `0 0 12px rgba(255,179,0,${(r.opacity * 0.7).toFixed(2)})`,
            }}
          />
        ))}
        {/* Soft gold core glow under the bud */}
        <span
          className="absolute rounded-full"
          style={{
            width: 86,
            height: 86,
            background: "radial-gradient(circle, rgba(255,179,0,0.3), transparent 68%)",
            filter: "blur(3px)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          className="relative w-[58px] sm:w-[72px]"
          style={{ filter: "drop-shadow(0 14px 24px rgba(0,0,0,0.6))" }}
        />
      </div>
    </div>
  );
}
