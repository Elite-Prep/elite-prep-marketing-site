import type { Metadata } from "next";
import Link from "next/link";
import Chrome, { AppStoreButton, Breadcrumbs, breadcrumbSchema } from "../Chrome";
import { ACCENT, CARD, HAIRLINE, INK, MUTED, ON_ACCENT } from "../theme";
import { SWINGS, fmtRatio, fmtSeconds, type Swing } from "../data/tempo-data";

/* The method page.
 *
 * This is what turns "some app says Rory is 2.45:1" into a number a journalist,
 * a coach or an answer engine is willing to repeat. A figure that contradicts the
 * received wisdom — and 2.45:1 against a universally-quoted 3:1 does — is only
 * worth anything if the reader can see how it was arrived at and where it could
 * be wrong. Stating the limits is not a weakness here; it is the entire reason
 * the numbers are credible.
 */

const TITLE = "How We Time Golf Swings to 1/100 of a Second";
const DESCRIPTION =
  "The method behind Elite Tempo's tour swing measurements: which three marks are read off tournament footage, how the tempo ratio is derived from them, what the frame rate of the source video does to precision, and why the published figures differ from the usual 3:1 rule.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/elite-tempo/how-we-time-swings" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/elite-tempo/how-we-time-swings",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const TRAIL = [
  { name: "Elite Tempo", href: "/elite-tempo" },
  { name: "How we time swings" },
];

const FAQS = [
  {
    q: "How is golf swing tempo measured?",
    a: "Three marks are read off video: takeaway, the top of the backswing, and impact. Backswing time is top minus takeaway, downswing time is impact minus top, and the tempo ratio is the first divided by the second. Total duration is impact minus takeaway. Nothing else goes into it, which is why publishing the three marks is enough for anyone to check the arithmetic.",
  },
  {
    q: "Why do Elite Tempo's numbers differ from the 3:1 rule?",
    a: "Because 3:1 is an average, not a measurement. It comes from counting frames at 30fps — 24 frames back, 8 down — which rounds every swing to the nearest thirtieth of a second and lands most of them on or near 3:1. Timing the same swings against the footage directly gives a spread rather than a single number.",
  },
  {
    q: "How accurate are the measurements?",
    a: "Precision is bounded by how clearly the footage shows the moment. Marks are stored to 1/100 of a second, but the real uncertainty is larger than that and comes from the video: how many frames per second it was shot at, how much motion blur there is on a clubhead moving at speed, and whether the camera angle makes the top of the backswing unambiguous. The downswing is the shorter of the two intervals, so any uncertainty affects the ratio there most. The marks are published alongside every measurement so a reader can judge them rather than take them on trust.",
  },
  {
    q: "Is the timing done by AI?",
    a: "Not for the tour library. Every shot in it was marked by hand against the footage, because broadcast video changes camera angle, frame rate and shutter speed shot to shot, and an automatic detector trained on clean side-on video does poorly on it. Swings you record in the app are a different case: those are filmed on one camera in good conditions, and the app finds takeaway, top and impact in them automatically.",
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://www.eliteprep.app/elite-tempo/how-we-time-swings#article",
      headline: TITLE,
      description: DESCRIPTION,
      url: "https://www.eliteprep.app/elite-tempo/how-we-time-swings",
      about: { "@type": "Thing", name: "Golf swing tempo measurement" },
      publisher: {
        "@type": "Organization",
        name: "Elite Prep, LLC",
        url: "https://www.eliteprep.app",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.eliteprep.app/elite-tempo/how-we-time-swings#faq",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    breadcrumbSchema(TRAIL),
  ],
};

/* What you would get if you rounded the raw marks to `places` decimals before
   doing the arithmetic. This is the drift the page is warning about, computed
   rather than asserted, so the worked example cannot be wrong. */
function ratioFromRounded(swing: Swing, places: number): string {
  const round = (n: number) => Number(n.toFixed(places));
  const start = round(swing.startS);
  const top = round(swing.topS);
  const impact = round(swing.impactS);
  const ratio = (top - start) / (impact - top);
  return `${ratio.toFixed(2)}:1`;
}

function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-5">
      {/* Numbered because these genuinely are sequential — you cannot mark the top
          before the takeaway, and the arithmetic comes last. */}
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold tabular-nums"
        style={{ background: ACCENT, color: ON_ACCENT }}
        aria-hidden
      >
        {n}
      </span>
      <div className="min-w-0">
        <h3 className="text-base font-semibold" style={{ color: INK }}>
          {title}
        </h3>
        <p className="mt-2 text-base leading-relaxed" style={{ color: MUTED }}>
          {children}
        </p>
      </div>
    </li>
  );
}

