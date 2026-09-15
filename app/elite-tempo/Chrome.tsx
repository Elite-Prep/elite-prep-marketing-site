import Link from "next/link";
import EliteTempoMark from "./EliteTempoMark";
import {
  ACCENT,
  APP_STORE_URL,
  BG,
  FAINT,
  HAIRLINE,
  INK,
  MUTED,
  ON_ACCENT,
  TRACKING_MARK,
  W_EMPHASIS,
  W_WORDMARK,
  etUrl,
} from "./theme";

/* Header, footer and page canvas shared by every Elite Tempo page except the
   landing page, which keeps its own copies because its header carries section
   anchors that only exist there.
 *
 * The wordmark links home from the library pages (it is a no-op on the landing
 * page, which is why that one is not shared): once there is more than one page,
 * the logo has to be the way back.
 */

/* The lockup: the ET mark, then ELITE TEMPO set in Avenir Next Bold.
 *
 * This replaces a wordmark that set the words in Anton with a gold beat-tick
 * equalizer between them — a motif that appears nowhere in the app, so the website
 * and the App Store listing were showing two different logos for the same product.
 *
 * Both words are INK. "TEMPO" used to be gold, which is the rule this palette
 * exists to enforce: gold is a field, and gold words next to white words read as
 * the less important half. In a two-word logotype that is actively wrong — it split
 * the mark into a bright half and a dim half.
 *
 * Tracking is 0.04em, the same 4%-of-size ratio the app spaces it at. */
export function Wordmark({ href }: { href?: string }) {
  const lockup = (
    <span className="flex items-center gap-2.5">
      <EliteTempoMark size={22} fill={ACCENT} />
      <span
        className="text-[19px] leading-none"
        style={{
          color: INK,
          fontWeight: W_WORDMARK,
          letterSpacing: TRACKING_MARK,
        }}
      >
        ELITE TEMPO
      </span>
    </span>
  );
  if (!href) return <span aria-label="Elite Tempo">{lockup}</span>;
  return (
    <Link href={href} aria-label="Elite Tempo home">
      {lockup}
    </Link>
  );
}

export function AppStoreButton({ label }: { label?: string }) {
  return (
    <a
      href={APP_STORE_URL}
      /* White, not black. Apple's guidelines offer both and ask for the white
         badge on dark backgrounds; the black one was 1.04:1 against this canvas,
         so only its border said "button". This is the one filled button on a
         page — the header CTA is outlined — which is the right hierarchy. */
      className="inline-flex items-center gap-2.5 rounded-xl px-5 py-3 transition duration-200 hover:scale-[1.03] active:scale-[0.98]"
      style={{ background: "#FFFFFF", color: ON_ACCENT }}
      aria-label={label ?? "Download Elite Tempo on the App Store"}
    >
      <svg width="22" height="26" viewBox="0 0 384 512" fill="currentColor" aria-hidden>
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
      </svg>
      <span className="text-left leading-none">
        <span className="block text-[11px] leading-tight opacity-90">Download on the</span>
        <span className="block text-[19px] font-semibold leading-tight tracking-tight">
          App Store
        </span>
      </span>
    </a>
  );
}

function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{ background: "rgba(34, 34, 34, 0.85)", borderBottom: `1px solid ${HAIRLINE}` }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Wordmark href="/elite-tempo" />
        <div className="flex items-center gap-8 sm:gap-10">
          <nav aria-label="Elite Tempo" className="hidden items-center gap-8 md:flex">
            <Link
              href="/elite-tempo/tempos"
              className="text-sm transition-colors duration-150 hover:text-[#B3ECFF]"
              style={{ color: INK, fontWeight: W_EMPHASIS }}
            >
              Tempo library
            </Link>
            <Link
              href="/elite-tempo#pricing"
              className="text-sm transition-colors duration-150 hover:text-[#B3ECFF]"
              style={{ color: INK, fontWeight: W_EMPHASIS }}
            >
              Pricing
            </Link>
            <Link
              href="/elite-tempo#faq"
              className="text-sm transition-colors duration-150 hover:text-[#B3ECFF]"
              style={{ color: INK, fontWeight: W_EMPHASIS }}
            >
              FAQs
            </Link>
          </nav>
          <a
            href={APP_STORE_URL}
            /* A gold FIELD with near-black ink, not a gold outline with gold text.
               The outlined version was gold-as-text twice over — border and label —
               which is the form the app measured as reading dimmer than the white
               nav links beside it. Flipped contrast makes it unambiguously the
               primary thing in the bar. */
            className="shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition duration-200 hover:brightness-[1.08] active:scale-[0.98]"
            style={{ background: ACCENT, color: ON_ACCENT, fontWeight: W_EMPHASIS }}
          >
            Try now for free
          </a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${HAIRLINE}` }}>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Wordmark href="/elite-tempo" />
          <nav
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
            style={{ color: MUTED }}
          >
            <Link href="/elite-tempo/tempos" className="transition-colors hover:text-[#B3ECFF]">
              Tempo library
            </Link>
            <Link href="/elite-tempo/how-we-time-swings" className="transition-colors hover:text-[#B3ECFF]">
              How we time swings
            </Link>
            <Link href="/elite-tempo/privacy" className="transition-colors hover:text-[#B3ECFF]">
              Privacy
            </Link>
            <Link href="/elite-tempo/terms" className="transition-colors hover:text-[#B3ECFF]">
              Terms
            </Link>
            <a href="mailto:ebusalacchi@eliteprep.app" className="transition-colors hover:text-[#B3ECFF]">
              Contact
            </a>
          </nav>
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed" style={{ color: FAINT }}>
          Part of the Elite Prep family. Elite Tempo references real golfers,
          tournaments, and shots for descriptive and educational purposes only, and
          is not affiliated with, sponsored by, or endorsed by any player,
          tournament, tour, or organization named in the app. All names and
          trademarks belong to their respective owners.
        </p>
        <p className="mt-4 text-xs" style={{ color: FAINT }}>
          © {new Date().getFullYear()} Elite Prep LLC.
        </p>
      </div>
    </footer>
  );
}

export default function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen flex-col"
      style={{ background: BG, color: INK }}
    >
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

/* A crumb trail, rendered and marked up. Google builds the grey path it shows
   above a result title from BreadcrumbList, and it is what stops 16 library pages
   from all printing the bare domain. */
export function Breadcrumbs({ trail }: { trail: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs" style={{ color: MUTED }}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((crumb, i) => (
          <li key={crumb.name} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-[#B3ECFF]">
                {crumb.name}
              </Link>
            ) : (
              <span aria-current="page">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function breadcrumbSchema(trail: { name: string; href?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      /* Crumb hrefs are still written as /elite-tempo/... because that is where the
         files live, but the PUBLISHED address is the new host with the prefix
         stripped. Building the item URL through etUrl keeps the markup pointing at
         the canonical address rather than the one the router happens to use. */
      ...(crumb.href
        ? { item: etUrl(crumb.href.replace(/^\/elite-tempo/, "") || "/") }
        : {}),
    })),
  };
}
