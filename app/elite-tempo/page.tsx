import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "../components/Reveal";
import EmailCapture from "./EmailCapture";
import CountUp from "./CountUp";
import BeatTicks from "./BeatTicks";
import BudFlank from "./BudFlank";

/* Elite Tempo brand palette — black + amber-gold, mirroring the app's
   DESIGN.md tokens. Scoped to this page; the rest of the site is Elite
   Prep blue. */
const BG = "#0B0B0C";
const ACCENT = "#FFB300";
const ON_ACCENT = "#0B0B0C";
const INK = "#F3F5F9";
const MUTED = "#8F929C";
/* CARD and HAIRLINE now match Theme.swift exactly. They were #151720 and
   #242732, both darker than the app's tokens, which left panels at 1.10:1
   against the canvas and borders at 1.32:1 -- structure you could barely see.
   DESIGN.md describes card as "lifted above bg for clear card contrast", so the
   old values were below the app's own spec rather than a deliberate web choice.
   Text was measured too and needed nothing: ink is 18.0:1, muted 6.3:1 on the
   canvas and 5.4:1 on the card, gold 11.0:1, all clear of WCAG AA. */
const CARD = "#1B1E26";
const HAIRLINE = "#30343E";

/* Three links, not six. ReciMe's header carries exactly three (FAQs, Gift Cards,
   Log In) plus one button, clustered hard right with a wide empty gap after the
   logo, and that space is what makes it read as calm. Six grey links spread across
   the middle read as a dense strip instead. The ids stay on all seven sections, so
   deep links like /elite-tempo#compare still work, they are just not all in the bar.
   Pricing and FAQ are what people hunt for; the greats is the marquee feature. */
