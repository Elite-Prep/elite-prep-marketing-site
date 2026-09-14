/* The Elite Tempo mark — the sheared ET monogram from the app icon.
 *
 * The website never had this. It used a gold beat-tick equalizer between the words
 * ELITE and TEMPO, a motif that does not appear anywhere in the app's identity, so
 * the site and the App Store listing were showing two different logos.
 *
 * These coordinates are the app's, not a redraw: they are copied verbatim from
 * `App/EliteTempo/EliteTempoMark.swift`, which was itself generated from
 * `elite-tempo-mark--gold-on-black.svg` — the same artwork the app icon renders
 * from — by normalising each path to the mark's ink bounds. Three polygons, no
 * curves, because every path in the source is straight lines.
 *
 * Drawn in a 0..1 viewBox scaled by ASPECT so it is resolution-independent and
 * takes its colour from `fill`. Keep ASPECT on any sizing or the mark stretches.
 */

/** Width divided by height of the mark's ink. From the app: 1.43236. */
export const MARK_ASPECT = 1.43236;

/* Normalised to the mark's ink bounds, x then y, 0..1. Verbatim from the Swift. */
const PATHS = [
  // Upper bar
  [
    [0.35649, 0.31653],
    [0.4263, 0.02544],
    [0.43579, 0.0],
    [1.0, 0.00122],
    [0.83605, 0.24889],
    [0.55715, 0.24889],
    [0.53817, 0.31606],
    [0.35649, 0.31653],
  ],
  // The T stem and crossbar
  [
    [0.36992, 0.99953],
    [0.1867, 0.99878],
    [0.19186, 0.96571],
    [0.27736, 0.62939],
    [0.27339, 0.62421],
    [0.0, 0.62468],
    [0.05982, 0.38002],
    [0.69608, 0.37974],
    [0.81487, 0.62397],
    [0.46613, 0.62421],
    [0.4594, 0.63385],
    [0.36992, 0.99953],
  ],
  // Lower bar
  [
    [0.99879, 1.0],
    [0.41527, 0.9968],
    [0.47992, 0.75063],
    [0.87743, 0.75063],
    [0.99448, 0.981],
    [0.99879, 1.0],
  ],
];

/* The viewBox is ASPECT wide by 1 tall, so x multiplies by ASPECT and y is used as
   it comes — the same mapping `path(in rect:)` does in the app. */
export const MARK_PATH_D = PATHS.map(
  (pts) =>
    pts
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${(x * MARK_ASPECT).toFixed(5)} ${y.toFixed(5)}`)
      .join(" ") + " Z",
).join(" ");

const d = MARK_PATH_D;

/* The same mark as a standalone SVG data URI.
 *
 * The icon and Open Graph routes render through Satori, which draws a flexbox
 * subset and does not take an arbitrary React SVG tree — but it does take an
 * `<img>` whose src is an SVG data URI. Same geometry, same single source. */
export function markDataUri(fill: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK_ASPECT} 1">` +
    `<path d="${d}" fill="${fill}"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export default function EliteTempoMark({
  size = 24,
  fill = "currentColor",
  className,
  title,
}: {
  /** Height in px. Width is derived from MARK_ASPECT so the mark never distorts. */
  size?: number;
  fill?: string;
  className?: string;
  /** Provide only where the mark stands alone as the link's whole label. */
  title?: string;
}) {
  return (
    <svg
      width={size * MARK_ASPECT}
      height={size}
      viewBox={`0 0 ${MARK_ASPECT} 1`}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      <path d={d} fill={fill} />
    </svg>
  );
}
