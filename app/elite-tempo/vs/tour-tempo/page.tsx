import type { Metadata } from "next";
import Link from "next/link";
import Chrome, { Breadcrumbs, TrialCard, breadcrumbSchema } from "../../Chrome";
import { ACCENT, CARD, HAIRLINE, INK, MUTED, etUrl, SHARE_IMAGES } from "../../theme";
import { SWINGS, fmtRatio, possessive } from "../../data/tempo-data";
import { TRIAL_DAYS } from "../../data/pricing";
import { description } from "../../../seo";

/* "Tour Tempo alternative" is a real query with buying intent.
 *
 * Every claim about Tour Tempo comes from its App Store listing (id329937776) as
 * read on 2026-11-03: preset tone sets (18/6, 21/7, 24/8, 27/9 long game; 14/7 to
 * 30/10 short game), music tracks with the tones in them, and a frame counter for
 * a swing you film or import and count by hand. The listing describes no library
 * of tour swings and no pre-shot routine feature. Re-read the listing before
 * changing any line about them.
 *
 * Every claim about Elite Tempo is checked against the app's code (redesign,
 * TestFlight 1.4.17): swings are marked by hand, never automatically.
 */

const TITLE = "Elite Tempo vs Tour Tempo: What's Actually Different";
const DESCRIPTION = description(
  `Tour Tempo has you match your swing to preset tones. Elite Tempo times your own best swing, plus ${SWINGS.length} hand-timed tour swings and your pre-shot routine.`,
);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: etUrl("/vs/tour-tempo") },
  openGraph: { images: SHARE_IMAGES, title: TITLE, description: DESCRIPTION, url: etUrl("/vs/tour-tempo"), type: "article" },
  twitter: { card: "summary_large_image", images: SHARE_IMAGES, title: TITLE, description: DESCRIPTION },
};

const TRAIL = [
  { name: "Elite Tempo", href: "/" },
  { name: "vs Tour Tempo" },
];

