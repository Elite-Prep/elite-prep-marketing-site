import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "./EmailCapture";
import TimingPlayer, { type TimingShot } from "./TimingPlayer";
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
    title: "Elite Tempo. Copy your best. Copy the greats. Groove your routine.",
    description:
      `Golf tempo, timed by hand to 1/100s. Film your own swing, mark takeaway, top and impact on a frame-accurate scrubber, and get your four numbers. Train hands-free with beats in your headphones. Free for ${TRIAL_DAYS} days, then ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Tempo. Copy your best. Copy the greats. Groove your routine.",
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
        "Pre-shot routine timing with a 40-second pace-of-play timer",
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

const TIMING_SHOTS: TimingShot[] = TIMING_BY_AREA.map((s) => ({
  area: s.category,
  player: s.player,
  detail: `${s.clubLabel} at the ${s.year} ${s.event.replace(/^The /, "")}`,
  back: s.back,
  down: s.down,
  total: s.total,
  ratio: fmtRatio(s),
}));

const LONGEST_GREAT = Math.max(...GREATS_ROWS.map((s) => s.total));

export default function EliteTempoLanding() {
  return (
    /* Flat, not a corner glow. The app ran a gradient canvas and retired it in
       1.4.12: a gradient makes contrast positional, so you cannot quote a ratio
       without saying where on the screen it applies. One ground from top to bottom;
       only panels step up to CARD. */
    <main style={{ background: BG, color: INK }} className="min-h-screen overflow-hidden text-lg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(34, 34, 34, 0.85)" }}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-4 py-4 sm:px-12">
          <Wordmark />
          <a
            href={APP_STORE_URL}
            className="shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-[15px] font-semibold transition duration-200 hover:brightness-[1.08] active:scale-[0.98]"
            style={{ background: ACCENT, color: ON_ACCENT }}
          >
            Try now for free
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className={`${SPLIT} pt-6`}>
        <div className="min-w-0 flex-[1_1_640px]">
          <h1 className="text-[clamp(34px,9.2vw,64px)] font-semibold leading-[1.06] tracking-[-0.025em]">
            Copy your best.
            <br />
            Copy the greats.
            <br />
            Groove your routine.
          </h1>
          <p className="mt-6 max-w-[32em]" style={{ color: MUTED }}>
            Time your swing and your pre-shot routine, from the tee to the green.
            Then repeat them on the course.
          </p>
          <AppStoreBadge className="mt-8" />
          <p className="mt-3.5 text-[15px]" style={{ color: MUTED }}>
            {TRIAL_DAYS} days free, then {PRICE_YEARLY} a year or {PRICE_MONTHLY} a month
          </p>
        </div>
        <div
          className={`${MEDIA_FRAME} aspect-[440/580] min-w-0 flex-[1_1_400px]`}
          style={{ background: CARD }}
        >
          <LoopVideo
            name="hero-loop"
            label="A golfer swinging, with his tempo ratio and swing time shown on screen."
            position="center 21.7%"
          />
        </div>
      </section>

      {/* The whole game, playable. Same clock for all four tabs. */}
      <section id="timing" className={SECTION}>
        <h2 className={H2}>Time every part of your game.</h2>
        <p className="mt-4 max-w-[34em]" style={{ color: MUTED }}>
          Pick a part of the game, press play, and hear the timing of a real tournament
          shot.
        </p>
        <TimingPlayer shots={TIMING_SHOTS} />
        <p className="mt-5" style={{ color: MUTED }}>
          On the range, keep your phone in your bag and hear your timing through your
          headphones.
        </p>
      </section>

      {/* Copy your best */}
      <section id="your-swing" className={SPLIT}>
        <div className="min-w-0 flex-[1_1_420px]">
          <h2 className={H2}>Copy your best swing.</h2>
          <p className="mt-4 max-w-[32em]" style={{ color: MUTED }}>
            Other tempo apps make you pick a ratio, then change your swing to fit it.
            Here you start with your best swing. Mark takeaway, top, and impact, then
            groove your own tempo on a loop.
          </p>
          <p id="compare" className="mt-3.5 max-w-[32em]" style={{ color: MUTED }}>
            Put two swings side by side, and see what changed between your best shot and
            your last one.
          </p>
        </div>
        <div className="grid min-w-0 flex-[1_1_480px] grid-cols-2 gap-3 sm:gap-6">
          <ScreenVideo
            name="swing-loop"
            label="The Elite Tempo app playing back a golfer's own swing and tempo ratio."
          />
          <ScreenVideo
            name="compare-loop"
            label="Two swings compared in the Elite Tempo app, one above the other."
          />
        </div>
      </section>

      {/* Copy the greats */}
      <section id="greats" className={SECTION}>
        <h2 className={H2}>Copy the best players in the world.</h2>
        <p className="mt-4 max-w-[34em]" style={{ color: MUTED }}>
          Rory&apos;s driver swing takes {RORY.total.toFixed(2)} seconds. Tiger&apos;s took{" "}
          {HERO.total.toFixed(2)}. Train to {SWINGS.length} real tournament shots, each
          hand-timed to 1/100 of a second.
        </p>
        <div className="mt-8" style={{ borderTop: `1px solid ${HAIRLINE}` }}>
          {GREATS_ROWS.map((g) => (
            <Link
              key={g.slug}
              href={`/elite-tempo/tempo/${g.slug}`}
              className="grid items-center gap-x-8 gap-y-2.5 py-[18px] transition-colors hover:text-[#B3ECFF] md:grid-cols-3"
              style={{ borderBottom: `1px solid ${HAIRLINE}` }}
            >
              <span>
                <span className="block font-semibold">{g.player}</span>
                <span className="block text-[15px]" style={{ color: MUTED }}>
                  {g.clubLabel}, {g.year} {g.event.replace(/^The /, "")}
                </span>
              </span>
              <span
                className="flex h-3.5"
                role="img"
                aria-label={`Backswing ${fmtSeconds(g.back)}, downswing ${fmtSeconds(g.down)}.`}
              >
                <span
                  style={{ width: `${(g.back / LONGEST_GREAT) * 100}%`, background: MUTED }}
                />
                <span
                  style={{ width: `${(g.down / LONGEST_GREAT) * 100}%`, background: ACCENT }}
                />
              </span>
              <span
                className="text-[28px] font-semibold"
                style={{ fontFamily: FONT_NUMERALS, fontVariantNumeric: "tabular-nums" }}
              >
                {fmtRatio(g)}
              </span>
            </Link>
          ))}
        </div>
        <Link
          href="/elite-tempo/tempos"
          className="mt-6 inline-block text-[15px] font-semibold underline underline-offset-4"
          style={{ color: ACCENT_ALT }}
        >
          See all {SWINGS.length} hand-timed swings
        </Link>
      </section>

      {/* Groove your routine */}
      <section id="routine" className={SPLIT}>
        <div className="flex min-w-0 flex-[1_1_420px] justify-center">
          <div className="w-full max-w-[290px]">
            <ScreenVideo
              name="routine-loop"
              label="A golfer's full pre-shot routine playing in the Elite Tempo app with a live timer."
            />
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_420px]">
          <h2 className={H2}>Groove your pre-shot routine.</h2>
          <p className="mt-4 max-w-[32em]" style={{ color: MUTED }}>
            Your routine is what carries your practice game to the course. Film it from
            start to impact, check it against your best one, and repeat it the same way
            every time.
          </p>
          <p className="mt-3.5 max-w-[32em]" style={{ color: MUTED }}>
            See if it fits the 40 seconds recommended by the USGA and The R&amp;A.
          </p>
        </div>
      </section>

      {/* Pricing. Lifetime used to be the hero price here and had to go: it is retired
          in the app, so advertising it sent people to a paywall that could not sell it. */}
      <section id="pricing" className={SECTION}>
        <div
          className="flex flex-wrap items-center justify-between gap-8 rounded-[20px] p-6 sm:p-12"
          style={{ background: CARD }}
        >
          <div className="min-w-0 flex-[1_1_420px]">
            <h2 className={H2}>Time your own swing before you pay a thing.</h2>
            <p className="mt-3.5" style={{ color: MUTED }}>
              Free for {TRIAL_DAYS} days. Cancel anytime.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-6">
            <Price amount={PRICE_YEARLY} note={`a year, save ${YEARLY_SAVING_PCT}%`} />
            <Price amount={PRICE_MONTHLY} note="a month" />
            <AppStoreBadge />
          </div>
        </div>
      </section>

      {/* Why we built it. No customer quote yet: only real ones go here. */}
      <section className="mx-auto max-w-[780px] px-4 pb-16 sm:px-12 sm:pb-28">
        <p className="text-[28px] font-semibold leading-[1.3] tracking-[-0.01em]">
          Every tempo app made me pick a ratio, and I always ended up changing my swing to
          fit it. I wanted to copy my own best swing and the best players in the world, so
          we built that.
        </p>
        <p className="mt-3.5 text-[15px]" style={{ color: MUTED }}>
          Eric Busalacchi, Elite Tempo
        </p>
      </section>

      {/* FAQ — the real SEO surface. Nobody searches "Elite Tempo"; they search "what
          is the 3 to 1 tempo ratio". Native <details> so the answers are in the initial
          HTML for crawlers rather than behind JavaScript. */}
      <section id="faq" className="mx-auto max-w-[780px] px-4 pb-16 sm:px-12 sm:pb-28">
        <h2 className={H2}>Questions</h2>
        <div className="mt-6" style={{ borderTop: `1px solid ${HAIRLINE}` }}>
          {FAQS.map(({ q, a }) => (
            <details key={q} className="group" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 marker:content-none">
                <span className="font-semibold">{q}</span>
                {/* + when closed, minus sign when open. U+2212 MINUS SIGN, an icon
                    inside an aria-hidden span, not prose punctuation. */}
                <span className="shrink-0 text-2xl font-light leading-none" style={{ color: ACCENT }} aria-hidden>
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">&#8722;</span>
                </span>
              </summary>
              <p className="pb-5 pr-10" style={{ color: MUTED }}>
                {a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Cheat sheet email capture */}
      <section className="mx-auto max-w-[780px] px-4 pb-16 sm:px-12 sm:pb-28">
        <h2 className="text-[28px] font-semibold leading-tight">
          Get the Elite Tempo cheat sheet
        </h2>
        <p className="mb-5 mt-2.5" style={{ color: MUTED }}>
          The timing and ratio of golf&apos;s most famous swings, free, in your inbox.
        </p>
        <EmailCapture />
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${HAIRLINE}` }}>
        <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <Wordmark />
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px]" style={{ color: MUTED }}>
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
          <p className="mt-6 max-w-[62em] text-[15px]" style={{ color: MUTED }}>
            Part of the Elite Prep family. Elite Tempo references real golfers,
            tournaments, and shots for descriptive and educational purposes only, and is
            not affiliated with, sponsored by, or endorsed by any player, tournament,
            tour, or organization named in the app. All names and trademarks belong to
            their respective owners.
          </p>
          <p className="mt-2.5 text-[15px]" style={{ color: MUTED }}>
            © {new Date().getFullYear()} Elite Prep Inc.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ── Pieces ─────────────────────────────────────────────────────────────── */

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5" aria-label="Elite Tempo">
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
