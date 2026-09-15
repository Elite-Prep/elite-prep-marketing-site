import { PLAYERS, SWINGS } from "../data/tempo-data";
import { etUrl } from "../theme";

/* Elite Tempo's own sitemap, served at elitetempo.app/sitemap.xml.
 *
 * It cannot be `app/sitemap.ts` — that file is the SITE's sitemap and there is only
 * one app serving two hostnames. eliteprep.app keeps the root one and lists its own
 * pages; this is the Elite Tempo half, reached because `proxy.ts` rewrites
 * elitetempo.app/sitemap.xml onto this path.
 *
 * Written by hand rather than through MetadataRoute because that helper resolves
 * URLs against `metadataBase`, which points at eliteprep.app. Every URL here has to
 * be absolute on the new host or Google reads it as a cross-site sitemap.
 *
 * Generated from the same data as the pages, so a shot or a player cannot exist as
 * a page and be missing from the sitemap.
 */

export const dynamic = "force-static";

type Entry = { path: string; changefreq: string; priority: string };

const ENTRIES: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/tempos", changefreq: "weekly", priority: "0.9" },
  { path: "/how-we-time-swings", changefreq: "monthly", priority: "0.8" },
  { path: "/vs/tour-tempo", changefreq: "monthly", priority: "0.7" },
  { path: "/vs/metronome", changefreq: "monthly", priority: "0.7" },
  ...PLAYERS.map((p) => ({
    path: `/player/${p.slug}`,
    changefreq: "monthly",
    priority: "0.9",
  })),
  ...SWINGS.map((s) => ({
    path: `/tempo/${s.slug}`,
    changefreq: "monthly",
    priority: "0.8",
  })),
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

export function GET() {
  const lastmod = new Date().toISOString();
  const urls = ENTRIES.map(
    (e) =>
      `  <url>\n` +
      `    <loc>${etUrl(e.path)}</loc>\n` +
      `    <lastmod>${lastmod}</lastmod>\n` +
      `    <changefreq>${e.changefreq}</changefreq>\n` +
      `    <priority>${e.priority}</priority>\n` +
      `  </url>`,
  ).join("\n");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
