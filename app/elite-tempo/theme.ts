/* The Elite Tempo design tokens, taken from the app rather than approximated.
 *
 * Source of truth: Elite-Tempo `App/EliteTempo/Assets.xcassets/*.colorset` and
 * `Theme.swift`, read from `origin/master` at version 1.4.12. The DARK appearance
 * is what these mirror, because dark is the app's look.
 *
 * WHAT CHANGED AND WHY. The previous values claimed in a comment to "match
 * Theme.swift exactly" and did not match the current app at all — they were a
 * blue-tinted near-black with an amber accent, which is roughly where the app was
 * several releases ago:
 *
 *   token      was        now        the app's name for it
 *   bg         #0B0B0C    #222222    Grey 900
 *   accent     #FFB300    #F7C948    Yellow (Vivid) 400
 *   card       #1B1E26    #3B3B3B    Grey 800
 *   hairline   #30343E    #515151    Grey 700
 *   muted      #8F929C    #CFCFCF    Grey 300
 *   faint      #5A5D66    #7E7E7E    Grey 500
 *
 * The canvas is also FLAT now. The app ran a teal-to-navy gradient in 1.4.10 and
 * retired it in 1.4.12 because a gradient makes contrast positional — you cannot
 * quote a ratio without saying where on the screen it applies. Grey 900 everywhere
 * means `ink` reads 14.85:1 at every point on the page.
 */

/* ── Colour ──────────────────────────────────────────────────────────────── */

/** Grey 900. The canvas, flat. */
export const BG = "#222222";

/**
 * Yellow (Vivid) 400. A FIELD COLOUR, NEVER TEXT.
 *
 * This is the rule that shapes the whole page, and it is measured rather than
 * stylistic: gold is 10.15:1 on the canvas and `ink` is 14.85:1, so gold WORDS set
 * near body copy are automatically de-emphasised — the "highlighted" thing ends up
 * dimmer than the sentence explaining it. The app retired gold once over exactly
 * this, in 1.4.10, and brought it back only as a field.
 *
 * Gold field + `ON_ACCENT` near-black ink reads as primary and always will. That is
 * Refactoring UI's flipped contrast, p144.
 *
 * The test, if you are ever unsure: desaturate a screenshot. If the gold thing goes
 * DIMMER than the white text beside it, it cannot carry emphasis.
 *
 * Decoration is the sanctioned exception — the tick dividers, small glyphs — per the
 * owner's ruling that Refactoring UI governs and it endorses exactly that in
 * "Supercharge the defaults".
 */
export const ACCENT = "#F7C948";

/** Grey 900 — ink on a gold field, 10.15:1. Deliberately the canvas colour rather
 *  than pure black, so a button reads as a window cut through to the ground. */
export const ON_ACCENT = "#222222";

/**
 * Light Blue (Vivid) 100. THIS WORD IS TAPPABLE.
 *
 * The app's second primary, and an affordance rather than an emphasis: a bare
 * tappable word with no field around it. Gold cannot do it (gold is fields) and
 * `INK` cannot (indistinguishable from body copy). 12.39:1 — above `MUTED`, below
 * `INK`, which is the right place for it.
 *
 * NOT for readouts. The app made that mistake and corrected it on 2026-09-13:
 *   - size, weight, position carry IMPORTANCE  -> readouts are INK
 *   - colour carries AFFORDANCE                -> tappable words are ACCENT_ALT
 */
export const ACCENT_ALT = "#B3ECFF";

/** Grey 50. Body copy and every readout. 14.85:1 on the canvas. */
export const INK = "#F7F7F7";
/** Grey 300. Secondary copy. 10.21:1. */
export const MUTED = "#CFCFCF";
/** Grey 500. Legal lines and copyright — quieter than MUTED by design. */
export const FAINT = "#7E7E7E";
/** Grey 800. Every card surface. */
export const CARD = "#3B3B3B";
/** Grey 800. Slide-up and raised surfaces. */
export const ELEVATED = "#3B3B3B";
/** Grey 700. Borders and rules. */
export const HAIRLINE = "#515151";

/* ── Type ────────────────────────────────────────────────────────────────── */

/**
 * The app sets everything in Avenir Next, which is preinstalled on iOS and macOS —
 * so naming it first means Apple visitors, who are most of the audience for an
 * iPhone app, get the real typeface with nothing to download. Everyone else falls
 * through to Nunito Sans, loaded from Google Fonts, which is the closest match in
 * proportion and x-height.
 */
export const FONT_SANS = `"Avenir Next", Avenir, var(--font-nunito-sans), system-ui, sans-serif`;

/**
 * Numerals are deliberately NOT Avenir Next in the app — they are the system face,
 * bold, with monospaced digits, because they are the data on an instrument surface
 * and must not jitter as they count. `system-ui` resolves to SF Pro on Apple
 * devices, so this is the same face the app uses, not an approximation.
 *
 * Pair with `font-variant-numeric: tabular-nums`.
 */
export const FONT_NUMERALS = `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;

/**
 * Two weights, two steps apart, and that is the whole scale.
 *
 * The app collapses everything to these: `.bold` becomes semibold at every size,
 * `.medium` drops to regular at 13pt and up. Counted across the app that left 400
 * for body and 600 for emphasis. Refactoring UI, "Size isn't everything": two
 * weights are enough, and they have to be far enough apart to read as different —
 * 500 against 600 barely is.
 *
 * The website was running 700 and 800 almost everywhere, which is why it read as
 * heavier and louder than the app it is selling.
 */
export const W_BODY = 400;
export const W_EMPHASIS = 600;
/** The wordmark only. Exempt from the bold-becomes-semibold rule: a logo that
 *  lightens because it happens to be small is not a logo. */
export const W_WORDMARK = 700;

/** All-caps needs air. The app spaces the wordmark at 4% of its size; the same
 *  ratio in CSS is 0.04em. Refactoring UI singles out all-caps for this — every
 *  letter is the same height, so there is no silhouette to read. */
export const TRACKING_MARK = "0.04em";

/* ── Misc ────────────────────────────────────────────────────────────────── */

export const APP_STORE_URL = "https://apps.apple.com/app/elite-tempo/id6779226434";

/* Elite Tempo's own domain, as of 2026-09-14.
 *
 * These pages used to live at eliteprep.app/elite-tempo/*. They still render from
 * that subtree — `proxy.ts` rewrites the new host onto it — but every address they
 * DECLARE has to be the new one, or Google keeps the old URLs as canonical and the
 * move never takes.
 *
 * The reason for moving at all: Google shows one favicon and one site name per
 * HOSTNAME. On eliteprep.app these pages wore Elite Prep's blue icon and said
 * "eliteprep.app" in every result, with no per-page override possible. A separate
 * host is the only way Elite Tempo gets its own identity in search.
 *
 * Paths are root-level here: /tempos, not /elite-tempo/tempos. Use `etUrl` rather
 * than writing these by hand — the prefix exists in the file tree but must never
 * appear in a published URL. */
export const ET_SITE_URL = "https://elitetempo.app";

/** An absolute Elite Tempo URL. Pass the ROOT path: `etUrl("/tempos")`. */
export function etUrl(path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${ET_SITE_URL}${clean}`;
}

/** Elite Prep's domain — still correct for the homepage and its legal pages. */
export const SITE_URL = "https://www.eliteprep.app";
