import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import AppPhone from "./components/AppPhone";
import Logo from "./components/Logo";
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
const TRIAL_LINE = "14 days free. No credit card.";

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
      logo: `${SITE_URL}/icon.png`,
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
      <NextEvent />
      <Feature
        title="Log practice in a minute."
        line="Tap what you worked on and how long. Elite Prep does the rest."
        src="/app-screens/redesign/practice.png"
        alt="Log a practice screen asking what did you work on. Approach is selected with 30 minutes chosen."
      />
      <Feature
        title="See where you lose strokes."
        line="Every round turns into one sentence about what to practice next."
        src="/app-screens/redesign/stats.png"
        alt="Stats screen showing plus 2.0 strokes gained per round against a 10 handicap, with the sentence: putting is where you lose the most."
        flip
      />
      <Pricing />
      <Close />
      <Footer />
    </main>
  );
}

function TopNav() {
  return (
    <header className="ep-nav">
      <div className="ep-wrap ep-nav-row">
        <Link href="/" aria-label="Elite Prep home" className="inline-flex min-h-[44px] shrink-0 items-center">
          <Logo fontSize={20} />
        </Link>
        <div className="ep-nav-actions">
          <a href={LOGIN_URL} className="ep-nav-link">
            Log in
          </a>
          <a href={SIGNUP_URL} className="ep-btn ep-btn-small">
            Start free
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="ep-hero">
      <div className="ep-wrap ep-center">
        <h1 className="ep-h1">Every rep. Every round. Every event. One system.</h1>
        <p className="ep-lead">Elite Prep plans your practice around your next event and shows if it is working.</p>
        <a href={SIGNUP_URL} className="ep-btn">
          Start free
        </a>
        <p className="ep-foot">{TRIAL_LINE}</p>
      </div>
      <div className="ep-hero-phone">
        <AppPhone
          src="/app-screens/redesign/home.png"
          alt="Elite Prep Home screen. A ring shows 66% ready for the Spring Invitational, 15 days to go, with 5 of 6 practices and 1 of 3 rounds done."
          sizes="340px"
          priority
        />
      </div>
    </section>
  );
}

function NextEvent() {
  return (
    <section className="ep-section">
      <div className="ep-wrap ep-center">
        <h2 className="ep-h2">Know how ready you are for your next event.</h2>
        <p className="ep-lead">
          Pick the practices and rounds you want before it. Prep % shows how much of that plan is done.
        </p>
        <div className="ep-sum" role="img" aria-label="Example: 5 of 6 practices and 1 of 3 rounds done means 66% ready.">
          <div>
            <p className="ep-sum-number">5 of 6</p>
            <p className="ep-sum-label">practices</p>
          </div>
          <span className="ep-sum-sign" aria-hidden>+</span>
          <div>
            <p className="ep-sum-number">1 of 3</p>
            <p className="ep-sum-label">rounds</p>
          </div>
          <span className="ep-sum-sign" aria-hidden>=</span>
          <div>
            <p className="ep-sum-number ep-sum-total">66%</p>
            <p className="ep-sum-label">ready</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ title, line, src, alt, flip = false }: { title: string; line: string; src: string; alt: string; flip?: boolean }) {
  return (
    <section className="ep-section">
      <div className={`ep-wrap ep-feature ${flip ? "ep-feature-flip" : ""}`}>
        <div className="ep-feature-copy">
          <h2 className="ep-h2">{title}</h2>
          <p className="ep-lead">{line}</p>
        </div>
        <div className="ep-feature-phone">
          <AppPhone src={src} alt={alt} sizes="(max-width: 899px) 80vw, 340px" />
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="ep-section">
      <div className="ep-wrap ep-center">
        <h2 className="ep-h2">Try it free for 14 days.</h2>
        <p className="ep-lead">
          Then {MONTHLY_PRICE} a month or {YEARLY_PRICE} a year. Every feature is included. You do not need a credit card to start.
        </p>
        <p className="ep-foot">
          You use Elite Prep in your web browser for now. The phone app shown here is in testing.
        </p>
      </div>
    </section>
  );
}

function Close() {
  return (
    <section className="ep-close">
      <Image src="/hero/tee-shot-c.jpg" alt="" aria-hidden fill className="object-cover object-[center_60%]" sizes="100vw" />
      <div className="ep-close-scrim" aria-hidden />
      <div className="ep-wrap ep-center ep-close-inner">
        <h2 className="ep-h2">
          Know what to work on.
          <br />
          Know it&rsquo;s working.
        </h2>
        <a href={SIGNUP_URL} className="ep-btn">
          Start free
        </a>
        <p className="ep-foot" style={{ color: "var(--text2)" }}>
          {TRIAL_LINE}
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="ep-footer">
      <div className="ep-wrap ep-footer-row">
        <Logo fontSize={16} />
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
