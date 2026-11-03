import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import DarkTimingPlayer, { type DarkShot } from "./DarkTimingPlayer";
import LottieLoop from "./LottieLoop";
import PlayInView from "./PlayInView";
import HeroCarousel from "./HeroCarousel";
import { SPEEDS, TIMER_SCALE_S, routineScene, speedScene, timerScene } from "./motion/scenes";
import {
  GREATS_ROWS,
  HERO_SWING,
  SWINGS,
  TIMING_BY_AREA,
  fmtRatio,
  fmtSeconds,
} from "./data/tempo-data";
import {
  PRICE_MONTHLY,
  PRICE_YEARLY,
  PRICE_YEARLY_NUM,
  TRIAL_DAYS,
} from "./data/pricing";
import EliteTempoMark from "./EliteTempoMark";
import {
  ACCENT,
  ACCENT_ALT,
  APP_STORE_URL,
  BG,
  CARD,
  FONT_NUMERALS,
  HAIRLINE,
  INK,
  MUTED,
  ON_ACCENT,
  TRACKING_MARK,
  W_WORDMARK,
  etUrl,
} from "./theme";
import { description } from "../seo";

/* Palette and App Store URL come from `theme`; see that module for the contrast
   measurements behind each token. */

/* Prices, trial length and the saving badge now live in `data/pricing`, shared with
   the Open Graph card — which had its own hardcoded copy of the same sentence and
   was still advertising a 7-day trial at $19.99/yr plus a retired lifetime unlock. */

/* The <title> is what Google prints as the blue link, so it names the category
   rather than leading with the tagline. The tagline still carries the social cards
   and the on-page <h1>, where it does the persuading. */
