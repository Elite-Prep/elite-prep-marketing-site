import Link from "next/link";
import EliteTempoMark from "./EliteTempoMark";
import { APP_STORE_URL, BG, FAINT, INK, MUTED, etUrl } from "./theme";

/* Header, footer and page frame shared by EVERY Elite Tempo page, the home page
 * included. The 2026-11-03 audit found three different designs on one site: the
 * home page in the new light look, the library pages in the older Avenir look with
 * a different header, and the legal pages in an older one still with the retired
 * gold logo and no header or footer at all. This file is now the only header and
 * footer, so they cannot drift apart again.
 *
 * Links are written as the PUBLISHED addresses (/tempos, not /elite-tempo/tempos).
 * The old prefixed form still works but answered every click with a redirect. */

/* Same word as the App Store badge on the page, so one action has one name. */
export const TRIAL_CTA = "Download app";

/* The pill header from the home page: the mark and name, the three places people
   look for, and the one button. Below md the library link moves to the footer;
   Pricing and FAQs stay, because a phone visitor looks for them first. */
export function SiteHeader() {
  return (
    <header className="flex justify-center px-4 pt-4">
      <div
        className="flex items-center gap-[clamp(4px,2vw,40px)] rounded-full py-[6px] pl-4 pr-[6px] md:pl-5"
        style={{ background: "rgba(255,255,255,0.78)" }}
      >
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2 no-underline"
          aria-label="Elite Tempo home"
          style={{ color: INK }}
        >
          <EliteTempoMark size={18} fill={INK} />
          <span className="whitespace-nowrap text-base font-semibold tracking-[0.02em]">
            Elite Tempo
          </span>
        </Link>
        {/* Pricing shows on every phone, FAQs from sm, the library link from md.
            The name always shows: on a 390 wide iPhone, name, Pricing and the button
            are all that fit. */}
        <nav aria-label="Main" className="flex items-center gap-0 md:gap-1">
          {[
            { label: "Tempo library", href: "/tempos", wide: "md" as const },
            { label: "Pricing", href: "/#pricing", wide: null },
            { label: "FAQs", href: "/faq", wide: "sm" as const },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`${l.wide === "md" ? "hidden md:inline-flex" : l.wide === "sm" ? "hidden sm:inline-flex" : "inline-flex"} min-h-11 items-center rounded-full px-2 text-[15px] font-medium no-underline transition-colors hover:bg-black/5 md:px-3`}
              style={{ color: INK }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <a
          href={APP_STORE_URL}
          className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-[18px] text-[15px] font-medium text-white no-underline transition hover:brightness-125"
          style={{ background: INK }}
        >
          {/* "Download" alone under 430 wide, so name, Pricing and the button fit a
              375 wide iPhone with room on both sides. Same verb as the App Store badge. */}
          <span className="min-[430px]:hidden">Download</span>
          <span className="hidden min-[430px]:inline">{TRIAL_CTA}</span>
        </a>
      </div>
    </header>
  );
}

export function SkipLink() {
  return (
    <a href="#content" className="et-skip">
      Skip to content
    </a>
  );
}

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Download app", href: APP_STORE_URL },
      { label: "Tempo library", href: "/tempos" },
      { label: "How we time swings", href: "/how-we-time-swings" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "vs Tour Tempo", href: "/vs/tour-tempo" },
      { label: "vs a metronome", href: "/vs/metronome" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact us", href: "mailto:ebusalacchi@eliteprep.app" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/elitetempogolf",
    icon: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM17.25 5.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/elitetempogolf/",
    icon: "M14 8h3V4h-3c-2.76 0-5 2.24-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.55.45-1 1-1Z",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@elitetempogolf",
    icon: "M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@elitetempo",
    icon: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z",
  },
];

/* Footer, structured like Bevel's: the mark and copyright, three short link
   columns, the social icons, then the legal line. Column titles and the legal line
   use FAINT, which now clears 4.5:1; the old #8A8B90 measured 3.1:1. */
export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-[1240px] px-4 pb-10 pt-[clamp(96px,12vw,160px)]">
      <div className="flex flex-wrap justify-between gap-x-16 gap-y-12">
        <div>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2.5 no-underline"
            style={{ color: INK }}
          >
            <EliteTempoMark size={22} fill={INK} />
            <span className="text-[20px] font-semibold leading-none tracking-[-0.01em]">
              Elite Tempo
            </span>
          </Link>
          <p className="mt-1 text-sm" style={{ color: FAINT }}>
            © {new Date().getFullYear()} Elite Prep Inc.
          </p>
          {/* Under the name, like Bevel's footer (2026-11-04): on their own row they
              floated in a wide empty band. */}
          <div className="-ml-2.5 mt-5 flex items-center gap-1">
            {SOCIALS.map((so) => (
              <a
                key={so.label}
                href={so.href}
                aria-label={`Elite Tempo on ${so.label}`}
                rel="noopener"
                target="_blank"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-black/5"
                style={{ color: INK }}
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d={so.icon} fillRule="evenodd" />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-3"
        >
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <p
                className="m-0 text-[16px] font-medium"
                style={{ color: FAINT }}
              >
                {col.title}
              </p>
              <ul className="m-0 mt-2 list-none p-0 text-[16px]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="inline-flex min-h-11 items-center no-underline hover:underline hover:underline-offset-4"
                      style={{ color: INK }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <p
        className="mt-8 max-w-[62em] text-[13px] leading-[1.5]"
        style={{ color: FAINT }}
      >
        Elite Tempo references real golfers, tournaments, and shots for
        descriptive and educational purposes only, and is not affiliated with,
        sponsored by, or endorsed by any player, tournament, tour, or
        organization named in the app. All names and trademarks belong to their
        respective owners.
      </p>
    </footer>
  );
}

/* Apple's own badge, unchanged from their badge tool. Its visible words are its
   accessible name, so a screen reader says what a sighted visitor reads. */
export function AppStoreButton({
  className = "",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={APP_STORE_URL}
      className={`inline-block rounded-[10px] transition duration-200 hover:brightness-95 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/elite-tempo/app-store-badge.svg"
        alt="Download on the App Store"
        width={168}
        height={56}
        className="block h-14 w-auto"
      />
    </a>
  );
}

/* The closing call to action on every inner page, in the home page's pricing look. */
export function TrialCard({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      className="mt-16 rounded-[28px] px-[clamp(24px,5vw,56px)] py-[clamp(36px,6vw,64px)] text-center"
      style={{
        background:
          "radial-gradient(70% 100% at 50% 100%, #F9C832 0%, rgba(249, 200, 50, 0) 75%), #FFFCF0",
      }}
    >
      <h2
        className="m-0 text-[clamp(28px,4vw,40px)] font-semibold leading-[1.1] tracking-[-0.02em]"
        style={{ color: INK, textWrap: "balance" }}
      >
        {title}
      </h2>
      <p
        className="mx-auto mt-3 max-w-[30em] text-[17px] leading-[1.5]"
        style={{ color: "#4A4B50" }}
      >
        {children}
      </p>
      <AppStoreButton className="mt-7" />
    </section>
  );
}

export default function Chrome({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-screen flex-col antialiased"
      style={{ background: BG, color: INK }}
    >
      <SkipLink />
      <SiteHeader />
      <main id="content" className="et-prose flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

/* A crumb trail, rendered and marked up. Google builds the grey path it shows
   above a result title from BreadcrumbList. */
export function Breadcrumbs({
  trail,
}: {
  trail: { name: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[14px]"
      style={{ color: MUTED }}
    >
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
        {trail.map((crumb, i) => (
          <li key={crumb.name} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden>/</span>}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="inline-flex min-h-11 items-center px-1 underline-offset-4 hover:underline"
              >
                {crumb.name}
              </Link>
            ) : (
              <span aria-current="page" className="px-1">
                {crumb.name}
              </span>
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
      ...(crumb.href
        ? { item: etUrl(crumb.href.replace(/^\/elite-tempo/, "") || "/") }
        : {}),
    })),
  };
}
