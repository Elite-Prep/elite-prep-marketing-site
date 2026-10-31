import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, Minus } from "lucide-react";
import AppPhone from "./components/AppPhone";
import HeroCarousel from "./components/HeroCarousel";
import Logo from "./components/Logo";
import PrepRing from "./components/PrepRing";
import Reveal from "./components/Reveal";
import "./home.css";

const LOGIN_URL = "https://app.eliteprep.app/login";
// Conversion CTAs land on /signup: the app's onboarding runs signup, role, tier,
// handicap, readiness preview, then paywall. Pointing at /billing would skip it.
const SIGNUP_URL = "https://app.eliteprep.app/signup";

/* Prices and trial terms. Source of truth: Elite-Prep-Web-App-V2
   resources/lang/en_strings.json (plan_* and trial_terms_hero) and
   TRIAL_PERIOD_DAYS in lib/stripe.ts. Update here when those change. */
const MONTHLY_PRICE = "$24.99";
const YEARLY_PRICE = "$249";
const YEARLY_PER_MONTH = "$20.75";
const TRIAL_LINE = `14 days free. No credit card. Then ${MONTHLY_PRICE} a month or ${YEARLY_PRICE} a year.`;

const SITE_URL = "https://www.eliteprep.app";
const PAGE_TITLE = "Elite Prep: Know what to work on. Know it's working.";
const PAGE_DESCRIPTION =
  "The system competitive golfers use to prepare for every event: plan practice, build drills, track every round, and see where your work should go.";

/* eliteprep.app redirects to www.eliteprep.app, so both spellings can end up in
   an index pointing at the same page. A canonical says which one counts. Set here
   rather than in the root layout on purpose: a canonical in the layout would
   apply "/" to every page that does not override it, quietly telling Google that
   /privacy and /terms are duplicates of the homepage. */
export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Elite Prep",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

/* The browser bar matches the app's canvas. Set on this page, not the root
   layout, so the Elite Tempo pages keep their own look. */
export const viewport: Viewport = {
  themeColor: "#0A0B0D",
};

/* Who this site belongs to, in a form a search engine can resolve.
 *
 * The homepage carried no structured data at all, which is why results for it
 * print a bare blue link: with no Organization there is no logo beside the
 * result and nothing for a knowledge panel to attach to, and with no WebSite
 * there is no sitelinks search box. `sameAs` is what ties this domain to the
 * App Store listings, so the site and the apps resolve as one entity rather
 * than three unrelated things with similar names.
 *
 * Sitelinks themselves are earned, not declared. Google builds them from site
 * structure and branded search volume. This is the half that can be declared. */

const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Elite Prep Inc",
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
    <main className="ep flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />
      <TopNav />
      <Hero />
      <Thesis />
      <PrepPercent />
      <Screens />
      <Everything />
      <Compare />
      <WhoItsFor />
      <Pricing />
      <Close />
      <Footer />
    </main>
  );
}

/* Section links for the sticky header. Order matches the page. */
const HOME_SECTIONS = [
  { id: "how", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "why", label: "Why Elite Prep" },
  { id: "pricing", label: "Pricing" },
];

function TopNav() {
  return (
    <header className="ep-nav">
      <div className="ep-wrap ep-nav-row">
        <Link href="/" aria-label="Elite Prep home" className="inline-flex min-h-[44px] shrink-0 items-center">
          <Logo width={132} showBeta={false} />
        </Link>
        <nav aria-label="Page sections" className="ep-nav-links">
          {HOME_SECTIONS.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className="ep-nav-link">
              {label}
            </a>
          ))}
        </nav>
        <div className="ep-nav-actions">
          <a href={LOGIN_URL} className="ep-nav-link">
            Log in
          </a>
          <a href={SIGNUP_URL} className="ep-btn ep-btn-small">
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="ep-hero">
      <div className="ep-wrap ep-hero-grid">
        <div className="ep-hero-copy">
          <p className="ep-eyebrow">The prep app for competitive golfers</p>
          <h1 className="ep-h1 mt-4">Every rep. Every round. Every event. One system.</h1>
          <p className="ep-lead mt-6">
            Track your practice, track your rounds, and see how they connect. It
            all builds into a repeatable system that gets you prepared for every
            event.
          </p>
          <div className="mt-8">
            <a href={SIGNUP_URL} className="ep-btn">
              Start free
            </a>
            <p className="ep-foot mt-4">{TRIAL_LINE}</p>
          </div>
        </div>
        <div className="ep-hero-phone">
          <AppPhone
            src="/app-screens/redesign/home.png"
            alt="Elite Prep Home screen. A ring shows 66% ready for the Spring Invitational, 15 days to go, with 5 of 6 practices and 1 of 3 rounds done. Below it, putting is named as the biggest gap at minus 2.3 strokes a round."
            sizes="300px"
            priority
          />
        </div>
      </div>
    </section>
  );
}

