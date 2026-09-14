/* The hand-timed tempo library, read from the app's own seed file.
 *
 * WHY THIS EXISTS. Every tempo figure on this site used to be retyped by hand,
 * and every one of them was wrong: Tiger was published at 3.17:1 for a "2000
 * U.S. Open" driver that is really The Open Championship at 3.69:1, Rory at
 * 3.0 against a real 2.45, Couples at 2.75 against a real 3.34. No 3.17 exists
 * anywhere in the app's data. The fix is not "retype it more carefully" — it is
 * to stop retyping. `seed-presets.json` in this folder is a VERBATIM COPY of
 * Elite-Tempo's `Sources/EliteTempoCore/Resources/seed-presets.json`, and every
 * number rendered on this site is derived from it here.
 *
 * TO RE-SYNC after the app's library changes:
 *   cp ../Elite-Tempo/Sources/EliteTempoCore/Resources/seed-presets.json \
 *      app/elite-tempo/data/seed-presets.json
 * then `npm run build`. The assertions below fail the build if the copy is
 * malformed or if a derived ratio disagrees with the app's own stored ratio,
 * so a bad copy cannot ship silently the way the old hand-typed figures did.
 *
 * DERIVE FROM THE RAW MARKS, never from the stored `ratio`. The stored value is
 * rounded to 2dp for convenience, and rounding the timestamps first drifts:
 * 0.824 / 0.223 rounds to 3.70 where the real marks give 3.69. `TempoMath.tempo()`
 * in the app does the same arithmetic on the same raw marks, which is what keeps
 * the site and the app agreeing to the digit.
 */

import seed from "./seed-presets.json";

/* The shape of one row in the app's seed file. `hole`, `round` and `result` are
   present only on the shots where they mean something, which is why they are
   optional here rather than defaulted to an empty string. */
type SeedPreset = {
  player: string;
  year: number;
  club: string;
  clubLabel: string;
  event: string;
  hole?: string;
  round?: string;
  result?: string;
  tagline: string;
  story: string;
  youtubeID: string;
  startS: number;
  topS: number;
  impactS: number;
  /* The app's own rounded ratio. Used ONLY to cross-check our arithmetic below;
     never rendered. */
  ratio: number;
};

export type Swing = {
  slug: string;
  player: string;
  year: number;
  event: string;
  hole?: string;
  round?: string;
  result?: string;
  club: string;
  clubLabel: string;
  category: Category;
  tagline: string;
  story: string;
  youtubeID: string;
  /* Raw marks, verbatim from the app, in seconds from the start of the clip. */
  startS: number;
  topS: number;
  impactS: number;
  /* Derived. */
  back: number;
  down: number;
  total: number;
  ratio: number;
};

/* The same four groups the app's Tempos screen uses as tabs, so someone who
   finds a shot here and then opens the app looks in the same place for it. */
export const CATEGORIES = [
  "Off the tee",
  "Approach",
  "Short game",
  "Putting",
] as const;
export type Category = (typeof CATEGORIES)[number];

