import type { Metadata } from "next";
import Link from "next/link";
import Chrome, { Breadcrumbs, TrialCard, breadcrumbSchema } from "../../Chrome";
import { ACCENT, CARD, HAIRLINE, INK, MUTED, etUrl, SHARE_IMAGES } from "../../theme";
import { SWINGS, fmtRatio, fmtSeconds, possessive } from "../../data/tempo-data";
import { TRIAL_DAYS } from "../../data/pricing";
import { description } from "../../../seo";

/* "Can I just use a metronome for golf tempo?" is a question people genuinely ask
 * — it is the cheapest possible answer and a fair thing to try first. The page
 * takes it seriously rather than dismissing it, because the real answer has actual
 * content in it: a metronome is evenly spaced and a golf swing is not, so the
 * thing you would need to do is put the beats at uneven intervals, which is what
 * a tempo trainer is. Answering the question properly is what earns the link.
 */

const TITLE = "Can You Use a Metronome for Golf Swing Tempo?";
const DESCRIPTION = description(
  "A metronome clicks evenly. A golf swing takes about three times as long going back as coming down. Why even clicks put your top in the wrong place.",
);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: etUrl("/vs/metronome") },
  openGraph: { images: SHARE_IMAGES, title: TITLE, description: DESCRIPTION, url: etUrl("/vs/metronome"), type: "article" },
  twitter: { card: "summary_large_image", images: SHARE_IMAGES, title: TITLE, description: DESCRIPTION },
};

const TRAIL = [
  { name: "Elite Tempo", href: "/" },
  { name: "vs a metronome" },
];

const FAQS = [
  {
    q: "Can you use a metronome for golf swing tempo?",
    a: "For your pre-shot routine and your overall pace, yes. For the swing itself, an ordinary metronome clicks at even intervals, and a swing is uneven: the backswing takes about two to four times as long as the downswing. Three even clicks put the top of your backswing halfway through the swing.",
  },
  {
    q: "How do you set a metronome for a golf swing?",
    a: "The usual workaround is to count: take the club back over three clicks and come down on the fourth. That gets you near 3:1, but you are counting in your head while you swing, and the ratio you get is whatever your counting produces.",
  },
  {
    q: "What is the correct golf swing tempo ratio?",
    a: "There is no single correct one. The usual figure is 3:1, but tour swings timed from tournament footage run from about 2:1 to above 4:1. A ratio you can repeat matters more than matching someone else's number.",
  },
  {
    q: "Does Elite Tempo have a metronome?",
    a: "Yes, with uneven beats. In its metronome you set the backswing and downswing times yourself, and it plays a beat at takeaway, at the top and at impact. Most golfers start instead from a tour swing in the library or from timing their own best swing.",
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://elitetempo.app/vs/metronome#article",
      headline: TITLE,
      description: DESCRIPTION,
      url: "https://elitetempo.app/vs/metronome",
      publisher: { "@type": "Organization", name: "Elite Prep Inc", url: "https://www.eliteprep.app" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://elitetempo.app/vs/metronome#faq",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    breadcrumbSchema(TRAIL),
  ],
};

/* The argument, drawn rather than described: the same three beats laid out evenly
   and then at a real swing's intervals. This is the whole page in one graphic, so
   it is built from the library's actual marks rather than illustrative numbers. */
function BeatComparison({
  label,
  marks,
  total,
  note,
}: {
  label: string;
  marks: number[];
  total: number;
  note: string;
}) {
  return (
    <div>
      <p className="text-[13px] font-medium" style={{ color: MUTED }}>
        {label}
      </p>
      <div className="relative mt-4 h-1 w-full rounded-full" style={{ background: HAIRLINE }} aria-hidden>
        {marks.map((m, i) => (
          <span
            key={i}
            className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full"
            style={{ left: `${(m / total) * 100}%`, marginLeft: -7, background: ACCENT }}
          />
        ))}
      </div>
      <p className="mt-4 text-[16px] leading-[1.55]" style={{ color: MUTED }}>
        {note}
      </p>
    </div>
  );
}

export default function VsMetronome() {
  const hero = SWINGS.find((s) => s.slug === "tiger-woods-2000-the-open-championship-driver")!;

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
          Can you use a metronome for golf swing tempo?
        </h1>

        <p className="mt-6 text-[19px] leading-[1.5]" style={{ color: MUTED }}>
          For your routine and your pace, yes. For the swing itself, an ordinary
          metronome puts the beats in the wrong places, because it clicks evenly and
          a golf swing is uneven.
        </p>

        <div
          className="mt-8 rounded-2xl p-6"
          style={{ background: CARD }}
        >
          <p className="text-[17px] leading-[1.55]" style={{ color: INK }}>
            A tour backswing takes about <strong>three times</strong> as long as the
            downswing. Even clicks give both halves the same time.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            The same three beats, two ways
          </h2>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            Takeaway, top, impact. Here is where a metronome puts them, and where{" "}
            {possessive(hero.player)} {hero.year} {hero.event} drive put them.
          </p>

          <div
            className="mt-7 flex flex-col gap-9 rounded-2xl p-6 sm:p-8"
            style={{ background: CARD }}
          >
            <BeatComparison
              label="A metronome"
              marks={[0, hero.total / 2, hero.total]}
              total={hero.total}
              note={`Three evenly spaced clicks put the top of the backswing exactly halfway through, at ${fmtSeconds(
                hero.total / 2,
              )}, a 1:1 tempo. No tour swing in the library is close to that.`}
            />
            <BeatComparison
              label={`${hero.player}, ${hero.year} ${hero.event}`}
              marks={[0, hero.back, hero.total]}
              total={hero.total}
              note={`The real marks put the top at ${fmtSeconds(hero.back)} of a ${fmtSeconds(
                hero.total,
              )} swing, leaving ${fmtSeconds(hero.down)} to come down, ${fmtRatio(
                hero,
              )}. Impact comes ${fmtSeconds(hero.down)} after the top, far sooner than the top came after takeaway.`}
            />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            What a metronome is good for
          </h2>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            Two things. It can keep your{" "}
            <strong style={{ color: INK }}>pre-shot routine</strong> the same length
            every time, which helps it hold up under pressure. And it can slow your{" "}
            <strong style={{ color: INK }}>overall pace</strong> when you are
            rushing, because a steady click makes hurry easy to hear.
          </p>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            For the swing itself, golfers often count: back over three clicks, down on
            the fourth. That drill gets you near 3:1, but you are counting in your head
            while you swing, and the ratio comes out wherever your counting puts it.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            What to use instead
          </h2>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            A golf tempo trainer plays three beats at uneven spacing: takeaway, top and
            impact. The question is where those beats come from.
          </p>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            In Elite Tempo they come from real swings. Pick one of{" "}
            <Link
              href="/tempos"
              className="font-semibold underline decoration-1 underline-offset-4 hover:opacity-70"
              style={{ color: INK }}
            >
              {SWINGS.length} tour swings
            </Link>{" "}
            timed by hand from tournament footage, or film your own best swing and mark
            takeaway, top and impact on it frame by frame. Either way you hear that
            swing&apos;s timing and practice to it. Elite Tempo also times your
            pre-shot routine step by step, the job a metronome does best.
          </p>
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

        <TrialCard title={<>Hear a real swing&apos;s timing.</>}>
          Free for {TRIAL_DAYS} days. Play {possessive(hero.player)} {fmtRatio(hero)}{" "}
          and hear how far it is from three even clicks.
        </TrialCard>
      </article>
    </Chrome>
  );
}