export const metadata: Metadata = {
  title: "Elite Tempo | Golf Swing Tempo Trainer for iPhone",
  /* Kept under the limit the way Google actually reads it: the strongest specific
     fact first, because the tail is what gets cut when a phone shows less. */
  description: description(
    `Golf swing tempo trainer for iPhone. Match ${SWINGS.length} tour swings hand-timed to 1/100s, then record your own and get your exact ratio. Free for ${TRIAL_DAYS} days.`,
  ),
  alternates: { canonical: etUrl() },
  keywords: [
    "golf swing tempo",
    "golf tempo trainer",
    "tour tempo",
    "swing tempo app",
    "golf metronome",
    "3 to 1 tempo ratio",
  ],
  openGraph: {
    title: "Elite Tempo. Time your entire game from routine to impact.",
    description:
      `Golf tempo, timed by hand to 1/100s. Film your own swing, mark takeaway, top and impact on a frame-accurate scrubber, and get your four numbers. Train hands-free with beats in your headphones. Free for ${TRIAL_DAYS} days, then ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Tempo. Time your entire game from routine to impact.",
    description: `Golf tempo, timed by hand to 1/100s. Auto swing capture, hands-free. Free ${TRIAL_DAYS}-day trial, then ${PRICE_YEARLY} a year.`,
  },
};


/* Only questions a golfer deciding whether to download would really ask. Each
   answer is one to three plain sentences. Player tempo questions (Rory, Tiger)
   are answered on the player pages, which rank for them on their own. Rendered as visible copy AND as FAQPage structured data,
   because AI answer engines quote the markup and Google builds the expandable
   sub-rows from it. */
const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I have to change my swing?",
    a: "No. Film your own best swing and train to its timing, or pick a tour player whose timing suits you.",
  },
  {
    q: "How do I time my pre-shot routine?",
    a: "Film your routine once and name each step, like picking a target or a practice swing. Elite Tempo times every step and the total against the 40 seconds the USGA and The R&A recommend.",
  },
  {
    q: "Can I practice without looking at my phone?",
    a: "Yes. Leave it in your bag and hear your timing as beats in your headphones. During routine practice, the app hears the strike and tells you whether you were on time.",
  },
  {
    q: "Do I need anything besides my iPhone?",
    a: "No. Record with the camera or import a clip you already have. Elite Tempo is for iPhone only.",
  },
  {
    q: `How much does it cost?`,
    a: `It is free for ${TRIAL_DAYS} days, then ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month. Cancel anytime in your iPhone settings.`,
  },
];

/* The tempo figures used to live here as a hand-typed array, and every single one
   of them was wrong against the app. They now come from `data/tempo-data`, which
   derives them from a verbatim copy of the app's own seed file and fails the build
   if the two disagree. See the header of that module for the full story.

   HERO_SWING is Tiger's 2000 Open Championship driver, the app's marquee preset:
   the speed bars and their times all come off the same three marks, so they
   cannot contradict each other. */

/* Machine-readable statement of what this thing is. The page had no structured data
   at all, which is why Google and the AI answer engines had nothing but the App Store
   listing to work from. No aggregateRating on purpose: with 4 ratings it buys nothing,
   and Google's policy wants marked-up ratings visible on the page. */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MobileApplication",
      "@id": "https://elitetempo.app#app",
      name: "Elite Tempo",
      alternateName: "Elite Tempo: Golf Swing Tempo Trainer",
      applicationCategory: "SportsApplication",
      applicationSubCategory: "Golf Swing Tempo Trainer",
      operatingSystem: "iOS 17.0 or later",
      url: "https://elitetempo.app",
      downloadUrl: APP_STORE_URL,
      installUrl: APP_STORE_URL,
      description:
        "Golf swing tempo trainer for iPhone. Match the hand-timed tempo of tour players to 1/100 of a second, then film your own swing and mark takeaway, top and impact on a frame-accurate scrubber to get your own tempo.",
      featureList: [
        "Hand-timed tempo library of famous tour swings",
        "Frame-accurate marking of your own swing from video",
        "Side-by-side swing comparison",
        "Pre-shot routine timing, step by step, against the 40 seconds the USGA and The R&A recommend",
        "Hands-free routine practice that hears the strike and scores each try",
        "Hands-free training with beats in your headphones",
        "Lock-screen Live Activity, mirrored to the Apple Watch Smart Stack",
      ],
      publisher: {
        "@type": "Organization",
        name: "Elite Prep Inc",
        url: "https://www.eliteprep.app",
      },
      offers: [
        {
          "@type": "Offer",
          name: "Elite Tempo Pro, Yearly",
          price: PRICE_YEARLY_NUM.toFixed(2),
          priceCurrency: "USD",
          category: "subscription",
          url: APP_STORE_URL,
        },
        {
          "@type": "Offer",
          name: "Elite Tempo Pro, Monthly",
          price: "5.99",
          priceCurrency: "USD",
          category: "subscription",
          url: APP_STORE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://elitetempo.app#faq",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

/* One size for every section heading and one for body copy, so hierarchy comes from
   a small scale rather than a new size per section. Benchmarked 2026-11-02: this page
   used 14 text sizes; Bevel uses 7, Apple Watch 8, Cal AI 9. */
const H2 = "text-[clamp(32px,4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em]";
const SECTION = "mx-auto max-w-[1280px] px-4 pb-16 sm:px-12 sm:pb-28";
const SPLIT = `${SECTION} flex flex-wrap items-center gap-x-16 gap-y-8`;
const MEDIA_FRAME = "overflow-hidden rounded-[20px]";



const LONGEST_GREAT = Math.max(...GREATS_ROWS.map((s) => s.total));

/* Real App Store reviews, quoted as written. */
const REVIEWS = [
  { title: "Game changer", body: "This is a game changer for tempo training. It’s simple to use, smart and actually useful!", name: "@kgrace" },
  { title: "Perfect timing, no pun intended", body: "I was just looking to improve my tempo and was strongly suggested this app. I love the ease of use and effectiveness.", name: "StayDialedIn" },
  { title: "The best golf app!", body: "Highly recommend this app for helping you practice your golf swing. So many cool features!", name: "Tiffneyac" },
  { title: "Awesome App", body: "Super addicting and surprisingly helpful", name: "Boos59" },
];

const DARK_SHOTS: DarkShot[] = TIMING_BY_AREA.map((s) => ({
  area: s.category,
  player: s.player,
  detail: `${s.clubLabel} at the ${s.year} ${s.event.replace(/^The /, "")}`,
  back: s.back,
  down: s.down,
  ratio: fmtRatio(s),
}));

/* The three animations, built from the same numbers the page prints. The routine
   figures match the app screens shown beside them: seven steps, 23.9 seconds. */
const SPEED_SCENE = speedScene(HERO_SWING.back, HERO_SWING.down);
const ROUTINE_SCENE = routineScene(7, "#453C2C");
const ROUTINE_S = 23.9;
const PACE_LIMIT_S = 40;
const TIMER_SCENE = timerScene(ROUTINE_S, PACE_LIMIT_S, INK);

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Download app", href: APP_STORE_URL },
      { label: "Tempo library", href: "/elite-tempo/tempos" },
      { label: "How we time swings", href: "/elite-tempo/how-we-time-swings" },
    ],
  },
  {
    title: "Compare",
    links: [
      { label: "vs Tour Tempo", href: "/elite-tempo/vs/tour-tempo" },
      { label: "vs a metronome", href: "/elite-tempo/vs/metronome" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact us", href: "mailto:ebusalacchi@eliteprep.app" },
      { label: "Terms of Service", href: "/elite-tempo/terms" },
      { label: "Privacy Policy", href: "/elite-tempo/privacy" },
    ],
  },
];

/* The three live accounts. Icon paths are 24x24 outlines drawn for this page. */
const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/elitetempogolf",
    icon: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM17.25 5.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z",
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

/* The hero carousel's screens, front first. Two carry a few seconds of real app
   recorded from the Simulator: the routine running its timer and steps, and a
   swing playing with its numbers. */
const HERO_SCREENS: { src: string; label: string; alt: string; clip?: string }[] = [
  { src: "routine", clip: "routine", label: "your routine", alt: "A pre-shot routine in Elite Tempo with its steps on the timeline, 23.9 seconds to impact." },
  { src: "player", clip: "player", label: "your swing", alt: "A golfer's own swing playing in Elite Tempo with tempo 3.0:1." },
  { src: "detail", label: "your four numbers", alt: "A swing's four numbers in Elite Tempo: tempo, backswing, downswing and total." },
  { src: "pros", label: "the pros", alt: "Elite Tempo's Pros tab: tour players with their tempos." },
  { src: "practice", label: "routine practice", alt: "Routine practice in Elite Tempo with the current step lit up." },
];

const WRAP = "mx-auto max-w-[1240px] px-4";
const H2_BIG = "m-0 text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-[-0.03em]";
const H2_MID = "m-0 text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em]";
const LEDE = "text-[clamp(19px,1.7vw,23px)] leading-[1.35]";

export default function EliteTempoLanding() {
  return (
    <main
      className="min-h-screen overflow-hidden text-[19px] leading-[1.45] antialiased"
      style={{ background: "#F6F6F3", color: INK, fontFamily: "-apple-system, 'SF Pro Display', system-ui, 'Helvetica Neue', Arial, sans-serif" }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      <style>{IPHONE_CSS}</style>

      {/* Hero: the promise, on a gold and green wash, three real screens below it. */}
      <div className="p-2.5">
        <section
          id="top"
          className="relative overflow-hidden rounded-[28px]"
          style={{
            background:
              "radial-gradient(70% 60% at 50% 78%, #F9C832 0%, rgba(249, 200, 50, 0) 72%), radial-gradient(60% 55% at 6% 100%, rgba(38, 160, 96, 0.6) 0%, rgba(38, 160, 96, 0) 70%), radial-gradient(60% 55% at 94% 100%, rgba(38, 160, 96, 0.6) 0%, rgba(38, 160, 96, 0) 70%), #FFFCF0",
          }}
        >
          <header className="flex justify-center px-4 pt-4">
            <div className="flex items-center gap-[clamp(20px,6vw,56px)] rounded-full py-[7px] pl-5 pr-[7px]" style={{ background: "rgba(255,255,255,0.72)" }}>
              <a href="#top" className="flex items-center gap-2 no-underline" aria-label="Elite Tempo home">
                <EliteTempoMark size={18} fill={INK} />
                <span className="whitespace-nowrap text-base font-semibold tracking-[0.02em]">Elite Tempo</span>
              </a>
              <a
                href={APP_STORE_URL}
                className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-[18px] text-[15px] font-medium text-white no-underline"
                style={{ background: INK }}
              >
                Try for free
              </a>
            </div>
          </header>

          <div className="px-4 pt-[clamp(36px,5vw,64px)] text-center">
            <h1 className="m-0 text-[clamp(38px,9vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em]">
              {/* The break only holds once both halves fit on a line; on a phone it
                  stranded a single word on a line of its own. */}
              Time your entire game
              <br className="hidden sm:block" /> from routine to impact.
            </h1>
            <p className={`mx-auto mt-[22px] max-w-[30em] ${LEDE} tracking-[-0.01em]`} style={{ color: "#4A4B50" }}>
              Capture your routine and the total timing of every shot. Play your best when it
              matters most.
            </p>
            <AppStoreBadge className="mt-7" />
            <p className="mt-3.5 text-[15px]" style={{ color: "#4A4B50" }}>
              <span style={{ color: INK }} aria-hidden>
                ★★★★★
              </span>{" "}
              {/* Two whole lines on a phone instead of a wrap that strands "free." */}
              <span className="whitespace-nowrap">Rated 5.0 on the App Store.</span>{" "}
              <span className="block whitespace-nowrap sm:inline">{TRIAL_DAYS} days free.</span>
            </p>
          </div>

          <HeroCarousel labels={HERO_SCREENS.map((h) => h.label)} slides={HERO_SCREENS.map((h) => <Phone key={h.src} eager src={h.src} alt={h.alt} clip={h.clip} />)} />
        </section>
      </div>

      {/* Every part of the game, playable. */}
      <section className={`${WRAP} pt-[clamp(72px,10vw,136px)] text-center`}>
        <h2 className={H2_BIG}>Four numbers make up your timing.</h2>
        <DarkTimingPlayer shots={DARK_SHOTS} />
      </section>

      {/* The problem, in plain type with no screen: the reason the rest of the page exists. It
          sits after the player so two text blocks never stack, and leads into the
          routine cards below it. */}
      <section className="mx-auto max-w-[900px] px-4 pt-[clamp(72px,10vw,136px)] text-center">
        <h2 className={H2_BIG}>Your timing and routine break down under pressure because you never practiced them.</h2>
        <p className={`mx-auto mt-5 max-w-[30em] ${LEDE}`} style={{ color: "#6E6F75" }}>
          Now you can. Film your routine, name each step, and time it.
        </p>
      </section>


      {/* Three tall cards. */}
      <section className={`${WRAP} pt-[clamp(72px,10vw,136px)]`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
          <TallCard title="Time your best swings" ink="#47402A" bg="linear-gradient(180deg, #FFF3C4 0%, #FBD860 100%)" src="player" alt="A golfer's own swing playing in Elite Tempo.">
            Film a swing and hear your own timing.
          </TallCard>
          <TallCard title="Find the tour player you match" ink="#24412F" bg="linear-gradient(180deg, #DDF3E4 0%, #8FD6A9 100%)" src="detail" alt="Tempo, backswing, downswing and total for one swing in Elite Tempo, with the closest tour timing.">
            Your four numbers next to the closest tour timing.
          </TallCard>
          <TallCard
            title="Rehearse your routine"
            ink="#453C2C"
            bg="linear-gradient(180deg, #F3EEE3 0%, #DCCDB0 100%)"
            src="practice"
            alt="Routine practice in Elite Tempo with the current step lit up."
            motion={<LottieLoop scene={ROUTINE_SCENE} label="Seven routine steps lighting up one after another, ending in gold at impact." className="mt-5 w-full max-w-[336px]" />}
          >
            Each step lights up as you reach it.
          </TallCard>
        </div>
      </section>

      {/* Pace of play. */}
      <section className={`${WRAP} pt-4`}>
        <div
          className="box-border flex min-h-[620px] flex-wrap items-center gap-x-[clamp(32px,6vw,80px)] gap-y-8 overflow-hidden rounded-[28px] px-[clamp(24px,5vw,64px)] pt-[clamp(32px,5vw,64px)]"
          style={{ background: "linear-gradient(135deg, #E7F5EC 0%, #FFF6D6 100%)" }}
        >
          <div className="min-w-0 flex-[1_1_400px]">
            <h2 className={H2_MID}>Play faster without feeling rushed.</h2>
            <p className="mt-4 max-w-[26em] text-[21px] leading-[1.35]" style={{ color: "#55565C" }}>
              Fit your routine inside the 40 seconds the USGA and The R&amp;A recommend.
            </p>
            <div className="mt-8 max-w-[420px]">
              <p className="m-0 text-[30px] font-semibold tracking-[-0.02em] [font-variant-numeric:tabular-nums]">{ROUTINE_S} s</p>
              <LottieLoop scene={TIMER_SCENE} label={`A routine of ${ROUTINE_S} seconds filling the bar, short of the ${PACE_LIMIT_S} second limit.`} className="mt-2 w-full" />
              <div className="relative mt-2 h-5 text-[15px]" style={{ color: "#55565C" }}>
                <span className="absolute left-0">{(PACE_LIMIT_S - ROUTINE_S).toFixed(1)} s to spare</span>
                <span className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${(PACE_LIMIT_S / TIMER_SCALE_S) * 100}%` }}>
                  {PACE_LIMIT_S} s limit
                </span>
              </div>
            </div>
          </div>
          <div className="mx-auto h-[560px] w-[300px] flex-[0_1_300px] self-end">
            <Phone src="routines" alt="Elite Tempo's Routines tab: a 23.9 second average against the 40 second limit." />
          </div>
        </div>
      </section>

      {/* Tour timing. */}
      <section className={`${WRAP} pt-4`}>
        <div className="rounded-[28px] bg-white p-[clamp(32px,5vw,64px)]">
          <h2 className={H2_MID}>Copy the timing of tour players.</h2>
          <p className="mt-4 max-w-[28em] text-[21px] leading-[1.35]" style={{ color: "#55565C" }}>
            Train to {SWINGS.length} tournament swings, each timed to 1/100 of a second.
          </p>
          {/* Each bar fills at the speed the swing really took, so the quicker
              swings visibly finish first. */}
          <PlayInView className="mt-8">
            {GREATS_ROWS.map((g) => (
              <Link
                key={g.slug}
                href={`/elite-tempo/tempo/${g.slug}`}
                className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] items-center gap-x-8 gap-y-2 py-[18px] no-underline"
              >
                <div>
                  <p className="m-0 font-semibold">{g.player}</p>
                  <p className="m-0 text-[15px]" style={{ color: "#6E6F75" }}>
                    {g.clubLabel}, {g.year} {g.event.replace(/^The /, "")}
                  </p>
                </div>
                <div className="flex h-3.5" role="img" aria-label={`Backswing ${fmtSeconds(g.back)}, downswing ${fmtSeconds(g.down)}.`}>
                  <div
                    className="et-timed rounded-l-[7px]"
                    style={{ width: `${(g.back / LONGEST_GREAT) * 100}%`, background: INK, ["--et-dur" as string]: `${g.back}s`, ["--et-delay" as string]: "0s" }}
                  />
                  <div
                    className="et-timed rounded-r-[7px]"
                    style={{ width: `${(g.down / LONGEST_GREAT) * 100}%`, background: "#F9C832", ["--et-dur" as string]: `${g.down}s`, ["--et-delay" as string]: `${g.back}s` }}
                  />
                </div>
                <p className="m-0 text-[30px] font-semibold tracking-[-0.02em] [font-variant-numeric:tabular-nums]">{fmtRatio(g)}</p>
              </Link>
            ))}
          </PlayInView>
          <Link href="/elite-tempo/tempos" className="mt-4 inline-block text-[16px] font-semibold underline underline-offset-4">
            See all {SWINGS.length} hand-timed swings
          </Link>
        </div>
      </section>

      {/* Practice speed. Copy first in the source so on a phone it stacks above the
          screen, which runs taller than its 560px box and would cover the heading;
          row-reverse keeps the screen on the left once the two sit side by side. */}
      <section className={`${WRAP} pt-4`}>
        <div
          className="box-border flex min-h-[620px] flex-row-reverse flex-wrap items-center gap-x-[clamp(32px,6vw,80px)] gap-y-8 overflow-hidden rounded-[28px] px-[clamp(24px,5vw,64px)] pt-[clamp(32px,5vw,64px)] text-white"
          style={{ background: "radial-gradient(70% 100% at 80% 100%, #1F9A5E 0%, rgba(31, 154, 94, 0) 75%), #0B2A1E" }}
        >
          <div className="min-w-0 flex-[1_1_400px] pb-8">
            <h2 className={H2_MID}>Practice at 75%, 90% or full speed.</h2>
            <p className="mt-4 max-w-[26em] text-[21px] leading-[1.35]" style={{ color: "rgba(255,255,255,0.8)" }}>
              Slow it down to groove the feel. Speed it up for the course.
            </p>
            <div className="mt-8 flex max-w-[560px] items-stretch gap-4 text-[15px] [font-variant-numeric:tabular-nums]">
              <div className="grid shrink-0 grid-rows-3 items-center font-semibold">
                {SPEEDS.map((sp) => <span key={sp}>{sp * 100}%</span>)}
              </div>
              <LottieLoop
                scene={SPEED_SCENE}
                label={`Tiger Woods' driver swing filling three bars at 75%, 90% and full speed, the same ${fmtRatio(HERO_SWING)} ratio in each.`}
                className="min-w-0 flex-1"
              />
              <div className="grid shrink-0 grid-rows-3 items-center text-right" style={{ color: "rgba(255,255,255,0.7)" }}>
                {/* From the rounded total the page prints, so 1.05 at 90% reads 1.17 and the sum checks out. */}
                {SPEEDS.map((sp) => <span key={sp}>{(Number(HERO_SWING.total.toFixed(2)) / sp).toFixed(2)} s</span>)}
              </div>
            </div>
            <p className="mt-4 text-[15px]" style={{ color: "rgba(255,255,255,0.7)" }}>
              Same {fmtRatio(HERO_SWING)} ratio at every speed.
            </p>
          </div>
          <div className="mx-auto h-[560px] w-[300px] flex-[0_1_300px] self-end">
            <Phone src="options" alt="Elite Tempo's Player options with speed set to 90%." />
          </div>
        </div>
      </section>

      {/* Streak and share. */}
      <section className={`${WRAP} pt-4`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
          <TallCard title="Keep your weekly streak" ink="#4A3A2A" bg="linear-gradient(180deg, #FFEBDC 0%, #FFC08F 100%)" src="stats" alt="Stats in Elite Tempo: 3 weeks in a row.">
            One range day a week keeps it going.
          </TallCard>
          <TallCard title="Share your timing" ink="#26344F" bg="linear-gradient(180deg, #E4EEFF 0%, #A9C8FF 100%)" src="share" alt="An Elite Tempo share card with a swing's four numbers.">
            Send your four numbers to your coach.
          </TallCard>
        </div>
      </section>

      {/* Reviews. */}
      <section className="pt-[clamp(72px,10vw,136px)] text-center">
        <h2 className={`${H2_BIG} mx-4`}>What golfers are saying.</h2>
        <div className="mx-auto mt-9 box-border grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4 px-4 text-left">
          {REVIEWS.map((r) => (
            <article key={r.name} className="rounded-3xl bg-white p-6">
              <p className="m-0 text-[18px] tracking-[2px]" style={{ color: "#E2A500" }} role="img" aria-label="5 stars">
                ★★★★★
              </p>
              <p className="mt-2.5 font-semibold">{r.title}</p>
              <p className="mt-1.5 text-[17px] leading-[1.38]" style={{ color: "#55565C" }}>
                {r.body}
              </p>
              <p className="mt-3 text-[15px]" style={{ color: "#6E6F75" }}>
                {r.name}, App Store
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Pricing. */}
      <section id="pricing" className={`${WRAP} pt-[clamp(72px,10vw,136px)]`}>
        <div
          className="rounded-[28px] px-[clamp(24px,5vw,64px)] py-[clamp(36px,6vw,80px)] text-center"
          style={{ background: "radial-gradient(70% 100% at 50% 100%, #F9C832 0%, rgba(249, 200, 50, 0) 75%), #FFFCF0" }}
        >
          <h2 className={H2_BIG}>
            Time your own swing
            <br className="hidden sm:block" /> before you pay a thing.
          </h2>
          <p className="mt-4 text-[21px]" style={{ color: "#4A4B50" }}>
            Free for {TRIAL_DAYS} days, then {PRICE_YEARLY} a year or {PRICE_MONTHLY} a month. Cancel anytime.
          </p>
          <AppStoreBadge className="mt-7" />
        </div>
      </section>

      {/* Why we built it. */}
      <section className="mx-auto max-w-[760px] px-4 pt-[clamp(72px,10vw,120px)]">
        <p className="m-0 text-[clamp(26px,3vw,34px)] font-semibold leading-[1.22] tracking-[-0.02em]">
          {/* The app's founder note, cut to its point: his best timing, held under pressure. */}
          I built Elite Tempo to capture my timing and routine when I was playing my best, and
          repeat them under pressure.
        </p>
        <p className="mt-3.5 text-base" style={{ color: "#6E6F75" }}>
          Eric, founder
        </p>
      </section>

      {/* FAQ, laid out like Mobbin's: the heading on the left, plain rounded rows
          on the right, one way out at the end. Native details, so the answers are
          in the HTML for search engines. */}
      <section id="faq" className={`${WRAP} pt-[clamp(72px,10vw,120px)]`}>
        <div className="grid gap-x-16 gap-y-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <h2 className={H2_BIG}>Frequently asked questions</h2>
          <div>
            {FAQS.map(({ q, a }) => (
              <details key={q} className="et-faq mb-3 rounded-2xl bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[18px] font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  {q}
                  <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" className="et-chev shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="m-0 px-6 pb-5 text-[17px] leading-[1.45]" style={{ color: "#55565C" }}>
                  {a}
                </p>
              </details>
            ))}
            <p className="mt-6 text-center text-[16px]" style={{ color: "#6E6F75" }}>
              Still have a question?{" "}
              <a href="mailto:ebusalacchi@eliteprep.app" className="underline underline-offset-4" style={{ color: INK }}>
                Email us
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Footer, structured like Bevel's: the mark and copyright on the left, a few
          short link columns, then the social icons on their own row. */}
      <footer className={`${WRAP} pb-10 pt-[clamp(96px,12vw,160px)]`}>
        <div className="flex flex-wrap justify-between gap-x-16 gap-y-12">
          <div>
            <Wordmark />
            <p className="mt-2 text-sm" style={{ color: "#6E6F75" }}>
              © {new Date().getFullYear()} Elite Prep Inc.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="m-0 text-[16px] font-medium" style={{ color: "#8A8B90" }}>
                  {col.title}
                </p>
                <ul className="m-0 mt-4 list-none space-y-2.5 p-0 text-[16px]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="no-underline hover:underline hover:underline-offset-4" style={{ color: INK }}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-14 flex items-center gap-7">
          {SOCIALS.map((so) => (
            <a key={so.label} href={so.href} aria-label={`Elite Tempo on ${so.label}`} rel="noopener" target="_blank" className="transition-opacity hover:opacity-60" style={{ color: INK }}>
              <svg aria-hidden viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d={so.icon} fillRule="evenodd" />
              </svg>
            </a>
          ))}
        </div>
        <p className="mt-10 max-w-[62em] text-[13px] leading-[1.5]" style={{ color: "#8A8B90" }}>
          Elite Tempo references real golfers, tournaments, and shots for descriptive and
          educational purposes only, and is not affiliated with, sponsored by, or endorsed by any
          player, tournament, tour, or organization named in the app. All names and trademarks
          belong to their respective owners.
        </p>
      </footer>
    </main>
  );
}

