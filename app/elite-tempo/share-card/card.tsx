import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { TRIAL_DAYS } from "../data/pricing";
import { INK } from "../theme";
import { MARK_ASPECT, markDataUri } from "../EliteTempoMark";

/* The link preview (iMessage, Slack, X, LinkedIn), drawn as a small copy of the
 * home page hero: the same cream and gold wash, the same headline and line under
 * it, and real app screens in the same phone frame.
 *
 * The previous card drew a made-up phone with a gold bar and a list of tempos in a
 * look the app no longer has, so a shared link showed a different product from the
 * one on the page.
 *
 * No price on the card: prices change on App Store Connect dates, and a preview
 * cached by a chat app keeps showing whatever it first fetched. The trial length is
 * stable and comes from the same module the pages use.
 *
 * Satori renders WebP poorly, so the three screens are JPEG copies of the hero's
 * WebP files in public/elite-tempo/og, cut to the size they are shown at here. */

export const alt = "Elite Tempo. Time your entire process.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const HEADLINE_1 = "Time your entire";
/* Eric's 11-04 headline: "Time your entire process." */
const HEADLINE_2 = "process.";
const HEADLINE_3 = "";
const LINE = "Groove your entire game from pre-shot routine to impact, so you can trust your game when it matters most.";

const FRAME = "linear-gradient(145deg, #9A9A9F 0%, #2A2A2D 22%, #4A4A4F 60%, #18181A 100%)";

function Phone({ src, width, top, left, z }: { src: string; width: number; top: number; left: number; z: number }) {
  const screenH = Math.round(((width - 14) * 2622) / 1206);
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        display: "flex",
        padding: 7,
        borderRadius: Math.round(width * 0.15),
        backgroundImage: FRAME,
        boxShadow: "0 40px 70px -30px rgba(20, 30, 20, 0.55)",
        zIndex: z,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} width={width - 14} height={screenH} alt="" style={{ borderRadius: Math.round(width * 0.13) }} />
    </div>
  );
}

export async function renderShareCard() {
  const root = process.cwd();
  const font = (w: number) => readFile(join(root, "node_modules", "@fontsource", "inter", "files", `inter-latin-${w}-normal.woff`));
  const shot = async (n: string) =>
    `data:image/jpeg;base64,${(await readFile(join(root, "public", "elite-tempo", "og", `${n}.jpg`))).toString("base64")}`;

  const [w400, w600, routine, player, stats] = await Promise.all([font(400), font(600), shot("routine"), shot("player"), shot("stats")]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Inter",
          color: INK,
          background: "#FFFCF0",
          backgroundImage:
            "radial-gradient(48% 95% at 79% 100%, #F9C832 0%, rgba(249, 200, 50, 0.55) 40%, rgba(249, 200, 50, 0) 75%), radial-gradient(45% 60% at 0% 100%, rgba(38, 160, 96, 0.5) 0%, rgba(38, 160, 96, 0) 70%), radial-gradient(40% 60% at 100% 100%, rgba(38, 160, 96, 0.5) 0%, rgba(38, 160, 96, 0) 70%)",
        }}
      >
        {/* Left: the mark, the promise, the line under it, the trial. */}
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 0 0 72px", width: 660 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markDataUri(INK)} width={28 * MARK_ASPECT} height={28} alt="" />
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600, letterSpacing: "0.01em" }}>Elite Tempo</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 64,
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              whiteSpace: "nowrap",
            }}
          >
            <span>{HEADLINE_1}</span>
            <span>{HEADLINE_2}</span>
            {HEADLINE_3 && <span>{HEADLINE_3}</span>}
          </div>

          <div style={{ display: "flex", marginTop: 26, fontSize: 26, lineHeight: 1.35, color: "#4A4B50", maxWidth: 540 }}>
            {LINE}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 34, fontSize: 21, color: "#4A4B50" }}>
            {/* Drawn, not typed: Inter has no star glyph and Satori printed boxes. */}
            <div style={{ display: "flex", gap: 3 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24">
                  <path fill={INK} d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
                </svg>
              ))}
            </div>
            <span>{`Rated 5.0 on the App Store. ${TRIAL_DAYS} days free.`}</span>
          </div>
        </div>

        {/* Right: the hero's three screens, front one in the middle, rising from the
            bottom edge the way they do on the page. */}
        <Phone src={stats} width={210} top={210} left={736} z={1} />
        <Phone src={player} width={210} top={210} left={962} z={1} />
        <Phone src={routine} width={268} top={118} left={820} z={2} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: w400, style: "normal", weight: 400 },
        { name: "Inter", data: w600, style: "normal", weight: 600 },
      ],
    },
  );
}
