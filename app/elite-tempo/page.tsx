import type { ReactNode } from "react";
import type { Metadata } from "next";
import HeroCarousel from "./HeroCarousel";
import SwingTimingVideo from "./SwingTimingVideo";
import RoutineVideo from "./RoutineVideo";
import TigerCompare from "./TigerCompare";
import {
  HERO_SWING,
  SWINGS,
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
    title: "Elite Tempo. Time your entire game from pre-shot routine to impact.",
    description:
      `Golf tempo, timed by hand to 1/100s. Film your own swing, mark takeaway, top and impact on a frame-accurate scrubber, and get your four numbers. Practice to the beats with your phone in your bag. Free for ${TRIAL_DAYS} days, then ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month.`,
  },
  twitter: {
    card: "summary_large_image",
    images: SHARE_IMAGES,
    title: "Elite Tempo. Time your entire game from pre-shot routine to impact.",
    description: `Time your golf swing and your pre-shot routine. Tour swings timed by hand to 1/100s. Free ${TRIAL_DAYS}-day trial, then ${PRICE_YEARLY} a year.`,
  },
};



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
  ],
};

/* One size for every section heading and one for body copy, so hierarchy comes from
   a small scale rather than a new size per section. Benchmarked 2026-11-02: this page
   used 14 text sizes; Bevel uses 7, Apple Watch 8, Cal AI 9. */






/* Eric's driver pre-shot routine in the app: 23.9 seconds from the first step to
   impact, against the 40 seconds the USGA and The R&A recommend. */
const ROUTINE_S = 23.9;
const PACE_LIMIT_S = 40;

/* The hero carousel's screens, front first. Two carry a few seconds of real app
   recorded from the Simulator: the routine running its timer and steps, and a
   swing playing with its numbers. */
const HERO_SCREENS: { src: string; label: string; alt: string; clip?: string }[] = [
  /* Current app (board capture, 11-04). The old routine clip showed the previous
     design, so this slide is a still until a new clip is recorded. */
  { src: "routine-practice", label: "your routine", alt: "Practicing a driver pre-shot routine in Elite Tempo: look at the target, 13.6 seconds left on the clock." },
  { src: "player", clip: "player", label: "your swing", alt: "A golfer's own swing playing in Elite Tempo with tempo 3.0:1." },
  /* Compare also lives here; the photo cards below show it too. */
  { src: "compare", label: "you against Tiger", alt: "See the gap in Elite Tempo: a golfer's driver at the top of the swing, stacked under Tiger Woods' 2000 Open driver at the same moment." },
  { src: "pros", label: "the pros", alt: "Elite Tempo's Pros tab: tour players with their tempos." },
  { src: "stats", label: "your streak", alt: "Stats in Elite Tempo: a weekly streak of 3 weeks in a row." },
];

const WRAP = "mx-auto max-w-[1240px] px-4";
/* The type scale, cut 2026-11-04 from 17 sizes on the desktop page: 80 hero, 56 every
   section heading, 30 big numbers and quotes, 21 lead lines, 19 body, 16 small. */
/* Section headings are small on purpose (Pinterest, 11-04): only the opening headline
   is big, so it reads as the most important thing on the page. */