/* ── Pieces ─────────────────────────────────────────────────────────────── */

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5" aria-label="Elite Tempo">
      <EliteTempoMark size={22} fill={INK} />
      <span className="text-[20px] font-semibold leading-none tracking-[-0.01em]" style={{ color: INK }}>
        Elite Tempo
      </span>
    </div>
  );
}

/* Apple's own white badge, downloaded unchanged from their badge tool. Apple asks for
   the white version on dark backgrounds and does not allow a rebuilt one. */
function AppStoreBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={APP_STORE_URL}
      className={`inline-block transition duration-200 hover:brightness-95 ${className}`}
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

function LoopVideo({ name, label, position }: { name: string; label: string; position: string }) {
  return (
    <video
      src={`/elite-tempo/${name}.mp4`}
      poster={`/elite-tempo/${name}-poster.jpg`}
      autoPlay
      loop
      muted
      playsInline
      aria-label={label}
      className="block h-full w-full object-cover"
      style={{ objectPosition: position }}
    />
  );
}

/* The hero alone is cropped: that shape and position sit between the app's back
   button and its Beats and Voice controls, so only the golfer and the readouts show. */

/* A screen recording shown whole, at the shape it was filmed. Cropping these cut
   through the app's own controls and readouts. */
function ScreenVideo({ name, label }: { name: string; label: string }) {
  return (
    <div className={`${MEDIA_FRAME} aspect-[600/1230]`} style={{ background: CARD }}>
      <LoopVideo name={name} label={label} position="center" />
    </div>
  );
}

