import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SWINGS, fmtRatio, swingsByCategory } from "./data/tempo-data";
import { PRICING_SUMMARY } from "./data/pricing";
import { ACCENT, BG, CARD, HAIRLINE, INK, MUTED, ON_ACCENT, TRACKING_MARK } from "./theme";
import { MARK_ASPECT, markDataUri } from "./EliteTempoMark";

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


/* Five rows fill the phone; "Off the tee" is the group the card is about. */
const SHOWN = swingsByCategory("Off the tee");

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

function shortEvent(event: string) {
  return event.replace(/^The /, "").replace(/ Championship$/, "");
}

export default async function Image() {
  const root = process.cwd();
  const fontDir = (pkg: string) => join(root, "node_modules", "@fontsource", pkg, "files");

  /* Nunito Sans, the same fallback the pages use when Avenir Next is not
     available — which it never is here, because this renders on a server. */
  const [sans400, sans600, sans700] = await Promise.all([
    readFile(join(fontDir("nunito-sans"), "nunito-sans-latin-400-normal.woff")),
    readFile(join(fontDir("nunito-sans"), "nunito-sans-latin-600-normal.woff")),
    readFile(join(fontDir("nunito-sans"), "nunito-sans-latin-700-normal.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BG,
          fontFamily: "Nunito Sans",
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
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 44 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markDataUri(ACCENT)} width={36 * MARK_ASPECT} height={36} alt="" />
            <div
              style={{
                display: "flex",
                fontSize: 34,
                fontWeight: 700,
                color: INK,
                letterSpacing: TRACKING_MARK,
              }}
            >
              ELITE TEMPO
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.015em",
              color: INK,
            }}
          >
            <span>Copy the greats.</span>
            <span style={{ color: INK }}>Copy your best.</span>
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
              color: ON_ACCENT,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.04em",
              display: "flex",
              alignSelf: "flex-start",
            }}
          >
            {PRICING_SUMMARY}
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
                background: BG,
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
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: TRACKING_MARK,
                  color: ON_ACCENT,
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
                      background: CARD,
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
                    <div style={{ display: "flex", color: INK, fontSize: 17, fontWeight: 700 }}>
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
        { name: "Nunito Sans", data: sans400, style: "normal", weight: 400 },
        { name: "Nunito Sans", data: sans600, style: "normal", weight: 600 },
        { name: "Nunito Sans", data: sans700, style: "normal", weight: 700 },
      ],
    },
  );
}
