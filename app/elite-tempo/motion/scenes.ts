/* The landing page's three Lottie animations, built here in code rather than exported
   from an editor so their timing comes straight from the same numbers the page prints:
   change a swing in the seed file and the speed bars change with it. Each scene is
   plain Lottie JSON plus `rest`, the frame to show when someone has Reduce Motion on. */

type Ease = [number, number, number, number];
const LINEAR: Ease = [0, 0, 1, 1];
const OUT: Ease = [0.16, 1, 0.3, 1];
const POP: Ease = [0.34, 1.56, 0.64, 1];

const FPS = 60;
const f = (seconds: number) => Math.round(seconds * FPS);

type Rgb = [number, number, number];
const hex = (h: string): Rgb => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as Rgb;

type Key = { t: number; v: number | number[]; e?: Ease };

function anim(keys: Key[]) {
  return {
    a: 1,
    k: keys.map((key, n) => {
      const s = Array.isArray(key.v) ? key.v : [key.v];
      if (n === keys.length - 1) return { t: key.t, s };
      const [x1, y1, x2, y2] = key.e ?? LINEAR;
      return { t: key.t, s, o: { x: s.map(() => x1), y: s.map(() => y1) }, i: { x: s.map(() => x2), y: s.map(() => y2) } };
    }),
  };
}

const still = (v: unknown) => ({ a: 0, k: v });
type Prop = ReturnType<typeof anim> | ReturnType<typeof still>;

function rect(p: Prop, s: Prop, r: number) {
  return { ty: "rc", p, s, r: still(r), d: 1 };
}
function circle(d: number) {
  return { ty: "el", p: still([0, 0]), s: still([d, d]), d: 1 };
}
function fill(c: Rgb, opacity = 100) {
  return { ty: "fl", c: still([...c, 1]), o: still(opacity), r: 1 };
}
function stroke(c: Rgb, w: number, opacity = 100) {
  return { ty: "st", c: still([...c, 1]), o: still(opacity), w: still(w), lc: 2, lj: 2 };
}

/* One shape layer. Position, scale and opacity sit on the layer so a dot can pop from
   its own centre; bars leave the layer at the origin and place themselves. */
function layer(ind: number, shapes: object[], t: { p?: Prop; s?: Prop; o?: Prop } = {}) {
  return {
    ddd: 0, ind, ty: 4, sr: 1, ip: 0, op: 0, st: 0, bm: 0,
    ks: {
      o: t.o ?? still(100),
      r: still(0),
      p: t.p ?? still([0, 0, 0]),
      a: still([0, 0, 0]),
      s: t.s ?? still([100, 100, 100]),
    },
    shapes: [{
      ty: "gr",
      it: [...shapes, { ty: "tr", p: still([0, 0]), a: still([0, 0]), s: still([100, 100]), r: still(0), o: still(100), sk: still(0), sa: still(0) }],
    }],
  };
}

function scene(w: number, h: number, frames: number, layers: ReturnType<typeof layer>[]) {
  /* Lottie draws the first layer on top, so callers list layers back to front and
     this flips them. */
  const ordered = [...layers].reverse().map((l, n) => ({ ...l, ind: n + 1, op: frames }));
  return { v: "5.7.0", fr: FPS, ip: 0, op: frames, w, h, ddd: 0, assets: [], layers: ordered };
}

/* A bar that grows rightward from `x0` to `x0 + width` between two frames. */
function growingBar(x0: number, y: number, width: number, height: number, from: number, to: number, ease: Ease = LINEAR) {
  return rect(
    anim([{ t: from, v: [x0, y], e: ease }, { t: to, v: [x0 + width / 2, y] }]),
    anim([{ t: from, v: [0, height], e: ease }, { t: to, v: [width, height] }]),
    height / 2,
  );
}

function fadeOut(at: number, length: number) {
  return anim([{ t: 0, v: 100 }, { t: at, v: 100 }, { t: at + length, v: 0 }]);
}

export type Scene = { data: ReturnType<typeof scene>; rest: number };

/* Practice speed: the same swing at 75%, 90% and full speed, in real time. Every row
   keeps the same split between backswing and downswing, which is the point. */
export const SPEEDS = [0.75, 0.9, 1] as const;

