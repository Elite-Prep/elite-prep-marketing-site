import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import DarkTimingPlayer, { type DarkShot } from "./DarkTimingPlayer";
import LottieLoop from "./LottieLoop";
import PlayInView from "./PlayInView";
import HeroCarousel from "./HeroCarousel";
import FeatureList from "./FeatureList";
import { TIMER_SCALE_S, routineScene, timerScene } from "./motion/scenes";
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
  PRICE_MONTHLY_NUM,
  PRICE_YEARLY,
  PRICE_YEARLY_NUM,
  TRIAL_DAYS,
  YEARLY_SAVING_PCT,
} from "./data/pricing";
import { SiteFooter, SiteHeader, SkipLink } from "./Chrome";
import { preload } from "react-dom";
import {
  APP_STORE_URL,
  INK,
  MUTED,
  etUrl,
  SHARE_IMAGES,
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
  /* Named explicitly with a version so chat apps that cached the old card under
     the file-based URL (its hash did not change with the design) fetch the new one. */
  openGraph: {
    images: SHARE_IMAGES,
    title: "Elite Tempo. Time your entire game from routine to impact.",
    description:
      `Golf tempo, timed by hand to 1/100s. Film your own swing, mark takeaway, top and impact on a frame-accurate scrubber, and get your four numbers. Practice to the beats with your phone in your bag. Free for ${TRIAL_DAYS} days, then ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month.`,
  },
  twitter: {
    card: "summary_large_image",
    images: SHARE_IMAGES,
    title: "Elite Tempo. Time your entire game from routine to impact.",
    description: `Time your golf swing and your pre-shot routine. Tour swings timed by hand to 1/100s. Free ${TRIAL_DAYS}-day trial, then ${PRICE_YEARLY} a year.`,
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
        "Your four timing numbers next to a tour player's",
        "Pre-shot routine timing, step by step, against the 40 seconds the USGA and The R&A recommend",
        "Hands-free routine practice that hears the strike and scores each try",
        "Hands-free training with beats in your headphones",
        "Lock-screen Live Activity with play and pause",
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
          price: PRICE_MONTHLY_NUM.toFixed(2),
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



const LONGEST_GREAT = Math.max(...GREATS_ROWS.map((s) => s.total));

/* Real App Store reviews, quoted as written. The first is shown big. */
const REVIEWS = [
  { title: "Perfect timing, no pun intended", body: "I was just looking to improve my tempo and was strongly suggested this app. I love the ease of use and effectiveness.", name: "StayDialedIn" },
  { title: "Game changer", body: "This is a game changer for tempo training. It’s simple to use, smart and actually useful!", name: "@kgrace" },
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

/* The two animations, built from the same numbers the page prints. The routine
   figures match the app screens shown beside them: seven steps, 23.9 seconds. */
const ROUTINE_SCENE = routineScene(7, "#453C2C");
const ROUTINE_S = 23.9;
const PACE_LIMIT_S = 40;
const TIMER_SCENE = timerScene(ROUTINE_S, PACE_LIMIT_S, INK);

/* The hero carousel's screens, front first. Two carry a few seconds of real app
   recorded from the Simulator: the routine running its timer and steps, and a
   swing playing with its numbers. */
const HERO_SCREENS: { src: string; label: string; alt: string; clip?: string }[] = [
  { src: "routine", clip: "routine", label: "your routine", alt: "A pre-shot routine in Elite Tempo with its steps on the timeline, 23.9 seconds to impact." },
  { src: "player", clip: "player", label: "your swing", alt: "A golfer's own swing playing in Elite Tempo with tempo 3.0:1." },
  { src: "detail", label: "your four numbers", alt: "A swing's four numbers in Elite Tempo: tempo, backswing, downswing and total." },
  { src: "pros", label: "the pros", alt: "Elite Tempo's Pros tab: tour players with their tempos." },
  { src: "stats", label: "your streak", alt: "Stats in Elite Tempo: a weekly streak of 3 weeks in a row." },
];

const WRAP = "mx-auto max-w-[1240px] px-4";
/* The type scale, cut 2026-11-04 from 17 sizes on the desktop page: 80 hero, 56 every
   section heading, 30 big numbers and quotes, 21 lead lines, 19 body, 16 small. */
const H2_ONE = "m-0 text-[clamp(36px,4.4vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em] [text-wrap:balance]";
const LEDE = "text-[21px] leading-[1.35]";
const NUM = "text-[30px] font-semibold tracking-[-0.02em] [font-variant-numeric:tabular-nums]";

export default function EliteTempoLanding() {
  /* The front phone's still is the largest thing on a phone screen. Asked for first,
     at high priority, it no longer waits behind the scripts. */
  preload(`/elite-tempo/app/${HERO_SCREENS[0].src}.webp`, { as: "image", fetchPriority: "high" });
  return (
    <main
      className="min-h-screen overflow-hidden text-[19px] leading-[1.45] antialiased"
      style={{ background: "#F6F6F3", color: INK, fontFamily: "-apple-system, 'SF Pro Display', system-ui, 'Helvetica Neue', Arial, sans-serif" }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      <style>{IPHONE_CSS}</style>
      <SkipLink />

      {/* Hero: the promise on a gold wash, three real screens below it. Gold only:
          the green washes were cut 2026-11-04 (site grade: ten section colors down
          to cream, white and one dark). */}
      <div className="p-2.5">
        <section
          id="top"
          className="relative overflow-hidden rounded-[28px]"
          style={{
            background: "radial-gradient(70% 60% at 50% 78%, #F9C832 0%, rgba(249, 200, 50, 0) 72%), #FFFCF0",
          }}
        >
          <SiteHeader />

          <div id="content" className="px-4 pt-[clamp(36px,5vw,64px)] text-center">
            <h1 className="m-0 text-[clamp(38px,9vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em]">
              {/* The break only holds once both halves fit on a line; on a phone it
                  stranded a single word on a line of its own. */}
              Time your entire game
              <br className="hidden sm:block" /> from routine to impact.
            </h1>
            <p className={`mx-auto mt-[22px] max-w-[30em] ${LEDE} tracking-[-0.01em]`} style={{ color: "#4A4B50" }}>
              Capture your golf routine and the total timing of every shot.
            </p>
            <AppStoreBadge className="mt-7" />
            <p className="mt-3.5 text-[16px]" style={{ color: "#4A4B50" }}>
              <span style={{ color: INK }} aria-hidden>
                ★★★★★
              </span>{" "}
              {/* Two whole lines on a phone instead of a wrap that strands "free." */}
              <span className="whitespace-nowrap">Rated 5.0 on the App Store.</span>{" "}
              <span className="block whitespace-nowrap sm:inline">{TRIAL_DAYS} days free.</span>
            </p>
          </div>

          <HeroCarousel labels={HERO_SCREENS.map((h) => h.label)} slides={HERO_SCREENS.map((h, i) => <Phone key={h.src} eager priority={i === 0} src={h.src} alt={h.alt} clip={h.clip} />)} />
        </section>
      </div>

      {/* Every part of the game, playable. The page's one dark card. */}
      <section className={`${WRAP} pt-[clamp(72px,10vw,136px)] text-center`}>
        <h2 className={H2_ONE}>Four numbers make up your timing.</h2>
        <DarkTimingPlayer shots={DARK_SHOTS} />
      </section>

      {/* The problem, in plain type. Short: it was 14 words over three lines. Timing
          and routine always named together. */}
      <section className="mx-auto max-w-[900px] px-4 pt-[clamp(72px,10vw,136px)] text-center">
        {/* The two words the product is about, in italics: a deliberate exception to
            plain headings, asked for by Eric 2026-11-04. */}
        <h2 className={H2_ONE}>
          Pressure breaks your <em className="italic">timing</em> and <em className="italic">routine</em>.
        </h2>
        <p className={`mx-auto mt-5 max-w-[30em] ${LEDE}`} style={{ color: MUTED }}>
          Because they’re difficult to practice. Until now.
        </p>
      </section>

      {/* Two cards, both white. */}
      <section className={`${WRAP} pt-[clamp(56px,8vw,96px)]`}>
        {/* Each card spans three shared rows (title, line, phone), so the phones start
            at the same height even when one title wraps to two lines. */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-x-4">
          <TallCard title="Time your best swings" src="player" alt="A golfer's own swing playing in Elite Tempo.">
            Film a swing and groove the timing of your best shots.
          </TallCard>
          <TallCard title="Compare to a tour player's timing" src="detail" alt="A golfer's four timing numbers in Elite Tempo, each next to Adam Scott's.">
            See how your timing stacks up to the best players in the world.
          </TallCard>
        </div>
      </section>

      {/* Routine and pace of play, one card. These were two: a tall "Rehearse your
          routine" card and a yellow green "Play faster" section told the same story. */}
      <section className={`${WRAP} pt-4`}>
        <div className="box-border flex flex-wrap items-center gap-x-[clamp(32px,6vw,80px)] gap-y-8 overflow-hidden rounded-[28px] bg-white px-[clamp(24px,5vw,64px)] pt-[clamp(32px,5vw,64px)]">
          <div className="min-w-0 flex-[1_1_400px] pb-8">
            <h2 className={H2_ONE}>Rehearse your routine. Play faster.</h2>
            <p className={`mt-4 max-w-[26em] ${LEDE}`} style={{ color: MUTED }}>
              Each step lights up as you reach it. Fit it all inside the 40 seconds the USGA and The R&amp;A recommend.
            </p>
            <LottieLoop scene={ROUTINE_SCENE} label="Seven routine steps lighting up one after another, ending in gold at impact." className="mt-8 w-full max-w-[336px]" />
            <div className="mt-6 max-w-[420px]">
              <p className={`m-0 ${NUM}`}>{ROUTINE_S} s</p>
              <LottieLoop scene={TIMER_SCENE} label={`A routine of ${ROUTINE_S} seconds filling the bar, short of the ${PACE_LIMIT_S} second limit.`} className="mt-2 w-full" />
              <div className="relative mt-2 h-5 text-[16px]" style={{ color: MUTED }}>
                <span className="absolute left-0">{(PACE_LIMIT_S - ROUTINE_S).toFixed(1)} s to spare</span>
                <span className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: `${(PACE_LIMIT_S / TIMER_SCALE_S) * 100}%` }}>
                  {PACE_LIMIT_S} s limit
                </span>
              </div>
            </div>
          </div>
          <div className="mx-auto h-[560px] w-[300px] flex-[0_1_300px] self-end">
            <Phone src="practice" alt="Routine practice in Elite Tempo with the current step lit up." />
          </div>
        </div>
      </section>

      {/* Tour timing. On a phone the name and ratio share a line and the bar runs
          under both, so five rows no longer take two screens. */}
      <section className={`${WRAP} pt-4`}>
        <div className="rounded-[28px] bg-white p-[clamp(32px,5vw,64px)]">
          <h2 className={H2_ONE}>Copy the timing of tour players.</h2>
          <p className={`mt-4 max-w-[28em] ${LEDE}`} style={{ color: MUTED }}>
            Train to {SWINGS.length} tournament swings, each timed to 1/100 of a second.
          </p>
          {/* Each bar fills at the speed the swing really took, so the quicker
              swings visibly finish first. */}
          <PlayInView className="mt-8">
            {GREATS_ROWS.map((g) => (
              <Link
                key={g.slug}
                href={`/tempo/${g.slug}`}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-8 gap-y-2.5 py-[16px] no-underline md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_7ch]"
              >
                <div>
                  <p className="m-0 font-semibold">{g.player}</p>
                  <p className="m-0 text-[16px]" style={{ color: MUTED }}>
                    {g.clubLabel}, {g.year} {g.event.replace(/^The /, "")}
                  </p>
                </div>
                <div className="order-last col-span-2 flex h-3.5 md:order-none md:col-span-1" role="img" aria-label={`Backswing ${fmtSeconds(g.back)}, downswing ${fmtSeconds(g.down)}.`}>
                  <div
                    className="et-timed rounded-l-[7px]"
                    style={{ width: `${(g.back / LONGEST_GREAT) * 100}%`, background: INK, ["--et-dur" as string]: `${g.back}s`, ["--et-delay" as string]: "0s" }}
                  />
                  <div
                    className="et-timed rounded-r-[7px]"
                    style={{ width: `${(g.down / LONGEST_GREAT) * 100}%`, background: "#F9C832", ["--et-dur" as string]: `${g.down}s`, ["--et-delay" as string]: `${g.back}s` }}
                  />
                </div>
                <p className={`m-0 text-right ${NUM}`}>{fmtRatio(g)}</p>
              </Link>
            ))}
          </PlayInView>
          <Link href="/tempos" className="mt-4 inline-flex min-h-11 items-center text-[16px] font-semibold underline underline-offset-4">
            See all {SWINGS.length} hand-timed swings
          </Link>
        </div>
      </section>

      {/* The smaller features: one short list and one phone, like Bevel. Replaces a
          dark green speed section and two big peach and light blue cards. */}
      <section className={`${WRAP} pt-4`}>
        <div className="overflow-hidden rounded-[28px] bg-white px-[clamp(24px,5vw,64px)] pt-[clamp(32px,5vw,64px)]">
          <FeatureList
            heading={<h2 className={H2_ONE}>More ways to practice.</h2>}
            items={[
              {
                title: "Practice at 75%, 90% or full speed",
                body: `Slow it down to groove the feel. Same ${fmtRatio(HERO_SWING)} ratio at every speed.`,
                phone: <Phone src="options" alt="Elite Tempo's Player options with speed set to 90%." />,
              },
              {
                title: "Keep your weekly streak",
                body: "One range day a week keeps it going.",
                phone: <Phone src="stats" alt="Stats in Elite Tempo: 3 weeks in a row." />,
              },
              {
                title: "Share your timing",
                body: "Send your four numbers to your coach.",
                phone: <Phone src="share" alt="An Elite Tempo share card with a swing's four numbers." />,
              },
            ]}
          />
        </div>
      </section>

      {/* Why we built it. Moved above the reviews: after the last buy button few
          people read it. */}
      <section className="mx-auto max-w-[760px] px-4 pt-[clamp(72px,10vw,136px)]">
        <p className="m-0 text-[30px] font-semibold leading-[1.22] tracking-[-0.02em]">
          {/* The app's founder note, cut to its point: his best timing, held under pressure. */}
          I built Elite Tempo to capture my timing and routine when I was playing my best, and
          repeat them under pressure.
        </p>
        <p className="mt-3.5 text-[16px]" style={{ color: MUTED }}>
          Eric, founder
        </p>
      </section>

      {/* Reviews: one big quote, three small ones, no cards. */}
      <section className={`${WRAP} pt-[clamp(72px,10vw,136px)]`}>
        <h2 className={`${H2_ONE} text-center`}>What golfers are saying.</h2>
        <figure className="mx-auto mt-10 max-w-[860px] text-center">
          <p className="m-0 text-[18px] tracking-[2px]" style={{ color: "#A67700" }} role="img" aria-label="5 stars">
            ★★★★★
          </p>
          <blockquote className="m-0 mt-4 text-[30px] font-semibold leading-[1.25] tracking-[-0.02em]">
            “{REVIEWS[0].body}”
          </blockquote>
          <figcaption className="mt-4 text-[16px]" style={{ color: MUTED }}>
            {REVIEWS[0].name}, App Store
          </figcaption>
        </figure>
        <div className="mx-auto mt-14 grid max-w-[1080px] grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-10 gap-y-8">
          {REVIEWS.slice(1).map((r) => (
            <figure key={r.name} className="m-0">
              <p className="m-0 text-[16px] tracking-[2px]" style={{ color: "#A67700" }} role="img" aria-label="5 stars">
                ★★★★★
              </p>
              <blockquote className="m-0 mt-2 text-[19px] leading-[1.4]">“{r.body}”</blockquote>
              <figcaption className="mt-2 text-[16px]" style={{ color: MUTED }}>
                {r.name}, App Store
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Pricing: both plans side by side, like Headspace, with the free days above. */}
      <section id="pricing" className={`${WRAP} pt-[clamp(72px,10vw,136px)]`}>
        <div
          className="rounded-[28px] px-[clamp(24px,5vw,64px)] py-[clamp(36px,6vw,80px)] text-center"
          style={{ background: "radial-gradient(70% 100% at 50% 100%, #F9C832 0%, rgba(249, 200, 50, 0) 75%), #FFFCF0" }}
        >
          <h2 className={H2_ONE}>
            Time your own swing
            <br className="hidden sm:block" /> before you pay a thing.
          </h2>
          <p className={`mt-4 ${LEDE}`} style={{ color: "#4A4B50" }}>
            Free for {TRIAL_DAYS} days. Then pick a plan. Cancel anytime.
          </p>
          <div className="mx-auto mt-8 grid max-w-[560px] grid-cols-2 gap-3 text-left max-[420px]:grid-cols-1">
            <div className="rounded-2xl bg-white p-5">
              <p className="m-0 flex min-h-7 items-center justify-between gap-2 text-[16px] font-semibold">
                Yearly
                <span className="rounded-full px-2.5 py-0.5 text-[15px] font-semibold" style={{ background: "#F9C832", color: INK }}>
                  Save {YEARLY_SAVING_PCT}%
                </span>
              </p>
              <p className={`m-0 mt-2 ${NUM}`}>{PRICE_YEARLY}</p>
              <p className="m-0 text-[16px]" style={{ color: MUTED }}>a year</p>
            </div>
            <div className="rounded-2xl bg-white p-5">
              <p className="m-0 flex min-h-7 items-center text-[16px] font-semibold">Monthly</p>
              <p className={`m-0 mt-2 ${NUM}`}>{PRICE_MONTHLY}</p>
              <p className="m-0 text-[16px]" style={{ color: MUTED }}>a month</p>
            </div>
          </div>
          <AppStoreBadge className="mt-8" />
        </div>
      </section>

      {/* FAQ, laid out like Mobbin's: the heading on the left, plain rounded rows
          on the right, one way out at the end. Native details, so the answers are
          in the HTML for search engines. */}
      <section id="faq" className={`${WRAP} pt-[clamp(72px,10vw,120px)]`}>
        <div className="grid gap-x-16 gap-y-8 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <h2 className={H2_ONE}>Frequently asked questions</h2>
          <div>
            {FAQS.map(({ q, a }) => (
              <details key={q} className="et-faq mb-3 rounded-2xl bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[19px] font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  {q}
                  <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" className="et-chev shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="m-0 px-6 pb-5 text-[19px] leading-[1.45]" style={{ color: MUTED }}>
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

      <SiteFooter />
    </main>
  );
}

/* ── Pieces ─────────────────────────────────────────────────────────────── */

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

/* The phone frame: a brushed edge, the screen, and the island. */
const IPHONE_CSS = `
.iphone { position: relative; box-sizing: border-box; padding: 7px; border-radius: 15% / 7.2%; background: linear-gradient(145deg, #9A9A9F 0%, #2A2A2D 22%, #4A4A4F 60%, #18181A 100%); box-shadow: 0 50px 90px -30px rgba(20, 30, 20, 0.5), 0 18px 36px -18px rgba(20, 30, 20, 0.35); }
.iphone-screen { position: relative; width: 100%; aspect-ratio: 1206 / 2622; border-radius: 13% / 6.2%; overflow: hidden; background: #000; }
.et-faq[open] .et-chev { transform: rotate(180deg); }
.et-chev { transition: transform 0.2s ease; }
.et-clip-still { position: absolute; inset: 0; }
.et-clip-video { position: relative; opacity: 0; }
.iphone-screen[data-live] .et-clip-video { opacity: 1; transition: opacity 0.15s linear; }
.iphone-screen img, .iphone-screen video { display: block; width: 100%; height: 100%; object-fit: cover; }

/* Tour timing bars, in real time: backswing, then downswing straight after it. */
[data-motion="armed"] .et-timed { clip-path: inset(0 100% 0 0); }
[data-motion="play"] .et-timed { clip-path: inset(0 0 0 0); transition: clip-path var(--et-dur) linear calc(var(--et-delay) + 0.2s); }

`;

/* `eager` for the hero's screens, which are on show from the first paint; every
   other phone waits until it is near the viewport. `clip` names a short silent
   screen recording that the hero carousel plays when this phone is in front; the
   still is its poster, so it looks the same until it plays. */
function Phone({ src, alt, className = "", eager = false, clip, priority = false }: { src: string; alt: string; className?: string; eager?: boolean; clip?: string; priority?: boolean }) {
  return (
    <div className={`iphone shrink-0 ${className}`}>
      <div className="iphone-screen">
        { }
        {/* 960 wide, cut from the full size App Store screenshots: the old 598 wide
            copies were stretched past their pixels on any sharp screen and read blurry. */}
        {clip ? (
          <>
            {/* No src and no poster on the first paint: the clip is attached by the
                carousel once the page has loaded. Before that, the video was the
                element the browser waited on, and both clips downloaded in full
                before anything else (the phone home page took 4 to 5 s to show its
                main picture). The still below covers it until it really plays. */}
            {/* iPhone Safari blanks a video to black from play() until its first
                frame decodes, and drops the poster for that gap. So the still is
                always showing underneath, and the video stays see-through on top
                until the carousel marks it as really playing. The still is never
                hidden: when it was, Safari took a frame to redraw it on the way
                back, and the phone flashed black each time the ring turned. */}
            <img src={`/elite-tempo/app/${src}.webp`} alt="" aria-hidden width={960} height={2087} className="et-clip-still" fetchPriority={priority ? "high" : eager ? "low" : undefined} />
            <video
              data-src={`/elite-tempo/app/${clip}.mp4`}
              aria-label={alt}
              width={960}
              height={2087}
              muted
              playsInline
              preload="none"
              className="et-clip-video"
            />
          </>
        ) : (
          <img src={`/elite-tempo/app/${src}.webp`} alt={alt} width={960} height={2087} loading={eager ? "eager" : "lazy"} fetchPriority={priority ? "high" : eager ? "low" : undefined} />
        )}
      </div>
    </div>
  );
}

/* A tall white card: heading, one line, and the phone rising from the bottom edge.
   All cards are white since 2026-11-04; each used to carry its own color wash. The
   card is a subgrid of its parent's rows, so cards side by side line up row by row. */
function TallCard({ title, src, alt, children }: { title: string; src: string; alt: string; children: ReactNode }) {
  return (
    <article className="row-span-3 mb-4 grid grid-rows-subgrid overflow-hidden rounded-[28px] bg-white px-8 pt-8">
      <h2 className="m-0 text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] [text-wrap:balance]">{title}</h2>
      <p className="m-0 mt-3 text-[19px] leading-[1.35]" style={{ color: MUTED }}>
        {children}
      </p>
      <div className="mt-8 h-[460px] overflow-hidden">
        <Phone src={src} alt={alt} className="mx-auto w-[270px]" />
      </div>
    </article>
  );
}

