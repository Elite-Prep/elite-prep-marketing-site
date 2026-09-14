import type { Metadata } from "next";
import Link from "next/link";
import Chrome, { AppStoreButton, Breadcrumbs, breadcrumbSchema } from "../../Chrome";
import { ACCENT, CARD, HAIRLINE, INK, MUTED } from "../../theme";
import { SWINGS, fmtRatio } from "../../data/tempo-data";

/* "Tour Tempo alternative" is a real query with buying intent and no good answer.
 *
 * The rule for this page: be fair to the point of being generous. Tour Tempo is
 * the reason most golfers have heard of swing tempo at all, the method is sound,
 * and a page that rubbishes it would be both wrong and counterproductive —
 * comparison pages that read as advertising get ignored by readers and discounted
 * by answer engines. Claims about their product are kept to what the method is
 * publicly and uncontroversially known to be; no pricing, no feature lists we
 * have not verified, no putting words in their mouth.
 *
 * The honest difference is narrow and real: Tour Tempo trains you toward one
 * ratio, and Elite Tempo measures what you actually did. Say that, say who each
 * suits, and let the reader decide.
 */

const TITLE = "Elite Tempo vs Tour Tempo: What's Actually Different";
const DESCRIPTION =
  "An honest comparison of two golf tempo trainers. Tour Tempo teaches one proven ratio with audio tones; Elite Tempo plays sixteen hand-timed tour swings at their real ratios and then records and times your own swing. What each does well, and which one fits how you practise.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/elite-tempo/vs/tour-tempo" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/elite-tempo/vs/tour-tempo", type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const TRAIL = [
  { name: "Elite Tempo", href: "/elite-tempo" },
  { name: "vs Tour Tempo" },
];

