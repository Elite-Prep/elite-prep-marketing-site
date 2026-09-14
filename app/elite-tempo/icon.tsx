import { ImageResponse } from "next/og";
import { ACCENT, BG } from "./theme";
import { MARK_ASPECT, markDataUri } from "./EliteTempoMark";

/* 192, not 512. Google's favicon guidance asks for a multiple of 48px square
   (48, 96, 144, 192…) and 512 is not one — 512 ÷ 48 is 10.67. Google will usually
   resize anyway, but the favicon is the one image that appears beside the result
   on every search, so it is worth meeting the documented requirement rather than
   relying on it being forgiving. 192 is 4 × 48 and still sharp on a hidpi tab. */
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

/* The favicon, and the logo Google can show beside a search result.
 *
 * It was a gold beat-tick equalizer — a motif the app does not use. Anyone who had
 * the app on their phone saw one logo there and a different one in the browser tab.
 * This is the app icon's own artwork: the sheared ET monogram, gold on Grey 900.
 *
 * Sized to 62% of the canvas, which is roughly where the app icon sits inside its
 * own rounded square, so the two read as the same mark at tab size.
 */
export default function Icon() {
  const markHeight = Math.round(size.height * 0.42);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BG,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={markDataUri(ACCENT)}
          width={Math.round(markHeight * MARK_ASPECT)}
          height={markHeight}
          alt=""
        />
      </div>
    ),
    { ...size },
  );
}
