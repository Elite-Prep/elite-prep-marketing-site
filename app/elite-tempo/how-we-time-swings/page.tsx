import type { Metadata } from "next";
import Link from "next/link";
import Chrome, { Breadcrumbs, TrialCard, breadcrumbSchema } from "../Chrome";
import { ACCENT, CARD, HAIRLINE, INK, MUTED, ON_ACCENT, etUrl, SHARE_IMAGES } from "../theme";
import { SWINGS, fmtRatio, fmtSeconds, type Swing } from "../data/tempo-data";
import { description } from "../../seo";

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
const DESCRIPTION = description(
  "How Elite Tempo measures tour swing tempo: the three marks read off tournament footage, the arithmetic, and where the method can be wrong.",
);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: etUrl("/how-we-time-swings") },
  openGraph: { images: SHARE_IMAGES,
    title: TITLE,
    description: DESCRIPTION,
    url: etUrl("/how-we-time-swings"),
    type: "article",
  },
  twitter: { card: "summary_large_image", images: SHARE_IMAGES, title: TITLE, description: DESCRIPTION },
};

const TRAIL = [
  { name: "Elite Tempo", href: "/" },
  { name: "How we time swings" },
];

const FAQS = [
  {
    q: "How is golf swing tempo measured?",
    a: "Three marks are read off video: takeaway, the top of the backswing, and impact. Backswing time is top minus takeaway, downswing time is impact minus top, and the tempo ratio is the first divided by the second. Total swing duration is impact minus takeaway. Nothing else goes into the numbers, so anyone can check the math from the three published marks.",
  },
  {
    q: "Why do Elite Tempo's numbers differ from the 3:1 rule?",
    a: "3:1 is an average. It comes from counting frames at 30 frames per second (24 back, 8 down), which rounds every swing to the nearest thirtieth of a second. Timed directly from the footage, real tour swings spread from about 2:1 to above 4:1.",
  },
  {
    q: "How accurate are the measurements?",
    a: "As accurate as the footage allows. Marks are stored to 1/100 of a second, but the video sets the real limit: its frame rate, motion blur on a fast clubhead, and how clearly the camera angle shows the top of the backswing. The downswing is the shorter interval, so any error moves the ratio most there. Every page shows its marks so you can judge them yourself.",
  },
  {
    q: "Is the timing done by AI?",
    a: "No. Every tour swing was marked by hand, frame by frame, because broadcast video changes camera angle, frame rate and shutter speed from shot to shot. Swings you film in the app are marked the same way: you step through your video one frame at a time and place takeaway, top and impact yourself.",
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://elitetempo.app/how-we-time-swings#article",
      headline: TITLE,
      description: DESCRIPTION,
      url: "https://elitetempo.app/how-we-time-swings",
      about: { "@type": "Thing", name: "Golf swing tempo measurement" },
      publisher: {
        "@type": "Organization",
        name: "Elite Prep Inc",
        url: "https://www.eliteprep.app",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://elitetempo.app/how-we-time-swings#faq",
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
        style={{ background: INK, color: "#FFFFFF" }}
        aria-hidden
      >
        {n}
      </span>
      <div className="min-w-0">
        <h3 className="text-base font-semibold" style={{ color: INK }}>
          {title}
        </h3>
        <p className="mt-2 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
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

      <article className="mx-auto max-w-3xl px-5 pt-10 sm:pt-16">
        <Breadcrumbs trail={TRAIL} />

        <h1
          className="mt-6 text-[clamp(34px,5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em]"
          style={{ color: INK, textWrap: "balance" }}
        >
          How we time swings to{" "}
          <span style={{ color: INK }}>1/100 of a second</span>
        </h1>

        <p className="mt-6 text-[19px] leading-[1.5]" style={{ color: MUTED }}>
          Most swing tempo advice quotes one number, 3:1. Rory McIlroy&apos;s{" "}
          {rory.year} {rory.event} driver measures {fmtRatio(rory)}. Here is exactly
          how we got that number, and where the method can be wrong.
        </p>

        <section className="mt-12">
          <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            The method
          </h2>
          <ol className="mt-7 flex flex-col gap-8">
            <Step n={1} title="Find footage of the actual shot">
              One specific shot from one specific round, where the camera holds a
              clean view from takeaway through impact. Every measurement in the
              library links to the footage it came from, so you can check it.
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
              fourth number, which is why the marks themselves are published on
              every page.
            </Step>
          </ol>

          <div
            className="mt-10 rounded-2xl p-6 sm:p-8"
            style={{ background: CARD }}
          >
            <p className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
              Worked example
            </p>
            <p className="mt-3 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
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
            <p className="mt-4 text-[16px] leading-[1.55]" style={{ color: MUTED }}>
              The marks keep more decimal places than the published figures on
              purpose, because rounding before dividing changes the answer. Round this swing&apos;s
              marks to three decimals and you get {ratioFromRounded(hero, 3)};
              round to two and you get {ratioFromRounded(hero, 2)}. The full-precision
              marks give {fmtRatio(hero)}.
            </p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            Where the 3:1 rule comes from
          </h2>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            The familiar figure comes from counting frames at 30 frames per second:
            24 frames back, 8 frames down. It is easy to count and a useful teaching
            tool. Counting whole frames also rounds every swing to the nearest
            thirtieth of a second, and on a downswing of about a quarter second, one
            frame either way moves the ratio a lot.
          </p>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            Timed against the footage directly, the {SWINGS.length} shots in the
            library spread from{" "}
            {fmtRatio([...SWINGS].sort((a, b) => a.ratio - b.ratio)[0])} to{" "}
            {fmtRatio([...SWINGS].sort((a, b) => b.ratio - a.ratio)[0])}. 3:1 sits
            near the middle of that spread and describes few of the swings in it.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.02em]" style={{ color: INK }}>
            What this method cannot do
          </h2>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            Marks are stored to 1/100 of a second, but the video sets the real limit.
            Broadcast footage varies in frame rate, a clubhead moving at speed
            smears across a frame, and the exact moment the club stops going back
            is not always a clean edge. Because the downswing is the shorter of the
            two intervals, whatever uncertainty exists lands hardest on the ratio.
            Footage shot at a higher frame rate reduces this error.
          </p>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            Two more limits. Each figure describes{" "}
            <em style={{ color: INK, fontStyle: "normal", fontWeight: 700 }}>
              one swing on one day
            </em>
            , not a player&apos;s career average. Tempo moves with club, lie, nerves
            and intent. And a camera angle that is not square to the swing can make
            the top of the backswing unclear by a frame.
          </p>
          <p className="mt-4 text-[17px] leading-[1.55]" style={{ color: MUTED }}>
            That is why every page shows the raw marks next to the ratio. If you
            would place a mark differently, you can see which one and how much it
            would move the answer.
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

        <TrialCard title={<>See all {SWINGS.length} measurements</>}>
          Every swing in the{" "}
          <Link href="/tempos" className="font-semibold underline decoration-1 underline-offset-4" style={{ color: INK }}>
            tempo library
          </Link>
          , with its marks, its ratio, and the footage it was timed from. Then time your own.
        </TrialCard>
      </article>
    </Chrome>
  );
}
