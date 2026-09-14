import { ImageResponse } from "next/og";

/* 192, not 512. Google's favicon guidance asks for a multiple of 48px square
   (48, 96, 144, 192…) and 512 is not one — 512 ÷ 48 is 10.67. Google will usually
   resize anyway, but the favicon is the one image that appears beside the result
   on every search, so it is worth meeting the documented requirement rather than
   relying on it being forgiving. 192 is 4 × 48 and still sharp on a hidpi tab. */
export const size = { width: 192, height: 192 };
export const contentType = "image/png";

// Elite Prep mark: white "building" bars on the steel-blue tile.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4A9AC5 0%, #2C6E92 100%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 34 }}>
          <div style={{ width: 168, height: 58, borderRadius: 29, background: "#fff" }} />
          <div style={{ width: 234, height: 58, borderRadius: 29, background: "#fff" }} />
          <div style={{ width: 300, height: 58, borderRadius: 29, background: "#fff" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