/* The phone frame: a brushed edge, the screen, and the island. */
const IPHONE_CSS = `
.iphone { position: relative; box-sizing: border-box; padding: 7px; border-radius: 15% / 7.2%; background: linear-gradient(145deg, #9A9A9F 0%, #2A2A2D 22%, #4A4A4F 60%, #18181A 100%); box-shadow: 0 50px 90px -30px rgba(20, 30, 20, 0.5), 0 18px 36px -18px rgba(20, 30, 20, 0.35); }
.iphone-screen { position: relative; width: 100%; aspect-ratio: 1206 / 2622; border-radius: 13% / 6.2%; overflow: hidden; background: #000; }
.et-faq[open] .et-chev { transform: rotate(180deg); }
.et-chev { transition: transform 0.2s ease; }
.iphone-screen img, .iphone-screen video { display: block; width: 100%; height: 100%; object-fit: cover; }

/* Tour timing bars, in real time: backswing, then downswing straight after it. */
[data-motion="armed"] .et-timed { clip-path: inset(0 100% 0 0); }
[data-motion="play"] .et-timed { clip-path: inset(0 0 0 0); transition: clip-path var(--et-dur) linear calc(var(--et-delay) + 0.2s); }

`;

/* `eager` for the hero's screens, which are on show from the first paint; every
   other phone waits until it is near the viewport. `clip` names a short silent
   screen recording that the hero carousel plays when this phone is in front; the
   still is its poster, so it looks the same until it plays. */
