"use client";

import { useState, type ReactNode } from "react";
import { INK, MUTED } from "./theme";

/* "Built for range days", in the page's one section pattern (Pinterest, 11-04): a
 * picture card on top, then a short heading, one sentence and a small download
 * button. Inside the card: three short tabs over one phone, copied from Affinity's
 * studio switcher. The sentence under the heading is the active tab's line, so the
 * section never carries more than one sentence. The new screen fades and lifts in
 * over 280 ms; Reduce Motion swaps it at once. Nothing moves on its own. */

export type Feature = { label: string; body: string; phone: ReactNode };

export default function FeatureList({
  title,
  items,
  cardClass,
  after,
}: {
  title: ReactNode;
  items: Feature[];
  cardClass: string;
  after: ReactNode;
}) {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className={cardClass}>
        <div className="flex flex-col items-center pt-[clamp(28px,5vw,48px)]">
          <div
            role="tablist"
            aria-label="Range day features"
            className="inline-flex max-w-full gap-1 rounded-full bg-white p-1"
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
                className="min-h-11 cursor-pointer whitespace-nowrap rounded-full border-0 px-[clamp(14px,3vw,22px)] text-[16px] font-semibold transition-colors"
                style={{ background: i === active ? INK : "transparent", color: i === active ? "#fff" : INK }}
              >
                {it.label}
              </button>
            ))}
          </div>
          <div className="relative mt-7 h-[clamp(380px,46vw,500px)] w-[270px] overflow-hidden">
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
      <div id="range-panel" role="tabpanel" aria-labelledby={`range-tab-${active}`} className="mx-auto mt-8 max-w-[34em] text-center">
        {title}
        <p className="m-0 mt-3 min-h-[2.8em] text-[19px] leading-[1.4]" style={{ color: MUTED }}>
          {items[active].body}
        </p>
        {after}
      </div>
    </>
  );
}
