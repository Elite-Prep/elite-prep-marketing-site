"use client";

import { useEffect, useRef } from "react";
import useNear from "./useNear";
import useReducedMotion from "./useReducedMotion";

/* A screen recording of the real app inside the same phone frame as the page's
 * screenshots (Eric, 11-05: show the routine the way Apple shows a timer, as a short
 * silent loop of the product itself). The file waits until the phone is near the
 * screen, plays only while on screen, and Reduce Motion keeps the cover still. */
export default function PhoneVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const near = useNear(video);
  const still = useReducedMotion();

  useEffect(() => {
    const v = video.current;
    if (!v || !near || still) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [near, still]);

  return (
    <div className="iphone">
      <div className="iphone-screen">
        <video
          ref={video}
          src={near && !still ? src : undefined}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
          width={600}
          height={1304}
        />
      </div>
    </div>
  );
}
