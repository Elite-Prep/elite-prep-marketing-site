import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Elite Prep: Walk into your event ready. Track how you prepare and how you perform.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const root = process.cwd();
  const fontDir = (pkg: string) =>
    join(root, "node_modules", "@fontsource", pkg, "files");

  const [screenshotPng, anton400, manrope400, manrope500, manrope700] =
    await Promise.all([
      readFile(join(root, "public/app-screens/redesign/home.png")),
      readFile(join(fontDir("anton"), "anton-latin-400-normal.woff")),
      readFile(join(fontDir("manrope"), "manrope-latin-400-normal.woff")),
      readFile(join(fontDir("manrope"), "manrope-latin-500-normal.woff")),
      readFile(join(fontDir("manrope"), "manrope-latin-700-normal.woff")),
    ]);

  const screenshotSrc = `data:image/png;base64,${screenshotPng.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "#0A0B0D",
          fontFamily: "Manrope",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left: text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 40px 60px 80px",
            width: 740,
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <div style={{ width: 30, height: 12, borderRadius: 6, background: "#5EAEF0" }} />
              <div style={{ width: 41, height: 12, borderRadius: 6, background: "#FFFFFF" }} />
              <div style={{ width: 52, height: 12, borderRadius: 6, background: "#FFFFFF" }} />
            </div>
            <div style={{ display: "flex", gap: 14, fontFamily: "Anton", fontSize: 46, letterSpacing: "0.01em" }}>
              <span style={{ color: "#FFFFFF" }}>ELITE</span>
              <span style={{ color: "#5EAEF0" }}>PREP</span>
            </div>
          </div>

          <div
            style={{
              fontSize: 72,
              lineHeight: 1.08,
              color: "#FFFFFF",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              display: "flex",
              maxWidth: 580,
            }}
          >
            Walk into your event ready.
          </div>

          <div
            style={{
              fontSize: 26,
              color: "#C4C8D0",
              marginTop: 28,
              lineHeight: 1.4,
              display: "flex",
              maxWidth: 580,
              fontWeight: 400,
            }}
          >
            Track how you prepare and how you perform in one place.
          </div>

          <div
            style={{
              marginTop: 28,
              color: "#C4C8D0",
              fontSize: 20,
              fontWeight: 500,
              display: "flex",
            }}
          >
            14 days free. No credit card.
          </div>
        </div>

        {/* Right: phone mockup */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 1,
            paddingTop: 46,
            paddingRight: 60,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 360,
              height: 760,
              borderRadius: 40,
              background:
                "#1E2127",
              padding: 10,
              display: "flex",
              boxShadow:
                "0 40px 70px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 32,
                background: "#0A0B0D",
                overflow: "hidden",
                display: "flex",
                position: "relative",
              }}
            >
              <img
                src={screenshotSrc}
                width={340}
                height={739}
                alt=""
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Anton",
          data: anton400,
          style: "normal",
          weight: 400,
        },
        {
          name: "Manrope",
          data: manrope400,
          style: "normal",
          weight: 400,
        },
        {
          name: "Manrope",
          data: manrope500,
          style: "normal",
          weight: 500,
        },
        {
          name: "Manrope",
          data: manrope700,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
