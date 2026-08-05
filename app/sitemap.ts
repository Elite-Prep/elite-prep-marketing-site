import type { MetadataRoute } from "next";

const SITE_URL = "https://www.eliteprep.app";

/* Without this, Google had never discovered /elite-tempo at all: Search Console
   reported "URL is not on Google" and /sitemap.xml returned a 404. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/elite-tempo`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/elite-tempo/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/elite-tempo/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
