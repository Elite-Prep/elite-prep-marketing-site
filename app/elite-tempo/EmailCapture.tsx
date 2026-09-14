"use client";

import { useState, type FormEvent } from "react";

// Elite Prep Supabase — the SAME insert-only endpoint the iOS app uses.
// The publishable key is client-safe: `elite_tempo_leads` has an insert-only
// RLS policy (no read/update/delete from the client), so it can only add a row.
const SUPABASE_URL = "https://wkvszppmeynyucuybern.supabase.co";
const SUPABASE_KEY = "sb_publishable_2F9OjhvLad5w2CMEAPUZSA_c-S_D7eZ";
const TABLE = "elite_tempo_leads";

/* From the shared token module. These used to be local copies, on the theory that a
   client component needed its own — it does not: `theme.ts` exports plain constants,
   which inline into the client bundle exactly like the literals did. Keeping copies
   only meant a palette change had to be made twice, and the second one got forgotten. */
import { ACCENT, BG, CARD, HAIRLINE, INK, MUTED, ON_ACCENT } from "./theme";

function isValidEmail(raw: string) {
  const s = raw.trim();
  const at = s.indexOf("@");
  if (at <= 0) return false;
  const domain = s.slice(at + 1);
  return domain.includes(".") && !domain.endsWith(".") && !s.includes(" ");
}

type Status = "idle" | "submitting" | "done" | "error";

export default function EmailCapture() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!isValidEmail(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          first_name: firstName.trim(),
          email: email.trim().toLowerCase(),
          app: "elite_tempo",
          consent: true,
          source: "landing",
        }),
      });
      if (!res.ok) throw new Error(`Server ${res.status}`);
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Something went wrong. Try again in a moment.");
    }
  }

  if (status === "done") {
    return (
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
      >
        <p className="text-lg font-semibold" style={{ color: INK }}>
          You&apos;re on the list.
        </p>
        <p className="mt-1 text-sm" style={{ color: MUTED }}>
          The Elite Tempo cheat sheet is on its way to your inbox.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl p-5 sm:p-6"
      style={{ background: CARD, border: `1px solid ${HAIRLINE}` }}
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          autoComplete="given-name"
          placeholder="First name"
          aria-label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none sm:w-1/3"
          style={{ background: BG, border: `1px solid ${HAIRLINE}`, color: INK }}
        />
        <input
          type="email"
          autoComplete="email"
          required
          placeholder="you@email.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full flex-1 rounded-xl px-4 py-3 text-sm outline-none"
          style={{ background: BG, border: `1px solid ${HAIRLINE}`, color: INK }}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-xl px-6 py-3 text-sm font-semibold transition active:scale-[0.98] disabled:opacity-60"
          style={{ background: ACCENT, color: ON_ACCENT }}
        >
          {status === "submitting" ? "Sending…" : "Send it"}
        </button>
      </div>
      {error && (
        <p className="mt-3 text-xs" style={{ color: "#EF4444" }}>
          {error}
        </p>
      )}
      <p className="mt-3 text-xs" style={{ color: MUTED }}>
        No spam, unsubscribe anytime. By submitting you agree to receive email
        from Elite Prep.
      </p>
    </form>
  );
}
