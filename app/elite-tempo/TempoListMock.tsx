import { SWINGS, fmtRatio, swingsByCategory } from "./data/tempo-data";

/* The app's Tempos list, rebuilt in the DOM instead of shown as a screen recording.
 *
 * This replaces `greats-beats.mp4`, which was recorded on 2026-06-15 and still
 * showed Tiger at 3.17:1 (0.73s / 0.23s) — sitting inches from a card that reads
 * 3.69:1. The page's whole claim is that these are timed to 1/100 of a second,
 * and it was contradicting itself in a single screenful. The same rot had reached
 * `01-copy-the-greats.png` (Rory 3.00, Couples 2.75, Scott 2.84 — every one a
 * pre-correction figure), which is an App Store screenshot asset, so this is not
 * a one-off: baking numbers into media is the bug.
 *
 * Rendering from tempo-data means the figures here move when the app's seed file
 * moves and cannot move any other way. It is also real text, so a crawler reads
 * "Tiger Woods 3.69:1" where before it saw an opaque <video>.
 *
 * Deliberately NOT a pixel-exact reproduction of the app. It reads as "this is
 * the list you get", and being slightly stylised keeps it honest about being a
 * web rendering rather than a screenshot.
 */

const ACCENT = "#FFB300";
const INK = "#F3F5F9";
const MUTED = "#8F929C";
const ROW = "#16181F";
const HAIRLINE = "#30343E";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* The shots under the selected tab, not an arbitrary four. Showing the whole
   "Off the tee" group is both more honest — the tab above says that is what you
   are looking at — and fills the screen: four rows left a third of the phone
   empty black, which looked like the list had failed to load. */
const SHOWN = swingsByCategory("Off the tee");

/* "The Open Championship" overflows a phone row. The app's own rows abbreviate
   the same way. */
function shortEvent(event: string): string {
  return event.replace(/^The /, "").replace(/ Championship$/, "");
}

export default function TempoListMock() {
  return (
    <div className="flex h-full flex-col" style={{ background: "#0B0B0C" }}>
      {/* Gold title bar, matching the app's Tempos screen. */}
      <div
        className="px-4 pb-3 pt-5"
        style={{ background: ACCENT, color: "#0B0B0C" }}
      >
        <p
          className="text-[15px] tracking-wide"
          style={{ fontFamily: "var(--font-anton), sans-serif" }}
        >
          ELITE TEMPO
        </p>
      </div>

      <div className="px-3 pb-4 pt-3">
        <p className="px-1 text-[10px] leading-snug" style={{ color: MUTED }}>
          Real shots from players at their peak, hand-timed from tournament footage.
        </p>

        {/* Four tabs, the same grouping the library uses. "Off the tee" is shown
            selected because that is where the four shots below live. */}
        <div
          className="mt-3 flex gap-1 rounded-xl p-1"
          style={{ background: ROW, border: `1px solid ${HAIRLINE}` }}
        >
          {["Off the tee", "Approach", "Short game", "Putting"].map((tab, i) => (
            <span
              key={tab}
              className="flex-1 rounded-lg py-1.5 text-center text-[9px] font-bold"
              style={
                i === 0
                  ? { background: ACCENT, color: "#0B0B0C" }
                  : { color: MUTED }
              }
            >
              {tab}
            </span>
          ))}
        </div>

        <ul className="mt-3 flex flex-col gap-2">
          {SHOWN.map((s) => (
            <li
              key={s.slug}
              className="flex items-center gap-2.5 rounded-xl px-2.5 py-2.5"
              style={{ background: ROW, border: `1px solid ${HAIRLINE}` }}
            >
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-[9px] font-bold"
                style={{ border: `1px solid ${HAIRLINE}`, color: MUTED }}
                aria-hidden
              >
                {initials(s.player)}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className="block truncate text-[11px] font-bold"
                  style={{ color: INK }}
                >
                  {s.player}
                </span>
                <span className="block truncate text-[9px]" style={{ color: MUTED }}>
                  {shortEvent(s.event)} · {s.year}
                  {s.result ? ` · ${s.result}` : ""}
                </span>
              </span>
              <span
                className="shrink-0 text-[13px] font-extrabold tabular-nums"
                style={{ color: ACCENT, fontVariantNumeric: "tabular-nums" }}
              >
                {fmtRatio(s)}
              </span>
              <span className="shrink-0 text-[9px]" style={{ color: ACCENT }} aria-hidden>
                ▶
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-3 px-1 text-[9px]" style={{ color: MUTED }}>
          + {SWINGS.length - SHOWN.length} more across approach, short game and putting
        </p>
      </div>
    </div>
  );
}
