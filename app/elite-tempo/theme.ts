/* The Elite Tempo palette, in one place.
 *
 * These values mirror the app's Theme.swift tokens. They used to be copy-pasted
 * into page.tsx and EmailCapture.tsx separately, which meant a colour change had
 * to be made twice or stale hexes survived into the build — and with the library
 * pages added there would now be a dozen copies. One module, imported everywhere.
 *
 * CARD and HAIRLINE match Theme.swift exactly. They were #151720 and #242732,
 * both darker than the app's tokens, which left panels at 1.10:1 against the
 * canvas and borders at 1.32:1 — structure you could barely see. Text was
 * measured too and needed nothing: INK is 18.0:1 on the canvas, MUTED 6.3:1 on
 * the canvas and 5.4:1 on the card, ACCENT 11.0:1, all clear of WCAG AA.
 *
 * ACCENT is only ever ink on a dark surface, or a filled field with ON_ACCENT
 * ink on top. Gold text on a gold field, or gold on anything light, is out.
 */
export const BG = "#0B0B0C";
export const ACCENT = "#FFB300";
export const ON_ACCENT = "#0B0B0C";
export const INK = "#F3F5F9";
export const MUTED = "#8F929C";
export const CARD = "#1B1E26";
export const HAIRLINE = "#30343E";
/* Footnote grey — legal lines and copyright, deliberately quieter than MUTED. */
export const FAINT = "#5A5D66";

export const APP_STORE_URL = "https://apps.apple.com/app/elite-tempo/id6779226434";
export const SITE_URL = "https://www.eliteprep.app";

/* The app's canvas, ported: Theme.swift is a ZStack of bg plus a RadialGradient
   of accent at 0.06 from the top trailing corner, described there as "a hint of
   warmth, not a brown wash". 0.06 is deliberate — DESIGN.md records a heavier
   pass (0.16 over a 520pt radius plus a second linear wash) that "tinted the
   whole upper screen brown, the exact failure Theme.canvas warns about". The
   radius is scaled up for a desktop viewport but still fades out well before
   mid-page, so a long page below it is untinted rather than washed. */
export const CANVAS_BACKGROUND =
  `radial-gradient(1200px 900px at 100% 0%, rgba(255, 179, 0, 0.06), rgba(255, 179, 0, 0) 70%), ${BG}`;