function Phone({ src, alt, className = "", eager = false, clip }: { src: string; alt: string; className?: string; eager?: boolean; clip?: string }) {
  return (
    <div className={`iphone shrink-0 ${className}`}>
      <div className="iphone-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* 960 wide, cut from the full size App Store screenshots: the old 598 wide
            copies were stretched past their pixels on any sharp screen and read blurry. */}
        {clip ? (
          <video
            src={`/elite-tempo/app/${clip}.mp4`}
            poster={`/elite-tempo/app/${src}.webp`}
            aria-label={alt}
            width={960}
            height={2087}
            muted
            playsInline
            preload="auto"
          />
        ) : (
          <img src={`/elite-tempo/app/${src}.webp`} alt={alt} width={960} height={2087} loading={eager ? "eager" : "lazy"} />
        )}
      </div>
    </div>
  );
}

function TallCard({
  title,
  ink,
  bg,
  src,
  alt,
  motion,
  children,
}: {
  title: string;
  ink: string;
  bg: string;
  src: string;
  alt: string;
  motion?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="box-border h-[640px] overflow-hidden rounded-[28px] px-8 pt-8" style={{ background: bg }}>
      <h2 className="m-0 text-[38px] font-semibold leading-[1.08] tracking-[-0.03em]">{title}</h2>
      <p className="mt-3 text-[19px] leading-[1.32]" style={{ color: ink }}>
        {children}
      </p>
      {motion}
      <Phone src={src} alt={alt} className="mx-auto mt-8 w-[270px]" />
    </article>
  );
}

function Price({ amount, note }: { amount: string; note: string }) {
  return (
    <p>
      <span
        className="block text-[28px] font-semibold leading-tight"
        style={{ fontFamily: FONT_NUMERALS }}
      >
        {amount}
      </span>
      <span className="text-[15px]" style={{ color: MUTED }}>
        {note}
      </span>
    </p>
  );
}
