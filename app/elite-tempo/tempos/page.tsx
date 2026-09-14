import type { Metadata } from "next";
import Link from "next/link";
import Chrome, { AppStoreButton, Breadcrumbs, breadcrumbSchema } from "../Chrome";
import { ACCENT, CARD, HAIRLINE, INK, MUTED } from "../theme";
import {
  CATEGORIES,
  SWINGS,
  fmtRatio,
  fmtSeconds,
  swingsByCategory,
  type Swing,
} from "../data/tempo-data";

/* The page this whole site was missing.
 *
 * Elite Tempo's one genuinely unique asset is sixteen tour swings hand-timed from
 * broadcast footage to 1/100 of a second — and until now every one of those
 * numbers lived inside an iOS binary and four cards on the landing page. A search
 * for "what is Rory McIlroy's swing tempo" returns a page of blog copy repeating
 * "a textbook 3:1"; the actual marks say 2.45:1. That gap is the opportunity: a
 * specific number with a stated method is the shape of a sentence an answer engine
 * will quote, where "about 3:1" is not.
 *
 * So: the whole library, as text, in one sortable place, with every figure derived
 * from the app's own seed file. The comparison against the 3:1 rule of thumb is
 * the point of the table, not decoration — it is the claim that makes the data
 * worth citing rather than just worth reading.
 */

const RULE_OF_THUMB = 3;

const TITLE = "Golf Swing Tempo: 16 Tour Swings, Hand-Timed";
const DESCRIPTION =
  "The backswing and downswing of 16 famous tour shots, hand-timed from tournament footage to 1/100 of a second. Tiger Woods 3.69:1, Rory McIlroy 2.45:1, Fred Couples 3.34:1 — with the raw takeaway, top and impact marks for every swing.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/elite-tempo/tempos" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/elite-tempo/tempos",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const TRAIL = [
  { name: "Elite Tempo", href: "/elite-tempo" },
  { name: "Tempo library" },
];

/* Every swing, as a Dataset with a DataDownload-free but fully enumerated
   ItemList. aggregateRating and review markup are deliberately absent; what makes
   this citable is the method and the marks, not a star count. */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dataset",
      "@id": "https://www.eliteprep.app/elite-tempo/tempos#dataset",
      name: "Hand-timed golf swing tempo measurements of tour professionals",
      description: DESCRIPTION,
      url: "https://www.eliteprep.app/elite-tempo/tempos",
      license: "https://www.eliteprep.app/elite-tempo/terms",
      creator: {
        "@type": "Organization",
        name: "Elite Prep, LLC",
        url: "https://www.eliteprep.app",
      },
      variableMeasured: [
        { "@type": "PropertyValue", name: "Backswing duration", unitText: "seconds" },
        { "@type": "PropertyValue", name: "Downswing duration", unitText: "seconds" },
        { "@type": "PropertyValue", name: "Total swing duration", unitText: "seconds" },
        { "@type": "PropertyValue", name: "Tempo ratio", description: "Backswing time divided by downswing time" },
      ],
      measurementTechnique:
        "Frame-by-frame hand timing of broadcast tournament footage, marking takeaway, top of backswing and impact to 1/100 of a second.",
    },
    {
      "@type": "ItemList",
      "@id": "https://www.eliteprep.app/elite-tempo/tempos#list",
      name: "Tour swing tempo measurements",
      numberOfItems: SWINGS.length,
      itemListElement: SWINGS.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${s.player}, ${s.year} ${s.event}, ${s.clubLabel}: ${fmtRatio(s)}`,
        url: `https://www.eliteprep.app/elite-tempo/tempo/${s.slug}`,
      })),
    },
    breadcrumbSchema(TRAIL),
  ],
};

/* How far this swing sits from the "3:1" everyone quotes. Signed on purpose: the
   interesting fact is that real tempos scatter on BOTH sides of the rule, from
   Phil at 2.02 to Cameron Young at 4.26. */
function vsRule(s: Swing): string {
  const delta = s.ratio - RULE_OF_THUMB;
  const rounded = Math.abs(delta) < 0.005 ? 0 : delta;
  if (rounded === 0) return "on the rule";
  return `${rounded > 0 ? "+" : "−"}${Math.abs(rounded).toFixed(2)}`;
}

