import type { Metadata } from "next";
import Chrome, { Breadcrumbs, TrialCard, breadcrumbSchema } from "../Chrome";
import { INK, MUTED, etUrl, SHARE_IMAGES } from "../theme";
import { FAQS } from "../data/faqs";
import { TRIAL_DAYS } from "../data/pricing";
import { description } from "../../seo";

/* The questions page. They were the bottom of the home page until 2026-11-04, when
 * Eric cut the home page down to what explains the product. Moving them here keeps
 * every answer on the site, and keeps the FAQPage markup next to visible questions,
 * which is the only place Google will use it. */

const TITLE = "Elite Tempo Questions";
const DESCRIPTION = description(
  "Answers about Elite Tempo: what makes it different, how routine timing works, practicing without looking at your phone, and what it costs.",
);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: etUrl("/faq") },
  openGraph: { images: SHARE_IMAGES, title: TITLE, description: DESCRIPTION, url: etUrl("/faq"), type: "website" },
  twitter: { card: "summary_large_image", images: SHARE_IMAGES, title: TITLE, description: DESCRIPTION },
};

const TRAIL = [{ name: "Elite Tempo", href: "/" }, { name: "Questions" }];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": "https://elitetempo.app/faq#faq",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    breadcrumbSchema(TRAIL),
  ],
};

export default function FaqPage() {
  return (
    <Chrome>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      <style>{`.et-faq[open] .et-chev { transform: rotate(180deg); } .et-chev { transition: transform 0.2s ease; } :root { interpolate-size: allow-keywords; } .et-faq::details-content { height: 0; overflow: clip; transition: height 0.2s ease, content-visibility 0.2s allow-discrete; } .et-faq[open]::details-content { height: auto; } @media (prefers-reduced-motion: reduce) { .et-faq::details-content, .et-chev { transition: none; } }`}</style>
      <article className="mx-auto max-w-[720px] px-5 pt-10 sm:pt-16">
        <Breadcrumbs trail={TRAIL} />
        <h1 className="mt-6 text-[clamp(34px,5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em]" style={{ color: INK }}>
          Questions
        </h1>
        <div className="mt-8">
          {FAQS.map(({ q, a }) => (
            <details key={q} className="et-faq mb-3 rounded-2xl bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-[19px] font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                {q}
                <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" className="et-chev shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="m-0 px-6 pb-5 text-[19px] leading-[1.45]" style={{ color: MUTED }}>
                {a}
              </p>
            </details>
          ))}
          <p className="mt-6 text-center text-[16px]" style={{ color: MUTED }}>
            Still have a question?{" "}
            <a href="mailto:ebusalacchi@eliteprep.app" className="underline underline-offset-4" style={{ color: INK }}>
              Email us
            </a>
            .
          </p>
        </div>
      </article>
      <TrialCard title="Time your own swing before you pay a thing.">
        Free for {TRIAL_DAYS} days. Cancel anytime.
      </TrialCard>
    </Chrome>
  );
}