function Thesis() {
  return (
    <section className="ep-thesis ep-section">
      <HeroCarousel />
      <div className="ep-thesis-scrim" aria-hidden />
      <div className="ep-wrap">
        <Reveal>
          <p className="ep-eyebrow">What we believe</p>
          <h2 className="ep-h2 mt-4">
            Golf is played on the course.
            <br />
            It&rsquo;s won off it.
          </h2>
          <p className="ep-lead mt-6">
            Most of your game gets built in the hours nobody tracks: the range
            sessions, the short game work, the practice rounds, the time with
            your coach. Until now that work lived in five different places, or
            nowhere at all.
          </p>
          <p className="ep-lead mt-4">
            Elite Prep is one system for all of it: the prep a competitive golfer
            built to stay ready, now an app you can run.
          </p>
          <p className="ep-h3 mt-10">Practice. Play. Compete. Learn. Repeat.</p>
        </Reveal>
      </div>
    </section>
  );
}

function PrepPercent() {
  return (
    <section className="ep-section">
      <div className="ep-wrap ep-two">
        <Reveal>
          <div className="ep-card py-10 text-center">
            <PrepRing percent={66} />
            <p className="ep-h3 mt-6">Spring Invitational</p>
            <p className="mt-1">15 days to go</p>
          </div>
        </Reveal>
        <Reveal>
          <p className="ep-eyebrow">Prep %</p>
          <h2 className="ep-h2 mt-3">One number shows how ready you are for your next event.</h2>
          <p className="ep-lead mt-6">
            Add an event and choose how many practices and rounds you want done
            before it. Elite Prep counts what you log and turns it into one number.
          </p>
          <div className="ep-tiles">
            <div className="ep-tile">
              <p className="ep-eyebrow">Practices</p>
              <p className="ep-tile-number">5 of 6</p>
            </div>
            <div className="ep-tile">
              <p className="ep-eyebrow">Rounds</p>
              <p className="ep-tile-number">1 of 3</p>
            </div>
          </div>
          <p className="ep-foot mt-4">In this example, 6 of 9 planned sessions are done, so you are 66% ready.</p>
        </Reveal>
      </div>
    </section>
  );
}

