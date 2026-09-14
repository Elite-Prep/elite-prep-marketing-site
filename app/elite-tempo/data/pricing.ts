/* What Elite Tempo costs, in one place.
 *
 * These lived as constants inside `page.tsx` while the Open Graph card carried its
 * own hardcoded copy of the same sentence — which is how the social card ended up
 * advertising "Free for 7 days · then $19.99/yr or $49.99" long after the trial
 * became 14 days, the yearly price became $24.99, and the lifetime unlock was
 * retired. Same class of bug as the hand-typed tempo figures: a second copy that
 * nothing forces to agree with the first.
 *
 * Verify against App Store Connect, not against older marketing copy. Yearly is
 * $24.99 for new customers as of 2026-07-31 — the $19.99 point survives only as a
 * `preserved=true` price for existing subscribers, and the first row the API
 * returns is often that one. Read the whole schedule:
 *   /v1/subscriptions/{id}/prices?filter[territory]=USA
 *
 * The lifetime non-consumable is RETIRED. PaywallView no longer offers it, so
 * nothing on this site may advertise it — pointing someone at a paywall that
 * cannot sell what the page promised is worse than saying nothing.
 */

export const PRICE_YEARLY_NUM = 24.99;
export const PRICE_MONTHLY_NUM = 5.99;
export const PRICE_YEARLY = `$${PRICE_YEARLY_NUM.toFixed(2)}`;
export const PRICE_MONTHLY = `$${PRICE_MONTHLY_NUM.toFixed(2)}`;
export const TRIAL_DAYS = 14;

/* Derived, never typed by hand, so the badge cannot outlive a price change:
   $5.99 x 12 = $71.88 against $24.99 is a 65% saving. */
export const YEARLY_SAVING_PCT = Math.round(
  (1 - PRICE_YEARLY_NUM / (PRICE_MONTHLY_NUM * 12)) * 100,
);

/* The one-line version, used on the landing page and burned into the social card.
   Both read it from here so they cannot disagree. */
export const PRICING_SUMMARY = `Free for ${TRIAL_DAYS} days · then ${PRICE_YEARLY}/yr or ${PRICE_MONTHLY}/mo`;
