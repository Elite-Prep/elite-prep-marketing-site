import type { Metadata } from "next";
import Link from "next/link";
import Chrome, { Breadcrumbs, TrialCard, breadcrumbSchema } from "../Chrome";
import { INK, MUTED, etUrl, SHARE_IMAGES } from "../theme";
import { TRIAL_DAYS } from "../data/pricing";
import { description } from "../../seo";

/* One "Compare" link in the footer instead of two (11-04, Pinterest word budget). */

const TITLE = "Compare Elite Tempo";
const DESCRIPTION = description(
  "How Elite Tempo compares with Tour Tempo and with a metronome.",
);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: etUrl("/vs") },
  openGraph: {
    images: SHARE_IMAGES,
    title: TITLE,
    description: DESCRIPTION,
    url: etUrl("/vs"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: SHARE_IMAGES,
    title: TITLE,
    description: DESCRIPTION,
  },
};

const TRAIL = [{ name: "Elite Tempo", href: "/" }, { name: "Compare" }];

const PAGES = [
  {
    href: "/vs/tour-tempo",
    title: "Elite Tempo vs Tour Tempo",
    line: "Train to your own timing instead of a fixed ratio.",
  },
  {
    href: "/vs/metronome",
    title: "Elite Tempo vs a metronome",
    line: "Timing from your real swing, not a click track.",
  },
];

export default function ComparePage() {
  return (
    <Chrome>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [breadcrumbSchema(TRAIL)],
          }),
        }}
      />
      <article className="mx-auto max-w-[720px] px-5 pt-10 sm:pt-16">
        <Breadcrumbs trail={TRAIL} />
        <h1
          className="mt-6 text-[clamp(34px,5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em]"
          style={{ color: INK }}
        >
          Compare
        </h1>
        <ul className="m-0 mt-8 list-none p-0">
          {PAGES.map((p) => (
            <li key={p.href} className="mb-3">
              <Link
                href={p.href}
                className="block rounded-2xl bg-white px-6 py-5 no-underline"
                style={{ color: INK }}
              >
                <span className="block text-[19px] font-semibold">
                  {p.title}
                </span>
                <span
                  className="mt-1 block text-[17px]"
                  style={{ color: MUTED }}
                >
                  {p.line}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </article>
      <TrialCard title="Time your own swing before you pay a thing.">
        Free for {TRIAL_DAYS} days. Cancel anytime.
      </TrialCard>
    </Chrome>
  );
}