const SECTIONS = [
  { id: "greats", label: "The Greats" },
  /* Features points at the automatic-capture section: it is the first feature
     section that is not already its own link, since The Greats takes that slot. */
  { id: "your-swing", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQs" },
];

const APP_STORE_URL = "https://apps.apple.com/app/elite-tempo/id6779226434";

/* Prices and trial length are verified against App Store Connect, not copied from
   older marketing text. Yearly is $24.99 for new customers as of 2026-07-31 (the
   $19.99 point survives only as a preserved price for existing subscribers), monthly
   is $5.99, both carry a 14-day free trial, and the lifetime non-consumable is
   retired — PaywallView no longer offers it, so the page must not advertise it. */
const PRICE_YEARLY_NUM = 24.99;
const PRICE_MONTHLY_NUM = 5.99;
const PRICE_YEARLY = `$${PRICE_YEARLY_NUM.toFixed(2)}`;
const PRICE_MONTHLY = `$${PRICE_MONTHLY_NUM.toFixed(2)}`;
const TRIAL_DAYS = 14;

/* Derived, never typed by hand, so the badge cannot outlive a price change:
   $5.99 x 12 = $71.88 against $24.99 is a 65% saving. */
const YEARLY_SAVING_PCT = Math.round((1 - PRICE_YEARLY_NUM / (PRICE_MONTHLY_NUM * 12)) * 100);

/* The <title> is what Google prints as the blue link, so it names the category
   rather than leading with the tagline. The tagline still carries the social cards
   and the on-page <h1>, where it does the persuading. */
export const metadata: Metadata = {
  title: "Elite Tempo | Golf Swing Tempo Trainer for iPhone",
  description:
    `Golf swing tempo trainer. Match the hand-timed tempo of Tiger, Rory and Couples to 1/100s, then record your own swing and let the app find takeaway, top and impact automatically. Train hands-free with the beats in your headphones. Free for ${TRIAL_DAYS} days, then ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month.`,
  alternates: { canonical: "/elite-tempo" },
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
      `Golf tempo, timed by hand to 1/100s. Record your swing and the app times it automatically. Train hands-free with beats in your headphones. Free for ${TRIAL_DAYS} days, then ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Tempo. Copy the greats. Copy your best.",
    description: `Golf tempo, timed by hand to 1/100s. Auto swing capture, hands-free. Free ${TRIAL_DAYS}-day trial, then ${PRICE_YEARLY} a year.`,
  },
};

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
    a: "Elite Tempo hand-times real broadcast footage to 1/100 of a second. Rory's 2014 PGA Championship driver swing comes in at 3.0, against Tiger's 3.17 at the 2000 U.S. Open and Fred Couples' 2.75 at the 1992 Masters. You can train against any of them.",
  },
  {
    q: "Does a golf tempo trainer actually work?",
    a: "Tempo is one of the few parts of the swing you can change without rebuilding your mechanics, because it is timing rather than positions. The catch with most tools is that they only give you a target. Elite Tempo also records your own swing and times it automatically, so you can see whether you actually matched the target.",
  },
  {
    q: "How is Elite Tempo different from a metronome?",
    a: "A metronome gives you an even beat. A golf swing is not even. The backswing is roughly three times the downswing, so Elite Tempo plays beats spaced at real tour ratios and then measures your swing against them. It finds your takeaway, top and impact from video without you tapping anything.",
  },
  {
    q: "How much does Elite Tempo cost?",
    a: `Elite Tempo is free to download and free to try for ${TRIAL_DAYS} days. After that it is ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month, and you can cancel anytime. The yearly plan works out about ${YEARLY_SAVING_PCT}% cheaper than paying monthly.`,
  },
  {
    q: "Do I need any extra hardware?",
    a: "No. It runs on the iPhone you already own. Record a swing with the camera or import a clip you already have. Apple Watch and a lock-screen Live Activity are included if you want to train hands-free.",
  },
];

// Real, hand-timed shots — the "see the best at their best" proof row.
const GREATS = [
  { who: "Tiger Woods", meta: "2000 U.S. Open · Driver", ratio: 3.17 },
  { who: "Rory McIlroy", meta: "2014 PGA · Driver", ratio: 3.0 },
  { who: "Fred Couples", meta: "1992 Masters · Fairway wood", ratio: 2.75 },
  { who: "Adam Scott", meta: "2013 Masters · Fairway wood", ratio: 2.84 },
];

/* Machine-readable statement of what this thing is. The page had no structured data
   at all, which is why Google and the AI answer engines had nothing but the App Store
   listing to work from. No aggregateRating on purpose: with 4 ratings it buys nothing,
   and Google's policy wants marked-up ratings visible on the page. */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MobileApplication",
      "@id": "https://www.eliteprep.app/elite-tempo#app",
      name: "Elite Tempo",
      alternateName: "Elite Tempo: Golf Swing Tempo Trainer",
      applicationCategory: "SportsApplication",
      applicationSubCategory: "Golf Swing Tempo Trainer",
      operatingSystem: "iOS 17.0 or later",
      url: "https://www.eliteprep.app/elite-tempo",
      downloadUrl: APP_STORE_URL,
      installUrl: APP_STORE_URL,
      description:
        "Golf swing tempo trainer for iPhone. Match the hand-timed tempo of tour players to 1/100 of a second, then record your own swing and have takeaway, top and impact found automatically.",
      featureList: [
        "Hand-timed tempo library of famous tour swings",
        "Automatic swing timing from video, no tapping",
        "Side-by-side swing comparison",
        "Hands-free training with beats in your headphones",
        "Apple Watch and lock-screen Live Activity",
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
          price: "24.99",
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
      "@id": "https://www.eliteprep.app/elite-tempo#faq",
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
      style={{
        background: `radial-gradient(1200px 900px at 100% 0%, rgba(255, 179, 0, 0.06), rgba(255, 179, 0, 0) 70%), ${BG}`,
        backgroundRepeat: "no-repeat",
        color: INK,
      }}
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
        style={{ background: "rgba(11, 11, 12, 0.85)", borderBottom: `1px solid ${HAIRLINE}` }}
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
                  className="text-sm font-bold transition-colors duration-150 hover:text-[#FFB300]"
                  style={{ color: INK }}
                >
                  {label}
                </a>
              ))}
            </nav>
            {/* Gold outline, not a filled gold pill. Outlined keeps the header the
                SECONDARY surface, the same reasoning the homepage nav records for
                its Sign up button, so the filled white App Store badges in the page
                body stay the primary convert action. Gold border and gold ink is
                the form DESIGN.md reserves in the app, but the website already
                carries gold as ink on every section eyebrow and in the h1, so this
                is consistent with the site rather than a new deviation. */}
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

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-8 pt-10 sm:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                Golf tempo and timing trainer
              </p>
              <h1
                className="mt-4 text-4xl font-extrabold leading-[1.05] sm:text-5xl"
                style={{ color: INK }}
              >
                Copy the greats.
                <br />
                <span style={{ color: ACCENT }}>Copy your best.</span>
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

      {/* Stat band — the two numbers */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <div
            className="grid gap-px overflow-hidden rounded-3xl sm:grid-cols-2"
            style={{ background: HAIRLINE, border: `1px solid ${HAIRLINE}` }}
          >
            <StatCell
              big={<CountUp value={0.96} decimals={2} suffix="s" />}
              label="Start to impact"
              sub="Exact swing duration, timed by hand to 1/100s."
            />
            <StatCell
              big={<CountUp value={3.17} decimals={2} suffix=":1" />}
              label="Tempo ratio"
              sub="Backswing to downswing. The rhythm of the swing."
            />
          </div>
          <p className="mt-5 text-center text-sm" style={{ color: MUTED }}>
            The two numbers no other app captures.
          </p>
        </Reveal>
      </section>

      <Divider />

      {/* Time the greats — hand-timed pro tempos, with the in-app beats clip */}
      <section id="greats" className="mx-auto max-w-5xl px-6 py-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
              Copy the greats
            </p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl" style={{ color: INK }}>
              Real tournament swings, meticulously timed.
            </h2>
          </div>
        </Reveal>
        <div className="mt-9 grid items-center gap-12 md:grid-cols-2">
          <Reveal delay={0.1}>
            <PhoneStage src="/elite-tempo/greats-beats.mp4" poster="/elite-tempo/greats-beats-poster.jpg" />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 gap-3">
              {GREATS.map((g) => (
                <div
                  key={g.who}
                  className="rounded-2xl p-4 transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
                >
                  <p className="text-2xl font-extrabold tabular-nums" style={{ color: ACCENT, fontVariantNumeric: "tabular-nums" }}>
                    <CountUp value={g.ratio} decimals={2} suffix=":1" />
                  </p>
                  <p className="mt-1.5 text-sm font-bold" style={{ color: INK }}>{g.who}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{g.meta}</p>
                </div>
              ))}
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
              <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                Automatic capture
              </p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl" style={{ color: INK }}>
                Just swing.
                <br />
                We time it for you.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
                Record a swing and Elite Tempo finds takeaway, top, and impact in
                seconds, on its own. No tapping, no scrubbing. You get your exact
                duration and tempo ratio, then groove it on a loop until the move
                is yours.
              </p>
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
            <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
              Compare
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl" style={{ color: INK }}>
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
              <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                Time your routine
              </p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl" style={{ color: INK }}>
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
          TODO: add an Apple Watch frame alongside once that screenshot lands. */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                Hands-free
              </p>
              <h2 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl" style={{ color: INK }}>
                Beats in your ears.
                <br />
                Phone in your bag.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
                Headphones in, phone in your bag, eyes on the ball. Your tempo
                stays on the lock screen and Apple Watch, a glance away.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            {/* Ladder-style: phone centered, one AirPod flanking each side, each
                sitting on a gold glow ring — the beat radiating out (gold = the
                live-timing signal). Buds sit just outside the phone edges. */}
            <div className="relative mx-auto w-fit px-8 sm:px-14">
              <DeviceFrame img="/elite-tempo/lock-activity.jpg" notch={false} max={300} topFade />

              {/* Widget now sits mid-screen; buds straddle it near the middle —
                  left just above, right just below. */}
              <BudFlank src="/elite-tempo/airpod-left.png" side="left" topPct={43} />
              <BudFlank src="/elite-tempo/airpod-right.png" side="right" topPct={57} />
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
            <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
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
                  className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.08em]"
                  style={{ background: ACCENT, color: ON_ACCENT }}
                >
                  Save {YEARLY_SAVING_PCT}%
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: MUTED }}>
                  Yearly
                </p>
                <p className="mt-3 text-4xl font-extrabold leading-none" style={{ color: INK }}>
                  {PRICE_YEARLY}
                </p>
                <p className="mt-1.5 text-sm font-bold" style={{ color: MUTED }}>
                  a year
                </p>
                <p className="mt-auto pt-4 text-xs font-semibold" style={{ color: MUTED }}>
                  Free for {TRIAL_DAYS} days. Cancel anytime.
                </p>
              </div>

              <div
                className="relative flex h-full flex-col rounded-2xl px-6 pb-6 pt-7"
                style={{ background: BG, border: `1px solid ${HAIRLINE}` }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em]" style={{ color: MUTED }}>
                  Monthly
                </p>
                <p className="mt-3 text-4xl font-extrabold leading-none" style={{ color: INK }}>
                  {PRICE_MONTHLY}
                </p>
                <p className="mt-1.5 text-sm font-bold" style={{ color: MUTED }}>
                  a month
                </p>
                <p className="mt-auto pt-4 text-xs font-semibold" style={{ color: MUTED }}>
                  Free for {TRIAL_DAYS} days. Cancel anytime.
                </p>
              </div>
            </div>

            <ul className="mx-auto mt-7 flex max-w-xs flex-col gap-2.5 text-left">
              {[
                "The full library of hand-timed greats",
                "Your own swings, captured and timed automatically",
                "Side-by-side Compare",
                "Routines, Watch and Practice",
                "Lock-screen Live Activity and Apple Watch",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: MUTED }}>
                  <span className="mt-0.5 font-extrabold" style={{ color: ACCENT }} aria-hidden>
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center">
              <AppStoreButton />
            </div>
            <p className="mt-4 text-xs" style={{ color: MUTED }}>
              Start free. Play a tempo in every area and time one of your own swings before you decide.
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
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl" style={{ color: INK }}>
            Golf swing tempo,{" "}
            <span style={{ color: ACCENT }}>answered</span>
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
                  <span className="text-base font-bold sm:text-lg" style={{ color: INK }}>
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
            <h2 className="text-2xl font-extrabold sm:text-3xl" style={{ color: INK }}>
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
          <p className="mt-8 max-w-3xl text-xs leading-relaxed" style={{ color: "#5A5D66" }}>
            Part of the Elite Prep family. Elite Tempo references real golfers,
            tournaments, and shots for descriptive and educational purposes
            only, and is not affiliated with, sponsored by, or endorsed by any
            player, tournament, tour, or organization named in the app. All
            names and trademarks belong to their respective owners.
          </p>
          <p className="mt-4 text-xs" style={{ color: "#5A5D66" }}>
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
      className="flex items-center gap-2"
      style={{ fontFamily: "var(--font-anton), sans-serif" }}
      aria-label="Elite Tempo"
    >
      <span className="text-xl tracking-wide" style={{ color: INK }}>
        ELITE
      </span>
      <BeatTicks heights={[7, 12, 7, 17, 7, 12, 7]} barWidth={2.5} gap={2.5} />
      <span className="text-xl tracking-wide" style={{ color: ACCENT }}>
        TEMPO
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
      style={{ background: "#FFFFFF", color: "#0B0B0C" }}
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
// screen recording). Pass `src` for a looping clip or `img` for a still.
function DeviceFrame({
  src,
  poster,
  img,
  notch = true,
  max = 280,
  topFade = false,
}: {
  src?: string;
  poster?: string;
  img?: string;
  notch?: boolean;
  max?: number;
  topFade?: boolean;
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
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img} alt="" className="block h-auto w-full" />
        ) : (
          <video src={src} poster={poster} autoPlay loop muted playsInline className="block h-auto w-full" />
        )}
        {/* Fade the top of the lock screen so the clock recedes and the Live
            Activity card becomes the focal point. */}
        {topFade && (
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[42%]"
            style={{
              background:
                "linear-gradient(to bottom, #0A0A0C 6%, rgba(10,10,12,0.85) 34%, transparent)",
            }}
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}

// Phone media on a "stage": a device-framed clip in a card with the gold
// beat-tick motif flanking it left and right, echoing the in-app beat ticker.
function PhoneStage({
  src,
  poster,
  img,
  notch,
  max,
}: {
  src?: string;
  poster?: string;
  img?: string;
  notch?: boolean;
  max?: number;
}) {
  return (
    <div
      className="relative flex items-center justify-center rounded-[34px] px-8 py-9 sm:px-12"
      style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
    >
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 sm:left-5" aria-hidden>
        <BeatTicks heights={[8, 14, 8, 22, 8, 14, 8]} barWidth={3} gap={4} />
      </div>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 sm:right-5" aria-hidden>
        <BeatTicks heights={[8, 14, 8, 22, 8, 14, 8]} barWidth={3} gap={4} />
      </div>
      <DeviceFrame src={src} poster={poster} img={img} notch={notch} max={max} />
    </div>
  );
}

function StatCell({ big, label, sub }: { big: React.ReactNode; label: string; sub: string }) {
  return (
    <div className="px-8 py-10 text-center" style={{ background: BG }}>
      <p
        className="text-5xl font-extrabold tabular-nums"
        style={{ color: ACCENT, fontVariantNumeric: "tabular-nums" }}
      >
        {big}
      </p>
      <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: INK }}>
        {label}
      </p>
      <p className="mx-auto mt-2 max-w-xs text-sm" style={{ color: MUTED }}>
        {sub}
      </p>
    </div>
  );
}
