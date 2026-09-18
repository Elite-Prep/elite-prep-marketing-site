import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import EmailCapture from "./EmailCapture";
import BeatTicks from "./BeatTicks";
import BudFlank from "./BudFlank";
import TempoListMock from "./TempoListMock";
import {
  FEATURED,
  HERO_SWING,
  SWINGS,
  fmtRatio,
  fmtSeconds,
  shortClub,
  shortEvent,
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
  FAINT,
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

/* Three links, not six. ReciMe's header carries exactly three (FAQs, Gift Cards,
   Log In) plus one button, clustered hard right with a wide empty gap after the
   logo, and that space is what makes it read as calm. Six grey links spread across
   the middle read as a dense strip instead. The ids stay on all seven sections, so
   deep links like /elite-tempo#compare still work, they are just not all in the bar.
   Pricing and FAQ are what people hunt for; the greats is the marquee feature. */
const SECTIONS = [
  { id: "greats", label: "The Greats" },
  /* Features points at the time-your-own-swing section: it is the first feature
     section that is not already its own link, since The Greats takes that slot. */
  { id: "your-swing", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQs" },
];


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
    title: "Elite Tempo. Copy the greats. Copy your best.",
    description:
      `Golf tempo, timed by hand to 1/100s. Film your own swing, mark takeaway, top and impact on a frame-accurate scrubber, and get your four numbers. Train hands-free with beats in your headphones. Free for ${TRIAL_DAYS} days, then ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Tempo. Copy the greats. Copy your best.",
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
    q: "What is golf swing tempo?",
    a: "Tempo is the ratio between the time your backswing takes and the time your downswing takes, not how fast you swing overall. Tour players are remarkably consistent at it, which is why it is trainable: you are copying a rhythm, not a speed.",
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
      `downswing, so a ${fmtRatio(RORY)} ratio over ${fmtSeconds(RORY.total)} — noticeably quicker than the ` +
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
    a: "No. It runs on the iPhone you already own. Record a swing with the camera or import a clip you already have. A lock-screen Live Activity shows your tempo while it plays, and it mirrors to the Apple Watch Smart Stack if you wear one — there is no separate Watch app to install.",
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
        "Hands-free training with beats in your headphones",
        "Lock-screen Live Activity, mirrored to the Apple Watch Smart Stack",
      ],
      publisher: {
        "@type": "Organization",
        name: "Elite Prep, LLC",
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

export default function EliteTempoLanding() {
  return (
    /* The app's canvas, ported. Theme.swift is a ZStack of bg plus
       RadialGradient(accent.opacity(0.06) to clear, center: .topTrailing,
       endRadius: 620), described there as "a hint of warmth, not a brown wash".
       Opacity is kept at exactly 0.06 on purpose: DESIGN.md records a heavier pass
       (0.16 over a 520pt radius, plus a second linear wash) that "tinted the whole
       upper screen brown, the exact failure Theme.canvas warns about", and was
       pulled back. The radius is scaled up for a desktop viewport but stays a
       corner glow that fades out well before mid-page, so 8000px of page below it
       is untinted rather than washed. */
    <main
      /* Flat, not a corner glow. The app ran a gradient canvas and retired it
         in 1.4.12: a gradient makes contrast positional, so you cannot quote a
         ratio without saying where on the screen it applies. Grey 900 everywhere
         means ink reads 14.85:1 at every point on the page. */
      style={{ background: BG, color: INK }}
      className="min-h-screen"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />
      {/* Nav. Sticky so the section links stay reachable after you have jumped,
          which is the whole point of having them. The links are hidden below lg
          rather than crammed or hamburgered: the page is short enough to scroll
          on a phone, and the Download CTA is what matters there. */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(34, 34, 34, 0.85)", borderBottom: `1px solid ${HAIRLINE}` }}
      >
        {/* Wordmark hard left, everything else hard right, so the gap between them
            does the work. The links are INK rather than MUTED: grey made them read
            as disabled next to a saturated gold pill. */}
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Wordmark />
          <div className="flex items-center gap-8 sm:gap-10">
            <nav aria-label="Page sections" className="hidden items-center gap-8 md:flex">
              {SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="text-sm font-semibold transition-colors duration-150 hover:text-[#B3ECFF]"
                  style={{ color: INK }}
                >
                  {label}
                </a>
              ))}
            </nav>
            {/* A gold FIELD with near-black ink. This was a gold outline with gold
                ink, on the reasoning that an outline keeps the header secondary so
                the white App Store badges stay primary. The hierarchy argument was
                right; the execution used gold twice as a colour on a dark ground,
                which the app measures as reading DIMMER than the white nav links
                beside it. Flipped contrast gets the same hierarchy honestly. */}
            <a
              href={APP_STORE_URL}
              className="shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 hover:brightness-[1.08] active:scale-[0.98]"
              style={{ background: ACCENT, color: ON_ACCENT }}
            >
              Try now for free
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-8 pt-10 sm:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: MUTED }}
              >
                Golf tempo and timing trainer
              </p>
              <h1
                className="mt-4 text-4xl font-semibold leading-[1.05] sm:text-5xl"
                style={{ color: INK }}
              >
                Copy the greats.
                <br />
                <span style={{ color: INK }}>Copy your best.</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
                Copy the tempo of the greats. Capture your best tempo and
                routine. Repeat it when it matters most.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <AppStoreButton />
                <span className="text-sm" style={{ color: MUTED }}>
                  Free to try · <strong style={{ color: INK }}>{TRIAL_DAYS} days free</strong>, then {PRICE_YEARLY}/yr · or {PRICE_MONTHLY}/mo
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <PhoneStage src="/elite-tempo/hero-loop.mp4" poster="/elite-tempo/hero-loop-poster.jpg" />
          </Reveal>
        </div>
      </section>

      {/* Stat band — the four numbers. Rendered, never animated. CountUp counted
          these up from zero on scroll, which meant any renderer that snapshotted
          early captured a fraction of the real figure: Google indexed Tiger's 3.69
          ratio as "0.74:1", and three separate screenshot passes here caught
          "0.33:1", "0.13:1" and "0.09s". A measurement that displays wrong most of
          the time it is looked at is worse than a static one, and these are the
          numbers the whole page is about. Labels and order follow the app's own
          ThreeNumbersView: tempo ratio, total swing duration, then the two halves
          timed separately. The third cell is the pair, not a fourth number, which
          is why the app calls it "Backswing, downswing" on one row. */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          {/* The claim leads, the band proves it. This sentence is the single
              sharpest thing the page says, and it used to sit UNDER the numbers in
              14px grey — the differentiator styled as a footnote. Promoted to the
              section heading, with the shot it is measured from demoted to the
              caption underneath, which is the detail rather than the point. */}
          {/* Four, not three. The App Store listing headlines "4 metrics no other
              app captures" and the app's own onboarding lists them one to four, so
              a site saying "three" was the odd one out — it only got to three by
              pairing backswing and downswing into a single cell. Same claim, same
              count, everywhere. */}
          <h2
            className="text-center text-2xl font-semibold leading-tight sm:text-3xl"
            style={{ color: INK }}
          >
            The four numbers no other app captures.
          </h2>
          {/* Two-up on a phone, four across from md. The order follows the app's
              onboarding: the two halves, then the whole, then the ratio they make. */}
          <div
            className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4"
            style={{ background: HAIRLINE, border: `1px solid ${HAIRLINE}` }}
          >
            <StatCell big={<>{fmtSeconds(HERO.back)}</>} label="Backswing" />
            <StatCell big={<>{fmtSeconds(HERO.down)}</>} label="Downswing" />
            <StatCell big={<>{fmtSeconds(HERO.total)}</>} label="Total duration" />
            <StatCell big={<>{fmtRatio(HERO)}</>} label="Tempo ratio" />
          </div>
          <p className="mt-5 text-center text-sm" style={{ color: MUTED }}>
            {/* The article is in the sentence, so the event's own leading "The" has
                to come off or it reads "at the The Open Championship". Only the
                leading article is stripped — the rest of the name stays intact, so
                "PGA Championship" and "Qatar Masters" still read correctly. */}
            Measured from {HERO.player}&apos;s {HERO.clubLabel.toLowerCase()} at the{" "}
            {HERO.year} {HERO.event.replace(/^The /, "")}.{" "}
            <Link
              href={`/elite-tempo/tempo/${HERO.slug}`}
              className="font-semibold underline decoration-1 underline-offset-4 hover:text-[#B3ECFF]"
              style={{ color: INK }}
            >
              See the marks
            </Link>
          </p>
        </Reveal>
      </section>

      <Divider />

      {/* Time the greats — the library, with the in-app list rendered from its data.
          The heading moved out of its own centered block and into the text column:
          centered-heading-then-two-columns left the copy column holding three lines
          against a 600px phone, so the section opened with a band of dead black.
          The column now carries heading, copy, the four ratios and the link out, and
          reads as a peer of the phone rather than a caption for it. */}
      <section id="greats" className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal delay={0.1}>
            {/* Not a screen recording. See TempoListMock — the clip that was here
                showed Tiger at 3.17:1 beside a card reading 3.69:1. */}
            <PhoneStage>
              <TempoListMock />
            </PhoneStage>
          </Reveal>
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
                Copy the greats
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl" style={{ color: INK }}>
                Real tournament swings,
                <br />
                meticulously timed.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
                {SWINGS.length} shots from players at their peak, each one hand-timed
                from tournament footage to 1/100 of a second. Not a metronome preset
                — the real rhythm of the real swing.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {FEATURED.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/elite-tempo/tempo/${g.slug}`}
                    className="rounded-2xl p-4 transition-all duration-300 hover:scale-[1.03]"
                    style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
                  >
                    <p
                      className="text-2xl font-semibold tabular-nums"
                      style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
                    >
                      {fmtRatio(g)}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold" style={{ color: INK }}>
                      {g.player}
                    </p>
                    {/* One line, not three. The backswing and downswing split lives in
                        the stat band above; repeating it on all four cards was the
                        clutter. */}
                    <p className="text-xs" style={{ color: MUTED }}>
                      {g.year} {shortEvent(g.event)} · {shortClub(g.clubLabel)}
                    </p>
                  </Link>
                ))}
              </div>

              <Link
                href="/elite-tempo/tempos"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#B3ECFF]"
                style={{ color: INK }}
              >
                See all {SWINGS.length} hand-timed swings
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* Time yourself — capture your own swing and groove it on a loop */}
      <section id="your-swing" className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
                Time your own swing
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl" style={{ color: INK }}>
                Film your swing.
                <br />
                Mark three points.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
                Takeaway, top of the backswing, impact. A frame-accurate
                scrubber puts each one exactly where it belongs, so the four
                numbers you get are measured rather than estimated. Then groove
                it on a loop until the move is yours.
              </p>
              {/* Three marks, so the copy column carries the same weight as the
                  phone beside it. Before this the column held a heading and one
                  paragraph against a 600px device and the section opened with a
                  slab of empty black. It is also the clearest way to say what
                  "times it for you" actually means. */}
              <ThreeMarks />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <PhoneStage src="/elite-tempo/swing-loop.mp4" poster="/elite-tempo/swing-loop-poster.jpg" />
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* Compare — featured: the self-vs-self side-by-side clip, full visual weight */}
      <section id="compare" className="mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
              Compare
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl" style={{ color: INK }}>
              See the gap, side by side.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
              Two swings, looping in lockstep. The tempo difference is impossible to miss.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex justify-center">
            <PhoneStage src="/elite-tempo/compare-loop.mp4" poster="/elite-tempo/compare-loop-poster.jpg" max={340} />
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* Time your routine — time and groove the whole pre-shot routine */}
      <section id="routine" className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div className="md:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
                Time your routine
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl" style={{ color: INK }}>
                Groove the whole
                <br />
                pre-shot routine.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
                Time your full routine, then drill it two ways: watch it back live,
                or practice with a live timer and audible feedback until it&apos;s perfected.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="md:order-1">
              <PhoneStage src="/elite-tempo/routine-loop.mp4" poster="/elite-tempo/routine-loop-poster.jpg" />
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* Live Activity / lock screen — glanceable timing away from the app.
          There is no Watch app to screenshot: the Live Activity is an iOS widget
          that watchOS 11+ mirrors into the Smart Stack on its own. */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
                Hands-free
              </p>
              <h2 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl" style={{ color: INK }}>
                Beats in your ears.
                <br />
                Phone in your bag.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
                Headphones in, phone in your bag, eyes on the ball. Your tempo
                stays on the lock screen while it plays, and iOS mirrors it to the
                Apple Watch Smart Stack, a glance away.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {/* Ladder-style: phone centered, one AirPod flanking each side, each
                sitting on a gold glow ring — the beat radiating out (gold = the
                live-timing signal). Buds sit just outside the phone edges. */}
            {/* The lock screen was a full-height 600x1220 capture of which roughly
                three quarters was empty black, and `topFade` blacked out most of
                what was left — so on a near-black page the frame had almost nothing
                in it and read as a failed image rather than a device. The asset is
                now cropped to 600x800, which ends just below the Live Activity card
                and drops the empty lower half. The clock stays: it is what makes the
                frame legible as a lock screen at a glance, which was the whole point
                of the section, so it is context rather than clutter and no longer
                needs fading out. */}
            <div className="relative mx-auto w-fit px-10 sm:px-14">
              <DeviceFrame
                img="/elite-tempo/lock-activity.jpg"
                alt="An iPhone lock screen showing the Elite Tempo Live Activity: a 6 iron fade playing back at a 3.22:1 tempo over 1.06 seconds."
                notch={false}
                max={300}
              />

              {/* The card sits about two thirds down the cropped frame; the buds
                  straddle it, left just above and right just below. */}
              <BudFlank src="/elite-tempo/airpod-left.png" side="left" topPct={62} />
              <BudFlank src="/elite-tempo/airpod-right.png" side="right" topPct={78} />
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* Pricing — free to download, then a 14-day free trial into yearly or monthly.
          Lifetime used to be the hero price here and had to go: it is retired in the
          app, so advertising it sent people to a paywall that could not sell it. */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <div
            className="mx-auto max-w-xl rounded-3xl p-8 text-center sm:p-12"
            style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
              Free to download
            </p>

            {/* Two equal plan boxes, side by side, stacking on a phone. Yearly is
                marked as the better deal with a gold border and a SAVE badge; the
                badge is a gold FIELD with black onAccent ink, which is the
                sanctioned form of gold per DESIGN.md, not gold used as ink on a
                dark surface. Prices stay INK so the badge is the only thing
                competing for the eye. grid + h-full keeps both boxes identical
                whatever the copy length. */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div
                className="relative flex h-full flex-col rounded-2xl px-6 pb-6 pt-7"
                style={{ background: BG, border: `1px solid ${ACCENT}` }}
              >
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]"
                  style={{ background: ACCENT, color: ON_ACCENT }}
                >
                  Save {YEARLY_SAVING_PCT}%
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: MUTED }}>
                  Yearly
                </p>
                <p className="mt-3 text-4xl font-semibold leading-none" style={{ color: INK }}>
                  {PRICE_YEARLY}
                </p>
                <p className="mt-1.5 text-sm font-semibold" style={{ color: MUTED }}>
                  a year
                </p>
              </div>

              <div
                className="relative flex h-full flex-col rounded-2xl px-6 pb-6 pt-7"
                style={{ background: BG, border: `1px solid ${HAIRLINE}` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: MUTED }}>
                  Monthly
                </p>
                <p className="mt-3 text-4xl font-semibold leading-none" style={{ color: INK }}>
                  {PRICE_MONTHLY}
                </p>
                <p className="mt-1.5 text-sm font-semibold" style={{ color: MUTED }}>
                  a month
                </p>
              </div>
            </div>

            {/* Said once, under both, because it is true of both. It used to be
                printed inside each plan box in identical words, which made the
                boxes look like they differed in some way they did not and pushed
                the prices apart for no reason. */}
            <p className="mt-5 text-sm font-semibold" style={{ color: MUTED }}>
              Both plans are free for {TRIAL_DAYS} days. Cancel anytime.
            </p>

            {/* max-w-sm, not max-w-xs. At 320px two of these five wrapped to a
                second line, so the tick column went ragged inside a card nearly
                twice that wide. */}
            <ul className="mx-auto mt-7 flex max-w-sm flex-col gap-2.5 text-left">
              {[
                "The full library of hand-timed greats",
                "Your own swings, marked frame by frame and saved",
                "Side-by-side Compare",
                "Routines, Watch and Practice",
                "Lock-screen Live Activity, mirrored to Apple Watch",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: MUTED }}>
                  <span className="mt-0.5 font-semibold" style={{ color: ACCENT }} aria-hidden>
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center">
              <AppStoreButton />
            </div>
            {/* Tightened. The old line ran to two ragged centered lines and told
                you to "play a tempo in every area", which is app vocabulary, not
                something a golfer would say. */}
            <p className="mt-4 text-xs" style={{ color: MUTED }}>
              Time one of your own swings before you pay a thing.
            </p>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* FAQ — the real SEO surface. Nobody searches "Elite Tempo"; they search
          "what is the 3 to 1 tempo ratio". Native <details> so the answers are in
          the initial HTML for crawlers rather than behind JavaScript. */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
        <Reveal>
          {/* Last word in gold, the way ReciMe puts the last word of its FAQ
              heading in brand blue. */}
          <h2 className="text-center text-3xl font-semibold sm:text-4xl" style={{ color: INK }}>
            Golf swing tempo,{" "}
            <span style={{ color: INK }}>answered</span>
          </h2>

          {/* Hairline-divided rows rather than a stack of cards, matching ReciMe:
              the questions carry the eye down a single column instead of being
              chopped into seven boxes. borderTop on the wrapper draws the rule
              above the first row so the set reads as one list. Still native
              <details>, so every answer stays in the initial HTML for crawlers. */}
          <div className="mt-10" style={{ borderTop: `1px solid ${HAIRLINE}` }}>
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 marker:content-none">
                  <span className="text-base font-semibold sm:text-lg" style={{ color: INK }}>
                    {q}
                  </span>
                  {/* + when closed, minus sign when open. U+2212 MINUS SIGN, an icon
                      inside an aria-hidden span, not prose punctuation, so the copy
                      rule on em and en dashes does not apply. */}
                  <span
                    className="shrink-0 text-2xl font-light leading-none"
                    style={{ color: ACCENT }}
                    aria-hidden
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">&#8722;</span>
                  </span>
                </summary>
                <p className="pb-5 pr-10 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {a}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Cheat sheet email capture */}
      <section className="mx-auto max-w-2xl px-6 pb-24">
        <Reveal>
          <div className="text-center">
            <h2 className="text-2xl font-semibold sm:text-3xl" style={{ color: INK }}>
              Get the Elite Tempo cheat sheet
            </h2>
            <p className="mx-auto mt-3 max-w-md text-base" style={{ color: MUTED }}>
              The duration and ratio of golf&apos;s most famous swings, free,
              straight to your inbox.
            </p>
          </div>
          <div className="mt-7">
            <EmailCapture />
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${HAIRLINE}` }}>
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <Wordmark />
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" style={{ color: MUTED }}>
              <Link href="/elite-tempo/privacy" className="hover:opacity-80">
                Privacy
              </Link>
              <Link href="/elite-tempo/terms" className="hover:opacity-80">
                Terms
              </Link>
              <a href="mailto:ebusalacchi@eliteprep.app" className="hover:opacity-80">
                Contact
              </a>
              <Link href="/" className="hover:opacity-80">
                Elite Prep
              </Link>
            </nav>
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed" style={{ color: FAINT }}>
            Part of the Elite Prep family. Elite Tempo references real golfers,
            tournaments, and shots for descriptive and educational purposes
            only, and is not affiliated with, sponsored by, or endorsed by any
            player, tournament, tour, or organization named in the app. All
            names and trademarks belong to their respective owners.
          </p>
          <p className="mt-4 text-xs" style={{ color: FAINT }}>
            © {new Date().getFullYear()} Elite Prep LLC.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ── Pieces ─────────────────────────────────────────────────────────────── */

// Animated beat-tick equalizer between sections — the brand's "this is running"
// signal, doubling as connective tissue that breaks up the vertical rhythm.
function Divider() {
  return (
    <div className="flex justify-center py-4 sm:py-6" aria-hidden>
      <BeatTicks heights={[10, 18, 10, 28, 10, 18, 10]} barWidth={4} gap={5} />
    </div>
  );
}

function Wordmark() {
  return (
    <div
      className="flex items-center gap-2.5"
      aria-label="Elite Tempo"
    >
      <EliteTempoMark size={22} fill={ACCENT} />
      <span
        className="text-[19px] leading-none"
        style={{ color: INK, fontWeight: W_WORDMARK, letterSpacing: TRACKING_MARK }}
      >
        ELITE TEMPO
      </span>
    </div>
  );
}

// The official "Download on the App Store" lockup: black badge, white Apple
// glyph + text. Apple's guidelines forbid recoloring their badge or building a
// custom one with their logo, so the primary CTA uses the standard black badge
// (a thin border lifts it off the near-black canvas). Drop in Apple's exact SVG
// asset later if you want it pixel-identical.
function AppStoreButton() {
  return (
    <a
      href={APP_STORE_URL}
      /* Was #000000 on a #0B0B0C canvas: 1.04:1, so the badge was invisible apart
         from its border and only the faint outline said "button". Apple's marketing
         guidelines offer a black and a white badge and ask for the white one on dark
         backgrounds, which is also 19.4:1 here. Now that the header CTA is outlined,
         this is the one filled button on the page, which is the right hierarchy. */
      className="inline-flex items-center gap-2.5 rounded-xl px-5 py-3 transition duration-200 hover:scale-[1.03] active:scale-[0.98]"
      style={{ background: "#FFFFFF", color: ON_ACCENT }}
      aria-label="Download Elite Tempo on the App Store"
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

// Media inside a black phone bezel, so it reads as a device screen (not a raw
// screen recording). Pass `src` for a looping clip, `img` for a still, or
// `children` to render a live DOM screen — which is what the greats section now
// does, because any baked-in media eventually disagrees with the data beside it.
function DeviceFrame({
  src,
  poster,
  img,
  alt = "",
  children,
  notch = true,
  max = 280,
}: {
  src?: string;
  poster?: string;
  img?: string;
  alt?: string;
  children?: React.ReactNode;
  notch?: boolean;
  max?: number;
}) {
  return (
    <div
      className="relative transition-all duration-300 will-change-transform hover:scale-[1.02]"
      style={{
        maxWidth: max,
        width: "100%",
        background: "#0A0A0C",
        borderRadius: 44,
        padding: 9,
        border: "1px solid #2C2C33",
        boxShadow: "0 34px 90px -32px rgba(0,0,0,0.85)",
      }}
    >
      {notch && (
        <div
          className="absolute left-1/2 top-[14px] z-10 -translate-x-1/2"
          style={{ width: 84, height: 22, background: "#0A0A0C", borderRadius: 999 }}
          aria-hidden
        />
      )}
      <div className="relative" style={{ borderRadius: 36, overflow: "hidden" }}>
        {children ? (
          /* A live screen. aspect-[9/19.5] matches the media the other frames
             carry, so a DOM screen and a clip sit at the same size in a row. */
          <div className="aspect-[9/19.5] w-full overflow-hidden">{children}</div>
        ) : img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt={alt} className="block h-auto w-full" />
        ) : (
          <video src={src} poster={poster} autoPlay loop muted playsInline className="block h-auto w-full" />
        )}
      </div>
    </div>
  );
}

// Phone media on a "stage": a device-framed screen in a card.
//
// The gold beat-tick pair that used to flank every stage is gone. The motif was
// appearing about fifteen times on one page — once in each wordmark, twice per
// stage, and once in every section divider — and at 3px wide in gold, pinned to
// the far edges of a card, the flanking pair read as specks of dust rather than
// as branding. The dividers keep the motif doing real work (they mark section
// boundaries); the decorative repetition is what diluted it.
function PhoneStage({
  src,
  poster,
  img,
  alt,
  children,
  notch,
  max,
}: {
  src?: string;
  poster?: string;
  img?: string;
  alt?: string;
  children?: React.ReactNode;
  notch?: boolean;
  max?: number;
}) {
  return (
    <div
      className="relative flex items-center justify-center rounded-[34px] px-8 py-9 sm:px-12"
      style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
    >
      <DeviceFrame src={src} poster={poster} img={img} alt={alt} notch={notch} max={max}>
        {children}
      </DeviceFrame>
    </div>
  );
}


/* The three marks the app finds on its own, laid on a timeline of the hero swing.
   Real timings from the library, so this cannot drift either: the bar positions
   are the actual takeaway/top/impact marks scaled across the swing's duration. */
function ThreeMarks() {
  const marks = [
    { label: "Takeaway", at: 0 },
    { label: "Top", at: HERO.back },
    { label: "Impact", at: HERO.total },
  ];
  return (
    <div className="mt-7 max-w-md">
      <div className="relative h-px w-full" style={{ background: HAIRLINE }} aria-hidden>
        {marks.map((m) => (
          <span
            key={m.label}
            className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full"
            style={{
              left: `${(m.at / HERO.total) * 100}%`,
              marginLeft: -5,
              background: ACCENT,
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between">
        {marks.map((m) => (
          <div key={m.label}>
            <p
              className="text-sm font-semibold tabular-nums"
              style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
            >
              {fmtSeconds(m.at)}
            </p>
            <p
              className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: MUTED }}
            >
              {m.label}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs" style={{ color: MUTED }}>
        You place these three yourself, frame by frame. Shown for {HERO.player}&apos;s{" "}
        {HERO.year} {shortEvent(HERO.event)} {HERO.clubLabel.toLowerCase()}.
      </p>
    </div>
  );
}

/* Number and label only. The explanatory sub-lines are gone: side by side they
   turned a glanceable band into a paragraph, and each label already says what its
   number is.

   The number sits in a fixed-height flex row so every LABEL lands on the same
   line regardless of how tall its number renders. The `tight` variant is gone
   with the combined "0.82s / 0.22s" cell it existed for — now that backswing and
   downswing each have their own cell, all four values are the same shape and can
   share one size. Sizes step down a notch from the old three-up band because four
   cells share the same width. */
function StatCell({ big, label }: { big: React.ReactNode; label: string }) {
  return (
    <div className="px-3 py-9 text-center sm:px-5 md:px-6" style={{ background: BG }}>
      <p
        className="flex h-11 items-center justify-center whitespace-nowrap text-2xl font-semibold tabular-nums sm:text-3xl md:h-12 md:text-4xl"
        style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
      >
        {big}
      </p>
      <p
        className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-xs"
        style={{ color: INK }}
      >
        {label}
      </p>
    </div>
  );
}