const FAQS = [
  {
    q: "What is the difference between Elite Tempo and Tour Tempo?",
    a: "Tour Tempo trains you toward a single proven ratio using audio tones — the 3:1 backswing-to-downswing relationship, counted as frames at 30fps. Elite Tempo plays sixteen specific tour swings at the ratios they were actually swung at, which range well either side of 3:1, and then records your own swing and finds takeaway, top and impact in it automatically so you can measure what you did rather than only hear a target.",
  },
  {
    q: "Is Tour Tempo still worth using?",
    a: "Yes, if what you want is a single tempo to groove. The method has been in use since the early 2000s, it is simple to follow, and a lot of golfers have got results from it. Its strength — one number, drilled repeatedly — is also the thing some players want to go beyond.",
  },
  {
    q: "Do I need to choose between them?",
    a: "No. They do different jobs and a lot of people who care about tempo end up using more than one tool. If you already swing well to Tour Tempo's tones, the thing Elite Tempo adds is measurement of your own swing rather than a different target to swing to.",
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.eliteprep.app/elite-tempo/vs/tour-tempo#article",
      headline: TITLE,
      description: DESCRIPTION,
      url: "https://www.eliteprep.app/elite-tempo/vs/tour-tempo",
      publisher: { "@type": "Organization", name: "Elite Prep, LLC", url: "https://www.eliteprep.app" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.eliteprep.app/elite-tempo/vs/tour-tempo#faq",
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
      <h3 className="text-lg font-extrabold" style={{ color: INK }}>
        {name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
        {summary}
      </p>
      <ul className="mt-5 flex flex-col gap-2.5">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: MUTED }}>
            <span className="mt-0.5 font-extrabold" style={{ color: ACCENT }} aria-hidden>
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

      <article className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        <Breadcrumbs trail={TRAIL} />

        <h1
          className="mt-6 text-3xl font-extrabold leading-[1.1] sm:text-4xl"
          style={{ color: INK, textWrap: "balance" }}
        >
          Elite Tempo vs Tour Tempo
        </h1>

        <p className="mt-6 text-lg leading-relaxed" style={{ color: MUTED }}>
          Straight answer first: if you want one proven tempo to drill, Tour Tempo
          does that and has done for twenty years. It is the reason most golfers
          have heard of swing tempo at all. The difference is not that one is
          better — it is that they answer different questions.
        </p>

        <div
          className="mt-8 rounded-2xl p-6"
          style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
        >
          <p className="text-base leading-relaxed" style={{ color: INK }}>
            Tour Tempo gives you a <strong>target</strong> to swing to. Elite Tempo
            gives you a target <em>and</em> a{" "}
            <strong style={{ color: ACCENT }}>measurement</strong> of what you
            actually did.
          </p>
        </div>

        <section className="mt-12 grid gap-4 sm:grid-cols-2">
          <Column
            name="Tour Tempo"
            summary="A method, delivered as audio tones."
            points={[
              "Trains toward the 3:1 ratio, counted as frames at 30fps",
              "Tones for the full swing and for the short game",
              "Simple, repeatable, and backed by a well-known book",
              "You judge your own success by feel and by ear",
            ]}
          />
          <Column
            name="Elite Tempo"
            summary="Specific swings, plus measurement of yours."
            highlight
            points={[
              `${SWINGS.length} real tour shots, hand-timed from the footage to 1/100s`,
              `Ratios as they were actually swung — ${fmtRatio(fastest)} to ${fmtRatio(slowest)}, not one number`,
              "Records your swing and finds takeaway, top and impact automatically",
              "Side-by-side comparison, routine timing, Apple Watch and lock screen",
            ]}
          />
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-extrabold" style={{ color: INK }}>
            One ratio, or the real ones?
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
            The 3:1 ratio is a good average and a genuinely useful teaching device.
            It comes from counting frames — 24 back, 8 down at 30 frames per second
            — which is easy to do and puts most golfers somewhere sensible.
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
            What counting frames cannot show you is how much real swings differ.
            Timed directly against tournament footage, the shots in{" "}
            <Link
              href="/elite-tempo/tempos"
              className="font-semibold underline decoration-1 underline-offset-4 hover:text-[#FFB300]"
              style={{ color: INK }}
            >
              Elite Tempo&apos;s library
            </Link>{" "}
            run from {fastest.player}&apos;s {fmtRatio(fastest)} to{" "}
            {slowest.player}&apos;s {fmtRatio(slowest)}. Neither of those is wrong,
            and neither is 3:1 — they are simply different swings.{" "}
            <Link
              href="/elite-tempo/how-we-time-swings"
              className="font-semibold underline decoration-1 underline-offset-4 hover:text-[#FFB300]"
              style={{ color: INK }}
            >
              How the timing is done
            </Link>
            , including its limits.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-extrabold" style={{ color: INK }}>
            Which one suits you
          </h2>
          <div className="mt-6 flex flex-col gap-5">
            <div>
              <h3 className="text-base font-bold" style={{ color: INK }}>
                Pick Tour Tempo if
              </h3>
              <p className="mt-2 text-base leading-relaxed" style={{ color: MUTED }}>
                you want one tempo, drilled until it is automatic, with as little
                apparatus as possible. A target and your own feel is a perfectly
                good way to practise, and it is how a lot of good players work.
              </p>
            </div>
            <div>
              <h3 className="text-base font-bold" style={{ color: INK }}>
                Pick Elite Tempo if
              </h3>
              <p className="mt-2 text-base leading-relaxed" style={{ color: MUTED }}>
                you want to know your own number. Filming a swing and getting back
                your exact backswing, downswing and ratio — without scrubbing through
                frames yourself — is the thing a tones-only trainer cannot do, and it
                is what tells you whether the practice is working.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-extrabold" style={{ color: INK }}>
            Common questions
          </h2>
          <div className="mt-6" style={{ borderTop: `1px solid ${HAIRLINE}` }}>
            {FAQS.map(({ q, a }) => (
              <details key={q} className="group" style={{ borderBottom: `1px solid ${HAIRLINE}` }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 marker:content-none">
                  <span className="text-base font-bold" style={{ color: INK }}>
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
                <p className="pb-5 pr-10 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <p className="mt-12 text-xs leading-relaxed" style={{ color: MUTED }}>
          Tour Tempo is a trademark of its respective owner. Elite Tempo is not
          affiliated with, sponsored by, or endorsed by Tour Tempo. This page
          describes the published 3:1 method in general terms; for what Tour Tempo
          includes today, check their own site.
        </p>

        <div
          className="mt-10 rounded-3xl p-8 text-center"
          style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
        >
          <h2 className="text-xl font-extrabold" style={{ color: INK }}>
            Try it against your own swing.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
            Free for 14 days. Film one swing and see your real ratio before you
            decide anything.
          </p>
          <div className="mt-7 flex justify-center">
            <AppStoreButton />
          </div>
        </div>
      </article>
    </Chrome>
  );
}
