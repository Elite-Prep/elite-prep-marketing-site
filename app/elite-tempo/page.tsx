import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import DarkTimingPlayer, { type DarkShot } from "./DarkTimingPlayer";
import {
  FEATURED,
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
  YEARLY_SAVING_PCT,
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
    title: "Elite Tempo. Time your whole shot, from routine to impact.",
    description:
      `Golf tempo, timed by hand to 1/100s. Film your own swing, mark takeaway, top and impact on a frame-accurate scrubber, and get your four numbers. Train hands-free with beats in your headphones. Free for ${TRIAL_DAYS} days, then ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Tempo. Time your whole shot, from routine to impact.",
    description: `Golf tempo, timed by hand to 1/100s. Auto swing capture, hands-free. Free ${TRIAL_DAYS}-day trial, then ${PRICE_YEARLY} a year.`,
  },
};

/* Named shots the copy below quotes by name. Pulled from the library so the prose
   and the cards can never disagree; declared above FAQS because that array reads
   them at module load. */
const RORY = FEATURED[1];
const COUPLES = FEATURED[2];

/* Answers the questions people actually search, which "Elite Tempo" is not. Every
   one of these is lifted from the People Also Ask box on "elite tempo golf" and
   "tour tempo", so they are known real queries rather than guesses. Rendered as
   visible copy AND as FAQPage structured data, because AI answer engines quote the
   markup and Google builds the expandable sub-rows from it. */
const FAQS: { q: string; a: string }[] = [
  {
    q: "Do I have to change my swing?",
    a: "No. You can train to the tempo of your own best swing.",
  },
  {
    q: "What is golf swing tempo?",
    a: "Tempo is the ratio between the time your backswing takes and the time your downswing takes, not how fast you swing overall. Tour players are remarkably consistent at it, which is why it is trainable: you are copying timing, not speed.",
  },
  {
    q: "What is the 3 to 1 tempo ratio?",
    a: "Most tour players take about three times as long to complete the backswing as the downswing, a 3:1 ratio, often counted as 24 frames back and 8 frames down at 30fps. Elite Tempo plays that ratio as three beats so you can feel it instead of counting it.",
  },
  {
    q: "What is Rory McIlroy's swing tempo?",
    /* Built from the library rather than typed, for the same reason as everything
       else on this page — and this one is quoted more than any other, because it
       is the answer the rest of the web gets wrong. Search engines return "a
       textbook 3:1" for Rory; the actual marks say 2.45:1. */
    a:
      `Elite Tempo hand-times real broadcast footage to 1/100 of a second. Rory's ${RORY.year} ` +
      `${RORY.event} driver swing is a ${fmtSeconds(RORY.back)} backswing and a ${fmtSeconds(RORY.down)} ` +
      `downswing, so a ${fmtRatio(RORY)} ratio over ${fmtSeconds(RORY.total)}, noticeably quicker than the ` +
      `"3:1" most coaching copy quotes. Compare that with Tiger's ${fmtRatio(HERO_SWING)} driver at the ` +
      `2000 Open Championship and Fred Couples' ${fmtRatio(COUPLES)} fairway wood at the 1992 Masters. ` +
      `You can train against any of them.`,
  },
  {
    q: "Does a golf tempo trainer actually work?",
    a: "Tempo is one of the few parts of the swing you can change without rebuilding your mechanics, because it is timing rather than positions. The catch with most tools is that they only give you a target. Elite Tempo also lets you film your own swing and mark takeaway, top and impact on it frame by frame, so you can see whether you actually matched the target rather than guessing.",
  },
  {
    q: "How is Elite Tempo different from a metronome?",
    a: "A metronome gives you an even beat. A golf swing is not even. The backswing is roughly three times the downswing, so Elite Tempo plays beats spaced at real tour ratios and then measures your swing against them. You film your own swing and mark takeaway, top and impact on it, so you get your own four numbers to compare against.",
  },
  {
    q: "How much does Elite Tempo cost?",
    a: `Elite Tempo is free to download and free to try for ${TRIAL_DAYS} days. After that it is ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month, and you can cancel anytime. The yearly plan works out about ${YEARLY_SAVING_PCT}% cheaper than paying monthly.`,
  },
  {
    q: "Do I need any extra hardware?",
    a: "No. It runs on the iPhone you already own. Record a swing with the camera or import a clip you already have. A lock-screen Live Activity shows your tempo while it plays, and it mirrors to the Apple Watch Smart Stack if you wear one. There is no separate Watch app to install.",
  },
];

