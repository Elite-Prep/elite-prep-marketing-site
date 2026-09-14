import type { MetadataRoute } from "next";

const SITE_URL = "https://www.eliteprep.app";

/* /robots.txt also 404'd before this, so crawlers had no pointer to the sitemap.
 *
 * The AI crawlers are named explicitly even though `*` already allows them. That
 * is the point: it is now a recorded decision rather than an accident. Elite
 * Tempo's whole growth argument is that its hand-timed measurements are the only
 * specific answer on the web to questions like "what is Rory McIlroy's swing
 * tempo" — being quoted by an answer engine IS the distribution, so blocking
 * GPTBot or ClaudeBot here would be blocking the channel. If someone later adds a
 * disallow for these out of reflex, this comment is the argument against it.
 */
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

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