function Row({ swing }: { swing: Swing }) {
  return (
    <tr style={{ borderTop: `1px solid ${HAIRLINE}` }}>
      <td className="py-4 pr-4 align-top">
        <Link
          href={`/elite-tempo/tempo/${swing.slug}`}
          className="text-sm font-semibold hover:text-[#B3ECFF]"
          style={{ color: INK }}
        >
          {swing.player}
        </Link>
        {/* Event first, year after. "2000 The Open Championship" reads as a stumble;
            "The Open Championship, 2000" is how anyone would say it. */}
        <p className="mt-1 text-xs" style={{ color: MUTED }}>
          {swing.event}, {swing.year}
          {swing.hole ? ` · ${swing.hole}` : ""} · {swing.clubLabel}
        </p>
      </td>
      <td
        className="py-4 pr-4 text-right align-top text-base font-semibold tabular-nums"
        style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
      >
        {fmtRatio(swing)}
      </td>
      <td
        className="py-4 pr-4 text-right align-top text-sm tabular-nums"
        style={{ color: MUTED, fontVariantNumeric: "tabular-nums" }}
      >
        {fmtSeconds(swing.back)}
      </td>
      <td
        className="py-4 pr-4 text-right align-top text-sm tabular-nums"
        style={{ color: MUTED, fontVariantNumeric: "tabular-nums" }}
      >
        {fmtSeconds(swing.down)}
      </td>
      <td
        className="py-4 pr-4 text-right align-top text-sm tabular-nums"
        style={{ color: MUTED, fontVariantNumeric: "tabular-nums" }}
      >
        {fmtSeconds(swing.total)}
      </td>
      <td
        className="py-4 text-right align-top text-sm tabular-nums"
        style={{ color: MUTED, fontVariantNumeric: "tabular-nums" }}
      >
        {vsRule(swing)}
      </td>
    </tr>
  );
}

export default function TempoLibrary() {
  const fastest = [...SWINGS].sort((a, b) => a.ratio - b.ratio)[0];
  const slowest = [...SWINGS].sort((a, b) => b.ratio - a.ratio)[0];

  return (
    <Chrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      {/* max-w-3xl, matching the detail pages. At max-w-5xl the six columns spread
          across 1024px and the numbers ended up a long way from the shot they
          belonged to, with the right third of the page empty. */}
      <div className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        <Breadcrumbs trail={TRAIL} />

        <h1
          className="mt-6 max-w-3xl text-3xl font-semibold leading-[1.1] sm:text-4xl"
          style={{ color: INK, textWrap: "balance" }}
        >
          Golf swing tempo, measured:{" "}
          <span style={{ color: INK }}>{SWINGS.length} tour swings</span>, hand-timed.
        </h1>

        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed" style={{ color: MUTED }}>
          <p>
            Swing tempo is the ratio between how long your backswing takes and how
            long your downswing takes. Almost everything written about it quotes the
            same figure — <strong style={{ color: INK }}>3:1</strong> — as though tour
            players all share one number.
          </p>
          <p>
            They do not. Timed from the actual broadcast footage, these{" "}
            {SWINGS.length} shots run from{" "}
            <Link
              href={`/elite-tempo/tempo/${fastest.slug}`}
              className="font-semibold underline decoration-1 underline-offset-4 hover:text-[#B3ECFF]"
              style={{ color: INK }}
            >
              {fastest.player}&apos;s {fmtRatio(fastest)}
            </Link>{" "}
            to{" "}
            <Link
              href={`/elite-tempo/tempo/${slowest.slug}`}
              className="font-semibold underline decoration-1 underline-offset-4 hover:text-[#B3ECFF]"
              style={{ color: INK }}
            >
              {slowest.player}&apos;s {fmtRatio(slowest)}
            </Link>
            . The 3:1 rule is a useful average and a poor description of any
            individual swing.
          </p>
          <p>
            Every figure below is derived from three marks — takeaway, top of
            backswing, impact — read off tournament video to 1/100 of a second.{" "}
            <Link
              href="/elite-tempo/how-we-time-swings"
              className="font-semibold underline decoration-1 underline-offset-4 hover:text-[#B3ECFF]"
              style={{ color: INK }}
            >
              How we time swings
            </Link>{" "}
            explains the method and where it can be wrong.
          </p>
        </div>

        {/* Tables are the one thing on this site allowed to scroll sideways, and
            only inside their own container — the page body never does. */}
        {CATEGORIES.map((category) => {
          const swings = swingsByCategory(category);
          if (swings.length === 0) return null;
          return (
            <section key={category} className="mt-12">
              <h2
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: MUTED }}
              >
                {category}
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[36rem] border-collapse text-left">
                  <thead>
                    <tr>
                      <th
                        className="pb-3 pr-4 text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: MUTED }}
                      >
                        Shot
                      </th>
                      <th
                        className="pb-3 pr-4 text-right text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: MUTED }}
                      >
                        Tempo
                      </th>
                      <th
                        className="pb-3 pr-4 text-right text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: MUTED }}
                      >
                        Back
                      </th>
                      <th
                        className="pb-3 pr-4 text-right text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: MUTED }}
                      >
                        Down
                      </th>
                      <th
                        className="pb-3 pr-4 text-right text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: MUTED }}
                      >
                        Total
                      </th>
                      <th
                        className="pb-3 text-right text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: MUTED }}
                      >
                        vs 3:1
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {swings.map((s) => (
                      <Row key={s.slug} swing={s} />
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        <div
          className="mt-16 rounded-3xl p-8 text-center sm:p-10"
          style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
        >
          <h2 className="text-2xl font-semibold" style={{ color: INK }}>
            Hear them, then match one.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
            Reading a ratio tells you very little. Elite Tempo plays each of these as
            beats you can swing to, then records your own swing and times it the same
            way, so you can see whether you actually matched it.
          </p>
          <div className="mt-7 flex justify-center">
            <AppStoreButton />
          </div>
        </div>
      </div>
    </Chrome>
  );
}
