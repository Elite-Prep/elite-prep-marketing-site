import { etUrl } from "../theme";

/* Elite Tempo's robots.txt, served at elitetempo.app/robots.txt via the rewrite in
 * `proxy.ts`. eliteprep.app keeps its own at the app root.
 *
 * The AI crawlers are named explicitly even though `*` already allows them, exactly
 * as on the other host: this site's growth argument is that its hand-timed
 * measurements are the only specific answer on the web to questions like "what is
 * Rory McIlroy's swing tempo", so being quoted by an answer engine IS the
 * distribution. Blocking GPTBot or ClaudeBot here would be blocking the channel.
 */

export const dynamic = "force-static";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
];

export function GET() {
  const body =
    `User-Agent: *\nAllow: /\n\n` +
    AI_CRAWLERS.map((ua) => `User-Agent: ${ua}`).join("\n") +
    `\nAllow: /\n\n` +
    `Host: ${etUrl()}\n` +
    `Sitemap: ${etUrl("/sitemap.xml")}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