export function speedScene(back: number, down: number): Scene {
  const W = 400, H = 168, BAR = 16;
  const backW = (W * back) / (back + down);
  const downW = W - backW;
  const lead = 0.4, hold = 1.4, fade = 0.35;
  const slowest = (back + down) / SPEEDS[0];
  const fadeAt = f(lead + slowest + hold);
  const frames = fadeAt + f(fade) + f(0.2);

  const layers = SPEEDS.flatMap((speed, row) => {
    const y = (H * (2 * row + 1)) / 6;
    const start = f(lead), top = f(lead + back / speed), impact = f(lead + (back + down) / speed);
    return [
      layer(0, [rect(still([W / 2, y]), still([W, BAR]), BAR / 2), fill([1, 1, 1], 14)]),
      /* Gold starts half a bar early, under the backswing's round end, so the seam
         has no gap. */
      layer(0, [growingBar(backW - BAR / 2, y, downW + BAR / 2, BAR, top, impact), fill(hex("#F9C832"))], { o: fadeOut(fadeAt, f(fade)) }),
      layer(0, [growingBar(0, y, backW, BAR, start, top), fill([1, 1, 1])], { o: fadeOut(fadeAt, f(fade)) }),
    ];
  });
  return { data: scene(W, H, frames, layers), rest: fadeAt - 1 };
}

/* Routine: each step lights up in turn and the last one, impact, lands in gold. */
export function routineScene(steps: number, ink: string): Scene {
  const W = 336, H = 56, DOT = 20, PAD = 18, y = H / 2;
  const INK = hex(ink), GOLD = hex("#E2A500");
  const gap = (W - 2 * PAD) / (steps - 1);
  const x = (i: number) => PAD + i * gap;
  const lead = 0.4, every = 0.42, hold = 1.5, fade = 0.35;
  const at = (i: number) => f(lead + i * every);
  const fadeAt = at(steps - 1) + f(hold);
  const frames = fadeAt + f(fade) + f(0.2);

  const line = [
    layer(0, [rect(still([(x(0) + x(steps - 1)) / 2, y]), still([x(steps - 1) - x(0), 2]), 1), fill(INK, 18)]),
    layer(0, [growingBar(x(0), y, x(steps - 1) - x(0), 2, at(0), at(steps - 1)), fill(INK)], { o: fadeOut(fadeAt, f(fade)) }),
  ];
  const dots = Array.from({ length: steps }, (_, i) => {
    const last = i === steps - 1;
    const p = still([x(i), y, 0]);
    const pop = anim([
      { t: 0, v: [0, 0, 100] },
      { t: at(i), v: [0, 0, 100], e: POP },
      { t: at(i) + f(0.32), v: [100, 100, 100] },
    ]);
    const ring = layer(0, [circle(DOT - 4), fill([1, 1, 1], 100), stroke(INK, 2, 40)], { p });
    const lit = layer(0, [circle(DOT), fill(last ? GOLD : INK)], { p, s: pop, o: fadeOut(fadeAt, f(fade)) });
    if (!last) return [ring, lit];
    const burst = layer(0, [circle(DOT), stroke(GOLD, 2)], {
      p,
      s: anim([{ t: 0, v: [100, 100, 100] }, { t: at(i), v: [100, 100, 100], e: OUT }, { t: at(i) + f(0.6), v: [260, 260, 100] }]),
      o: anim([{ t: 0, v: 0 }, { t: at(i) - 1, v: 0 }, { t: at(i), v: 90, e: OUT }, { t: at(i) + f(0.6), v: 0 }]),
    });
    return [ring, burst, lit];
  }).flat();
  return { data: scene(W, H, frames, [...line, ...dots]), rest: fadeAt - 1 };
}

/* Pace of play: a routine's average filling the bar up to the 40 second limit, drawn
   on the same scale as the app's Routines screen. */
export const TIMER_SCALE_S = 48;

export function timerScene(seconds: number, limit: number, ink: string): Scene {
  const W = 420, H = 28, BAR = 10, y = H / 2;
  const INK = hex(ink);
  const lead = 0.4, run = 1.6, hold = 2.2, fade = 0.35;
  const fadeAt = f(lead + run + hold);
  const frames = fadeAt + f(fade) + f(0.2);
  const tickX = (W * limit) / TIMER_SCALE_S;
  const layers = [
    layer(0, [rect(still([W / 2, y]), still([W, BAR]), BAR / 2), fill(INK, 10)]),
    layer(0, [growingBar(0, y, (W * seconds) / TIMER_SCALE_S, BAR, f(lead), f(lead + run), OUT), fill(INK)], { o: fadeOut(fadeAt, f(fade)) }),
    layer(0, [rect(still([tickX, y]), still([2, H]), 1), fill(INK)]),
  ];
  return { data: scene(W, H, frames, layers), rest: fadeAt - 1 };
}
