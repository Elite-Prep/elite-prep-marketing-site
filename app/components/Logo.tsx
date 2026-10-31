import { GROWTH_MARK_PATH, GROWTH_MARK_VIEWBOX } from "./GrowthMarkPath";

interface LogoProps {
  /** Wordmark font size in px; the mark scales from it, as in the app. */
  fontSize?: number;
  className?: string;
}

/* Elite Prep lockup, matching the phone app's Logo (mobile/components/Logo.tsx):
   the Growth Arrow mark at 1.2x the font size, an 8px gap, and "ELITE PREP" in
   Anton with 0.4px tracking. White only. No BETA chip, the app removed it. */
export default function Logo({ fontSize = 20, className = "" }: LogoProps) {
  const markSize = Math.round(fontSize * 1.2);
  return (
    <span className={`inline-flex items-center ${className}`} style={{ gap: 8, color: "#FFFFFF" }}>
      <svg width={markSize} height={markSize} viewBox={GROWTH_MARK_VIEWBOX} aria-hidden="true" style={{ display: "block", flexShrink: 0 }}>
        <path fillRule="evenodd" fill="currentColor" d={GROWTH_MARK_PATH} />
      </svg>
      <span
        style={{
          fontFamily: "var(--font-anton), sans-serif",
          fontSize,
          lineHeight: 1,
          letterSpacing: 0.4,
          whiteSpace: "nowrap",
        }}
      >
        ELITE PREP
      </span>
    </span>
  );
}
