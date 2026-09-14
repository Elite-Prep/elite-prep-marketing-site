import type { Metadata } from "next";
import Link from "next/link";
import Chrome, { AppStoreButton, Breadcrumbs, breadcrumbSchema } from "../../Chrome";
import { ACCENT, CARD, HAIRLINE, INK, MUTED } from "../../theme";
import { SWINGS, fmtRatio, fmtSeconds } from "../../data/tempo-data";
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
  "A metronome beats evenly; a golf swing does not. Why three even clicks put the top of your backswing in the wrong place, and what to use instead.",
);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/elite-tempo/vs/metronome" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/elite-tempo/vs/metronome", type: "article" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const TRAIL = [
  { name: "Elite Tempo", href: "/elite-tempo" },
  { name: "vs a metronome" },
];

const FAQS = [
  {
    q: "Can you use a metronome for golf swing tempo?",
    a: "Partly. A metronome is excellent for the one thing it does — keeping an even pulse — and you can use it to time a pre-shot routine or to slow your overall pace down. What it cannot do on its own is model a golf swing, because a swing is not even: the backswing takes roughly two to four times as long as the downswing, so three evenly spaced clicks put the top of your backswing in the wrong place.",
  },
  {
    q: "How do you set a metronome for a golf swing?",
    a: "The usual workaround is to count beats rather than swing to them: set a tempo, take the club back over three beats and come down on the fourth. It works as a rough drill, but you are subdividing an even pulse in your head rather than hearing the actual rhythm, and the ratio you end up with is whatever your counting produces.",
  },
  {
    q: "What is the correct golf swing tempo ratio?",
    a: "There is no single correct one. The commonly quoted figure is 3:1 — backswing three times as long as the downswing — but real tour swings measured from tournament footage spread well either side of it. The useful target is a consistent ratio you can repeat, not a specific number copied from someone whose swing is not yours.",
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.eliteprep.app/elite-tempo/vs/metronome#article",
      headline: TITLE,
      description: DESCRIPTION,
      url: "https://www.eliteprep.app/elite-tempo/vs/metronome",
      publisher: { "@type": "Organization", name: "Elite Prep, LLC", url: "https://www.eliteprep.app" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.eliteprep.app/elite-tempo/vs/metronome#faq",
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
      <p className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: MUTED }}>
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
      <p className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>
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

      <article className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        <Breadcrumbs trail={TRAIL} />

        <h1
          className="mt-6 text-3xl font-semibold leading-[1.1] sm:text-4xl"
          style={{ color: INK, textWrap: "balance" }}
        >
          Can you use a metronome for golf swing tempo?
        </h1>

        <p className="mt-6 text-lg leading-relaxed" style={{ color: MUTED }}>
          Partly — and it is a completely reasonable thing to try, because you
          probably already have one on your phone for free. But there is one
          structural problem with it, and it is worth understanding before you spend
          a season drilling to the wrong rhythm.
        </p>

        <div
          className="mt-8 rounded-2xl p-6"
          style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
        >
          <p className="text-base leading-relaxed" style={{ color: INK }}>
            A metronome beats <strong>evenly</strong>. A golf swing is{" "}
            <strong style={{ color: INK }}>not even</strong>.
          </p>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold" style={{ color: INK }}>
            The same three beats, two ways
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
            Takeaway, top, impact. Here is where a metronome puts them, and where{" "}
            {hero.player}&apos;s {hero.year} {hero.event} drive actually put them.
          </p>

          <div
            className="mt-7 flex flex-col gap-9 rounded-2xl p-6 sm:p-8"
            style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
          >
            <BeatComparison
              label="A metronome"
              marks={[0, hero.total / 2, hero.total]}
              total={hero.total}
              note={`Three evenly spaced clicks put the top of the backswing exactly halfway through, at ${fmtSeconds(
                hero.total / 2,
              )} — a 1:1 tempo. No tour player swings anything like that.`}
            />
            <BeatComparison
              label={`${hero.player}, ${hero.year} ${hero.event}`}
              marks={[0, hero.back, hero.total]}
              total={hero.total}
              note={`The real marks put the top at ${fmtSeconds(hero.back)} of a ${fmtSeconds(
                hero.total,
              )} swing, leaving ${fmtSeconds(hero.down)} to come down — ${fmtRatio(
                hero,
              )}. The third beat arrives much sooner after the second than the second did after the first.`}
            />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold" style={{ color: INK }}>
            What a metronome is genuinely good for
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
            Two things, and they are not nothing. It will keep your{" "}
            <strong style={{ color: INK }}>pre-shot routine</strong> to a consistent
            length, which is one of the most reliable ways to steady yourself under
            pressure. And it will slow your{" "}
            <strong style={{ color: INK }}>overall pace</strong> down if you are
            rushing, because an even pulse is very good at exposing hurry.
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
            The common workaround for the swing itself is to count instead of swing
            to it: back over three beats, down on the fourth. That is a real drill
            and it does approximate 3:1. It also means you are subdividing a pulse in
            your head while trying to hit a golf ball, and the ratio you get is
            whatever your counting produced rather than something you chose.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold" style={{ color: INK }}>
            What to use instead
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
            Any tempo trainer is, underneath, a metronome with unevenly spaced beats.
            What separates them is where those beats are placed and whether anything
            checks your work.
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
            Elite Tempo places them at the intervals of{" "}
            <Link
              href="/elite-tempo/tempos"
              className="font-semibold underline decoration-1 underline-offset-4 hover:text-[#B3ECFF]"
              style={{ color: INK }}
            >
              {SWINGS.length} specific tour shots
            </Link>
            , each hand-timed from the footage, and then records your own swing and
            finds your takeaway, top and impact in it — so you can compare what you
            did against what you were aiming at, rather than guessing.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold" style={{ color: INK }}>
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
                <p className="pb-5 pr-10 text-sm leading-relaxed" style={{ color: MUTED }}>
                  {a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <div
          className="mt-16 rounded-3xl p-8 text-center"
          style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
        >
          <h2 className="text-xl font-semibold" style={{ color: INK }}>
            Hear an uneven beat.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
            Free for 14 days. Play {hero.player}&apos;s {fmtRatio(hero)} and hear how
            different it is from an even pulse.
          </p>
          <div className="mt-7 flex justify-center">
            <AppStoreButton />
          </div>
        </div>
      </article>
    </Chrome>
  );
}
