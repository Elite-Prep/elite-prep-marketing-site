import Link from "next/link";
import BeatTicks from "./BeatTicks";
import { ACCENT, CANVAS_BACKGROUND, FAINT, HAIRLINE, INK, MUTED, APP_STORE_URL } from "./theme";

/* Header, footer and page canvas shared by every Elite Tempo page except the
   landing page, which keeps its own copies because its header carries section
   anchors that only exist there.
 *
 * The wordmark links home from the library pages (it is a no-op on the landing
 * page, which is why that one is not shared): once there is more than one page,
 * the logo has to be the way back.
 */

export function Wordmark({ href }: { href?: string }) {
  const mark = (
    <span
      className="flex items-center gap-2"
      style={{ fontFamily: "var(--font-anton), sans-serif" }}
    >
      <span className="text-xl tracking-wide" style={{ color: INK }}>
        ELITE
      </span>
      <BeatTicks heights={[7, 12, 7, 17, 7, 12, 7]} barWidth={2.5} gap={2.5} />
      <span className="text-xl tracking-wide" style={{ color: ACCENT }}>
        TEMPO
      </span>
    </span>
  );
  if (!href) return <span aria-label="Elite Tempo">{mark}</span>;
  return (
    <Link href={href} aria-label="Elite Tempo home">
      {mark}
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
      style={{ background: "#FFFFFF", color: "#0B0B0C" }}
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
      style={{ background: "rgba(11, 11, 12, 0.85)", borderBottom: `1px solid ${HAIRLINE}` }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Wordmark href="/elite-tempo" />
        <div className="flex items-center gap-8 sm:gap-10">
          <nav aria-label="Elite Tempo" className="hidden items-center gap-8 md:flex">
            <Link
              href="/elite-tempo/tempos"
              className="text-sm font-bold transition-colors duration-150 hover:text-[#FFB300]"
              style={{ color: INK }}
            >
              Tempo library
            </Link>
            <Link
              href="/elite-tempo#pricing"
              className="text-sm font-bold transition-colors duration-150 hover:text-[#FFB300]"
              style={{ color: INK }}
            >
              Pricing
            </Link>
            <Link
              href="/elite-tempo#faq"
              className="text-sm font-bold transition-colors duration-150 hover:text-[#FFB300]"
              style={{ color: INK }}
            >
              FAQs
            </Link>
          </nav>
          <a
            href={APP_STORE_URL}
            className="shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-sm font-bold transition duration-200 hover:bg-[rgba(255,179,0,0.12)] active:scale-[0.98]"
            style={{ borderColor: ACCENT, color: ACCENT }}
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
            <Link href="/elite-tempo/tempos" className="hover:opacity-80">
              Tempo library
            </Link>
            <Link href="/elite-tempo/how-we-time-swings" className="hover:opacity-80">
              How we time swings
            </Link>
            <Link href="/elite-tempo/privacy" className="hover:opacity-80">
              Privacy
            </Link>
            <Link href="/elite-tempo/terms" className="hover:opacity-80">
              Terms
            </Link>
            <a href="mailto:ebusalacchi@eliteprep.app" className="hover:opacity-80">
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
      style={{ background: CANVAS_BACKGROUND, backgroundRepeat: "no-repeat", color: INK }}
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
              <Link href={crumb.href} className="hover:text-[#FFB300]">
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
      ...(crumb.href ? { item: `${"https://www.eliteprep.app"}${crumb.href}` } : {}),
    })),
  };
}
