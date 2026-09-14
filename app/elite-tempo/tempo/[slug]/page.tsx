import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Chrome, { AppStoreButton, Breadcrumbs, breadcrumbSchema } from "../../Chrome";
import { ACCENT, BG, CARD, HAIRLINE, INK, MUTED } from "../../theme";
import {
  SWINGS,
  fmtRatio,
  fmtSeconds,
  shortClub,
  shortEvent,
  swingBySlug,
  type Swing,
} from "../../data/tempo-data";
import { TITLE_MAX, description as describe } from "../../../seo";

/* One page per hand-timed swing.
 *
 * These are the pages meant to be linked to and quoted. Each one answers a query
 * somebody actually types — "what is Rory McIlroy's swing tempo" — with a specific
 * number, the raw marks it came from, and a link to the footage it was read off.
 * That combination is what makes a figure citable rather than merely asserted,
 * and it is precisely what the rest of the web does not have: search that query
 * today and you get blog copy repeating "a textbook 3:1".
 *
 * The source footage is LINKED, never embedded. A YouTube iframe would load
 * third-party tracking into a page whose own privacy policy promises none, and
 * would drag a layout shift onto every one of these sixteen pages for a video
 * most readers will not play.
 */

const RULE_OF_THUMB = 3;

export const dynamicParams = false;

export function generateStaticParams() {
  return SWINGS.map((s) => ({ slug: s.slug }));
}

/* The question this page exists to answer, phrased the way it gets typed. Used as
 * the <title>, and as the single FAQ entry in the structured data — answer engines
 * lift a Question/Answer pair far more readily than a paragraph. */
function question(s: Swing): string {
  return `What is ${s.player}'s swing tempo?`;
}

function answer(s: Swing): string {
  return (
    `${s.player}'s ${s.year} ${s.event} ${s.clubLabel.toLowerCase()} is a ` +
    `${fmtSeconds(s.back)} backswing into a ${fmtSeconds(s.down)} downswing — a ` +
    `${fmtRatio(s)} tempo ratio over ${fmtSeconds(s.total)} from takeaway to impact. ` +
    `That is ${describeVsRule(s)} the 3:1 ratio usually quoted for tour players. ` +
    `Timed by hand from tournament footage to 1/100 of a second.`
  );
}

function describeVsRule(s: Swing): string {
  const delta = s.ratio - RULE_OF_THUMB;
  if (Math.abs(delta) < 0.06) return "almost exactly";
  if (delta > 0) return `slower through the backswing than`;
  return `quicker through the backswing than`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const swing = swingBySlug(slug);
  if (!swing) return {};

  /* The event name goes in only if it fits. Spelled out in full, the longest of
     these overflowed by a mile — "Scottie Scheffler's Swing Tempo: 2.60:1 (2024 The
     Players Championship)" is 71 characters against a ~60 display width, so Google
     would have cut it after the ratio anyway. Dropping the leading "The" and the
     word "Championship" recovers most of them; the few that still do not fit keep
     the player and the ratio, which are the parts worth reading. */
  const stem = `${swing.player}'s Swing Tempo: ${fmtRatio(swing)}`;
  const withEvent = `${stem} (${swing.year} ${shortEvent(swing.event)})`;
  const title = withEvent.length <= TITLE_MAX ? withEvent : stem;

  /* A snippet, not the full answer. `answer()` runs to ~300 characters because it
     is written for the FAQ block and for answer engines, which have no display
     limit and reward the detail. Google has one, so the meta description is its own
     shorter thing: the numbers first, provenance last. */
  const description = describe(
    `${swing.player}'s ${swing.year} ${shortEvent(swing.event)} ${shortClub(swing.clubLabel).toLowerCase()}: ` +
      `${fmtSeconds(swing.back)} backswing, ${fmtSeconds(swing.down)} downswing, ` +
      `${fmtRatio(swing)} over ${fmtSeconds(swing.total)}. Hand-timed from tournament footage.`,
  );

  return {
    title,
    description,
    alternates: { canonical: `/elite-tempo/tempo/${swing.slug}` },
    openGraph: {
      title,
      description,
      url: `/elite-tempo/tempo/${swing.slug}`,
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* The number sits in a fixed-height row so every label lands on the same line
   whatever its number renders at. The `tight` variant that used to squeeze a
   combined "0.63s / 0.26s" onto one line is gone: backswing and downswing now have
   a cell each, so all four values are the same shape at the same size. */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 py-8 text-center sm:px-4" style={{ background: BG }}>
      <p
        className="flex h-10 items-center justify-center whitespace-nowrap text-2xl font-semibold tabular-nums sm:h-12 sm:text-3xl"
        style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </p>
      <p
        className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em]"
        style={{ color: INK }}
      >
        {label}
      </p>
    </div>
  );
}

/* The three marks on a timeline, positioned by their real timestamps. This is the
   evidence: it shows the reader that the ratio came from somewhere rather than
   being asserted. */
