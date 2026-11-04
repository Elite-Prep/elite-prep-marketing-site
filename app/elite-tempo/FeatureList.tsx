"use client";

import { useState, type ReactNode } from "react";
import { INK, MUTED } from "./theme";

/* The smaller features as one short list beside one phone, the way Bevel's
 * "And that's not all" section works. They used to be two giant tall cards (peach
 * and light blue) plus a dark green section: three new colors for three small
 * features. Tapping a row swaps the screen. Nothing moves on its own. The phones
 * are rendered on the server and passed in, so this file only owns which is shown. */

export type Feature = { title: string; body: string; phone: ReactNode };

export default function FeatureList({
  heading,
  items,
}: {
  heading: ReactNode;
  items: Feature[];
}) {
  const [active, setActive] = useState(0);
  /* The heading leads on every width: above the phone on a phone, above the list
     beside it on wider screens. Only one copy is ever displayed. */
  return (
    <>
      <div className="mb-8 md:hidden">{heading}</div>
      <div className="flex flex-wrap items-center gap-x-[clamp(32px,6vw,80px)] gap-y-10">
        <div className="min-w-0 flex-[1_1_380px] md:pb-[clamp(32px,5vw,64px)]">
          <div className="hidden md:block">{heading}</div>
          <ul className="m-0 grid list-none gap-2 p-0 md:mt-8">
            {items.map((it, i) => (
              <li key={it.title}>
                <button
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                  className="w-full cursor-pointer rounded-2xl border-0 bg-transparent px-5 py-4 text-left transition-colors hover:bg-black/[0.03] aria-pressed:bg-[#F6F6F3]"
                  style={{ color: INK }}
                >
                  <span className="block text-[21px] font-semibold leading-[1.25]">
                    {it.title}
                  </span>
                  <span
                    className="mt-1 block text-[16px] leading-[1.4]"
                    style={{ color: MUTED }}
                  >
                    {it.body}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* On a phone the screen sits above the list, so a tap shows its change on
          the same screen instead of somewhere below. */}
        <div className="relative order-first mx-auto h-[440px] w-[270px] flex-[0_1_270px] self-end overflow-hidden md:order-none md:h-[560px]">
          {items.map((it, i) => (
            <div key={it.title} hidden={i !== active} className="w-[270px]">
              {it.phone}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
