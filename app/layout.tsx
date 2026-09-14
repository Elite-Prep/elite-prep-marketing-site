import type { Metadata, Viewport } from "next";
import { Manrope, Anton } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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

const SITE_URL = "https://www.eliteprep.app";
const SITE_TITLE = "Elite Prep — Know what to work on. Know it's working.";
const SITE_DESCRIPTION =
  "The complete system competitive golfers use to get ready for every event on their schedule. Plan your practice, build your own drills, track every round shot-by-shot, and see the proof your work is paying off. Starting with golf.";

/* Elite Tempo's App Store id. The Smart App Banner below is Safari-only and
   iOS-only, which is exactly the audience: a golfer who lands on a page about an
   iPhone app, from a phone, gets a one-tap install strip instead of having to
   find the badge further down the page. */
const ELITE_TEMPO_APP_ID = "6779226434";

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
  appleWebApp: { capable: false },
  other: {
    "apple-itunes-app": `app-id=${ELITE_TEMPO_APP_ID}`,
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
    <html lang="en" className={`${manrope.variable} ${anton.variable} h-full`}>
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
