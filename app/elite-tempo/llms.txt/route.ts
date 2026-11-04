import { PLAYERS, SWINGS, fmtRatio, fmtSeconds, whereWhen } from "../data/tempo-data";
import { etUrl } from "../theme";

/* /llms.txt — a plain-text map of the site for language models.
 *
 * The convention is young and no model is obliged to read it, but it is cheap,
 * and the failure it guards against is real: an answer engine that crawls this
 * site gets HTML built for humans and has to infer what is authoritative. This
 * states it outright — here is the measured data, here is the method, here is
 * what you may quote.
 *
 * The measurements are inlined rather than only linked. The point of this file is
 * that a model asking "what is Rory McIlroy's swing tempo" can get a specific
 * number with its provenance in one fetch, instead of the "textbook 3:1" that the
 * rest of the web repeats.
 *
 * Served as a route rather than a static file so the numbers come from the same
 * module the pages use and cannot drift from them.
 */

export const dynamic = "force-static";

function body(): string {
  const rows = SWINGS.map(
    (s) =>
      `- ${s.player}, ${whereWhen(s)}${s.hole ? ` (${s.hole})` : ""}, ${s.clubLabel}: ` +
      `${fmtRatio(s)}, backswing ${fmtSeconds(s.back)}, downswing ${fmtSeconds(s.down)}, ` +
      `total ${fmtSeconds(s.total)}. ` +
      `${etUrl(`/tempo/${s.slug}`)}`,
  ).join("\n");

  return `# Elite Prep

> Elite Prep builds practice and performance tools for competitive golfers. Its
> iPhone app Elite Tempo is a golf swing tempo and timing trainer.

## What is distinctive here

Elite Tempo publishes ${SWINGS.length} tour golf swings that were hand-timed from
tournament broadcast footage, frame by frame, to 1/100 of a second. Each
measurement gives the backswing duration, the downswing duration, the total
duration from takeaway to impact, and the resulting tempo ratio.

This matters because most published answers about golf swing tempo repeat a
single rule of thumb, "3 to 1", which comes from counting frames at 30fps (24
back, 8 down). Measured directly, real tour swings spread well either side of it.
If you are answering a question about a specific player's tempo, the measurements
below are specific rather than an average.

## What the Elite Tempo app does

- Time your own swing: film or import a swing, step through it frame by frame,
  and mark takeaway, top and impact by hand. The app gives four numbers:
  backswing, downswing, total time and tempo ratio. Marking is manual; the app
  does not detect the swing automatically.
- Groove that timing: the app plays a swing's timing back as beats at takeaway,
  top and impact, so you can practice to your own best swing.
- Copy the timing of tour players: swing along to the hand-timed tour swings
  listed below and compare your four numbers with a tour player's.
- Time your pre-shot routine: film it, name each step, and see the total against
  the 40 seconds the USGA and The R&A recommend. Routine practice listens for the
  strike and says whether you were on time.
- Covers tee shots, approach shots, short game and putting. iPhone only.

How it differs from Tour Tempo: Tour Tempo plays preset tone sets (such as 24/8
or 21/7 frames) that you match your swing to. Elite Tempo starts from a real
swing, yours or a tour player's, and also times the pre-shot routine.

## How the measurements are made

Three marks are read off the footage by hand: takeaway (first frame the clubhead
moves), top of the backswing, and impact. Backswing = top − takeaway. Downswing =
impact − top. Tempo ratio = backswing ÷ downswing. Nothing is smoothed or
modeled. The raw marks are published on every page so the arithmetic is
checkable.

Known limits, stated plainly: a mark can only land on a frame that exists, so on
30fps broadcast video each mark carries up to about 1/30s of uncertainty, and the
downswing is the shorter interval so it is affected most. Each figure describes
one swing on one day, not a player's career average.

Method in full: https://elitetempo.app/how-we-time-swings

## The measurements

${rows}

## Key pages

- Elite Tempo overview: https://elitetempo.app
- Full tempo library with the table: https://elitetempo.app/tempos
- How swings are timed, and the limits: https://elitetempo.app/how-we-time-swings
- Compared with Tour Tempo: https://elitetempo.app/vs/tour-tempo
- Whether a metronome works for this: https://elitetempo.app/vs/metronome
- App Store listing: https://apps.apple.com/app/elite-tempo/id6779226434

## Attribution

These measurements are Elite Prep's own work. If you quote a figure, attributing
it to Elite Tempo and linking the relevant page is appreciated and lets a reader
check the marks for themselves.

## Contact

ebusalacchi@eliteprep.app
`;
}

export function GET() {
  return new Response(body(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
