import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats; the optimizer downscales per device.
    formats: ["image/avif", "image/webp"],
    // PhoneMockup requests quality 90; Next 16 requires it declared.
    qualities: [75, 90],
  },

  /* Two URLs from a previous version of this site.
   *
   * Search Console lists 44 pages as "not indexed", which reads alarming until you
   * look at what they are: 15 are `/_next/static` build chunks, 13 are icon and
   * social-image routes, and 5 are the http:// and non-www spellings of pages that
   * already redirect correctly. Google declining to index a JavaScript bundle or a
   * favicon is the right outcome, not a problem to solve.
   *
   * Exactly two were real pages a person could have bookmarked or linked to:
   *
   *   /legal-pages/privacy-policy        last crawled 2026-02-03
   *   /legal-pages/terms-and-conditions  last crawled 2026-02-15
   *
   * Neither path has ever existed in this repo — they predate it — so they have
   * been 404ing ever since. The content did not disappear, it moved to /privacy and
   * /terms, which is exactly the case a permanent redirect is for: anyone following
   * an old link lands on the live page, and whatever ranking signal those URLs had
   * accrued transfers instead of being thrown away.
   *
   * `permanent: true` issues a 308. Next uses 308 rather than 301 because it
   * preserves the request method; search engines treat the two the same.
   *
   * The other five 404s (/mo, /blog/getting-started, /preparation/magnificent-seven,
   * /preparation/generic, /dsa) are deliberately left alone. None has ever existed
   * here either, but unlike the legal pages there is no current page that means the
   * same thing, and inventing a destination would be worse than a clean 404 — it
   * sends someone looking for a blog post to a page that is not one.
   */
  async redirects() {
    return [
      {
        source: "/legal-pages/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/legal-pages/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