const SCREENS: {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  shots: { src: string; alt: string }[];
}[] = [
  {
    eyebrow: "Log",
    title: "Log your work in about a minute.",
    body: "One button starts everything. Tap the area you worked on, pick the minutes, and you are done.",
    points: [
      "Log practice you already did.",
      "Start a timer and let the session log itself.",
      "Add a round, a mental check-in, a journal note, a photo, or an event.",
    ],
    shots: [
      {
        src: "/app-screens/redesign/log.png",
        alt: "Elite Prep log menu asking what do you want to log, with tiles for Practice, Round, Start a timer and Mental check-in, and rows for Journal note, Photo or video and Add an event.",
      },
      {
        src: "/app-screens/redesign/practice.png",
        alt: "Log a practice screen asking what did you work on. Approach is selected with 30 minutes chosen.",
      },
    ],
  },
  {
    eyebrow: "Stats",
    title: "See where you gain and lose strokes.",
    body: "Strokes gained tells you how each part of your game compares to a benchmark. Elite Prep puts it in one sentence: what is working, and what is costing you the most.",
    points: [
      "Compare yourself to Tour, scratch, or a handicap level.",
      "Split it into off the tee, approach, short game, and putting.",
      "Follow your scores, greens, fairways, and putts over time.",
    ],
    shots: [
      {
        src: "/app-screens/redesign/stats.png",
        alt: "Elite Prep Stats screen showing plus 2.0 strokes gained per round against a 10 handicap, with the sentence: you beat your benchmark overall, putting is where you lose the most.",
      },
      {
        src: "/app-screens/redesign/stats2.png",
        alt: "Scores chart with an 83.8 average, a best of 81 and a latest of 85, above tiles showing 39% of greens and 52% of fairways.",
      },
    ],
  },
  {
    eyebrow: "Home",
    title: "See your week and what is coming up.",
    body: "Home shows the work you have done and the events on your schedule, so you always know what is next.",
    points: [
      "See your practice time for the last 7 days.",
      "See your rounds and average score for the last 30 days.",
      "See every upcoming event with its date and course.",
    ],
    shots: [
      {
        src: "/app-screens/redesign/home2.png",
        alt: "Home screen tiles showing 2 hours 30 minutes of practice in 7 days and 2 rounds in 30 days, then a Coming up list with the Spring Invitational on November 15 and the Club Championship on December 11.",
      },
    ],
  },
];

