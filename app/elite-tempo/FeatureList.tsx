"use client";

import { useState, type ReactNode } from "react";
import { INK, MUTED } from "./theme";

/* "Built for range days": three short tabs over one phone, copied from Affinity's
 * studio switcher (Mobbin, 2026-11-04). It replaced a plus and minus list that Eric
 * found busy and crammed. One heading, one row of tabs, one line that changes, one
 * phone. The new screen fades and lifts in over 280 ms so it is clear what changed;
 * Reduce Motion swaps it at once. Nothing moves on its own. The phones are rendered
 * on the server and passed in, so this file only owns which one shows. */

export type Feature = { label: string; body: string; phone: ReactNode };

export default function FeatureList({ heading, items }: { heading: ReactNode; items: Feature[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col items-center text-center">
      {heading}
      <div
        role="tablist"
        aria-label="Range day features"
        className="mt-8 inline-flex max-w-full gap-1 rounded-full p-1"
        style={{ background: "#F0F0EC" }}
      >
        {items.map((it, i) => (
          <button
            key={it.label}
            type="button"
            role="tab"
            id={`range-tab-${i}`}
            aria-selected={i === active}
            aria-controls="range-panel"
            onClick={() => setActive(i)}
            className="min-h-11 cursor-pointer whitespace-nowrap rounded-full border-0 px-[clamp(12px,3vw,22px)] text-[16px] font-semibold transition-colors"
            style={{ background: i === active ? INK : "transparent", color: i === active ? "#fff" : INK }}
          >
            {it.label}
          </button>
        ))}
      </div>
      <div id="range-panel" role="tabpanel" aria-labelledby={`range-tab-${active}`} className="w-full">
        <p className="mx-auto mt-5 min-h-[2.8em] max-w-[30em] text-[19px] leading-[1.4]" style={{ color: MUTED }}>
          {items[active].body}
        </p>
        <div className="relative mx-auto mt-6 h-[clamp(420px,52vw,540px)] w-[270px] overflow-hidden">
          {items.map((it, i) => (
            <div
              key={it.label}
              aria-hidden={i !== active}
              className="absolute inset-x-0 top-0 transition-[opacity,transform] duration-[280ms] ease-out motion-reduce:transition-none"
              style={{ opacity: i === active ? 1 : 0, transform: i === active ? "none" : "translateY(10px)" }}
            >
              {it.phone}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