export default function HowWeTimeSwings() {
  const hero = SWINGS.find((s) => s.slug === "tiger-woods-2000-the-open-championship-driver")!;
  const rory = SWINGS.find((s) => s.slug === "rory-mcilroy-2014-pga-championship-driver")!;

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
          How we time swings to{" "}
          <span style={{ color: INK }}>1/100 of a second</span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed" style={{ color: MUTED }}>
          Elite Tempo publishes tempo figures that disagree with the number almost
          everyone quotes. Rory McIlroy&apos;s {rory.year} {rory.event} driver comes
          out at {fmtRatio(rory)}, not the &ldquo;textbook 3:1&rdquo; you will find
          everywhere else. A claim like that is only worth making if you also show
          your working, so here it is — including where it can be wrong.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold" style={{ color: INK }}>
            The method
          </h2>
          <ol className="mt-7 flex flex-col gap-8">
            <Step n={1} title="Find footage of the actual shot">
              Not a range swing, not a montage — a specific shot from a specific
              round, where the camera holds a clean view from takeaway through
              impact. Every measurement in the library links to the footage it was
              read off, so the source is checkable rather than asserted.
            </Step>
            <Step n={2} title="Mark takeaway, top and impact">
              Three marks, placed by hand, stepping through the video frame by
              frame. Takeaway is the first frame the clubhead moves away from the
              ball. Top is the frame the club stops going back. Impact is the frame
              the clubface meets the ball.
            </Step>
            <Step n={3} title="Derive everything from those three marks">
              Backswing is top minus takeaway. Downswing is impact minus top. The
              tempo ratio is backswing divided by downswing, and the total duration
              is impact minus takeaway. There is no smoothing, no model and no
              fourth number — which is why the marks themselves are published on
              every page.
            </Step>
          </ol>

          <div
            className="mt-10 rounded-2xl p-6 sm:p-8"
            style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: MUTED }}>
              Worked example
            </p>
            <p className="mt-3 text-base leading-relaxed" style={{ color: MUTED }}>
              {hero.player}, {hero.year} {hero.event}, {hero.clubLabel.toLowerCase()}.
              Takeaway at {hero.startS}s, top at {hero.topS}s, impact at{" "}
              {hero.impactS}s. Backswing {fmtSeconds(hero.back)}, downswing{" "}
              {fmtSeconds(hero.down)}, so the ratio is {fmtSeconds(hero.back)} ÷{" "}
              {fmtSeconds(hero.down)} ={" "}
              <strong style={{ color: INK }}>{fmtRatio(hero)}</strong> over{" "}
              {fmtSeconds(hero.total)}.
            </p>
            {/* These three figures are computed, not typed. An earlier version of
                this paragraph said two-decimal rounding gives 3.70:1, which was
                wrong twice over — 3.70 is what THREE decimals gives, and two gives
                3.57. Getting the arithmetic wrong on the page whose entire job is
                showing the working would have been the worst possible place for it,
                so the numbers now derive from the same marks as everything else. */}
            <p className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>
              Note that the marks carry more decimal places than the published
              figures. That is deliberate: rounding the timestamps before dividing
              them drifts the answer, and not by a little. Round this swing&apos;s
              marks to three decimals and you get {ratioFromRounded(hero, 3)};
              round to two and you get {ratioFromRounded(hero, 2)}. The full-precision
              marks give {fmtRatio(hero)}.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold" style={{ color: INK }}>
            Where the 3:1 rule comes from
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
            The familiar figure comes from counting frames at 30 frames per second:
            24 frames back, 8 frames down. That is a genuinely useful teaching tool
            — it is easy to count and it puts most golfers in roughly the right
            place. But counting whole frames rounds every measurement to the nearest
            thirtieth of a second, and on a downswing lasting about a quarter of a
            second, one frame either way moves the ratio by a lot.
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
            Timed against the footage directly, the {SWINGS.length} shots in the
            library spread from{" "}
            {fmtRatio([...SWINGS].sort((a, b) => a.ratio - b.ratio)[0])} to{" "}
            {fmtRatio([...SWINGS].sort((a, b) => b.ratio - a.ratio)[0])}. 3:1 is a
            reasonable average of that spread and a poor description of any single
            swing in it.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold" style={{ color: INK }}>
            What this method cannot do
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
            Marks are stored to 1/100 of a second, but the honest uncertainty is
            larger than that, and it comes from the video rather than the timing.
            Broadcast footage varies in frame rate, a clubhead moving at speed
            smears across a frame, and the exact moment the club stops going back
            is not always a clean edge. Because the downswing is the shorter of the
            two intervals, whatever uncertainty exists lands hardest on the ratio.
            Higher-frame-rate footage tightens this; nothing eliminates it.
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
            Two other honest limits. Each figure describes{" "}
            <em style={{ color: INK, fontStyle: "normal", fontWeight: 700 }}>
              one swing on one day
            </em>
            , not a player&apos;s career average — tempo moves with club, lie, nerves
            and intent. And a camera angle that is not square to the swing can make
            the top of the backswing genuinely ambiguous by a frame.
          </p>
          <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
            This is why the raw marks sit on every page rather than only the tidy
            ratio. If you disagree with where a mark was placed, you can see exactly
            which one and by how much it would move the answer.
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
            See all {SWINGS.length} measurements
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-relaxed" style={{ color: MUTED }}>
            Every swing in the library, with its marks, its ratio, and the footage it
            was timed from.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/elite-tempo/tempos"
              /* Neutral outline, not gold. It sits beside Apple's white badge, and
                 the badge has to stay the filled thing on the row — two competing
                 fills, one of which cannot be restyled, is not a hierarchy. */
              className="rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-200 hover:bg-[rgba(247,247,247,0.08)]"
              style={{ borderColor: HAIRLINE, color: INK }}
            >
              Open the tempo library
            </Link>
            <AppStoreButton />
          </div>
        </div>
      </article>
    </Chrome>
  );
}
