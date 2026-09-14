import Link from "next/link";

import EliteTempoMark from "../EliteTempoMark";
import { ACCENT, ACCENT_ALT, BG, INK, MUTED, TRACKING_MARK, W_WORDMARK } from "../theme";

export const metadata = {
  alternates: { canonical: "/elite-tempo/terms" },
  title: "Elite Tempo Terms of Use",
  description: "The terms that govern your use of Elite Tempo.",
};

export default function EliteTempoTerms() {
  return (
    <div className="min-h-screen px-6 py-10" style={{ background: BG }}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/elite-tempo"
            aria-label="Elite Tempo home"
            className="inline-flex items-center gap-2.5 text-[17px] leading-none"
            style={{ color: INK, fontWeight: W_WORDMARK, letterSpacing: TRACKING_MARK }}
          >
            <EliteTempoMark size={19} fill={ACCENT} />
            ELITE TEMPO
          </Link>
          <Link
            href="/elite-tempo"
            className="inline-flex items-center gap-2 text-sm transition-colors hover:brightness-110"
            style={{ color: ACCENT_ALT }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>

        <h1 className="mb-2 text-3xl font-semibold sm:text-4xl" style={{ color: INK }}>
          Terms of Use
        </h1>
        <p className="mb-10 text-sm" style={{ color: MUTED }}>
          Elite Tempo · Effective June 14, 2026
        </p>

        <div className="flex flex-col gap-8 text-sm leading-relaxed" style={{ color: MUTED }}>
          <p>
            These Terms of Use (&quot;Terms&quot;) govern your use of the Elite
            Tempo app published by Elite Prep LLC (&quot;Elite Prep,&quot;
            &quot;we,&quot; &quot;us&quot;). By downloading or using the app, you
            agree to these Terms. If you don&apos;t agree, don&apos;t use the app.
          </p>

          <Section title="1. The app & your license">
            {/* This paragraph used to open with a plain-English product pitch:
                "Elite Tempo is a golf tempo and timing trainer: it plays the
                hand-timed tempo of real, notable golf swings and lets you time and
                review your own swings."

                That was the best description of the product anywhere on the site,
                and it was sitting in the legal page — so when someone searched
                "elite tempo golf", Google served THIS page above /elite-tempo and
                pulled that sentence as the snippet. It was not wrong to do so; it
                was picking the best answer available.

                A terms page should read as terms. The product description now lives
                on the pages that are meant to rank for it. */}
            <p>
              Elite Prep LLC licenses the Elite Tempo iOS application
              (the &quot;app&quot;) to you on the terms set out here. We grant you a
              personal, non-exclusive, non-transferable, revocable license to use the
              app for your own non-commercial use, subject to these Terms and
              Apple&apos;s rules.
            </p>
          </Section>

          <Section title="2. Purchases (Elite Tempo Pro)">
            <p>
              The full library, Time Your Swing, Compare, and Routines are unlocked
              by &quot;Elite Tempo Pro,&quot; available two ways: a one-time,
              non-consumable in-app purchase that unlocks the app for life, or an
              auto-renewable yearly subscription. Both grant the same access.
            </p>
            <p>
              The yearly subscription includes a 7-day free trial for new
              subscribers. After the trial it renews automatically at the
              then-current yearly price unless you cancel at least 24 hours before
              the end of the current period. You can manage or cancel the
              subscription anytime in your Apple ID settings; canceling stops future
              renewals, and you keep access through the period you already paid for.
              The lifetime purchase does not renew.
            </p>
            <p>
              All payments are processed by Apple through your Apple ID; we do not
              handle your payment information. Restoring a previous purchase on a new
              device is supported in Settings. Refunds are handled by Apple under the
              App Store terms; we cannot directly issue App Store refunds.
            </p>
          </Section>

          <Section title="3. Your content (swing videos)">
            <p>
              Swing videos you record or import, and the timings you create, are
              yours. They are stored on your device (see the Privacy Policy); we do
              not receive or host them. You are solely responsible for the content
              you capture and for having the right to record any person in your
              videos. Don&apos;t capture or use content that is unlawful or
              infringes someone else&apos;s rights.
            </p>
          </Section>

          <Section title="4. Acceptable use">
            <p>
              Don&apos;t: reverse-engineer, copy, resell, or redistribute the app or
              its data; attempt to bypass the purchase/unlock; use the app to break
              any law; or interfere with its operation.
            </p>
          </Section>

          <Section title="5. Intellectual property; no affiliation or endorsement">
            <p>
              The app, its design, code, audio, and the curated tempo dataset are
              owned by Elite Prep and protected by law.{" "}
              <strong style={{ color: INK }}>
                Elite Tempo references real golfers, tournaments, and shots for
                descriptive, educational, and historical purposes only. Elite
                Tempo and Elite Prep are not affiliated with, sponsored by,
                endorsed by, or associated with any player, tournament, tour, or
                organization named in the app.
              </strong>{" "}
              All player names and trademarks belong to their respective owners;
              their use here is nominative (to identify the real swing being
              modeled) and does not imply any endorsement.
            </p>
          </Section>

          <Section title="6. Not professional instruction; no guarantee of results">
            <p>
              Elite Tempo is a training aid, not professional golf coaching,
              medical, or fitness advice. Tempo data is timed by hand from video
              and provided &quot;as is&quot; for practice. We don&apos;t guarantee any
              improvement in your game. Warm up appropriately and train within your
              physical limits.
            </p>
          </Section>

          <Section title="7. Disclaimers">
            <p>
              The app is provided &quot;as is&quot; and &quot;as available,&quot;
              without warranties of any kind, express or implied, including
              merchantability, fitness for a particular purpose, and
              non-infringement, to the fullest extent permitted by law.
            </p>
          </Section>

          <Section title="8. Limitation of liability">
            <p>
              To the fullest extent permitted by law, Elite Prep will not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages, or for lost data, arising from your use of the app. Our total
              liability for any claim will not exceed the amount you paid for the
              app.
            </p>
          </Section>

          <Section title="9. Apple-specific terms">
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>
                These Terms are between you and Elite Prep only, not Apple. Apple is
                not responsible for the app or its content.
              </li>
              <li>
                Your license is limited to use on Apple-branded devices you own or
                control, per the App Store Usage Rules.
              </li>
              <li>
                Apple has no obligation to provide maintenance or support for the
                app. Support questions go to us at the contact below.
              </li>
              <li>
                To the extent permitted by law, Apple has no warranty obligation for
                the app; any warranty claims are our responsibility.
              </li>
              <li>
                Apple is not responsible for addressing any claims by you or a third
                party relating to the app, or for intellectual-property
                infringement claims regarding the app.
              </li>
              <li>
                You represent that you are not located in a U.S.-embargoed country
                or on any U.S. government prohibited/restricted-parties list.
              </li>
              <li>
                Apple and its subsidiaries are third-party beneficiaries of these
                Terms and may enforce them against you.
              </li>
            </ul>
          </Section>

          <Section title="10. Changes & termination">
            <p>
              We may update these Terms (we&apos;ll revise the date above) and may
              discontinue the app or features. Your license ends if you violate
              these Terms.
            </p>
          </Section>

          <Section title="11. Governing law">
            <p>
              These Terms are governed by the laws of the State of Florida, without
              regard to conflict-of-laws rules.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              Contact us at{" "}
              <a href="mailto:ebusalacchi@eliteprep.app" style={{ color: ACCENT_ALT }}>
                ebusalacchi@eliteprep.app
              </a>
              . Elite Prep LLC.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-base font-semibold" style={{ color: INK }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