/* The tempo figures used to live here as a hand-typed array, and every single one
   of them was wrong against the app. They now come from `data/tempo-data`, which
   derives them from a verbatim copy of the app's own seed file and fails the build
   if the two disagree. See the header of that module for the full story.

   HERO_SWING is Tiger's 2000 Open Championship driver, the app's marquee preset:
   all four numbers in the stat band come off the same three marks, so the band
   cannot contradict itself. */
const HERO = HERO_SWING;

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
              Time your whole shot,
              <br />
              from routine to impact.
            </h1>
            <p className={`mx-auto mt-[22px] max-w-[30em] ${LEDE} tracking-[-0.01em]`} style={{ color: "#4A4B50" }}>
              For every part of your game: tee shots, approach shots, short game and putting.
              So you play your best when it matters most.
            </p>
            <AppStoreBadge className="mt-7" />
            <p className="mt-3.5 text-[15px]" style={{ color: "#4A4B50" }}>
              <span style={{ color: INK }} aria-hidden>
                ★★★★★
              </span>{" "}
              Rated 5.0 on the App Store. {TRIAL_DAYS} days free.
            </p>
          </div>

          <div className="mt-12 flex h-[clamp(440px,62vw,680px)] items-start justify-center">
            <Phone src="player" alt="A golfer's own swing playing in Elite Tempo with tempo 3.0:1." className="mr-[-40px] mt-20 w-[clamp(170px,24vw,300px)] -rotate-[7deg]" />
            <Phone src="routine" alt="A pre-shot routine in Elite Tempo with its steps on the timeline, 23.9 seconds to impact." className="z-[1] w-[clamp(200px,28vw,350px)]" />
            <Phone src="detail" alt="A swing's four numbers in Elite Tempo: tempo, backswing, downswing and total." className="ml-[-40px] mt-20 w-[clamp(170px,24vw,300px)] rotate-[7deg]" />
          </div>
        </section>
      </div>

      {/* Every part of the game, playable. */}
      <section className={`${WRAP} pt-[clamp(72px,10vw,136px)] text-center`}>
        <h2 className={H2_BIG}>Time every part of your game.</h2>
        <p className={`mx-auto mt-4 max-w-[30em] ${LEDE}`} style={{ color: "#6E6F75" }}>
          Pick a part of the game, press play, and hear the timing of a real tournament shot.
        </p>
        <DarkTimingPlayer shots={DARK_SHOTS} />
        <p className="mt-5" style={{ color: "#6E6F75" }}>
          On the range, keep your phone in your bag and hear your timing through your headphones.
        </p>
      </section>

      {/* Three tall cards. */}
      <section className={`${WRAP} pt-[clamp(72px,10vw,136px)]`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
          <TallCard title="Time your best swings" ink="#47402A" bg="linear-gradient(180deg, #FFF3C4 0%, #FBD860 100%)" src="player" alt="A golfer's own swing playing in Elite Tempo.">
            Film a swing or pick one from Photos, mark it, and hear your own timing.
          </TallCard>
          <TallCard title="Four numbers in every swing" ink="#24412F" bg="linear-gradient(180deg, #DDF3E4 0%, #8FD6A9 100%)" src="detail" alt="Tempo, backswing, downswing and total for one swing in Elite Tempo.">
            Backswing, downswing, total time and tempo, the ratio between the two.
          </TallCard>
          <TallCard title="Rehearse your routine" ink="#453C2C" bg="linear-gradient(180deg, #F3EEE3 0%, #DCCDB0 100%)" src="practice" alt="Routine practice in Elite Tempo with the current step lit up.">
            Each step of your pre-shot routine lights up as you reach it.
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
              Groove a pre-shot routine you can repeat inside the 40 seconds the USGA and The
              R&amp;A recommend, so a quicker pace feels normal.
            </p>
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
            Rory&apos;s driver swing takes {RORY.total.toFixed(2)} seconds. Tiger&apos;s took{" "}
            {HERO.total.toFixed(2)}. Train to {SWINGS.length} real tournament shots, each hand-timed to
            1/100 of a second.
          </p>
          <div className="mt-8">
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
                  <div className="rounded-l-[7px]" style={{ width: `${(g.back / LONGEST_GREAT) * 100}%`, background: INK }} />
                  <div className="rounded-r-[7px]" style={{ width: `${(g.down / LONGEST_GREAT) * 100}%`, background: "#F9C832" }} />
                </div>
                <p className="m-0 text-[30px] font-semibold tracking-[-0.02em] [font-variant-numeric:tabular-nums]">{fmtRatio(g)}</p>
              </Link>
            ))}
          </div>
          <Link href="/elite-tempo/tempos" className="mt-4 inline-block text-[16px] font-semibold underline underline-offset-4">
            See all {SWINGS.length} hand-timed swings
          </Link>
        </div>
      </section>

      {/* Practice speed. */}
      <section className={`${WRAP} pt-4`}>
        <div
          className="box-border flex min-h-[620px] flex-wrap items-center gap-x-[clamp(32px,6vw,80px)] gap-y-8 overflow-hidden rounded-[28px] px-[clamp(24px,5vw,64px)] pt-[clamp(32px,5vw,64px)] text-white"
          style={{ background: "radial-gradient(70% 100% at 80% 100%, #1F9A5E 0%, rgba(31, 154, 94, 0) 75%), #0B2A1E" }}
        >
          <div className="mx-auto h-[560px] w-[300px] flex-[0_1_300px] self-end">
            <Phone src="options" alt="Elite Tempo's Player options with speed set to 90%." />
          </div>
          <div className="min-w-0 flex-[1_1_400px] pb-8">
            <h2 className={H2_MID}>Practice at 75%, 90% or full speed.</h2>
            <p className="mt-4 max-w-[26em] text-[21px] leading-[1.35]" style={{ color: "rgba(255,255,255,0.8)" }}>
              Slow the same timing down to groove the feel, then bring it back to full speed for
              the range or the course.
            </p>
          </div>
        </div>
      </section>

      {/* Streak and share. */}
      <section className={`${WRAP} pt-4`}>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-4">
          <TallCard title="Keep your weekly streak" ink="#4A3A2A" bg="linear-gradient(180deg, #FFEBDC 0%, #FFC08F 100%)" src="stats" alt="Stats in Elite Tempo: 3 weeks in a row.">
            Set a weekly goal. One range day a week keeps it going.
          </TallCard>
          <TallCard title="Share your timing" ink="#26344F" bg="linear-gradient(180deg, #E4EEFF 0%, #A9C8FF 100%)" src="share" alt="An Elite Tempo share card with a swing's four numbers.">
            Send your four numbers to a coach or a friend as one clean card.
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
            <br />
            before you pay a thing.
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
          Every tempo app made me pick a ratio, and I always ended up changing my swing to fit it.
          I wanted to copy my own best swing and the best players in the world, so we built that.
        </p>
        <p className="mt-3.5 text-base" style={{ color: "#6E6F75" }}>
          Eric Busalacchi, Elite Tempo
        </p>
      </section>

      {/* FAQ: native details, so the answers are in the HTML for search engines. */}
      <section id="faq" className="mx-auto max-w-[760px] px-4 pt-[clamp(72px,10vw,120px)]">
        <h2 className={H2_MID}>Questions</h2>
        <div className="mt-6">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="mb-2 rounded-2xl bg-white px-5">
              <summary className="cursor-pointer list-none py-4 text-[18px] font-semibold marker:content-none">{q}</summary>
              <p className="m-0 pb-[18px] text-[17px]" style={{ color: "#55565C" }}>
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <footer className={`${WRAP} pb-10 pt-[clamp(72px,10vw,120px)]`}>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <Wordmark />
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]" style={{ color: "#55565C" }}>
            <Link href="/elite-tempo/privacy" className="no-underline">Privacy</Link>
            <Link href="/elite-tempo/terms" className="no-underline">Terms</Link>
            <a href="mailto:ebusalacchi@eliteprep.app" className="no-underline">Contact</a>
            <Link href="/" className="no-underline">Elite Prep</Link>
          </nav>
        </div>
        <p className="mt-6 max-w-[62em] text-sm leading-[1.5]" style={{ color: "#6E6F75" }}>
          Part of the Elite Prep family. Elite Tempo references real golfers, tournaments, and shots
          for descriptive and educational purposes only, and is not affiliated with, sponsored by, or
          endorsed by any player, tournament, tour, or organization named in the app. All names and
          trademarks belong to their respective owners.
        </p>
        <p className="mt-2 text-sm" style={{ color: "#6E6F75" }}>
          © {new Date().getFullYear()} Elite Prep Inc.
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
.iphone-screen img { display: block; width: 100%; height: 100%; object-fit: cover; }
`;

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`iphone shrink-0 ${className}`}>
      <div className="iphone-screen">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/elite-tempo/app/${src}.png`} alt={alt} loading="lazy" />
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
  children,
}: {
  title: string;
  ink: string;
  bg: string;
  src: string;
  alt: string;
  children: ReactNode;
}) {
  return (
    <article className="box-border h-[640px] overflow-hidden rounded-[28px] px-8 pt-8" style={{ background: bg }}>
      <h2 className="m-0 text-[38px] font-semibold leading-[1.08] tracking-[-0.03em]">{title}</h2>
      <p className="mt-3 text-[19px] leading-[1.32]" style={{ color: ink }}>
        {children}
      </p>
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
