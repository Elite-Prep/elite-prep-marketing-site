"use client";

import { useSyncExternalStore } from "react";

/* Live "Reduce Motion" setting. The server and the first paint assume motion is
   allowed, and the real answer arrives with hydration. */
const QUERY = "(prefers-reduced-motion: reduce)";

export default function useReducedMotion() {
  return useSyncExternalStore(
    (change) => {
      const list = window.matchMedia(QUERY);
      list.addEventListener("change", change);
      return () => list.removeEventListener("change", change);
    },
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
