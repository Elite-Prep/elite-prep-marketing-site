const SIZE = 240;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CENTER = SIZE / 2;

/** The app's Home ring (mobile/design/HeroRing.tsx), drawn for the web. */
export default function PrepRing({ percent }: { percent: number }) {
  return (
    <div className="ep-ring" role="img" aria-label={`${percent}% ready`}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="var(--raised)" strokeWidth={STROKE} />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          stroke="var(--accent-text)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${(percent / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
        />
      </svg>
      <div className="ep-ring-text" aria-hidden="true">
        <span className="ep-ring-number">
          {percent}
          <span className="ep-ring-unit">%</span>
        </span>
        <span className="ep-eyebrow">Ready</span>
      </div>
    </div>
  );
}
