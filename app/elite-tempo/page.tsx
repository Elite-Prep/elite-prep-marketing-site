import type { ReactNode } from "react";
import type { Metadata } from "next";
import HeroCarousel from "./HeroCarousel";
import FloatingHeader from "./FloatingHeader";
import SwingTimingVideo from "./SwingTimingVideo";
import PhoneVideo from "./PhoneVideo";
import ReviewsBand from "./ReviewsBand";
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
} from "./data/pricing";
import { SiteFooter, SkipLink } from "./Chrome";
import { FAQS } from "./data/faqs";
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
    title: "Elite Tempo. Measure your timing and pre-shot routine with precision.",
    description:
      `Golf tempo, timed by hand to 1/100s. Film your own swing, mark takeaway, top and impact on a frame-accurate scrubber, and get your four numbers. Practice to the beats with your phone in your bag. Free for ${TRIAL_DAYS} days, then ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month.`,
  },
  twitter: {
    card: "summary_large_image",
    images: SHARE_IMAGES,
    title: "Elite Tempo. Measure your timing and pre-shot routine with precision.",
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

/* The hero carousel's screens, front first. Two carry a few seconds of real app
   recorded from the Simulator: the routine running its timer and steps, and a
   swing playing with its numbers. */
const HERO_SCREENS: { src: string; label: string; alt: string; clip?: string }[] = [
  /* Current app (board capture, 11-04). The old routine clip showed the previous
     design, so this slide is a still until a new clip is recorded. */
  { src: "routine-practice", label: "your routine", alt: "Practicing a driver pre-shot routine in Elite Tempo: look at the target, 13.6 seconds left on the clock." },
  { src: "player", clip: "player", label: "your swing", alt: "A golfer's own swing playing in Elite Tempo with tempo 3.0:1." },
  /* Compare also lives here; the photo cards below show it too. */
  /* Eric's pick (11-04): the "Here is your tempo" screen, his swing beside Tiger's,
     in place of the stacked See the gap screen. */
  { src: "reveal-tiger", label: "you against Tiger", alt: "Here is your tempo in Elite Tempo: a golfer's swing beside Tiger Woods', tempo 3.0 to 1 against Tiger's 3.9, backswing 0.65 seconds against 0.86." },
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
/* Darker than it was (#EDEDE8) so the panel reads as a panel on the #F6F6F3 page. */
const FEATURE_CARD = "overflow-hidden rounded-[28px] bg-[#E6E4DC]";
const LEDE = "text-[19px] leading-[1.4]";

export default function EliteTempoLanding() {
  /* The front phone's still is the largest thing on a phone screen. Asked for first,
     at high priority, it no longer waits behind the scripts. */
  preload(`/elite-tempo/app/${HERO_SCREENS[0].src}.webp`, { as: "image", fetchPriority: "high" });
  return (
    <main
      className="et-sg min-h-screen overflow-hidden text-[19px] leading-[1.45] antialiased"
      style={{ background: "#F6F6F3", color: INK, fontFamily: "-apple-system, 'SF Pro Display', system-ui, 'Helvetica Neue', Arial, sans-serif" }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      <style>{IPHONE_CSS}</style>
      {/* Eric, 11-09: All True's Special Gothic (free, Google Fonts) for all text; headings in caps. */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Special+Gothic:wdth,wght@75..125,400..700&display=swap" precedence="default" />
      <style>{`.et-sg,.et-sg *{font-family:'Special Gothic',system-ui,sans-serif!important}.et-sg h1,.et-sg h2,.et-sg h3{font-family:'Special Gothic',system-ui,sans-serif;text-transform:uppercase;font-weight:600;letter-spacing:0.01em;line-height:1.0}.et-sg h1{font-stretch:90%}`}</style>
      <SkipLink />
      <FloatingHeader />

      {/* Hero: the promise on a gold wash, three real screens below it. Gold only:
          the green washes were cut 2026-11-04 (site grade: ten section colors down
          to cream, white and one dark). */}
      {/* 16pt side margin, the same as every section below (designer reviews, 11-04). */}
      <div className="px-4 pb-2.5 pt-2.5">
        <section
          id="top"
          className="relative overflow-hidden rounded-[28px]"
          style={{
            background: "radial-gradient(70% 60% at 50% 78%, #F9C832 0%, rgba(249, 200, 50, 0) 72%), #FFFCF0",
          }}
        >
          {/* The menu is the fixed bar above (FloatingHeader); this keeps its space. */}
          <div aria-hidden className="h-[calc(64px+env(safe-area-inset-top,0px))]" />


          <div id="content" className="px-4 pt-[clamp(36px,5vw,64px)] text-center">
            {/* Eric, 11-04: headline first, short; the rating moved to pricing. */}
            <h1 className="m-0 text-[clamp(40px,9vw,80px)] font-semibold leading-[1.02] tracking-[-0.035em]">
              Measure your timing and <span className="whitespace-nowrap">pre-shot</span> routine with precision.
            </h1>
            <p className={`mx-auto mt-[18px] max-w-[30em] ${LEDE} tracking-[-0.01em]`} style={{ color: "#4A4B50" }}>
              Build a consistent <span className="whitespace-nowrap">pre-shot</span> routine and swing tempo you can rely on under pressure.
            </p>
            {/* One button style on the page: the black pill (blind review, 11-04). The
                App Store badge appears once, in pricing. */}
            <DownloadButton big />
            {/* The rating sits under the first button (blind review, 11-05). */}
            <p className="m-0 mt-3 text-[15px] font-medium" style={{ color: "#4A4B50" }}>
              <span className="text-[#E0A800]" aria-hidden>★★★★★</span> Rated 5.0 on the App Store
            </p>
          </div>

          <HeroCarousel labels={HERO_SCREENS.map((h) => h.label)} slides={HERO_SCREENS.map((h, i) => <Phone key={h.src} eager priority={i === 0} src={h.src} alt={h.alt} clip={h.clip} />)} />
        </section>
      </div>

      {/* A pause between the moving phones and the swing video (Eric, 11-05): the
          why, on its own white band, so the page breathes before the features. */}
      <section className="mt-[clamp(48px,7vw,88px)] bg-white px-4 py-[clamp(64px,9vw,112px)] text-center">
        <h2 className={`${H2_SECTION} mx-auto max-w-[18em]`}>
          Not your average tempo app.
        </h2>
        <p className="mx-auto mt-3 max-w-[30em] text-[19px] leading-[1.4] [text-wrap:balance]" style={{ color: MUTED }}>
          Track every step from setup to swing. Practice with purpose, not just repetition.
        </p>
      </section>

      {/* Every feature picture is real footage or a real piece of the app, and every
          number is the app's own reading (11-04). No floating labels: Eric found them
          hacky, and the numbers now appear where the app shows them. */}
      <FeatureSection title="Get four key stats every swing." body="See your backswing, downswing, total time, and tempo ratio.">
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

      {/* The real Pros library from the latest build (Eric, 11-05), in the same phone and
          card as the metronome. The phone runs off the bottom of the card so the list
          reads as a library that keeps going. */}
      <FeatureSection title="Match your timing against pro swings.">
        <div className="mx-auto h-[min(122vw,520px)] w-[min(64%,280px)] pt-10 md:h-[600px] md:w-[300px]">
          <Phone src="pros-library" alt="The Pros library in Elite Tempo: Cameron Young 4.3 to 1, Tiger Woods 3.7 to 1, Rory McIlroy 2.4 to 1, Adam Scott 2.9 to 1, Hideki Matsuyama 4.1 to 1, Justin Thomas 3.2 to 1, Nelly Korda 3.1 to 1, each with its total swing time." />
        </div>
      </FeatureSection>

      {/* Social proof between the features (Eric's wireframe, 11-04). */}
      <ReviewsBand
        photo="/elite-tempo/video/reviews.jpg"
        reviews={[
          { body: "I was just looking to improve my tempo and was strongly suggested this app. I love the ease of use and effectiveness.", name: "StayDialedIn" },
          { body: "This is a game changer for tempo training. It’s simple to use, smart and actually useful!", name: "@kgrace" },
          { body: "Highly recommend this app for helping you practice your golf swing. So many cool features!", name: "Tiffneyac" },
          { body: "Super addicting and surprisingly helpful", name: "Boos59" },
        ]}
      />

      <FeatureSection title="Perfect your routine. Play with pace." body="Capture each step. Master your routine in under 40 seconds, just like the rules recommend.">
        {/* The real app playing Eric's routine (latest build, 11-05): his video, the
            step names as he reaches them, 23.9s against the 40-second limit. */}
        <div className="mx-auto w-[min(64%,280px)] py-10 md:w-[300px]">
          <PhoneVideo
            src="/elite-tempo/app/routine-app.mp4"
            poster="/elite-tempo/app/routine-app-poster.webp"
            label="Elite Tempo playing a recorded driver pre-shot routine: each step is named as the golfer does it, from standing behind the ball to walking in, settling his feet and looking at the target. The whole routine takes 23.8 seconds, 16.2 seconds under the 40-second limit."
          />
        </div>
      </FeatureSection>

      {/* Eric, 11-05: the metronome under the routine, as the app shows it today
          (captured from the latest build in the Simulator). */}
      <FeatureSection title="Use the built-in metronome for quick timing practice.">
        <div className="mx-auto w-[min(64%,280px)] py-10">
          <Phone src="metronome" alt="The Elite Tempo metronome: tempo 3.0 to 1, backswing 0.79 seconds, downswing 0.26 seconds, total 1.05 seconds, with the takeaway, top and impact line and a play button." />
        </div>
      </FeatureSection>

      {/* The close (Eric, 11-04, from his Figma note "full bleed image behind CTA"):
          his tee shot in front of a gallery, edge to edge, with one line, one "Try for
          free" button and the App Store rating. The words sit at the top, over the
          sky on a phone and on the right over the trees on desktop, so the swing stays clear. No prices on the page; most app sites
          he looked at show none, and the FAQ answers what it costs. */}
      <section id="pricing" className="relative mt-[clamp(56px,8vw,96px)] scroll-mt-16 overflow-hidden">
        <div className="relative isolate flex min-h-[clamp(560px,62vw,720px)] flex-col items-center justify-center bg-[#2A3A26] px-[max(20px,env(safe-area-inset-left,0px))] py-16 text-center text-white">
          {/* A lazy picture rather than a CSS background, so it waits until it is near
              the screen instead of competing with the hero picture (speed test, 11-05). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/elite-tempo/video/close.jpg?v=4" alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-10 h-full w-full object-cover" style={{ objectPosition: "56% 70%" }} />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(20,21,24,0.78),rgba(20,21,24,0.68))]" />
          <h2 className="m-0 max-w-[16em] text-[clamp(32px,4.6vw,56px)] font-semibold leading-[1.05] tracking-[-0.03em] [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] [text-wrap:balance]">
            Time your own swing before you pay a thing.
          </h2>
          <a
            href={APP_STORE_URL}
            className="mt-7 inline-flex min-h-[52px] items-center rounded-full bg-white px-8 text-[17px] font-semibold text-[#141518] no-underline transition hover:brightness-95"
          >
            Try for free
          </a>
          <p className="m-0 mt-4 text-[15px] font-medium [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
            <span className="text-[#F9C832]" aria-hidden>
              ★★★★★
            </span>{" "}
            Rated 5.0 on the App Store
          </p>
        </div>
      </section>

      {/* The simple FAQ back on the home page (Eric, 11-04). The cost question lives
          here now that the page shows no price. */}
      <section id="faq" className={`${WRAP} scroll-mt-16 pt-[clamp(56px,8vw,96px)]`}>
        {/* Eric's wireframe (11-04): a plain list with hairlines and plus / minus icons,
            one answer open at a time (details sharing one name). */}
        <div className="mx-auto max-w-[620px]">
          <h2 className={`${H2_SECTION} text-center`}>FAQ</h2>
          <div className="mt-8 border-t border-[#DCDCD5]">
            {FAQS.map(({ q, a }) => (
              <details key={q} name="faq" className="et-faq group border-b border-[#DCDCD5]">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[17px] font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  {q}
                  <span aria-hidden className="relative h-4 w-4 shrink-0">
                    <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-200 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="m-0 pb-5 pr-10 text-[17px] leading-[1.5]" style={{ color: MUTED }}>
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

/* ── Pieces ─────────────────────────────────────────────────────────────── */


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
  /* The four side phones in the hero start as small 360-wide pictures and the carousel
     swaps in the full ones after the page loads (speed test, 11-05): five full pictures
     at once split a weak signal five ways and held the front one back for 5 seconds. */
  const deferred = eager && !priority;
  const first = `/elite-tempo/app/${src}${deferred ? "-sm" : ""}.webp`;
  const full = deferred ? `/elite-tempo/app/${src}.webp` : undefined;
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
            <img src={first} data-full={full} alt="" aria-hidden width={960} height={2087} className="et-clip-still" fetchPriority={priority ? "high" : eager ? "low" : undefined} />
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
          <img src={first} data-full={full} alt={alt} width={960} height={2087} loading={eager ? "eager" : "lazy"} fetchPriority={priority ? "high" : eager ? "low" : undefined} />
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
  body?: string;
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
        {body && (
          <p className="m-0 mt-3 text-[19px] leading-[1.4] [text-wrap:balance]" style={{ color: MUTED }}>
            {body}
          </p>
        )}
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

