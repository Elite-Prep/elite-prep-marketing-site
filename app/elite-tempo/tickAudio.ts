/* The soft ticks at takeaway, top and impact, shared by the tour list and the dark
 * timing player. Fixed 2026-11-04 after Eric heard nothing on his iPhone and saw the
 * bar run ahead of the sound:
 *
 * 1. iPhone Safari mutes Web Audio while the ring/silent switch is on, unless the
 *    page asks for the "playback" audio session (Safari 16.4 and later).
 * 2. A context made inside a tap starts "suspended"; its clock stands still until
 *    resume() finishes. Sounds must be scheduled after that, not before.
 * 3. The speaker plays a sound outputLatency seconds after it is scheduled, so any
 *    picture that should match it waits that long too.
 *
 * getAudio() must be called synchronously inside the tap handler. */

type WithSession = Navigator & { audioSession?: { type: string } };

let shared: AudioContext | null = null;

export function getAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const nav = navigator as WithSession;
  if (nav.audioSession) {
    try {
      nav.audioSession.type = "playback";
    } catch {
      /* Older Safari: the switch may still mute it; nothing else to do. */
    }
  }
  if (!shared) {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    shared = new Ctx();
  }
  /* Start one silent sample inside the tap: older iPhones only unlock audio when a
     sound starts during the gesture itself. */
  const silent = shared.createBuffer(1, 1, 22050);
  const src = shared.createBufferSource();
  src.buffer = silent;
  src.connect(shared.destination);
  src.start(0);
  return shared;
}

/** Resolves once the context's clock is running. */
export async function ready(ctx: AudioContext): Promise<void> {
  if (ctx.state !== "running") {
    try {
      await ctx.resume();
    } catch {
      /* A refused resume leaves it silent; the picture still plays. */
    }
  }
}

/** Seconds between scheduling a sound and hearing it. */
export function latency(ctx: AudioContext): number {
  const out = (ctx as AudioContext & { outputLatency?: number }).outputLatency;
  return out && out > 0 ? out : ctx.baseLatency || 0;
}

/** `out` lets a player route its ticks through one node it can cut off on Stop. */
export function tick(ctx: AudioContext, at: number, hard: boolean, out: AudioNode = ctx.destination) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.frequency.value = hard ? 1320 : 880;
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(0.3, at + 0.004);
  g.gain.exponentialRampToValueAtTime(0.001, at + 0.09);
  o.connect(g);
  g.connect(out);
  o.start(at);
  o.stop(at + 0.1);
}