function Marks({ swing }: { swing: Swing }) {
  const marks = [
    { label: "Takeaway", at: 0 },
    { label: "Top of backswing", at: swing.back },
    { label: "Impact", at: swing.total },
  ];
  return (
    <div>
      <div className="relative h-1 w-full rounded-full" style={{ background: HAIRLINE }} aria-hidden>
        <span
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ width: `${(swing.back / swing.total) * 100}%`, background: ACCENT, opacity: 0.4 }}
        />
        {marks.map((m) => (
          <span
            key={m.label}
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
            style={{ left: `${(m.at / swing.total) * 100}%`, marginLeft: -6, background: ACCENT }}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between gap-3">
        {marks.map((m) => (
          <div key={m.label} className="min-w-0">
            <p
              className="text-base font-semibold tabular-nums"
              style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
            >
              {fmtSeconds(m.at)}
            </p>
            <p
              className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: MUTED }}
            >
              {m.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function TempoDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const swing = swingBySlug(slug);
  if (!swing) notFound();

  const trail = [
    { name: "Elite Tempo", href: "/elite-tempo" },
    { name: "Tempo library", href: "/elite-tempo/tempos" },
    { name: `${swing.player}, ${swing.year}` },
  ];

  const url = `https://www.eliteprep.app/elite-tempo/tempo/${swing.slug}`;
  const footage = `https://www.youtube.com/watch?v=${swing.youtubeID}`;

  /* Same player elsewhere in the library, then anything else — so every page links
     onward and the sixteen form a connected set rather than sixteen dead ends. */
  const related = [
    ...SWINGS.filter((s) => s.player === swing.player && s.slug !== swing.slug),
    ...SWINGS.filter((s) => s.player !== swing.player && s.category === swing.category),
  ].slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: `${swing.player}'s swing tempo: ${fmtRatio(swing)}`,
        description: answer(swing),
        url,
        about: { "@type": "Person", name: swing.player },
        /* The footage the marks were read off. A plain URL citation is the honest
           form here — the video is not ours, so marking it up as our own
           VideoObject would be a claim we are not entitled to make. */
        citation: footage,
        isPartOf: {
          "@type": "Dataset",
          "@id": "https://www.eliteprep.app/elite-tempo/tempos#dataset",
        },
        publisher: {
          "@type": "Organization",
          name: "Elite Prep, LLC",
          url: "https://www.eliteprep.app",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: question(swing),
            acceptedAnswer: { "@type": "Answer", text: answer(swing) },
          },
        ],
      },
      breadcrumbSchema(trail),
    ],
  };

  return (
    <Chrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        <Breadcrumbs trail={trail} />

        <p
          className="mt-6 text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: MUTED }}
        >
          {swing.category} · {swing.clubLabel}
        </p>
        <h1
          className="mt-3 text-3xl font-semibold leading-[1.1] sm:text-4xl"
          style={{ color: INK, textWrap: "balance" }}
        >
          {question(swing)}
        </h1>
        <p className="mt-5 text-lg leading-relaxed" style={{ color: MUTED }}>
          {answer(swing)}
        </p>

        {/* The same four cells, in the same order, as the landing page and the app's
            onboarding: the two halves, the whole, then the ratio they make. */}
        <div
          className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4"
          style={{ background: HAIRLINE, border: `1px solid ${HAIRLINE}` }}
        >
          <Stat value={fmtSeconds(swing.back)} label="Backswing" />
          <Stat value={fmtSeconds(swing.down)} label="Downswing" />
          <Stat value={fmtSeconds(swing.total)} label="Total duration" />
          <Stat value={fmtRatio(swing)} label="Tempo ratio" />
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold" style={{ color: INK }}>
            The three marks
          </h2>
          <p className="mt-3 text-base leading-relaxed" style={{ color: MUTED }}>
            Every number above comes from these, and nothing else. Read off the
            footage by hand, in seconds from the start of the clip.
          </p>
          <div
            className="mt-7 rounded-2xl p-6 sm:p-8"
            style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
          >
            <Marks swing={swing} />
          </div>
          <p className="mt-4 text-sm" style={{ color: MUTED }}>
            Source footage:{" "}
            <a
              href={footage}
              rel="noopener nofollow"
              target="_blank"
              className="font-semibold underline decoration-1 underline-offset-4 hover:text-[#B3ECFF]"
              style={{ color: INK }}
            >
              {swing.year} {swing.event}
              {swing.hole ? `, ${swing.hole}` : ""}
            </a>
            . Raw marks: takeaway {swing.startS}s, top {swing.topS}s, impact{" "}
            {swing.impactS}s.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold" style={{ color: INK }}>
            The shot
          </h2>
          <p className="mt-3 text-base leading-relaxed" style={{ color: MUTED }}>
            {swing.story}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold" style={{ color: INK }}>
            How this compares to &ldquo;3 to 1&rdquo;
          </h2>
          <p className="mt-3 text-base leading-relaxed" style={{ color: MUTED }}>
            The rule of thumb says a tour backswing takes three times as long as the
            downswing. This one is {fmtRatio(swing)}, which is {describeVsRule(swing)}{" "}
            that. Across{" "}
            <Link
              href="/elite-tempo/tempos"
              className="font-semibold underline decoration-1 underline-offset-4 hover:text-[#B3ECFF]"
              style={{ color: INK }}
            >
              the whole library
            </Link>{" "}
            the spread is wide enough that 3:1 is best read as an average of very
            different swings rather than a target any one player hits.
          </p>
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-semibold" style={{ color: INK }}>
              More hand-timed swings
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/elite-tempo/tempo/${r.slug}`}
                  className="rounded-2xl p-4 transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
                >
                  <p
                    className="text-2xl font-semibold tabular-nums"
                    style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
                  >
                    {fmtRatio(r)}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold" style={{ color: INK }}>
                    {r.player}
                  </p>
                  <p className="text-xs" style={{ color: MUTED }}>
                    {r.year} · {r.clubLabel}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div
          className="mt-16 rounded-3xl p-8 text-center"
          style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
        >
          <h2 className="text-xl font-semibold" style={{ color: INK }}>
            Swing to it, don&apos;t just read it.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
            Elite Tempo plays this {fmtRatio(swing)} as beats you can swing along to,
            then times your own swing the same way so you can see how close you got.
          </p>
          <div className="mt-7 flex justify-center">
            <AppStoreButton />
          </div>
        </div>
      </article>
    </Chrome>
  );
}
