import type { Metadata } from "next";
import { FONT_SANS } from "./theme";

/* Scopes the Smart App Banner to the Elite Tempo subtree.
 *
 * `apple-itunes-app` lived in the root layout, which meant every route emitted it
 * — so an iPhone visitor reading the Elite Prep homepage, or Reel Prep's privacy
 * policy, got a strip at the top of Safari offering to install a golf tempo app
 * the page was not about. Annoying there, and it makes the banner worth less where
 * it belongs: this subtree, where the reader is already looking at that app.
 *
 * Metadata merges down through nested layouts in the App Router, so this adds the
 * tag for /elite-tempo and everything under it while leaving the rest of the site
 * alone. Page-level `metadata` in this subtree still wins for title/description —
 * `other` is merged separately and none of those pages set it.
 */

const ELITE_TEMPO_APP_ID = "6779226434";

export const metadata: Metadata = {
  /* Only ever seen on a missing page: every real Elite Tempo page sets its own
     title. Without it, a mistyped swing or player address (those routes accept a
     fixed list) showed the parent site's "Elite Prep" title on the 404. */
  title: "Page not found | Elite Tempo",
  other: {
    "apple-itunes-app": `app-id=${ELITE_TEMPO_APP_ID}`,
  },
};

/* Elite Tempo's typeface, scoped to Elite Tempo's pages.
 *
 * The root layout sets Manrope on <body> for the whole site, and the Elite Prep
 * homepage genuinely uses Manrope and Anton — that is the parent brand and it is
 * staying blue. So the app's typeface is applied here, on a wrapper around this
 * subtree, rather than globally. /elite-tempo and everything under it gets Avenir
 * Next; / and /reelprep are untouched.
 */
export default function EliteTempoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="et-site" style={{ fontFamily: FONT_SANS }}>{children}</div>;
}
