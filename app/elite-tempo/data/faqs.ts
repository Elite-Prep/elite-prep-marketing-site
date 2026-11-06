import { PRICE_MONTHLY, PRICE_YEARLY, TRIAL_DAYS } from "./pricing";

/* Only questions a golfer deciding whether to download would really ask. Each
   answer is one to three plain sentences. Player tempo questions (Rory, Tiger)
   are answered on the player pages, which rank for them on their own. They live on /faq since 11-04 (the home page was cut to the value prop only),
   shown there AND as FAQPage structured data: Google only uses FAQ markup for
   questions that are visible on the same page. */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What makes Elite Tempo different?",
    a: "Elite Tempo records the timing and routine of your best shots, so you can repeat them when it matters. This is not a generic tempo app.",
  },
  {
    q: "How do I time my pre-shot routine?",
    a: "Record your routine once and label each step, like picking a target or taking a practice swing. Elite Tempo times every step and the total, so you can see how you stack up against the 40-second guideline.",
  },
  {
    q: "Can I practice without looking at my phone?",
    a: "Yes. Keep your phone in your bag and hear your timing as beats in your headphones.",
  },
  {
    q: "Do I need anything besides my iPhone?",
    a: "No. Use your camera or import a video you already have. Elite Tempo works on iPhone only.",
  },
  {
    q: `How much does it cost?`,
    a: `Try it free for ${TRIAL_DAYS} days. After that, it’s ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month. Cancel anytime in your iPhone settings.`,
  },
];

