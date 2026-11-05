"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { APP_STORE_URL, INK } from "./theme";

/* The home page's top bar, Pinterest style (Eric, 11-04): one solid bar flush to
 * the top of the screen from the first frame, never scrolling away, with the app
 * icon, the name, Pricing and the download button. It replaced a floating pill
 * that left a gap above it, where the page showed through while scrolling. A
 * hairline and soft shadow appear once the page scrolls under it. */
export default function FloatingHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-shadow duration-200"
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        background: "#FFFCF0",
        boxShadow: scrolled ? "0 1px 0 rgba(20,21,24,0.08), 0 6px 20px -12px rgba(20,21,24,0.25)" : "none",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-3 pl-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))]">
        <Link href="/" className="flex min-h-11 min-w-0 items-center gap-2.5 no-underline" aria-label="Elite Tempo home" style={{ color: INK }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/elite-tempo/app-icon.png" alt="" width={34} height={34} className="block h-[34px] w-[34px] shrink-0 rounded-[9px] shadow-[0_0_0_0.5px_rgba(20,21,24,0.12)]" />
          <span className="truncate text-[17px] font-semibold tracking-[-0.01em]">Elite Tempo</span>
        </Link>
        <nav aria-label="Main" className="flex shrink-0 items-center gap-1 md:gap-2">
          <Link href="/tempos" className="hidden min-h-11 items-center rounded-full px-3 text-[15px] font-medium no-underline hover:bg-black/5 md:inline-flex" style={{ color: INK }}>
            Tempo library
          </Link>
          <Link href="/#pricing" className="inline-flex min-h-11 items-center rounded-full px-2.5 text-[15px] font-medium no-underline hover:bg-black/5 md:px-3" style={{ color: INK }}>
            Pricing
          </Link>
          <Link href="/faq" className="hidden min-h-11 items-center rounded-full px-3 text-[15px] font-medium no-underline hover:bg-black/5 md:inline-flex" style={{ color: INK }}>
            FAQs
          </Link>
          <a
            href={APP_STORE_URL}
            className="inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-[18px] text-[15px] font-semibold text-white no-underline transition hover:brightness-125"
            style={{ background: INK }}
          >
            Download
          </a>
        </nav>
      </div>
    </header>
  );
}
