"use client";

import { useEffect, useState, type RefObject } from "react";

/* True once the element comes within about a screen of the viewport, and stays true.
   The page's videos wait for this before asking for their file and cover picture, so
   on a slow phone they no longer compete with the hero picture for the first seconds
   (speed test, 11-05: the hero picture took 9.3s on slow 4G with them loading). */
export default function useNear(ref: RefObject<Element | null>, margin = "800px") {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: `${margin} 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin, near]);
  return near;
}
