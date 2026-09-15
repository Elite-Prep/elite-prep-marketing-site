import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Trophy, User, Check, X } from "lucide-react";
import HeroCarousel from "./components/HeroCarousel";
import Logo from "./components/Logo";
import FeatureShowcase from "./components/FeatureShowcase";
import Reveal from "./components/Reveal";
import {
  HERO_SWING,
  SWINGS,
  fmtRatio,
  fmtSeconds,
} from "./elite-tempo/data/tempo-data";

const LOGIN_URL = "https://app.eliteprep.app/login";
// Conversion CTAs ("Try free for 14 days", "Start free trial", "Sign up")
// land on /signup — the auth-method chooser (email / Google / Apple).
//
// 2026-05-15: changed from /billing back to /signup. The app shipped the
// magic-moment onboarding reorder — a new visitor now goes
// signup → role → tier → handicap → readiness-preview → paywall, so the
// paywall comes AFTER the user has seen their personalized readiness
// score. Pointing the marketing CTA at /billing sent cold visitors
// straight to the paywall, skipping signup and the whole onboarding /
// preview flow. /signup is the correct entry point for the new funnel.
const SIGNUP_URL = "https://app.eliteprep.app/signup";

const PAGE_BG = "#111112";
/* Was #2a2a2c, only 1.32:1 against PAGE_BG, so card edges barely existed.
   #3a3a41 measures 1.67:1, matching the relationship the Elite Tempo page now
   has after aligning to Theme.swift. Body text was measured and left alone:
   TEXT_BODY is 9.0:1 and TEXT_HEAD 16.6:1, both well clear of WCAG AA. */
const CARD_BORDER = "#3a3a41";
const TEXT_HEAD = "#f0f0f0";
const TEXT_BODY = "#b3b3b3";
const BRAND = "#9ABBC6";
const BRAND_DIM = "rgba(154,187,198,0.12)";

// Soft section transitions — these replace hard 1px borders so adjacent
// sections bleed into each other with a brand-tinted glow instead of a
// hard seam. Used as background layers (stack on top of the section bg).
const SECTION_TOP_HALO =
  "radial-gradient(ellipse 90% 30% at 50% 0%, rgba(154,187,198,0.07) 0%, transparent 70%)";
const SECTION_BOTTOM_HALO =
  "radial-gradient(ellipse 90% 30% at 50% 100%, rgba(154,187,198,0.05) 0%, transparent 70%)";

// Premium card chrome — gradient fill + top edge highlight + bottom inner
// shadow + soft drop shadow. Makes feature cards feel like physical objects
// catching light, not flat bordered rectangles.
const PREMIUM_CARD_BG =
  "linear-gradient(180deg, #1d1d20 0%, #161618 100%)";
const PREMIUM_CARD_SHADOW = [
  "inset 0 1px 0 rgba(255,255,255,0.06)",
  "inset 0 -1px 1px rgba(0,0,0,0.35)",
  "0 14px 32px -10px rgba(0,0,0,0.5)",
].join(", ");
const PREMIUM_CARD_SHADOW_BRAND = [
  "inset 0 1px 0 rgba(154,187,198,0.15)",
  "inset 0 -1px 1px rgba(0,0,0,0.35)",
  "0 14px 32px -10px rgba(0,0,0,0.5)",
  "0 0 0 1px rgba(154,187,198,0.25)",
].join(", ");

/* Who this site belongs to, in a form a search engine can resolve.
 *
 * The homepage carried no structured data at all, which is why results for it
 * print a bare blue link: with no Organization there is no logo beside the
 * result and nothing for a knowledge panel to attach to, and with no WebSite
 * there is no sitelinks search box. `sameAs` is what ties this domain to the
 * App Store listings, so the site and the apps resolve as one entity rather
 * than three unrelated things with similar names.
 *
 * Sitelinks themselves are earned, not declared — Google builds them from site
 * structure and branded search volume. This is the half that can be declared. */
const SITE_URL = "https://www.eliteprep.app";

/* eliteprep.app redirects to www.eliteprep.app, so both spellings can end up in
   an index pointing at the same page. A canonical says which one counts. Set here
   rather than in the root layout on purpose: a canonical in the layout would
   apply "/" to every page that does not override it, quietly telling Google that
   /privacy and /terms are duplicates of the homepage. */
