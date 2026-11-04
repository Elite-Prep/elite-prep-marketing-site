import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import EliteTempoNotFound from "./elite-tempo/NotFoundPage";
import { FONT_SANS } from "./elite-tempo/theme";

async function isEliteTempo() {
  const host = ((await headers()).get("host") ?? "").split(":")[0].toLowerCase();
  return host === "elitetempo.app" || host === "www.elitetempo.app";
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: (await isEliteTempo()) ? "Page not found | Elite Tempo" : "Page not found | Elite Prep",
    robots: { index: false },
  };
}

/* One app answers for two sites, so the 404 asks which site was asked for. */
export default async function NotFound() {
  if (await isEliteTempo()) {
    return (
      <div className="et-site" style={{ fontFamily: FONT_SANS }}>
        <EliteTempoNotFound />
      </div>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold">This page does not exist.</h1>
      <Link href="/" className="underline underline-offset-4">
        Go to the Elite Prep home page
      </Link>
    </main>
  );
}