const CATEGORY_BY_CLUB: Record<string, Category> = {
  driver: "Off the tee",
  wood: "Off the tee",
  iron: "Approach",
  pitch: "Short game",
  putt: "Putting",
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* Player, year, event and club identify a shot everywhere except Tiger's 2000
   PGA Championship, where the 16th-hole playoff birdie and the 18th-hole putt to
   tie are both "Tiger Woods 2000 PGA Championship putter". Only those two get a
   hole appended.

   Most rows carry a `hole`, and putting it in every slug would be the easy way to
   guarantee uniqueness — but it would also make every URL longer and less like
   what someone actually types ("rory mcilroy 2014 pga driver tempo"). These URLs
   exist to be linked to and quoted, so they stay as short as they can be while
   still being unique. PUBLISHED_SLUGS below is what stops that trade-off from
   quietly breaking a live URL later. */
function baseSlugFor(p: SeedPreset): string {
  return slugify([p.player, String(p.year), p.event, p.clubLabel].join(" "));
}

function slugFor(p: SeedPreset, allPresets: SeedPreset[]): string {
  const base = baseSlugFor(p);
  const shared = allPresets.filter((o) => baseSlugFor(o) === base);
  if (shared.length === 1) return base;
  /* Disambiguate with whatever the app actually recorded, in the order a golfer
     would use to tell the two shots apart. */
  const qualifier = p.hole ?? p.round ?? p.result;
  return qualifier ? slugify(`${base} ${qualifier}`) : base;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

const presets = seed.presets as SeedPreset[];

export const SWINGS: Swing[] = presets.map((p) => {
  const back = p.topS - p.startS;
  const down = p.impactS - p.topS;
  return {
    slug: slugFor(p, presets),
    player: p.player,
    year: p.year,
    event: p.event,
    hole: p.hole,
    round: p.round,
    result: p.result,
    club: p.club,
    clubLabel: p.clubLabel,
    category: CATEGORY_BY_CLUB[p.club] ?? "Approach",
    tagline: p.tagline,
    story: p.story,
    youtubeID: p.youtubeID,
    startS: p.startS,
    topS: p.topS,
    impactS: p.impactS,
    back,
    down,
    total: p.impactS - p.startS,
    ratio: back / down,
  };
});

/* ── Drift guards ─────────────────────────────────────────────────────────
   This repo is a hand-maintained copy of app facts with no test suite, which is
   exactly how it shipped wrong tempos to paid traffic for weeks. These run at
   module load, so `next build` fails rather than publishing a bad sync. */

const slugs = new Set<string>();
for (const s of SWINGS) {
  if (slugs.has(s.slug)) {
    throw new Error(
      `tempo-data: duplicate slug "${s.slug}". Two shots resolve to the same URL, ` +
        `so one would be unreachable. Give the seed rows a distinguishing "hole".`,
    );
  }
  slugs.add(s.slug);

  if (!(s.back > 0) || !(s.down > 0)) {
    throw new Error(
      `tempo-data: "${s.slug}" has a non-positive backswing or downswing ` +
        `(start ${s.startS}, top ${s.topS}, impact ${s.impactS}). The marks are out of order.`,
    );
  }
}

/* The real check: our arithmetic against the app's own stored ratio. If these
   ever disagree, the site is about to publish a number the app does not agree
   with — which is the precise failure this whole module exists to prevent. */
for (let i = 0; i < SWINGS.length; i++) {
  const derived = round2(SWINGS[i].ratio);
  const stored = presets[i].ratio;
  /* Exact, not a tolerance. Both sides are ratios rounded to two decimals, so any
     difference at all is a real disagreement. An earlier version allowed 0.011 of
     slack, which let a derived 3.69 pass against a stored 3.68 — precisely the
     one-in-the-last-place drift this guard exists to catch. All 16 shots currently
     agree to the digit, so exactness costs nothing. */
  if (derived !== stored) {
    throw new Error(
      `tempo-data: "${SWINGS[i].slug}" derives ${derived.toFixed(2)}:1 from its marks ` +
        `but the app stores ${stored.toFixed(2)}:1. The seed copy is stale or corrupt — ` +
        `re-copy seed-presets.json from the Elite-Tempo repo.`,
    );
  }
}

/* Abbreviations for places a full event or club name will not fit: phone-width
   cards, rows inside the device mock, and <title> tags, which Google cuts at
   roughly 60 characters. Everywhere with room — the library table, the detail
   page body, the structured data — spells both out in full, because the full name
   is what somebody actually searches for.

   These lived as private copies in page.tsx, TempoListMock and the OG route, and
   were about to gain a fourth in the detail pages. */
export function shortEvent(event: string): string {
  return event
    .replace(/^The /, "")
    .replace(/ Championship$/, "")
    .replace(/ Classic$/, "")
    .replace(/ Tournament$/, "");
}

export function shortClub(clubLabel: string): string {
  return clubLabel
    .replace(/^Fairway wood$/, "Wood")
    .replace(/^(Short|Long) iron$/, "Iron")
    .replace(/^(Sand|Lob) wedge$/, "Wedge");
}

export function swingBySlug(slug: string): Swing | undefined {
  return SWINGS.find((s) => s.slug === slug);
}

export function swingsByCategory(category: Category): Swing[] {
  return SWINGS.filter((s) => s.category === category);
}

/* ── Players ──────────────────────────────────────────────────────────────
   Google shows "What is Tiger Woods swing tempo?" and "What is Rory McIlroy's
   swing tempo?" in its People Also Ask box on a search for this app, so the
   demand is measured rather than assumed. Those questions are about a PLAYER
   though, and the library is organised by SHOT — seven separate Tiger pages and
   nothing that answers the question as asked.

   Only players with more than one timed shot get a page. A hub for someone with a
   single shot would be a near-copy of that shot's own page, which is thin content
   in the precise sense Google penalises, and would compete with the better page
   for the same query. */

export type Player = {
  name: string;
  slug: string;
  swings: Swing[];
  /* The shot people mean when they say "his tempo" — the driver where there is
     one, otherwise the longest club timed. */
  headline: Swing;
  fastest: Swing;
  slowest: Swing;
  /* How far the player's own tempo travels across clubs. The interesting number
     on these pages: Tiger spans 1.63, Rory 0.06. */
  spread: number;
};

export function playerSlug(name: string): string {
  return slugify(name);
}

const CLUB_ORDER = ["driver", "wood", "iron", "pitch", "putt"];

export const PLAYERS: Player[] = (() => {
  const byName = new Map<string, Swing[]>();
  for (const s of SWINGS) {
    if (!byName.has(s.player)) byName.set(s.player, []);
    byName.get(s.player)!.push(s);
  }
  return [...byName.entries()]
    .filter(([, list]) => list.length > 1)
    .map(([name, list]) => {
      const sorted = [...list].sort((a, b) => a.ratio - b.ratio);
      const headline =
        [...list].sort(
          (a, b) => CLUB_ORDER.indexOf(a.club) - CLUB_ORDER.indexOf(b.club),
        )[0];
      const fastest = sorted[0];
      const slowest = sorted[sorted.length - 1];
      return {
        name,
        slug: playerSlug(name),
        swings: list,
        headline,
        fastest,
        slowest,
        spread: slowest.ratio - fastest.ratio,
      };
    })
    .sort((a, b) => b.swings.length - a.swings.length);
})();

export function playerBySlug(slug: string): Player | undefined {
  return PLAYERS.find((p) => p.slug === slug);
}

/* Every player who has a hub page, so a shot page can link up to it. */
export function playerFor(swing: Swing): Player | undefined {
  return PLAYERS.find((p) => p.name === swing.player);
}

/* Formatting helpers, so a ratio is written the same way in the page copy, the
   tables and the structured data. */
export const fmtRatio = (s: Swing) => `${s.ratio.toFixed(2)}:1`;
export const fmtSeconds = (n: number) => `${n.toFixed(2)}s`;

function requireSwing(slug: string, why: string): Swing {
  const s = swingBySlug(slug);
  if (!s) {
    throw new Error(
      `tempo-data: no shot has the slug "${slug}" (${why}). A re-sync of ` +
        `seed-presets.json probably renamed or removed it. Fix the slug here, and if ` +
        `the old URL was live, add a redirect in next.config.ts before shipping.`,
    );
  }
  return s;
}

/* Every slug this site has published. These are URLs other people can link to
   and that answer engines quote, so they are not ours to change casually: if a
   future re-sync of the seed file would rename one, the build stops here and a
   human decides whether to keep the old slug or add a redirect. Add to this list
   when new shots ship; never edit an entry to make a red build go green. */
export const PUBLISHED_SLUGS = [
  "tiger-woods-2000-the-open-championship-driver",
  "tiger-woods-2000-johnny-walker-classic-wedge",
  "tiger-woods-2000-the-memorial-short-iron",
  "tiger-woods-2000-pga-championship-putter-16th",
  "tiger-woods-2000-pga-championship-putter-18th",
  "tiger-woods-1999-the-memorial-wedge",
  "tiger-woods-2007-pga-championship-iron",
  "rory-mcilroy-2014-pga-championship-driver",
  "rory-mcilroy-2010-wells-fargo-long-iron",
  "fred-couples-1992-the-masters-fairway-wood",
  "adam-scott-2002-qatar-masters-fairway-wood",
  "scottie-scheffler-2024-the-players-championship-wedge",
  "cameron-smith-2022-the-open-championship-putter",
  "cameron-young-2025-ryder-cup-driver",
  "jordan-spieth-2017-travelers-championship-sand-wedge",
  "phil-mickelson-2013-scottish-open-lob-wedge",
] as const;

for (const slug of PUBLISHED_SLUGS) {
  requireSwing(slug, "listed in PUBLISHED_SLUGS");
}

/* The marquee shot: Tiger's 2000 Open Championship driver, the app's own hero
   preset and the one the landing page's stat band is built from. */
export const HERO_SWING = requireSwing(
  "tiger-woods-2000-the-open-championship-driver",
  "the landing page stat band",
);

/* The four shots the landing page shows as cards — one per player, the most
   recognisable shot each. Kept here rather than in the page so the page and the
   library can never disagree about what Tiger's driver ratio is. */
export const FEATURED: Swing[] = [
  "tiger-woods-2000-the-open-championship-driver",
  "rory-mcilroy-2014-pga-championship-driver",
  "fred-couples-1992-the-masters-fairway-wood",
  "adam-scott-2002-qatar-masters-fairway-wood",
].map((slug) => requireSwing(slug, "a landing page card"));