export const metadata = {
  alternates: { canonical: "/" },
};

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Elite Prep, LLC",
      alternateName: "Elite Prep",
      url: SITE_URL,
      logo: `${SITE_URL}/icon`,
      description:
        "Elite Prep builds practice and performance tools for competitive golfers, including Elite Tempo, a golf swing tempo and timing trainer for iPhone.",
      email: "ebusalacchi@eliteprep.app",
      sameAs: ["https://apps.apple.com/app/elite-tempo/id6779226434"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Elite Prep",
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function Page() {
  return (
    <main className="flex-1" style={{ background: PAGE_BG }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />
      <TopNav />
      <Hero />
      <Thesis />
      <MantraBand />
      <Pillars />
      <FeatureDetail />
      <WhyElitePrep />
      <WhoItsFor />
      <CtaBand />
      <Footer />
    </main>
  );
}

/* Section links for the sticky header. Order matches the page. */
const HOME_SECTIONS = [
  { id: "pillars", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "why", label: "Why Elite Prep" },
];

function TopNav() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        background: "rgba(17, 17, 18, 0.85)",
        borderBottom: `1px solid ${CARD_BORDER}`,
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Elite Prep home" className="shrink-0 inline-flex items-center min-h-[44px]">
          <span className="sm:hidden"><Logo width={120} /></span>
          <span className="hidden sm:inline-flex"><Logo width={140} /></span>
        </Link>
        {/* Section links, ReciMe style. Hidden below lg so they never crowd
            Log in / Sign up, which are the actions that matter on a phone. */}
        <nav aria-label="Page sections" className="ml-auto mr-8 hidden items-center gap-8 lg:flex">
          {HOME_SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm font-medium transition-colors duration-150"
              style={{ color: TEXT_HEAD }}
            >
              {label}
            </a>
          ))}
        </nav>
        <nav className="flex items-center gap-2 sm:gap-3">
          <a
            href={LOGIN_URL}
            className="inline-flex min-h-[44px] items-center px-3 text-sm font-medium"
            style={{ color: TEXT_BODY }}
          >
            Log in
          </a>
          {/* Nav Sign up is the SECONDARY brand surface. Filled brand-gradient
              is reserved for in-content primary CTAs (hero, CtaBand) so the
              top-right button doesn't compete for the same eye-stop. Brand
              border keeps the wordmark in dialogue without shouting. */}
          <a
            href={SIGNUP_URL}
            className="inline-flex min-h-[44px] items-center rounded-full border px-4 sm:px-5 text-sm font-semibold transition-colors hover:bg-white/5"
            style={{ borderColor: BRAND, color: TEXT_HEAD }}
          >
            Sign up
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroCarousel />
      {/* Mobile: stronger top+bottom letterbox so copy reads everywhere */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 md:hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* Desktop: lighter, left-darker so the figure stays bright on the right */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden md:block"
        style={{
          background: [
            "linear-gradient(90deg, rgba(17,17,18,0.65) 0%, rgba(17,17,18,0.35) 40%, rgba(17,17,18,0.10) 75%, rgba(17,17,18,0.05) 100%)",
            "linear-gradient(180deg, rgba(17,17,18,0.20) 0%, rgba(17,17,18,0.40) 50%, rgba(17,17,18,0.92) 100%)",
          ].join(", "),
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col justify-start md:justify-center px-6 pb-24 pt-24 sm:pt-32 min-h-[600px] sm:min-h-[680px] lg:min-h-[760px]">
        <div className="max-w-3xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm"
            style={{ color: BRAND, textShadow: "0 1px 8px rgba(0,0,0,0.5)" }}
          >
            The prep app for competitive golfers
          </p>
          <h1
            className="text-5xl leading-[0.95] sm:text-6xl lg:text-[72px]"
            style={{
              color: TEXT_HEAD,
              fontFamily: "var(--font-anton), sans-serif",
              textTransform: "uppercase",
              fontWeight: 400,
              letterSpacing: "0",
              textShadow: "0 2px 30px rgba(0,0,0,0.55)",
            }}
          >
            Every rep. Every round. Every event. One system.
          </h1>
          <p
            className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
            style={{
              color: "#d8d8da",
              textShadow: "0 1px 12px rgba(0,0,0,0.5)",
            }}
          >
            Track your <span style={{ color: TEXT_HEAD }}>practice</span>, track
            your <span style={{ color: TEXT_HEAD }}>rounds</span>, and see how they
            connect. It all builds into a repeatable{" "}
            <span style={{ color: TEXT_HEAD }}>system</span> that gets you the most
            prepared for every event.
          </p>
          {/* Hero text budget: H1 + subhead + CTA group (with pricing +
              positioning under it as one block). Trust strip used to be a
              separate visual stop below; consolidated into the CTA group so
              the eye reads one decision area, not three. */}
          <div className="mt-8 md:mt-10">
            <a
              href={SIGNUP_URL}
              className="cta-glow inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold md:px-8 md:py-4 md:text-lg"
              style={{ background: "#ffffff", color: "#111112" }}
            >
              Start free <ArrowRight className="h-4 w-4" />
            </a>
            <p
              className="mt-3 text-xs md:text-sm"
              style={{ color: "#bdbdc0" }}
            >
              Then $24.99/month. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section
      style={{
        background: `
          ${SECTION_TOP_HALO},
          ${SECTION_BOTTOM_HALO},
          radial-gradient(ellipse at top, rgba(154,187,198,0.08) 0%, transparent 60%),
          #0d0d0e
        `,
      }}
    >
      <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32">
        <Reveal>
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-6"
            style={{ color: BRAND }}
          >
            What we believe
          </p>
          <h2
            className="text-2xl font-semibold leading-[1.15] tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ color: TEXT_HEAD, fontFamily: "var(--font-manrope), sans-serif" }}
          >
            Golf is played on the course.
            <br />
            <span style={{ fontStyle: "italic" }}>It&rsquo;s won off it.</span>
          </h2>
          <p
            className="mx-auto mt-8 max-w-2xl text-left text-base leading-relaxed sm:text-lg"
            style={{ color: TEXT_BODY }}
          >
            Most of your game gets built in the hours nobody tracks: the range
            sessions, the short-game grind, the practice rounds, the work with
            your coach. That&rsquo;s where the real work is. And until now it
            lived in five different places, or nowhere at all.
          </p>
          <p
            className="mx-auto mt-10 max-w-2xl text-lg sm:text-xl"
            style={{
              color: TEXT_HEAD,
              fontFamily: "var(--font-manrope), sans-serif",
              fontStyle: "italic",
            }}
          >
            Elite Prep is one system for all of it: the prep a competitive
            golfer built to stay ready, now an app you can run.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section id="pillars"
      style={{
        background: `
          ${SECTION_TOP_HALO},
          ${SECTION_BOTTOM_HALO},
          #0d0d0e
        `,
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <Reveal>
          <div className="mb-10 max-w-2xl">
            <p
              className="text-xs font-semibold tracking-wider uppercase"
              style={{ color: BRAND }}
            >
              How it works
            </p>
            <h2
              className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl"
              style={{ color: TEXT_HEAD, fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Your season, end to end.
            </h2>
          </div>
        </Reveal>

        <FeatureShowcase />
      </div>
    </section>
  );
}

const DETAIL_GROUPS: { tag: string; title: string; items: string[] }[] = [
  {
    tag: "01 / Plan",
    title: "Set goals and plan your season",
    items: [
      "Set your goal",
      "Full event schedule, with countdowns",
      "Build your own drills and sessions",
      "Curated Pro Drills library",
    ],
  },
  {
    tag: "02 / Train",
    title: "Build and run your practice",
    items: [
      "AI builds a session from your time and facilities",
      "Live timer with drill-by-drill callouts",
      "Import drills from text, photo, or video",
      "Log practice and training",
    ],
  },
  {
    tag: "03 / Play",
    title: "Track every round in depth",
    items: [
      "Game-day rounds, practice rounds, and practice",
      "Shot by shot, mapped with GPS",
      "Strokes Gained vs Tour, scratch, or handicap",
      "Fairways, greens, putts, penalties",
    ],
  },
  {
    tag: "04 / Reflect",
    title: "Journal, mind, and technique",
    items: [
      "Journal your sessions and rounds",
      "Mental check-ins",
      "Technique log your coach can write to",
      "Your record, over time",
    ],
  },
  {
    tag: "05 / Prove",
    title: "Prove the work is working",
    items: [
      "Your practice next to your performance",
      "See which work moves your scores",
      "Know what to shift reps toward",
    ],
  },
  {
    tag: "06 / Together",
    title: "Coach and community",
    items: [
      "See who else is putting in the work",
      "Follow, like, and comment",
      "Leaderboards for volume and consistency",
      "Connect your coach for assigned work",
    ],
  },
];

function MantraBand() {
  const words = ["Practice", "Play", "Compete", "Learn", "Repeat"];
  return (
    <section id="mantra"
      aria-label="Practice. Play. Compete. Learn. Repeat."
      style={{
        background: "#0d0d0e",
        borderTop: `1px solid ${CARD_BORDER}`,
        borderBottom: `1px solid ${CARD_BORDER}`,
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-6 py-12 sm:py-14">
        {words.map((w, i) => (
          <span key={w} className="flex items-center gap-x-5">
            <span
              className="text-xl sm:text-2xl lg:text-3xl"
              style={{
                fontFamily: "var(--font-anton), sans-serif",
                textTransform: "uppercase",
                color: TEXT_HEAD,
                letterSpacing: "0.04em",
              }}
            >
              {w}
            </span>
            {i < words.length - 1 && (
              <span
                aria-hidden
                className="text-sm sm:text-base"
                style={{ color: BRAND }}
              >
                ●
              </span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}

function FeatureDetail() {
  return (
    <section id="features" style={{ background: PAGE_BG }}>
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p
              className="text-xs font-semibold tracking-wider uppercase"
              style={{ color: BRAND }}
            >
              The full system
            </p>
            <h2
              className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl"
              style={{ color: TEXT_HEAD, fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Everything it does.
            </h2>
          </div>
        </Reveal>
        <div>
          {DETAIL_GROUPS.map((g, i) => (
            <Reveal key={g.tag} delay={(i % 3) * 0.12}>
              <div
                className="grid gap-6 border-t py-10 md:grid-cols-[260px_1fr]"
                style={{ borderColor: CARD_BORDER }}
              >
                <div>
                  <p
                    className="text-xs font-semibold tracking-wider uppercase"
                    style={{ color: BRAND }}
                  >
                    {g.tag}
                  </p>
                  <h3
                    className="mt-2 text-2xl leading-tight"
                    style={{
                      color: TEXT_HEAD,
                      fontFamily: "var(--font-anton), sans-serif",
                      textTransform: "uppercase",
                    }}
                  >
                    {g.title}
                  </h3>
                </div>
                <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-3 text-sm sm:text-base"
                      style={{ color: TEXT_HEAD }}
                    >
                      <Check
                        size={16}
                        color={BRAND}
                        strokeWidth={2.5}
                        className="mt-1 shrink-0"
                      />
                      <span style={{ color: TEXT_BODY }}>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyElitePrep() {
  type CompareValue = true | false;
  const competitors: { name: string; sub: string; primary?: boolean }[] = [
    { name: "Elite Prep", sub: "Event-Anchored", primary: true },
    { name: "Stat Trackers", sub: "Shot & Round Data" },
    { name: "Coaching Apps", sub: "Video & Comms" },
    { name: "Wearables", sub: "Recovery & Sleep" },
  ];
  const rows: { feature: string; marks: CompareValue[] }[] = [
    { feature: "Organizes around your event calendar", marks: [true, false, false, false] },
    { feature: "Builds your practice sessions for you", marks: [true, false, false, false] },
    { feature: "Build your own drills & sessions", marks: [true, false, true, false] },
    { feature: "Shot-by-shot rounds with Strokes Gained", marks: [true, true, false, false] },
    { feature: "Game-day, practice rounds & practice in one place", marks: [true, true, false, false] },
    { feature: "Captures how practice felt (journal + mental)", marks: [true, false, false, false] },
    { feature: "Connects your practice to your results", marks: [true, false, false, false] },
    { feature: "Coach sees training between lessons", marks: [true, false, true, false] },
    { feature: "Tracks recovery and sleep", marks: [false, false, false, true] },
  ];
  return (
    <section id="why"
      style={{
        background: `
          ${SECTION_TOP_HALO},
          ${SECTION_BOTTOM_HALO},
          ${PAGE_BG}
        `,
      }}
    >
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="mb-12 max-w-3xl">
          <p
            className="text-xs font-semibold tracking-wider uppercase mb-3"
            style={{ color: BRAND }}
          >
            How Elite Prep compares
          </p>
          <h2
            className="text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: TEXT_HEAD, fontFamily: "var(--font-manrope), sans-serif" }}
          >
            Built for the work{" "}
            <span style={{ color: BRAND, fontStyle: "italic" }}>between events.</span>
          </h2>
          <p
            className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: TEXT_BODY }}
          >
            Recovery trackers grade your sleep. Stat trackers grade the round
            you already played. Elite Prep owns the part that decides the
            outcome: the work between events, and the proof it&rsquo;s working.
          </p>
        </div>
      </Reveal>

      <Reveal>
      <div
        className="md:hidden rounded-2xl border overflow-x-clip"
        style={{
          borderColor: CARD_BORDER,
          background: PREMIUM_CARD_BG,
          boxShadow: PREMIUM_CARD_SHADOW,
        }}
      >
        <table className="w-full border-collapse table-fixed">
          <colgroup>
            <col style={{ width: "24%" }} />
            <col style={{ width: "19%" }} />
            <col style={{ width: "19%" }} />
            <col style={{ width: "19%" }} />
            <col style={{ width: "19%" }} />
          </colgroup>
          {/* Sticky thead so column identity stays anchored while scrolling
              the 10-row table. Site header is ~73px, so we offset under it.
              Each <th> needs an opaque background or rows scroll through. */}
          <thead>
            <tr>
              <th
                className="sticky top-[73px] z-10 px-2 py-3 text-left"
                style={{ background: "#161618" }}
              />
              {competitors.map((c) => (
                <th
                  key={c.name}
                  className="sticky top-[73px] z-10 px-1 py-3 text-center align-bottom"
                  style={{
                    background: c.primary
                      ? // Primary column: tinted brand bg layered over opaque card bg
                        "linear-gradient(rgba(154,187,198,0.12), rgba(154,187,198,0.12)), #161618"
                      : "#161618",
                    borderBottom: `2px solid ${c.primary ? BRAND : CARD_BORDER}`,
                  }}
                >
                  <div
                    className="text-[10px] font-semibold leading-[1.15] tracking-[-0.01em]"
                    style={{
                      color: c.primary ? BRAND : TEXT_HEAD,
                      fontFamily: "var(--font-manrope), sans-serif",
                    }}
                  >
                    {c.name}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.feature}>
                <td
                  className="px-2 py-3 text-left text-[11px] leading-snug"
                  style={{
                    color: TEXT_HEAD,
                    borderTop: `1px solid ${CARD_BORDER}`,
                  }}
                >
                  {r.feature}
                </td>
                {r.marks.map((m, ci) => (
                  <td
                    key={ci}
                    className="px-0 py-3 text-center"
                    style={{
                      background:
                        ci === 0 ? "rgba(154,187,198,0.06)" : "transparent",
                      borderTop: `1px solid ${CARD_BORDER}`,
                    }}
                  >
                    <CompareMark value={m} size="sm" isPrimary={ci === 0} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Reveal>

      <Reveal>
      <div
        className="hidden md:block overflow-x-auto rounded-2xl border"
        style={{
          borderColor: CARD_BORDER,
          background: PREMIUM_CARD_BG,
          boxShadow: PREMIUM_CARD_SHADOW,
        }}
      >
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th className="w-[34%] px-6 py-5 text-left" />
              {competitors.map((c) => (
                <th
                  key={c.name}
                  className="px-3 py-5 text-center align-bottom"
                  style={{
                    background: c.primary
                      ? "rgba(154,187,198,0.12)"
                      : "transparent",
                    borderBottom: `2px solid ${c.primary ? BRAND : CARD_BORDER}`,
                  }}
                >
                  <div
                    className="text-sm font-semibold sm:text-base"
                    style={{
                      color: c.primary ? BRAND : TEXT_HEAD,
                      fontFamily: "var(--font-manrope), sans-serif",
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    className="mt-1 text-[10px] font-medium uppercase tracking-[0.1em]"
                    style={{ color: TEXT_BODY }}
                  >
                    {c.sub}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.feature}>
                <td
                  className="px-6 py-4 text-left text-sm sm:text-base"
                  style={{
                    color: TEXT_HEAD,
                    borderTop: `1px solid ${CARD_BORDER}`,
                  }}
                >
                  {r.feature}
                </td>
                {r.marks.map((m, ci) => (
                  <td
                    key={ci}
                    className="px-3 py-4 text-center"
                    style={{
                      background:
                        ci === 0 ? "rgba(154,187,198,0.06)" : "transparent",
                      borderTop: `1px solid ${CARD_BORDER}`,
                    }}
                  >
                    <CompareMark value={m} isPrimary={ci === 0} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </Reveal>

    </div>
    </section>
  );
}

function CompareMark({
  value,
  size = "md",
  isPrimary = false,
}: {
  value: true | false;
  size?: "sm" | "md";
  isPrimary?: boolean;
}) {
  const box = size === "sm" ? "h-5 w-5" : "h-7 w-7";
  const icon = size === "sm" ? 10 : 14;
  const glowRadius = size === "sm" ? 10 : 16;

  if (value === true && isPrimary) {
    // Elite Prep column — lit, high-contrast glow. The mark is the
    // visual anchor of the table: eye lands on the glow before reading.
    return (
      <span
        className={`inline-flex ${box} items-center justify-center rounded-md`}
        style={{
          background: BRAND,
          color: "#0a0f14",
          boxShadow: [
            `0 0 0 ${size === "sm" ? 2 : 3}px rgba(154,187,198,0.22)`,
            `0 0 ${glowRadius}px 1px rgba(154,187,198,0.55)`,
            "inset 0 1px 0 rgba(255,255,255,0.35)",
          ].join(", "),
        }}
        aria-label="Yes"
      >
        <Check size={icon} strokeWidth={3} />
      </span>
    );
  }

  if (value === true) {
    // Competitor column — yes but not lit. Readable, intentionally
    // outshone by the Elite Prep column on the same row.
    return (
      <span
        className={`inline-flex ${box} items-center justify-center rounded-md`}
        style={{
          background: "rgba(255,255,255,0.05)",
          color: TEXT_BODY,
          border: `1px solid ${CARD_BORDER}`,
        }}
        aria-label="Yes"
      >
        <Check size={icon} strokeWidth={2.25} />
      </span>
    );
  }

  // No — dim grey X. Pulled darker than before so the row's eye-line
  // is unambiguously on the lit Elite Prep mark.
  return (
    <span
      className={`inline-flex ${box} items-center justify-center rounded-md`}
      style={{ color: "#48484c", border: "1px solid rgba(58,58,62,0.6)" }}
      aria-label="No"
    >
      <X size={icon} strokeWidth={2.25} />
    </span>
  );
}

function WhoItsFor() {
  return (
    <section id="who"
      style={{
        background: `
          ${SECTION_TOP_HALO},
          ${SECTION_BOTTOM_HALO},
          ${PAGE_BG}
        `,
      }}
    >
    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <Reveal>
        <div className="mb-12 max-w-2xl">
          <p
            className="text-xs font-semibold tracking-wider uppercase mb-3"
            style={{ color: BRAND }}
          >
            Who it's for
          </p>
          <h2
            className="text-3xl font-semibold leading-tight sm:text-4xl"
            style={{ color: TEXT_HEAD, fontFamily: "var(--font-manrope), sans-serif" }}
          >
            For athletes who take the work seriously
            <br />and the coaches in their corner.
          </h2>
        </div>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-2">
        <Reveal delay={0}>
          <Audience
            Icon={Trophy}
            title="Individual athletes"
            body="Junior, collegiate, amateur, pro. Anyone who cares about the work between events. Walk into every event knowing you put in the right prep."
            primary
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Audience
            Icon={User}
            title="Individual coaches"
            body="The gap between lessons stops being a black box. Every practice, training block, and competitive rep: logged, scored, and shared with you."
            primary
          />
        </Reveal>
      </div>
    </div>
    </section>
  );
}

function Audience({
  Icon,
  title,
  body,
  primary,
}: {
  Icon: typeof Trophy;
  title: string;
  body: string;
  primary?: boolean;
}) {
  return (
    <div
      className="rounded-3xl border p-8"
      style={{
        borderColor: primary ? "rgba(154,187,198,0.35)" : CARD_BORDER,
        background: PREMIUM_CARD_BG,
        boxShadow: primary ? PREMIUM_CARD_SHADOW_BRAND : PREMIUM_CARD_SHADOW,
      }}
    >
      <div
        className="flex h-11 w-11 items-center justify-center rounded-2xl mb-5"
        style={{ background: BRAND_DIM }}
      >
        <Icon size={20} color={BRAND} strokeWidth={1.75} />
      </div>
      <h3
        className="text-xl font-semibold sm:text-2xl"
        style={{ color: TEXT_HEAD, fontFamily: "var(--font-manrope), sans-serif" }}
      >
        {title}
      </h3>
      <p
        className="mt-3 text-sm leading-relaxed sm:text-base"
        style={{ color: TEXT_BODY }}
      >
        {body}
      </p>
    </div>
  );
}

function CtaBand() {
  return (
    <section id="get-started" className="relative overflow-hidden">
      {/* Image bookend with the hero shot, heavily darkened so it reads as
          atmosphere behind the finale (not a literal repeat). */}
      <Image
        src="/hero/tee-shot-c.jpg"
        alt=""
        aria-hidden
        fill
        className="object-cover object-[center_60%]"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(13,13,14,0.88) 0%, rgba(13,13,14,0.74) 45%, rgba(13,13,14,0.94) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 py-28 text-center sm:py-36">
        <Reveal>
          <p
            className="text-xs font-semibold tracking-wider uppercase"
            style={{ color: BRAND }}
          >
            Your season starts now
          </p>
          <h2
            className="mt-4 text-4xl leading-[1.02] sm:text-5xl lg:text-6xl"
            style={{
              color: TEXT_HEAD,
              fontFamily: "var(--font-anton), sans-serif",
              textTransform: "uppercase",
              textShadow: "0 2px 30px rgba(0,0,0,0.5)",
            }}
          >
            Know what to work on.
            <br />
            Know it&rsquo;s working.
          </h2>
          <div className="mt-9 flex justify-center">
            <a
              href={SIGNUP_URL}
              className="cta-glow inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-semibold"
              style={{ background: "#ffffff", color: "#111112" }}
            >
              Start free <ArrowRight className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-5 text-sm" style={{ color: TEXT_BODY }}>
            14 days free, then $24.99/mo. Cancel anytime.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="mx-auto max-w-6xl px-6 py-10"
      style={{ borderTop: `1px solid ${CARD_BORDER}` }}
    >
      <div className="flex flex-row items-center justify-between gap-4">
        <Logo width={90} showBeta={false} />
        <div
          className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-xs sm:text-sm"
          style={{ color: TEXT_BODY }}
        >
          <Link
            href="/privacy"
            className="inline-flex min-h-[44px] items-center px-1 hover:opacity-80"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="inline-flex min-h-[44px] items-center px-1 hover:opacity-80"
          >
            Terms
          </Link>
          {/* The one link from here to Elite Tempo, and it is here for a specific
              reason: elitetempo.app launched with no backlinks at all, and this is
              a domain Google already crawls. A single link from an indexed site is
              one of the only signals a new domain has on day one.

              Deliberately a plain footer line rather than the homepage section that
              used to sit above the comparison table — Elite Prep is not a shipped
              product and has no business marketing one. */}
          <a
            href="https://elitetempo.app"
            className="inline-flex min-h-[44px] items-center px-1 hover:opacity-80"
          >
            Elite Tempo
          </a>
          <span style={{ color: TEXT_BODY }}>
            © {new Date().getFullYear()} Elite Prep Inc.
          </span>
        </div>
      </div>
    </footer>
  );
}
