/* Guards on the two strings Google actually prints.
 *
 * A search result is a title, a URL and a snippet. Everything else on a page is
 * invisible at that moment, which makes those two strings the entire first
 * impression — and both of ours were overflowing.
 *
 * Measured on the live site 2026-09-14, with HTML entities decoded:
 *
 *   page                       title   description
 *   /                            53        229
 *   /elite-tempo                 49        285
 *   /elite-tempo/tempos          44        233
 *   /elite-tempo/vs/tour-tempo   52        273
 *   a tempo detail page        58-71     296-308
 *
 * Every description ran roughly twice Google's display width, so every one of
 * them was going to be cut off mid-sentence with an ellipsis. The longest detail
 * titles overflowed too — "Scottie Scheffler's Swing Tempo: 2.60:1 (2024 The
 * Players Championship)" is 71 characters.
 *
 * These are display limits, not ranking limits: an over-long description does not
 * hurt where you rank, it just makes the result look unfinished. Which is exactly
 * what "make it look normal in search" means.
 *
 * The numbers below are conservative. Google measures pixels rather than
 * characters and the real cut depends on the glyphs, so leaving headroom is worth
 * more than squeezing in a few extra words.
 */

export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

function assertLength(kind: string, value: string, max: number): string {
  if (value.length > max) {
    throw new Error(
      `seo: ${kind} is ${value.length} characters, over the ${max} limit — Google will ` +
        `truncate it mid-sentence.\n  ${value}\n` +
        `Shorten it, or if this really must be long, raise the limit deliberately rather ` +
        `than editing this check away.`,
    );
  }
  return value;
}

/** A <title>. Fails the build if it will be cut off in a search result. */
export const title = (value: string) => assertLength("title", value, TITLE_MAX);

/** A meta description. Fails the build if it will be cut off in a search result. */
export const description = (value: string) =>
  assertLength("description", value, DESCRIPTION_MAX);
