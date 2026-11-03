import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* The app's own icon, so the browser tab, the Google result and the home screen
   all show the same gold icon as the App Store. 180px: Google asks for a multiple
   of 48 for the favicon, and Apple uses 180 for the touch icon. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const png = readFileSync(join(process.cwd(), "public/elite-tempo/app-icon.png"));
  const src = `data:image/png;base64,${png.toString("base64")}`;
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} width={size.width} height={size.height} alt="" />
    ),
    { ...size },
  );
}
