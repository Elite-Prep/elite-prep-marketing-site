import Link from "next/link";
import Chrome from "./Chrome";
import { INK, MUTED } from "./theme";

/* Elite Tempo's 404. Before this, a mistyped address showed the framework's bare
   "404 | This page could not be found." with no way back, under a browser tab that
   said Elite Prep. */
export default function EliteTempoNotFound() {
  return (
    <Chrome>
      <div className="mx-auto max-w-2xl px-5 pt-16 text-center sm:pt-24">
        <h1 className="text-[clamp(34px,5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em]" style={{ color: INK }}>
          This page does not exist.
        </h1>
        <p className="mx-auto mt-4 text-[19px] leading-[1.5]" style={{ color: MUTED }}>
          The link may be old or mistyped. Every tour swing we have timed is in the tempo library.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/tempos" className="inline-flex min-h-11 items-center rounded-full px-6 text-[16px] font-medium text-white no-underline" style={{ background: INK }}>
            Open the tempo library
          </Link>
          <Link href="/" className="inline-flex min-h-11 items-center rounded-full px-6 text-[16px] font-medium no-underline" style={{ color: INK, background: "#FFFFFF" }}>
            Go to the home page
          </Link>
        </div>
      </div>
    </Chrome>
  );
}
