import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* Two hostnames, one app.
 *
 * Elite Tempo lived at eliteprep.app/elite-tempo/* and now has its own domain. It
 * is the same Next app either way — the pages are not duplicated — and this file
 * is what makes one set of routes answer on two hosts correctly:
 *
 *   elitetempo.app/tempos          -> renders /elite-tempo/tempos   (rewrite, URL unchanged)
 *   eliteprep.app/elite-tempo/*    -> 308 to elitetempo.app/*       (redirect, URL changes)
 *
 * The distinction matters. A REWRITE serves different content at the same address,
 * so the visitor and Google both see the short URL. A REDIRECT sends them somewhere
 * else, which is what the old URLs need to do so their ranking signal transfers
 * rather than being split across two addresses.
 *
 * NOTE ON THE FILENAME. This is `proxy.ts`, not `middleware.ts`. Next 16 renamed the
 * convention and deprecated the old name; a `middleware.ts` here would simply never
 * run. Same API otherwise.
 */

/* The subtree that moves. Everything under it becomes root-level on the new host. */
const PREFIX = "/elite-tempo";

/* Next's generated metadata routes — favicon, touch icon, social cards. Their URLs
   come from the file path, so they always carry the prefix. */
const METADATA_ASSETS = /^\/elite-tempo\/(icon|apple-icon|opengraph-image|twitter-image)/;

/* Paths that must keep answering on eliteprep.app rather than being redirected
   away. Apple and Google both require a reachable privacy policy for the app
   listing, and those URLs have been submitted to the stores — so they stay put,
   and the copies on the new domain are the ones marked canonical. */
const KEEP_ON_ELITE_PREP: string[] = [];

function isEliteTempoHost(host: string): boolean {
  return host === "elitetempo.app" || host === "www.elitetempo.app";
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() ?? "";
  const { pathname, search } = request.nextUrl;

  /* ── elitetempo.app: serve the subtree at the root ─────────────────────── */
  if (isEliteTempoHost(host)) {
    /* Next generates metadata asset URLs from the file path, so the icon is
       declared as /elite-tempo/icon even on this host. Serve those where they are
       rather than bouncing them through a redirect: the favicon is the one image
       Google fetches for the search result, and a needless hop on it is the last
       thing this move should introduce. */
    if (METADATA_ASSETS.test(pathname)) {
      return NextResponse.next();
    }

    /* Someone following an old link that already carries the prefix — send them
       to the short form so there is exactly one address per page. */
    if (pathname === PREFIX || pathname.startsWith(`${PREFIX}/`)) {
      const stripped = pathname.slice(PREFIX.length) || "/";
      return NextResponse.redirect(new URL(`${stripped}${search}`, request.url), 308);
    }

    /* Everything else renders from the subtree without the URL changing. The
       favicon and icon routes come along too: they live under the subtree, and on
       this host they are the site's own icons — which is the entire reason for
       the move, since Google shows one favicon per hostname. */
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? PREFIX : `${PREFIX}${pathname}`;
    return NextResponse.rewrite(url);
  }

  /* ── eliteprep.app: hand the old URLs over ─────────────────────────────── */

  /* /llms.txt described Elite Tempo and nothing else, so it moved with the rest.
     Redirected rather than deleted: it has been live and crawlable, and a 404 would
     throw away whatever an answer engine has already read. */
  if (pathname === "/llms.txt") {
    return NextResponse.redirect(new URL("/llms.txt", "https://elitetempo.app"), 308);
  }

  if (pathname === PREFIX || pathname.startsWith(`${PREFIX}/`)) {
    if (KEEP_ON_ELITE_PREP.includes(pathname)) return NextResponse.next();

    const stripped = pathname.slice(PREFIX.length) || "/";
    /* 308 rather than 302: this is permanent, and search engines only transfer
       ranking signal for a permanent redirect. 308 over 301 because it preserves
       the request method, which is what Next uses everywhere else. */
    return NextResponse.redirect(
      new URL(`${stripped}${search}`, "https://elitetempo.app"),
      308,
    );
  }

  return NextResponse.next();
}

export const config = {
  /* Everything except Next's build output and the files that must resolve on the
     host that asked for them. Without excluding /_next the rewrite would mangle
     asset paths on the new host and the page would load unstyled. */
  matcher: ["/((?!_next/static|_next/image).*)"],
};
