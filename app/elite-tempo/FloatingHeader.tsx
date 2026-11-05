"use client";

import { useEffect, useState, type ReactNode } from "react";

/* The menu bar stays reachable after the hero scrolls away, the way Pinterest keeps
 * "Sign up" on screen (mobile review, 11-04). The hero's own header scrolls with the
 * page; once it leaves the screen, this copy slides down from the top and stays. It
 * hides again when the hero header comes back. Reduce Motion skips the slide. */
export default function FloatingHeader({ children }: { children: ReactNode }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const original = document.querySelector("#top header");
    if (!original) return;
    const seen = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), { threshold: 0 });
    seen.observe(original);
    return () => seen.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!shown}
      inert={!shown}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out motion-reduce:transition-none"
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        transform: shown ? "none" : "translateY(-120%)",
      }}
    >
      <div className="pointer-events-auto [&_header>div]:shadow-[0_6px_24px_-8px_rgba(20,21,24,0.25)] [&_header>div]:backdrop-blur-md">
        {children}
      </div>
    </div>
  );
}
