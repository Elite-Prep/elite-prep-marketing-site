import type { Metadata, Viewport } from "next";
import { Manrope, Anton, Nunito_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { description } from "./seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

/* The Elite Tempo pages set everything in Avenir Next, which is preinstalled on
   iOS and macOS — so most visitors to a page about an iPhone app get the real
   typeface with nothing to download. This is the fallback for everyone else: the
   closest match on Google Fonts in proportion and x-height.

   Loaded here rather than in the Elite Tempo layout because `next/font` has to be
   called at module scope in a file that is not re-rendered. Only 400 and 600 are
   requested — the app's entire weight scale, and asking for more would ship bytes
   nothing is allowed to use. */
const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const SITE_URL = "https://www.eliteprep.app";
const SITE_TITLE = "Elite Prep — Know what to work on. Know it's working.";
/* 229 characters before this, so Google cut it around "track every round" and the
   payoff never appeared. The snippet now ends on the point. */
const SITE_DESCRIPTION = description(
  "The system competitive golfers use to prepare for every event: plan practice, build drills, track rounds shot-by-shot, and see the proof it is working.",
);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Elite Prep",
  openGraph: {
    type: "website",
    siteName: "Elite Prep",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#9ABBC6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${anton.variable} ${nunitoSans.variable} h-full`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-manrope), sans-serif" }}
      >
        {children}
        {/* The site had no analytics of any kind — no GA, no tag manager, no
            pixel — so nothing could answer "how many people saw this page and how
            many tapped Download". Vercel Web Analytics is cookieless and
            first-party, which is what lets the privacy policy keep promising no
            third-party tracking (see the Analytics section there); it needs no
            consent banner for that reason. It only reports once the toggle is on
            in the Vercel project's Analytics tab. */}
        <Analytics />
      </body>
    </html>
  );
}
