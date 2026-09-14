import { ImageResponse } from "next/og";
import { ACCENT, BG } from "./theme";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Elite Tempo touch icon: gold beat-tick equalizer on near-black.
export default function AppleIcon() {
  const bars = [52, 88, 128, 88, 52];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 11,
          background: BG,
        }}
      >
        {bars.map((h, i) => (
          <div key={i} style={{ width: 18, height: h, borderRadius: 9, background: ACCENT }} />
        ))}
      </div>
    ),
    { ...size }
  );
}
