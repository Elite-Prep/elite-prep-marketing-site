import { PRICE_MONTHLY, PRICE_YEARLY, TRIAL_DAYS } from "./pricing";

/* Only questions a golfer deciding whether to download would really ask. Each
   answer is one to three plain sentences. Player tempo questions (Rory, Tiger)
   are answered on the player pages, which rank for them on their own. They live on /faq since 11-04 (the home page was cut to the value prop only),
   shown there AND as FAQPage structured data: Google only uses FAQ markup for
   questions that are visible on the same page. */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What makes Elite Tempo different?",
    a: "Elite Tempo captures the total timing and the routine of your best shots, so you can groove them and practice under pressure. We’re not a generic tempo trainer.",
  },
  {
    q: "How do I time my pre-shot routine?",
    a: "Film your routine once and name each step, like picking a target or a practice swing. Elite Tempo times every step and the total against the 40 seconds the USGA and The R&A recommend.",
  },
  {
    q: "Can I practice without looking at my phone?",
    a: "Yes. Leave it in your bag and hear your timing as beats in your headphones. During routine practice, the app hears the strike and tells you whether you were on time.",
  },
  {
    q: "Do I need anything besides my iPhone?",
    a: "No. Record with the camera or import a clip you already have. Elite Tempo is for iPhone only.",
  },
  {
    q: `How much does it cost?`,
    a: `It is free for ${TRIAL_DAYS} days, then ${PRICE_YEARLY} a year or ${PRICE_MONTHLY} a month. Cancel anytime in your iPhone settings.`,
  },
];

