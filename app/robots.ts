import type { MetadataRoute } from "next";

const SITE_URL = "https://www.eliteprep.app";

/* /robots.txt also 404'd before this, so crawlers had no pointer to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
