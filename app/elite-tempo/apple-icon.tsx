import { ImageResponse } from "next/og";
import { ACCENT, BG } from "./theme";
import { MARK_ASPECT, markDataUri } from "./EliteTempoMark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* The touch icon — what appears if someone adds the page to their home screen.
 *
 * This one matters more than most: it can end up sitting on the same home screen
 * as the real app. Showing a different logo there would be the clearest possible
 * version of the problem this change exists to fix, so it is the app icon's own
 * artwork at the same proportions.
 */
export default function AppleIcon() {
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
