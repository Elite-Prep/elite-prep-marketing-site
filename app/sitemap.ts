import type { MetadataRoute } from "next";

const SITE_URL = "https://www.eliteprep.app";

/* Elite Prep's sitemap. Elite Tempo has its own, on its own domain.
 *
 * This used to list all 29 URLs including the whole tempo library. Those pages now
 * live at elitetempo.app and are listed in `app/elite-tempo/sitemap.xml/route.ts`,
 * which that host serves at its root. Listing them here as well would be a
 * cross-site sitemap — Google accepts those only when both properties are verified
 * by the same owner, and even then it is the wrong signal: it says the pages belong
 * to this domain, which is exactly what the move is undoing.
 *
 * Without robots.txt and a sitemap, Search Console reported "URL is not on Google"
 * and /sitemap.xml returned a 404, which is why this file exists at all. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/reelprep/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
