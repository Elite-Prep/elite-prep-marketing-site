import type { MetadataRoute } from "next";
import { SWINGS } from "./elite-tempo/data/tempo-data";

const SITE_URL = "https://www.eliteprep.app";

/* Without this, Google had never discovered /elite-tempo at all: Search Console
   reported "URL is not on Google" and /sitemap.xml returned a 404.

   The library routes are generated from the same data that generates the pages,
   so a shot cannot exist as a page and be missing from the sitemap — which is the
   usual way a hand-maintained list of URLs rots. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const evergreen: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/elite-tempo`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    /* The library index is the page most likely to be linked to and quoted, so it
       ranks alongside the landing page rather than below it. */
    { url: `${SITE_URL}/elite-tempo/tempos`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/elite-tempo/how-we-time-swings`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/elite-tempo/vs/tour-tempo`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/elite-tempo/vs/metronome`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/elite-tempo/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/elite-tempo/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/reelprep/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const library: MetadataRoute.Sitemap = SWINGS.map((swing) => ({
    url: `${SITE_URL}/elite-tempo/tempo/${swing.slug}`,
    lastModified,
    /* These change only when the app's seed file changes, which is rare. Saying
       "monthly" rather than "weekly" keeps the crawl budget on the pages that do
       move. */
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...evergreen, ...library];
}
