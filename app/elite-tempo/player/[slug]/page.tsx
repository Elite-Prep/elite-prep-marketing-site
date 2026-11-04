import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Chrome, { Breadcrumbs, TrialCard, breadcrumbSchema } from "../../Chrome";
import { ACCENT, BG, CARD, HAIRLINE, INK, MUTED, etUrl } from "../../theme";
import {
  PLAYERS,
  fmtRatio,
  fmtSeconds,
  playerBySlug,
  shortClub,
  shortEvent,
  type Player,
  type Swing,
  whereWhen,
  possessive,
} from "../../data/tempo-data";
import { TITLE_MAX, description as describe } from "../../../seo";

/* One page per player, answering the question Google is actually asking.
 *
 * A search for "elite tempo golf" surfaces a People Also Ask box containing "What
 * is Tiger Woods swing tempo?" and "What is Rory McIlroy's swing tempo?" — so the
 * demand is measured, not guessed. But those questions are about a PLAYER, and the
 * library was organised entirely by SHOT: seven separate Tiger pages, none of which
 * answers "what is his tempo" as a person would ask it.
 *
 * The honest answer turns out to be more interesting than a single number, and it
 * is different for each of them:
 *
 *   Tiger  2.06:1 -> 3.69:1   spread 1.63   tempo changes enormously by club
 *   Rory   2.45:1 -> 2.51:1   spread 0.06   near-identical driver to long iron
 *
 * That contrast is the reason these pages are worth reading rather than a list of
 * links: "a player has a tempo" is not quite true, and this data shows how untrue
 * it is for one and how true it is for the other.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return PLAYERS.map((p) => ({ slug: p.slug }));
}


/* The apostrophe form people type. "Tiger Woods swing tempo" is how Google's own
   PAA box writes it; "Rory McIlroy's" takes the possessive. Matching the phrasing
   of the question matters more here than being grammatically uniform. */
function question(p: Player): string {
  return `What is ${possessive(p.name)} swing tempo?`;
}

/* How much the player's own tempo moves across clubs, in words. This is the
   finding each page is built around, so it is derived rather than written. */
function describeSpread(p: Player): string {
  if (p.spread < 0.15) return "barely moves";
  if (p.spread < 0.5) return "moves a little";
  if (p.spread < 1.0) return "moves noticeably";
  return "moves enormously";
}

