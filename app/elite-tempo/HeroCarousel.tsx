"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import useReducedMotion from "./useReducedMotion";

/* The hero's app screens on a 3D ring: the front one sits flat and full size, the
   ones beside it turn away and shrink. A still screen holds for a few seconds; a
   screen with a clip plays it once, from the start, and the ring turns when it
   ends. Only the front clip ever plays. It can be swiped or tapped, and waits while
   a finger or pointer is on it or it is off screen. Reduce Motion stops the timer,
   the clips and the transitions; swiping and the dots still work. */

const STEP_MS = 2500;
/* Per distance from the front: sideways shift (in phone widths), turn, size, fade.
   Every phone is laid out at the front screen's full size and only ever scaled
   down, because scaling an image up past its laid out size blurs it. The two
   beside the front are kept small so it clearly leads; the outer pair tuck in
   behind those two instead of widening the ring. The pair beside the front stay
   fully solid, or the tucked pair ghost through them. */
const RING = [
  { x: 0, turn: 0, scale: 1, opacity: 1 },
  { x: 0.55, turn: 36, scale: 0.64, opacity: 1 },
  { x: 0.67, turn: 50, scale: 0.51, opacity: 0.35 },
];

export default function HeroCarousel({
  slides,
  labels,
}: {
  slides: ReactNode[];
  labels: string[];
}) {
  const count = slides.length;
  const [front, setFront] = useState(0);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(true);
  /* No clip loads until the page has: the front still is what a visitor sees
     first, and a video downloading beside it only slows that down. */
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const done = () => setLoaded(true);
    if (document.readyState === "complete") {
      const t = window.setTimeout(done, 0);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", done, { once: true });
    return () => window.removeEventListener("load", done);
  }, []);
  const still = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const press = useRef<{ x: number; id: number } | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const seen = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  /* Read when a still's time is up or a clip ends, rather than restarting either
     every time a pointer comes and goes. */
  const heldNow = useRef(false);
  useEffect(() => {
    heldNow.current = held;
  }, [held]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const clips = [...el.querySelectorAll("[data-slide]")].map((s) =>
      s.querySelector("video"),
    );
    /* A clip that has played shows its still again at the side and rewinds under
       it. No load(): that empties the video to black, and on iPhone Safari the
       still can take a frame to come back, so the black showed through. */
    clips.forEach((v, i) => {
      if (v && v.src && i !== front && (v.currentTime > 0 || !v.paused)) {
        delete v.parentElement?.dataset.live;
        v.pause();
        v.currentTime = 0;
      }
    });
    const clip = clips[front];
    if (clip && !clip.src && loaded && !still) {
      clip.src = clip.dataset.src ?? "";
      clip.preload = "auto";
    }
    if (still || !visible || (clip && !loaded)) {
      clip?.pause();
      return;
    }
    /* Turns the ring unless someone is holding it; false means try again later. */
    const turn = () => {
      if (document.hidden || heldNow.current) return false;
      setFront((f) => (f + 1) % count);
      return true;
    };
    let timer: number | undefined;
    const hold = (ms: number) => {
      timer = window.setTimeout(function tick() {
        if (!turn()) timer = window.setTimeout(tick, 600);
      }, ms);
    };
    if (!clip) {
      hold(STEP_MS);
      return () => clearTimeout(timer);
    }
    const ended = () => {
      if (turn()) return;
      clip.currentTime = 0;
      clip.play().catch(() => {});
    };
    /* Only once a frame is really on screen does the still on top fade away.
       timeupdate is too early: iPhone Safari moves currentTime before it draws
       anything, so the still faded onto a black video for about a tenth of a
       second. A video frame callback fires when a frame goes to the screen; one
       more animation frame after it makes sure it is painted. */
    let frameReq: number | undefined;
    let paintReq: number | undefined;
    const show = () => {
      if (clip.parentElement) clip.parentElement.dataset.live = "";
    };
    const live = () => {
      if (clip.currentTime > 0) show();
    };
    if (typeof clip.requestVideoFrameCallback === "function") {
      frameReq = clip.requestVideoFrameCallback(() => {
        paintReq = requestAnimationFrame(show);
      });
    } else {
      clip.addEventListener("timeupdate", live);
    }
    clip.addEventListener("ended", ended);
    clip.currentTime = 0;
    /* A browser can refuse to play, as iOS does in Low Power Mode; the poster then
       stands in as a still. */
    clip.play().catch(() => hold(STEP_MS));
    return () => {
      clip.removeEventListener("ended", ended);
      clip.removeEventListener("timeupdate", live);
      if (frameReq !== undefined) clip.cancelVideoFrameCallback(frameReq);
      if (paintReq !== undefined) cancelAnimationFrame(paintReq);
      clearTimeout(timer);
      clip.pause();
    };
  }, [front, still, visible, count, loaded]);

  const go = (by: number) => setFront((f) => (f + by + count) % count);

  return (
    <div
      ref={box}
      className="relative mt-12 h-[clamp(440px,62vw,680px)] touch-pan-y select-none [perspective:1400px]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Elite Tempo app screens"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHeld(false)}
      /* A screenshot is an image, and dragging it would start the browser's own image
         drag and cancel the swipe. */
      onDragStart={(e) => e.preventDefault()}
      onPointerDown={(e) => {
        /* No pointer capture: it retargets the click to this box, so the dots and
           side phones stop working. The image drag above was the only real blocker. */
        press.current = { x: e.clientX, id: e.pointerId };
        if (e.pointerType !== "mouse") setHeld(true);
      }}
      onPointerUp={(e) => {
        const start = press.current;
        press.current = null;
        if (e.pointerType !== "mouse") setHeld(false);
        if (!start || start.id !== e.pointerId) return;
        const dx = e.clientX - start.x;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
      onPointerCancel={() => {
        press.current = null;
        setHeld(false);
      }}
    >
      <div className="absolute inset-0">
        {slides.map((slide, i) => {
          /* Shortest way round the ring, so -2..2 for five screens. */
          let offset = (i - front + count) % count;
          if (offset > count / 2) offset -= count;
          const step = RING[Math.min(Math.abs(offset), RING.length - 1)];
          const side = Math.sign(offset);
          return (
            <div
              key={i}
              data-slide
              aria-hidden={offset !== 0}
              onClick={() => offset !== 0 && setFront(i)}
              className={`absolute left-1/2 top-0 w-[clamp(220px,30.8vw,385px)] ${offset === 0 ? "" : "cursor-pointer"}`}
              style={{
                zIndex: 10 - Math.abs(offset),
                opacity: step.opacity,
                transform: `translateX(calc(-50% + ${side * step.x * 100}%)) rotateY(${-side * step.turn}deg) scale(${step.scale})`,
                transformOrigin: "50% 30%",
                transition: still
                  ? "none"
                  : "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease",
              }}
            >
              {slide}
            </div>
          );
        })}
      </div>
      {/* The dots sit over the front screen, so they get the header's frosted pill. */}
      <div
        className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-0 rounded-full px-1 backdrop-blur"
        style={{ background: "rgba(255,255,255,0.72)" }}
      >
        {labels.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-label={`Show ${label}`}
            aria-current={i === front}
            onClick={() => setFront(i)}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span
              className="block h-2 rounded-full transition-all duration-300"
              style={{
                width: i === front ? 20 : 8,
                background: i === front ? "#121417" : "rgba(18,20,23,0.28)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
