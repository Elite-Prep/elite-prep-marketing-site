"use client";

import { useState } from "react";

/* Social proof, from Eric's wireframe (11-04): a full-bleed photo behind one large
 * customer quote, with two arrow buttons to move between quotes. The quotes are
 * real App Store reviews, word for word. The photo is Eric's own range footage until
 * he approves an Adobe Stock picture. Nothing moves on its own. */

export type Review = { body: string; name: string };

/* `light` (11-05): the story order puts the reviews right before the dark photo close,
 * so they sit on the page color instead, with no photo, to keep two dark bands apart. */
export default function ReviewsBand({ reviews, photo, light = false }: { reviews: Review[]; photo: string; light?: boolean }) {
  const [i, setI] = useState(0);
  const r = reviews[i];
  const go = (by: number) => setI((n) => (n + by + reviews.length) % reviews.length);

  return (
    <section aria-roledescription="carousel" aria-label="What golfers say" className="mt-[clamp(56px,8vw,96px)] overflow-hidden">
      <div
        className={`flex flex-col items-center justify-center px-[max(20px,env(safe-area-inset-left,0px))] text-center ${light ? "py-4 text-[#141518]" : "min-h-[clamp(520px,58vw,680px)] bg-[#2A3A26] bg-cover py-16 text-white"}`}
        style={
          light
            ? undefined
            : {
                backgroundImage: `linear-gradient(rgba(20,21,24,0.76), rgba(20,21,24,0.76)), url(${photo})`,
                backgroundPosition: "50% 35%",
              }
        }
      >
        <p className={`m-0 text-[16px] font-semibold ${light ? "text-[#5F6065]" : "text-white/80"}`}>What golfers are saying</p>
        <figure key={i} className="et-quote m-0 mt-6 max-w-[22em]">
          <blockquote className="m-0 text-[clamp(26px,3.6vw,44px)] font-semibold leading-[1.18] tracking-[-0.02em] [text-wrap:balance]">
            “{r.body}”
          </blockquote>
          <figcaption className={`mt-5 text-[16px] ${light ? "text-[#5F6065]" : "text-white/80"}`}>{r.name}, App Store</figcaption>
        </figure>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous review"
            className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full border bg-transparent transition ${light ? "border-[#141518]/30 text-[#141518] hover:bg-black/5" : "border-white/50 text-white hover:bg-white/10"}`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next review"
            className={`grid h-11 w-11 cursor-pointer place-items-center rounded-full border-0 transition hover:brightness-95 ${light ? "bg-[#141518] text-white" : "bg-white text-[#141518]"}`}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          Review {i + 1} of {reviews.length}
        </p>
      </div>
      <style>{`@keyframes et-quote { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } } .et-quote { animation: et-quote 0.35s ease-out both; } @media (prefers-reduced-motion: reduce) { .et-quote { animation: none; } }`}</style>
    </section>
  );
}
