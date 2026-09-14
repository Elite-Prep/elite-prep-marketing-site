import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SWINGS, fmtRatio, swingsByCategory } from "./data/tempo-data";

/* The social card, which was quietly the worst-drifted surface on the whole site.
 *
 * It pasted `public/elite-tempo/library.png` — a screenshot taken before the tempo
 * corrections — into the phone, so every share on X, iMessage, Slack or LinkedIn
 * broadcast Tiger at 3.17:1 for a "U.S. Open" he did not play that shot at, Rory
 * at 3.00, Adam Scott at "The Masters 2013", and Cameron Young at "The Players".
 * Four wrong ratios and three wrong events, on the image most people saw before
 * they ever reached the page.
 *
 * The price pill was worse still: "Free for 7 days · then $19.99/yr or $49.99"
 * advertised the old trial length, the old yearly price, and a lifetime unlock
 * that is retired and cannot be bought.
 *
 * Both now render from the same modules the pages use, so this card cannot drift
 * again without the build failing first.
 */

export const alt = "Elite Tempo. Copy the greats. Copy your best.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ACCENT = "#FFB300";
const INK = "#F3F5F9";
const MUTED = "#8F929C";
const ROW = "#16181F";
const HAIRLINE = "#30343E";

/* Kept in step with the landing page's pricing constants. */
const TRIAL_DAYS = 14;
const PRICE_YEARLY = "$24.99";
const PRICE_MONTHLY = "$5.99";

/* Five rows fill the phone; "Off the tee" is the group the card is about. */
const SHOWN = swingsByCategory("Off the tee");

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function shortEvent(event: string) {
  return event.replace(/^The /, "").replace(/ Championship$/, "");
}

// Gold beat-tick equalizer, the brand motif.
function ticks(heights: number[]) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {heights.map((h, i) => (
        <div key={i} style={{ width: 7, height: h, borderRadius: 4, background: ACCENT }} />
      ))}
    </div>
  );
}

export default async function Image() {
  const root = process.cwd();
  const fontDir = (pkg: string) => join(root, "node_modules", "@fontsource", pkg, "files");

  const [anton400, manrope400, manrope700] = await Promise.all([
    readFile(join(fontDir("anton"), "anton-latin-400-normal.woff")),
    readFile(join(fontDir("manrope"), "manrope-latin-400-normal.woff")),
    readFile(join(fontDir("manrope"), "manrope-latin-700-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0B0B0C 0%, #121219 55%, #0B0B0C 100%)",
          fontFamily: "Manrope",
        }}
      >
        {/* Left: brand + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 30px 60px 80px",
            width: 760,
          }}
        >
          {/* Wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 44 }}>
            <div style={{ display: "flex", fontFamily: "Anton", fontSize: 40, letterSpacing: "0.02em" }}>
              <span style={{ color: INK }}>ELITE</span>
            </div>
            {ticks([14, 24, 14, 34, 14, 24, 14])}
            <div style={{ display: "flex", fontFamily: "Anton", fontSize: 40, letterSpacing: "0.02em" }}>
              <span style={{ color: ACCENT }}>TEMPO</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Anton",
              fontSize: 82,
              lineHeight: 1.0,
              color: INK,
              textTransform: "uppercase",
            }}
          >
            <span>Copy the greats.</span>
            <span style={{ color: ACCENT }}>Copy your best.</span>
          </div>

          <div style={{ display: "flex", fontSize: 27, color: MUTED, marginTop: 28, maxWidth: 600, lineHeight: 1.4 }}>
            Golf tempo, timed by hand to 1/100s.
          </div>

          <div
            style={{
              marginTop: 40,
              padding: "12px 22px",
              background: ACCENT,
              borderRadius: 999,
              color: "#0B0B0C",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.04em",
              display: "flex",
              alignSelf: "flex-start",
            }}
          >
            {`Free for ${TRIAL_DAYS} days · then ${PRICE_YEARLY}/yr or ${PRICE_MONTHLY}/mo`}
          </div>
        </div>

        {/* Right: phone mockup */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, paddingRight: 70 }}>
          <div
            style={{
              width: 300,
              /* Sized to the five rows rather than the card. At 610 the list
                 ended two-thirds down and the rest was empty black. */
              height: 500,
              borderRadius: 46,
              background: "#0A0A0C",
              padding: 10,
              display: "flex",
              border: "1px solid #2C2C33",
              boxShadow: "0 40px 80px -24px rgba(0,0,0,0.8)",
            }}
          >
            {/* The Tempos list, drawn from the library rather than pasted in as a
                screenshot. Satori supports a flexbox subset only, so every node
                here carries an explicit `display: flex`. */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 36,
                background: "#0B0B0C",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  background: ACCENT,
                  padding: "22px 18px 14px 18px",
                  fontFamily: "Anton",
                  fontSize: 22,
                  color: "#0B0B0C",
                }}
              >
                ELITE TEMPO
              </div>

              <div style={{ display: "flex", flexDirection: "column", padding: 12 }}>
                {SHOWN.map((s) => (
                  <div
                    key={s.slug}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: ROW,
                      border: `1px solid ${HAIRLINE}`,
                      borderRadius: 14,
                      padding: "12px 12px",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 34,
                        height: 34,
                        borderRadius: 999,
                        border: `1px solid ${HAIRLINE}`,
                        color: MUTED,
                        fontSize: 12,
                        fontWeight: 700,
                        marginRight: 10,
                      }}
                    >
                      {initials(s.player)}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                      <div style={{ display: "flex", color: INK, fontSize: 15, fontWeight: 700 }}>
                        {s.player}
                      </div>
                      <div style={{ display: "flex", color: MUTED, fontSize: 11 }}>
                        {`${shortEvent(s.event)} · ${s.year}`}
                      </div>
                    </div>
                    <div style={{ display: "flex", color: ACCENT, fontSize: 17, fontWeight: 700 }}>
                      {fmtRatio(s)}
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", color: MUTED, fontSize: 11, paddingLeft: 4, paddingTop: 4 }}>
                  {`+ ${SWINGS.length - SHOWN.length} more across approach, short game and putting`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Anton", data: anton400, style: "normal", weight: 400 },
        { name: "Manrope", data: manrope400, style: "normal", weight: 400 },
        { name: "Manrope", data: manrope700, style: "normal", weight: 700 },
      ],
    },
  );
}
