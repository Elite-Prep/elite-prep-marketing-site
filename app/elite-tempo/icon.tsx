import { ImageResponse } from "next/og";
import { ACCENT, BG } from "./theme";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

// Elite Tempo mark: gold beat-tick equalizer on near-black, the brand motif.
export default function Icon() {
  const bars = [150, 250, 366, 250, 150];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          background: BG,
        }}
      >
        {bars.map((h, i) => (
          <div key={i} style={{ width: 50, height: h, borderRadius: 26, background: ACCENT }} />
        ))}
      </div>
    ),
    { ...size }
  );
}
