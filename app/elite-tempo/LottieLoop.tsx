"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";
import type { Scene } from "./motion/scenes";

/* Plays one of the scenes in `motion/scenes` while it is on screen and pauses it when
   it scrolls away. The player is the SVG only "light" build of lottie-web, loaded the
   first time an animation comes into view so it never weighs on the first paint. With
   Reduce Motion on, the scene is drawn once at its resting frame and never moves. */
export default function LottieLoop({ scene, label, className = "" }: { scene: Scene; label: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let item: AnimationItem | undefined;
    let loading: Promise<void> | undefined;
    let gone = false;

    const load = () =>
      (loading ??= import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
        if (gone) return;
        item = lottie.loadAnimation({
          container: el,
          renderer: "svg",
          loop: true,
          autoplay: false,
          /* The player writes into the data it is given; keep the prop untouched. */
          animationData: structuredClone(scene.data),
        });
        if (still) item.goToAndStop(scene.rest, true);
      }));

    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) load().then(() => !still && item?.play());
        else item?.pause();
      },
      { threshold: 0.4 },
    );
    seen.observe(el);
    return () => {
      gone = true;
      seen.disconnect();
      item?.destroy();
    };
  }, [scene]);

  return (
    <div
      ref={box}
      role="img"
      aria-label={label}
      className={className}
      style={{ aspectRatio: `${scene.data.w} / ${scene.data.h}` }}
    />
  );
}