function answer(p: Player): string {
  const h = p.headline;
  return (
    `${possessive(p.name)} ${h.clubLabel.toLowerCase()} tempo is ${fmtRatio(h)}, a ` +
    `${fmtSeconds(h.back)} backswing into a ${fmtSeconds(h.down)} downswing, timed by hand ` +
    `from his ${whereWhen(h, true)} footage. Across his ${p.swings.length} swings in the ` +
    `library his ratio runs from ${fmtRatio(p.fastest)} with a ` +
    `${p.fastest.clubLabel.toLowerCase()} to ${fmtRatio(p.slowest)} with a ` +
    `${p.slowest.clubLabel.toLowerCase()}, so his tempo ${describeSpread(p)} depending on the club.`
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const player = playerBySlug(slug);
  if (!player) return {};

  const stem = `${possessive(player.name)} Swing Tempo`;
  const withRatio = `${stem}: ${fmtRatio(player.headline)} (Hand-Timed)`;
  const title = withRatio.length <= TITLE_MAX ? withRatio : stem;

  const description = describe(
    `${possessive(player.name)} ${player.headline.clubLabel.toLowerCase()} is ${fmtRatio(player.headline)}. ` +
      `Across ${player.swings.length} hand-timed swings his ratio runs ${fmtRatio(player.fastest)} to ${fmtRatio(player.slowest)}.`,
  );

  return {
    title,
    description,
    alternates: { canonical: etUrl(`/player/${player.slug}`) },
    openGraph: {
      title,
      description,
      url: etUrl(`/player/${player.slug}`),
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 py-8 text-center sm:px-4" style={{ background: BG }}>
      <p
        className="flex h-10 items-center justify-center whitespace-nowrap text-2xl font-semibold tabular-nums sm:h-12 sm:text-3xl"
        style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </p>
      <p className="mt-3 text-[13px] font-medium" style={{ color: INK }}>
        {label}
      </p>
    </div>
  );
}

/* Each shot as a bar positioned by its ratio, so the spread is visible rather than
   merely stated. The axis runs 2.0 to 4.5, which contains every ratio in the
   library — a fixed scale means Tiger's page and Rory's page are directly
   comparable, where a per-player scale would make Rory's 0.06 look as wide as
   Tiger's 1.63. */
const AXIS_MIN = 2.0;
const AXIS_MAX = 4.5;
const pct = (ratio: number) => ((ratio - AXIS_MIN) / (AXIS_MAX - AXIS_MIN)) * 100;

function SpreadChart({ player }: { player: Player }) {
  const ordered = [...player.swings].sort((a, b) => a.ratio - b.ratio);
  return (
    <div
      className="rounded-2xl p-6 sm:p-8"
      style={{ background: CARD }}
    >
      <div className="flex flex-col gap-4">
        {ordered.map((s) => (
          <div key={s.slug} className="grid grid-cols-[6.5rem_1fr_3.5rem] items-center gap-3">
            <span className="truncate text-[13px]" style={{ color: MUTED }}>
              {shortClub(s.clubLabel)}
            </span>
            <span className="relative block h-1.5 rounded-full" style={{ background: BG }} aria-hidden>
              <span
                className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
                style={{ left: `${pct(s.ratio)}%`, marginLeft: -6, background: ACCENT }}
              />
            </span>
            <span
              className="text-right text-sm font-semibold tabular-nums"
              style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
            >
              {fmtRatio(s)}
            </span>
          </div>
        ))}
      </div>
      {/* The rule everyone quotes, marked on the same axis. */}
      <div className="mt-5 grid grid-cols-[6.5rem_1fr_3.5rem] items-center gap-3">
        <span className="text-[13px]" style={{ color: MUTED }}>
          the &ldquo;3:1 rule&rdquo;
        </span>
        <span className="relative block h-px" style={{ background: HAIRLINE }} aria-hidden>
          <span
            className="absolute -top-2 h-4 w-px"
            style={{ left: `${pct(3)}%`, background: MUTED }}
          />
        </span>
        <span className="text-right text-sm tabular-nums" style={{ color: MUTED }}>
          3.00:1
        </span>
      </div>
    </div>
  );
}

function Row({ swing }: { swing: Swing }) {
  return (
    <tr style={{ borderTop: `1px solid ${HAIRLINE}` }}>
      <td className="py-4 pr-4 align-top">
        <Link
          href={`/tempo/${swing.slug}`}
          className="-my-[14px] inline-block py-[14px] text-[15px] font-semibold transition-colors hover:opacity-70"
          style={{ color: INK }}
        >
          {swing.clubLabel}
        </Link>
        <p className="mt-1 text-[13px]" style={{ color: MUTED }}>
          {swing.event ? `${swing.event}, ${swing.year}` : swing.year}
          {swing.hole ? ` · ${swing.hole}` : ""}
        </p>
      </td>
      <td
        className="py-4 pr-4 text-right align-top text-base font-semibold tabular-nums"
        style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
      >
        {fmtRatio(swing)}
      </td>
      <td className="py-4 pr-4 text-right align-top text-sm tabular-nums" style={{ color: MUTED }}>
        {fmtSeconds(swing.back)}
      </td>
      <td className="py-4 pr-4 text-right align-top text-sm tabular-nums" style={{ color: MUTED }}>
        {fmtSeconds(swing.down)}
      </td>
      <td className="py-4 text-right align-top text-sm tabular-nums" style={{ color: MUTED }}>
        {fmtSeconds(swing.total)}
      </td>
    </tr>
  );
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const player = playerBySlug(slug);
  if (!player) notFound();

  const trail = [
    { name: "Elite Tempo", href: "/" },
    { name: "Tempo library", href: "/tempos" },
    { name: player.name },
  ];
  const url = `https://elitetempo.app/player/${player.slug}`;
  const h = player.headline;
  const others = PLAYERS.filter((p) => p.slug !== player.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: question(player),
        description: answer(player),
        url,
        about: { "@type": "Person", name: player.name },
        isPartOf: {
          "@type": "Dataset",
          "@id": "https://elitetempo.app/tempos#dataset",
        },
        publisher: { "@type": "Organization", name: "Elite Prep Inc", url: "https://www.eliteprep.app" },
      },
      {
        /* The People Also Ask box is built from Question/Answer pairs, and this page
           exists because Google is already showing this exact question. */
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: question(player),
            acceptedAnswer: { "@type": "Answer", text: answer(player) },
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

      <article className="mx-auto max-w-3xl px-5 pt-10 sm:pt-16">
        <Breadcrumbs trail={trail} />

        <p className="mt-6 text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
          {player.swings.length} hand-timed swings
        </p>
        <h1
          className="mt-3 text-[clamp(34px,5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em]"
          style={{ color: INK, textWrap: "balance" }}
        >
          {question(player)}
        </h1>
        <p className="mt-5 text-[19px] leading-[1.5]" style={{ color: MUTED }}>
          {answer(player)}
        </p>

        <div
          className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-3xl md:grid-cols-4"
          style={{ background: HAIRLINE, border: `1px solid ${HAIRLINE}` }}
        >
          <Stat value={fmtSeconds(h.back)} label="Backswing" />
          <Stat value={fmtSeconds(h.down)} label="Downswing" />
          <Stat value={fmtSeconds(h.total)} label="Total duration" />
          <Stat value={fmtRatio(h)} label={`${shortClub(h.clubLabel)} tempo`} />
        </div>
        <p className="mt-4 text-sm" style={{ color: MUTED }}>
          From his {whereWhen(h, true)} {h.clubLabel.toLowerCase()}.{" "}
          <Link
            href={`/tempo/${h.slug}`}
            className="inline-flex min-h-11 items-center font-semibold underline decoration-1 underline-offset-4 transition-colors hover:opacity-70"
            style={{ color: INK }}
          >
            See the marks
          </Link>
        </p>

        <section className="mt-14">
          <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            One player, {player.swings.length === 2 ? "two clubs" : "one tempo?"}
          </h2>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            {player.spread < 0.15 ? (
              <>
                Remarkably, almost. {possessive(player.name)} ratio shifts by only{" "}
                {player.spread.toFixed(2)} between his {player.fastest.clubLabel.toLowerCase()} and
                his {player.slowest.clubLabel.toLowerCase()}, close enough that one number
                genuinely does describe him. That is unusual, and it is the thing worth copying:
                not the number itself, but the consistency.
              </>
            ) : (
              <>
                Not really. {possessive(player.name)} ratio travels {player.spread.toFixed(2)} across the
                clubs timed here, from {fmtRatio(player.fastest)} with a{" "}
                {player.fastest.clubLabel.toLowerCase()} to {fmtRatio(player.slowest)} with a{" "}
                {player.slowest.clubLabel.toLowerCase()}. &ldquo;A player has a tempo&rdquo; turns
                out to be a simplification: the club changes it more than most coaching copy admits.
              </>
            )}
          </p>
          <div className="mt-7">
            <SpreadChart player={player} />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            Every {player.name} swing in the library
          </h2>
          <p className="mt-4 text-[14px] sm:hidden" style={{ color: MUTED }}>Swipe the table sideways to see every column.</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left">
              <thead>
                <tr>
                  {["Shot", "Tempo", "Back", "Down", "Total"].map((h2, i) => (
                    <th
                      key={h2}
                      className={`pb-3 text-[13px] font-medium ${
                        i === 0 ? "pr-4" : "pr-4 text-right"
                      } ${i === 4 ? "pr-0" : ""}`}
                      style={{ color: MUTED }}
                    >
                      {h2}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...player.swings]
                  .sort((a, b) => b.ratio - a.ratio)
                  .map((s) => (
                    <Row key={s.slug} swing={s} />
                  ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-sm" style={{ color: MUTED }}>
            Every figure is derived from three marks read off tournament footage.{" "}
            <Link
              href="/how-we-time-swings"
              className="font-semibold underline decoration-1 underline-offset-4 transition-colors hover:opacity-70"
              style={{ color: INK }}
            >
              How we time swings
            </Link>{" "}
            explains the method and its limits.
          </p>
        </section>

        {others.length > 0 && (
          <section className="mt-14">
            <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
              Other players
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/player/${p.slug}`}
                  className="rounded-2xl p-4 transition-all duration-300 hover:scale-[1.03]"
                  style={{ background: CARD }}
                >
                  <p
                    className="text-2xl font-semibold tabular-nums"
                    style={{ color: INK, fontVariantNumeric: "tabular-nums" }}
                  >
                    {fmtRatio(p.headline)}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold" style={{ color: INK }}>
                    {p.name}
                  </p>
                  <p className="text-[13px]" style={{ color: MUTED }}>
                    {p.swings.length} swings · {fmtRatio(p.fastest)} to {fmtRatio(p.slowest)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <TrialCard title={<>Swing to {player.name.split(" ")[0]}&apos;s tempo.</>}>
          Elite Tempo plays each of these as beats you can swing along to, then times your own
            swing the same way so you can see how close you got.
        </TrialCard>
      </article>
    </Chrome>
  );
}