function Screens() {
  return (
    <section id="how" className="ep-section ep-rule">
      <div className="ep-wrap">
        <Reveal>
          <p className="ep-eyebrow">How it works</p>
          <h2 className="ep-h2 mt-3">Your season, end to end.</h2>
        </Reveal>
        <div className="ep-rows">
          {SCREENS.map((row, i) => (
            <Reveal key={row.eyebrow}>
              <div className={`ep-row ${i % 2 === 1 ? "ep-row-flip" : ""}`}>
                <div>
                  <p className="ep-eyebrow">{row.eyebrow}</p>
                  <h3 className="ep-h2 mt-3" style={{ fontSize: "clamp(26px, 3vw, 32px)" }}>
                    {row.title}
                  </h3>
                  <p className="ep-lead mt-4">{row.body}</p>
                  <ul className="ep-row-list mt-6">
                    {row.points.map((point) => (
                      <li key={point}>
                        <Check size={16} strokeWidth={2.5} aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ep-row-phones">
                  {row.shots.map((shot) => (
                    <AppPhone
                      key={shot.src}
                      src={shot.src}
                      alt={shot.alt}
                      sizes="(max-width: 899px) 45vw, 260px"
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Each line was checked against the app code on 2026-10-31. Claims describe
   what a person gets after signing up, which is the web app. Do not add a
   feature here until it has merged to master. */
const DETAIL_GROUPS: { tag: string; title: string; items: string[] }[] = [
  {
    tag: "Plan",
    title: "Plan your season around your events.",
    items: [
      "Set your goal and target handicap.",
      "Keep every event on one schedule with a countdown.",
      "Set how many rounds and practices you want before each event.",
      "See a score forecast for each event, your chance of hitting your target score, and the weather.",
      "Use the Elite Prep Drills library, or build your own drills and sessions.",
    ],
  },
  {
    tag: "Train",
    title: "Build your practice and run it.",
    items: [
      "Tell the AI how much time you have and where you can practice. It builds the session.",
      "Run the session on a live timer, one drill at a time.",
      "Turn a video, photo, YouTube link, or written description into a drill.",
      "Log practice, gym work, and mental training.",
    ],
  },
  {
    tag: "Play",
    title: "Track every round in depth.",
    items: [
      "Log tournament rounds and practice rounds.",
      "Track shot by shot on a GPS map, or enter just your score.",
      "See strokes gained against Tour, scratch, or a handicap level.",
      "Track fairways, greens, putts, and penalties.",
    ],
  },
  {
    tag: "Reflect",
    title: "Keep a record of your head and your swing.",
    items: [
      "Write a journal note and get a short reply from the AI journal coach.",
      "Rate your focus, confidence, energy, and more in a mental check-in.",
      "Keep a technique log that your coach can add notes to.",
    ],
  },
  {
    tag: "Compare",
    title: "Check your work against your results.",
    items: [
      "See your practice time next to your strokes gained for each area.",
      "See when your time goes to one area while another costs you the most.",
      "Know where to shift your reps before the next event.",
    ],
  },
  {
    tag: "Together",
    title: "Bring in your coach and other players.",
    items: [
      "See who else is putting in the work.",
      "Follow players, like their work, and comment.",
      "Climb the leaderboards for practice volume and consistency.",
      "Connect your coach with a code, then get notes and drills from them.",
    ],
  },
];

function Everything() {
  return (
    <section id="features" className="ep-section ep-rule">
      <div className="ep-wrap">
        <Reveal>
          <p className="ep-eyebrow">The full system</p>
          <h2 className="ep-h2 mt-3">Everything it does.</h2>
        </Reveal>
        <div className="ep-grid">
          {DETAIL_GROUPS.map((group) => (
            <div key={group.tag} className="ep-card">
              <p className="ep-eyebrow">{group.tag}</p>
              <h3 className="ep-h3 mt-2">{group.title}</h3>
              <ul className="ep-card-list">
                {group.items.map((item) => (
                  <li key={item}>
                    <Check size={16} strokeWidth={2.5} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const COMPETITORS = ["Elite Prep", "Stat trackers", "Coaching apps", "Wearables"];

const COMPARE_ROWS: { feature: string; marks: [boolean, boolean, boolean, boolean] }[] = [
  { feature: "Organizes around your event calendar", marks: [true, false, false, false] },
  { feature: "Builds your practice sessions for you", marks: [true, false, false, false] },
  { feature: "Lets you build your own drills and sessions", marks: [true, true, true, false] },
  { feature: "Tracks rounds shot by shot with strokes gained", marks: [true, true, false, false] },
  { feature: "Keeps tournament rounds, practice rounds, and practice in one place", marks: [true, true, false, false] },
  { feature: "Captures how practice felt with a journal and mental check-ins", marks: [true, false, false, false] },
  { feature: "Compares your practice time to your round results", marks: [true, false, false, false] },
  { feature: "Shows your coach your training between lessons", marks: [true, true, true, false] },
  { feature: "Tracks recovery and sleep", marks: [false, false, false, true] },
];

function compareNote(marks: boolean[]): string {
  const others = COMPETITORS.slice(1)
    .filter((_, i) => marks[i + 1])
    .map((name) => name.toLowerCase());
  if (!marks[0]) {
    return `Not in Elite Prep. Use ${others.join(" or ")} for this.`;
  }
  return others.length > 0 ? `Also in ${others.join(" and ")}.` : "Only in Elite Prep.";
}

function CompareMark({ value }: { value: boolean }) {
  return value ? (
    <span className="ep-mark ep-mark-yes" role="img" aria-label="Yes">
      <Check size={20} strokeWidth={2.5} aria-hidden />
    </span>
  ) : (
    <span className="ep-mark ep-mark-no" role="img" aria-label="No">
      <Minus size={20} strokeWidth={2} aria-hidden />
    </span>
  );
}

function Compare() {
  return (
    <section id="why" className="ep-section ep-rule">
      <div className="ep-wrap">
        <Reveal>
          <p className="ep-eyebrow">How Elite Prep compares</p>
          <h2 className="ep-h2 mt-3">Built for the work between events.</h2>
          <p className="ep-lead mt-6">
            Recovery trackers grade your sleep. Stat trackers grade the round you
            already played. Elite Prep is built for the part that decides the
            outcome: the work between events.
          </p>
        </Reveal>
        <div className="ep-card ep-table-wrap">
          <table className="ep-table">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Feature</span>
                </th>
                {COMPETITORS.map((name, i) => (
                  <th key={name} scope="col" className={i === 0 ? "ep-us" : undefined}>
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  {row.marks.map((mark, i) => (
                    <td key={COMPETITORS[i]} className={i === 0 ? "ep-us" : undefined}>
                      <CompareMark value={mark} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Five columns do not fit a phone without shrinking text under 12px,
            so phones get the same facts as a list. */}
        <ul className="ep-card ep-compare-list">
          {COMPARE_ROWS.map((row) => (
            <li key={row.feature}>
              <CompareMark value={row.marks[0]} />
              <div>
                <p className="ep-compare-title">{row.feature}</p>
                <p className="ep-foot mt-1">{compareNote(row.marks)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section id="who" className="ep-section ep-rule">
      <div className="ep-wrap">
        <Reveal>
          <p className="ep-eyebrow">Who it&rsquo;s for</p>
          <h2 className="ep-h2 mt-3">
            For athletes who take the work seriously and the coaches in their corner.
          </h2>
        </Reveal>
        <div className="ep-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))" }}>
          <div className="ep-card">
            <h3 className="ep-h3">Athletes</h3>
            <p className="mt-3">
              Junior, collegiate, amateur, and professional golfers who care about
              the work between events. Walk into every event knowing you put in
              the right prep.
            </p>
          </div>
          <div className="ep-card">
            <h3 className="ep-h3">Coaches</h3>
            <p className="mt-3">
              See what happens between lessons. Send technique notes and drills to
              your students, see which of those drills they finished, and follow
              their recent activity. Coach tools run in your web browser.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="ep-section ep-rule">
      <div className="ep-wrap">
        <Reveal>
          <p className="ep-eyebrow">Pricing</p>
          <h2 className="ep-h2 mt-3">Try it free for 14 days.</h2>
          <p className="ep-lead mt-6">
            Both plans include every feature. You do not need a credit card to start. Cancel anytime.
          </p>
        </Reveal>
        <div className="ep-plans">
          <div className="ep-card ep-plan-best">
            <div className="ep-plan-top">
              <h3 className="ep-h3">Yearly</h3>
              <span className="ep-badge">Best value</span>
            </div>
            <p className="ep-price">{YEARLY_PRICE}</p>
            <p className="mt-1">per year</p>
            <p className="ep-foot mt-3">{YEARLY_PER_MONTH} a month. 2 months free.</p>
          </div>
          <div className="ep-card">
            <div className="ep-plan-top">
              <h3 className="ep-h3">Monthly</h3>
            </div>
            <p className="ep-price">{MONTHLY_PRICE}</p>
            <p className="mt-1">per month</p>
          </div>
        </div>
        <a href={SIGNUP_URL} className="ep-btn mt-8">
          Start free
        </a>
        <p className="ep-foot mt-6 max-w-[42em]">
          The screens on this page are from the Elite Prep phone app, which is in
          testing and not in the app stores yet. When you sign up today, you use
          Elite Prep in your web browser on any phone or computer.
        </p>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section id="get-started" className="ep-close ep-section">
      <Image src="/hero/tee-shot-c.jpg" alt="" aria-hidden fill className="object-cover object-[center_60%]" sizes="100vw" />
      <div className="ep-close-scrim" aria-hidden />
      <div className="ep-wrap ep-close-inner">
        <Reveal>
          <h2 className="ep-h2">
            Know what to work on.
            <br />
            Know it&rsquo;s working.
          </h2>
          <a href={SIGNUP_URL} className="ep-btn mt-8">
            Start free
          </a>
          <p className="ep-foot mt-4" style={{ color: "var(--text2)" }}>
            {TRIAL_LINE}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="ep-rule">
      <div className="ep-wrap ep-footer-row">
        <Logo width={90} showBeta={false} />
        <div className="ep-footer-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          {/* The one link from here to Elite Tempo. elitetempo.app launched with no
              backlinks, and this is a domain Google already crawls. */}
          <a href="https://elitetempo.app">Elite Tempo</a>
          <span>© {new Date().getFullYear()} Elite Prep Inc.</span>
        </div>
      </div>
    </footer>
  );
}