const H2_SECTION = "m-0 text-[clamp(26px,3vw,34px)] font-semibold leading-[1.15] tracking-[-0.02em] [text-wrap:balance]";
/* The soft card every feature's picture sits in. */
const FEATURE_CARD = "overflow-hidden rounded-[28px] bg-[#EDEDE8]";
const LEDE = "text-[19px] leading-[1.4]";
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
            {/* Eric, 11-04: headline first, short; the rating moved to pricing. */}
            <h1 className="m-0 text-[clamp(40px,9vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Time your entire process.
            </h1>
            <p className={`mx-auto mt-[18px] max-w-[30em] ${LEDE} tracking-[-0.01em]`} style={{ color: "#4A4B50" }}>
              Groove your entire game from <span className="whitespace-nowrap">pre-shot</span> routine to impact, so you can trust your game when it matters most.
            </p>
            {/* One button style on the page: the black pill (blind review, 11-04). The
                App Store badge appears once, in pricing. */}
            <DownloadButton big />
          </div>

          <HeroCarousel labels={HERO_SCREENS.map((h) => h.label)} slides={HERO_SCREENS.map((h, i) => <Phone key={h.src} eager priority={i === 0} src={h.src} alt={h.alt} clip={h.clip} />)} />
        </section>
      </div>

      {/* From here down, Pinterest's shape (Eric, 11-04): one intro line, then every
          feature in the same pattern (a picture card, a short heading, one sentence,
          a small download button). Only the picture changes. */}
      <section className="mx-auto max-w-[900px] px-4 pt-[clamp(56px,8vw,96px)] text-center">
        {/* The two words the product is about, in italics: a deliberate exception to
            plain headings, asked for by Eric 2026-11-04. */}
        <h2 className={H2_SECTION}>
          Competing under pressure breaks your <em className="italic">timing</em> and <em className="italic">routine</em>.
        </h2>
        <p className="mx-auto mt-3 max-w-[30em] text-[19px] leading-[1.4] [text-wrap:balance]" style={{ color: MUTED }}>
          Because they’re difficult to practice. Until now.
        </p>
      </section>

      {/* Every feature picture is real footage or a real piece of the app, and every
          number is the app's own reading (11-04). No floating labels: Eric found them
          hacky, and the numbers now appear where the app shows them. */}
      <FeatureSection title="Four timing numbers from every swing." body="Film any swing. Elite Tempo times it to 1/100 of a second.">
        <SwingTimingVideo
          src="/elite-tempo/video/swing.mp4"
          poster="/elite-tempo/video/swing-poster.jpg"
          stillPoster="/elite-tempo/video/swing-top.jpg"
          marks={{ takeaway: 0.5, top: 1.15, impact: 1.37 }}
          /* The clip starts at frame 9 of the original, so top (frame 34) is frame 25
             and impact (frame 41) is frame 32; each freeze lands mid-frame. */
          freeze={{ top: 25.5 / 30, impact: 32.5 / 30, fps: 30 }}
          label="Eric's driver on a sunny tee, pausing at the top of the backswing and at impact while its timing is shown."
        />
      </FeatureSection>

      <FeatureSection title="Hear Tiger’s timing. Then train to it." body={`Tap play, then compare your swing to ${SWINGS.length} hand-timed tour swings.`}>
        <TigerCompare
          rows={[
            { name: "Tiger Woods", detail: `Driver, ${HERO_SWING.year} Open`, back: HERO_SWING.back, down: HERO_SWING.down },
            /* Eric's favorite driver in the app: takeaway 0.668s, top 1.313s, impact 1.547s. */
            { name: "You", detail: "Driver", back: 1.313 - 0.668, down: 1.547 - 1.313 },
          ]}
        />
      </FeatureSection>

      <FeatureSection title="Rehearse your routine. Play faster." body="Each step lights up, inside the USGA and R&A’s recommended 40 seconds.">
        <RoutineVideo
          src="/elite-tempo/video/routine.mp4"
          poster="/elite-tempo/video/routine-poster.jpg"
          impact={ROUTINE_S}
          limit={PACE_LIMIT_S}
          label="Eric's driver pre-shot routine at the range, with each step named as he reaches it."
          /* Eric marked these himself on the web clip, 11-04 (Routine Step Marker). */
          steps={[
            { at: 1.6, title: "Look at target. Pick a start line." },
            { at: 2.9, title: "Walk in" },
            { at: 7.3, title: "Set club" },
            { at: 8.6, title: "Settle stance" },
            { at: 9.1, title: "Waggle & settle" },
            { at: 11.4, title: "Hover, waggle and settle" },
            { at: 14.3, title: "Look at target" },
            { at: 16.2, title: "Look at target" },
            { at: 17.2, title: "Waggle" },
            { at: 18.6, title: "Look and waggle" },
            { at: 22.8, title: "Gear up" },
            { at: 22.9, title: "Take club back" },
            { at: 23.6, title: "Top of backswing" },
          ]}
        />
      </FeatureSection>

      {/* Pricing: the closing section, on a full photo the way Pinterest closes (11-04).
          The photo is Eric teeing off in front of a gallery (his own, 11-04), darkened so white type reads. */}
      <section id="pricing" className={`${WRAP} pt-[clamp(56px,8vw,96px)]`}>
        <div
          className="overflow-hidden rounded-[28px] bg-[#2A3A26] bg-cover px-[clamp(20px,5vw,64px)] py-[clamp(48px,8vw,96px)] text-center text-white"
          style={{ backgroundImage: "linear-gradient(rgba(20,21,24,0.66), rgba(20,21,24,0.86)), url(/elite-tempo/video/close.jpg?v=2)", backgroundPosition: "56% 40%" }}
        >
          <h2 className={H2_SECTION}>Time your own swing before you pay a thing.</h2>
          <p className="mt-3 text-[19px] leading-[1.4]" style={{ color: "rgba(255,255,255,0.88)" }}>
            Free for {TRIAL_DAYS} days. Cancel anytime.
          </p>
          {/* Moved from the hero (Eric, 11-04): proof sits next to the price. */}
          <p className="mt-2 text-[16px]" style={{ color: "rgba(255,255,255,0.88)" }}>
            <span style={{ color: "#F9C832" }} aria-hidden>
              ★★★★★
            </span>{" "}
            Rated 5.0 on the App Store.
          </p>
          <div className="mx-auto mt-8 grid max-w-[560px] grid-cols-2 gap-3 text-left max-[420px]:grid-cols-1">
            <div className="rounded-2xl bg-white p-5 text-[#141518]" style={{ boxShadow: "inset 0 0 0 2px #F9C832" }}>
              <p className="m-0 flex min-h-7 items-center justify-between gap-2 text-[16px] font-semibold">
                Yearly
                <span className="rounded-full px-2.5 py-0.5 text-[14px] font-semibold" style={{ background: "#F9C832", color: INK }}>
                  Save {YEARLY_SAVING_PCT}%
                </span>
              </p>
              <p className={`m-0 mt-2 ${NUM}`}>{PRICE_YEARLY}</p>
              <p className="m-0 text-[16px]" style={{ color: MUTED }}>
                a year, ${(PRICE_YEARLY_NUM / 12).toFixed(2)} a month
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 text-[#141518]">
              <p className="m-0 flex min-h-7 items-center text-[16px] font-semibold">Monthly</p>
              <p className={`m-0 mt-2 ${NUM}`}>{PRICE_MONTHLY}</p>
              <p className="m-0 text-[16px]" style={{ color: MUTED }}>a month</p>
            </div>
          </div>
          <AppStoreBadge className="mt-8" />
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
/* Answers open over 200 ms where the browser supports animating to auto height;
   elsewhere they open at once, as before. */
:root { interpolate-size: allow-keywords; }
.et-faq::details-content { height: 0; overflow: clip; transition: height 0.2s ease, content-visibility 0.2s allow-discrete; }
.et-faq[open]::details-content { height: auto; }
@media (prefers-reduced-motion: reduce) { .et-faq::details-content { transition: none; } }
.et-clip-still { position: absolute; inset: 0; }
.et-clip-video { position: relative; opacity: 0; }
.iphone-screen[data-live] .et-clip-video { opacity: 1; transition: opacity 0.15s linear; }
.iphone-screen img, .iphone-screen video { display: block; width: 100%; height: 100%; object-fit: cover; }


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

/* The page's one section pattern, copied from Pinterest's home page (11-04): a picture
   card, then a short heading, one sentence and a small download button, centered.
   `bare` drops the soft card for a picture that is already a card (the dark player). */
function FeatureSection({
  title,
  body,
  children,
  bare = false,
  cardClass = "",
}: {
  title: ReactNode;
  body: string;
  children: ReactNode;
  bare?: boolean;
  cardClass?: string;
}) {
  return (
    <section className={`${WRAP} pt-[clamp(56px,8vw,96px)] md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-center md:gap-16`}>
      {/* On desktop the picture and the words sit side by side, so a narrow video no
          longer floats in a 1,200-wide card (blind review, 11-04). Phones stack. */}
      <div className={bare ? "[&>*]:mt-0" : `${FEATURE_CARD} ${cardClass}`}>{children}</div>
      <div className="mx-auto mt-8 max-w-[34em] text-center md:mx-0 md:mt-0 md:text-left">
        <h2 className={H2_SECTION}>{title}</h2>
        <p className="m-0 mt-3 text-[19px] leading-[1.4] [text-wrap:balance]" style={{ color: MUTED }}>
          {body}
        </p>
        <DownloadButton />
      </div>
    </section>
  );
}

/* The repeated download button under every feature, the way Pinterest repeats its
   one red button. Same words as the menu button. */
function DownloadButton({ big = false }: { big?: boolean }) {
  return (
    <a
      href={APP_STORE_URL}
      className={`inline-flex items-center rounded-full font-semibold text-white no-underline transition hover:brightness-125 ${big ? "mt-7 min-h-12 px-7 text-[19px]" : "mt-6 min-h-11 px-5 text-[16px]"}`}
      style={{ background: INK }}
    >
      Download app
    </a>
  );
}