const FAQS = [
  {
    q: "What is the difference between Elite Tempo and Tour Tempo?",
    a: `Tour Tempo gives you preset tones, such as 24/8 or 21/7 frames, and you match your swing to them. Elite Tempo times your own swing from video and plays that timing back so you can groove it. It also has ${SWINGS.length} tour swings timed by hand from tournament footage, and it times your pre-shot routine.`,
  },
  {
    q: "Can Tour Tempo measure my own swing?",
    a: "Its App Store listing says you can film or import a swing and count its frames by hand with a frame counter. Elite Tempo also has you mark your swing by hand, frame by frame. It turns your three marks into four numbers (backswing, downswing, total swing duration and tempo) and plays that timing back so you can practice to it.",
  },
  {
    q: "Is Tour Tempo still worth using?",
    a: "Yes, if you want one preset tempo to drill. The method has been around since the early 2000s, it is simple to follow, and many golfers learned tempo from it.",
  },
  {
    q: "Can I use both?",
    a: "Yes. If you already like Tour Tempo's tones, Elite Tempo adds your own swing's numbers, real tour swings to compare against, and timing for your pre-shot routine.",
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://elitetempo.app/vs/tour-tempo#article",
      headline: TITLE,
      description: DESCRIPTION,
      url: "https://elitetempo.app/vs/tour-tempo",
      publisher: { "@type": "Organization", name: "Elite Prep Inc", url: "https://www.eliteprep.app" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://elitetempo.app/vs/tour-tempo#faq",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    breadcrumbSchema(TRAIL),
  ],
};

function Column({
  name,
  summary,
  points,
  highlight,
}: {
  name: string;
  summary: string;
  points: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className="flex h-full flex-col rounded-2xl p-6"
      style={{ background: CARD, border: `1px solid ${highlight ? ACCENT : HAIRLINE}` }}
    >
      <h3 className="text-lg font-semibold" style={{ color: INK }}>
        {name}
      </h3>
      <p className="mt-2 text-[16px] leading-[1.55]" style={{ color: MUTED }}>
        {summary}
      </p>
      <ul className="mt-5 flex flex-col gap-2.5">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: MUTED }}>
            <span className="mt-0.5 font-semibold" style={{ color: ACCENT }} aria-hidden>
              ·
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function VsTourTempo() {
  const fastest = [...SWINGS].sort((a, b) => a.ratio - b.ratio)[0];
  const slowest = [...SWINGS].sort((a, b) => b.ratio - a.ratio)[0];

  return (
    <Chrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      <article className="mx-auto max-w-3xl px-5 pt-10 sm:pt-16">
        <Breadcrumbs trail={TRAIL} />

        <h1
          className="mt-6 text-[clamp(34px,5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em]"
          style={{ color: INK, textWrap: "balance" }}
        >
          Elite Tempo vs Tour Tempo
        </h1>

        <p className="mt-6 text-[19px] leading-[1.5]" style={{ color: MUTED }}>
          Tour Tempo trains you to a preset beat. You pick a tone set, like 24/8 or
          21/7, and match your swing to it. Elite Tempo starts from a swing you
          already trust: film your best one, mark it, and groove that timing.
        </p>

        <h2 className="mt-12 text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
          Side by side
        </h2>
        <section className="mt-5 grid gap-4 sm:grid-cols-2">
          <Column
            name="Tour Tempo"
            summary="Preset tones built on the 3:1 method."
            points={[
              "Long game tone sets of 18/6, 21/7, 24/8 and 27/9 frames",
              "Short game tone sets from 14/7 to 30/10",
              "Music tracks with the tones built in",
              "Film or import a swing and count its frames by hand",
            ]}
          />
          <Column
            name="Elite Tempo"
            summary="Your best swing, real tour swings, and your routine."
            highlight
            points={[
              "Film your best swing, mark takeaway, top and impact frame by frame, and practice to its timing",
              `${SWINGS.length} tour swings hand-timed from tournament footage, ${fmtRatio(fastest)} to ${fmtRatio(slowest)}`,
              "Your four numbers next to a tour player's: backswing, downswing, total swing duration and tempo",
              "Your pre-shot routine timed step by step against the 40 seconds the USGA and The R&A recommend",
            ]}
          />
        </section>

        <section className="mt-14">
          <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            A preset tempo, or your own
          </h2>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            Tour Tempo&apos;s tones come from the 3:1 method: 24 frames back and 8
            frames down at 30 frames per second. Pick a tone set and you have a
            target, the same one every golfer who picks it gets.
          </p>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            Your best swing already has timing that works for your body. Elite Tempo
            measures it from your own video and plays it back, so you groove the
            timing you have instead of changing your swing to fit a number. If you
            want a target from the tour, the{" "}
            <Link
              href="/tempos"
              className="font-semibold underline decoration-1 underline-offset-4 hover:opacity-70"
              style={{ color: INK }}
            >
              tempo library
            </Link>{" "}
            has {SWINGS.length} tournament swings, from {possessive(fastest.player)}{" "}
            {fmtRatio(fastest)} to {possessive(slowest.player)} {fmtRatio(slowest)}.{" "}
            <Link
              href="/how-we-time-swings"
              className="font-semibold underline decoration-1 underline-offset-4 hover:opacity-70"
              style={{ color: INK }}
            >
              How we time swings
            </Link>{" "}
            shows how each one was measured.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            Your pre-shot routine
          </h2>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            Tour Tempo&apos;s listing describes tones for the swing only. Elite Tempo
            also times the routine before it. Film your routine once, name each step,
            like picking a target or a practice swing, and see your total against the
            40 seconds the USGA and The R&amp;A recommend. In routine practice, the
            app hears the strike and tells you whether you were on time.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            Which one suits you
          </h2>
          <div className="mt-6 flex flex-col gap-5">
            <div>
              <h3 className="text-base font-semibold" style={{ color: INK }}>
                Pick Tour Tempo if
              </h3>
              <p className="mt-2 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
                you want one preset tempo, drilled to tones until it feels
                automatic.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold" style={{ color: INK }}>
                Pick Elite Tempo if
              </h3>
              <p className="mt-2 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
                you want to keep the swing you have and repeat its best timing,
                compare your numbers with a tour player&apos;s, and time your
                pre-shot routine. You place the three marks yourself, frame by frame,
                so you can see where every number comes from.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            Common questions
          </h2>
          <div className="mt-6" style={{ borderTop: `1px solid ${HAIRLINE}` }}>
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 marker:content-none">
                  <span className="text-base font-semibold" style={{ color: INK }}>
                    {q}
                  </span>
                  <span
                    className="shrink-0 text-2xl font-light leading-none"
                    style={{ color: ACCENT }}
                    aria-hidden
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">&#8722;</span>
                  </span>
                </summary>
                <p className="pb-5 pr-10 text-[16px] leading-[1.55]" style={{ color: MUTED }}>
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-12 text-[13px] leading-relaxed" style={{ color: MUTED }}>
          Tour Tempo is a trademark of its owner. Elite Tempo is not affiliated
          with, sponsored by, or endorsed by Tour Tempo. Details about Tour Tempo
          come from its App Store listing as of November 2026; check the listing
          for what it includes today.
        </p>

        <TrialCard title={<>Time your best swing.</>}>
          Free for {TRIAL_DAYS} days. Film one swing and see your four numbers.
        </TrialCard>
      </article>
    </Chrome>
  );
}
