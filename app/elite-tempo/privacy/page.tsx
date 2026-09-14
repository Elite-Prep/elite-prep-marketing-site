import Link from "next/link";

const INK = "#F3F5F9";
const MUTED = "#8F929C";
const BODY = "#C9CCD3";
const ACCENT = "#FFB300";
const BG = "#0B0B0C";

export const metadata = {
  alternates: { canonical: "/elite-tempo/privacy" },
  title: "Elite Tempo Privacy Policy",
  description:
    "How Elite Tempo handles your data. No login, no account, no tracking. Your swing videos stay on your device.",
};

export default function EliteTempoPrivacy() {
  return (
    <div className="min-h-screen px-6 py-10" style={{ background: BG }}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/elite-tempo"
            aria-label="Elite Tempo home"
            className="text-lg font-extrabold"
            style={{ fontFamily: "var(--font-anton), sans-serif", color: INK }}
          >
            ELITE <span style={{ color: ACCENT }}>TEMPO</span>
          </Link>
          <Link
            href="/elite-tempo"
            className="inline-flex items-center gap-2 text-sm hover:opacity-80"
            style={{ color: ACCENT }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
        </div>

        <h1 className="mb-2 text-3xl font-extrabold sm:text-4xl" style={{ color: INK }}>
          Privacy Policy
        </h1>
        <p className="mb-3 text-sm" style={{ color: MUTED }}>
          Elite Tempo · Effective June 14, 2026
        </p>
        <p className="mb-10 text-sm leading-relaxed" style={{ color: BODY }}>
          Elite Tempo (&quot;the app,&quot; &quot;we,&quot; &quot;us&quot;) is
          published by Elite Prep LLC (&quot;Elite Prep&quot;). The short version:
          <strong style={{ color: INK }}>
            {" "}
            Elite Tempo has no login, no account, and we collect as little as
            possible. Your swing videos stay on your device.
          </strong>
        </p>

        <div className="flex flex-col gap-8 text-sm leading-relaxed" style={{ color: BODY }}>
          <Section title="No account, no sign-in">
            <p>
              Elite Tempo never asks you to create an account or sign in. We do
              not collect your name, email, or any identifier in order to use the
              app. Purchases ride on the Apple ID already signed in to your device
              at the operating-system level.
            </p>
          </Section>

          <Section title="What we collect">
            <p className="mb-3">
              <strong style={{ color: INK }}>Almost nothing automatically.</strong>{" "}
              The app embeds no analytics, advertising, or tracking SDKs at all. We
              do not build an advertising profile of you and we do not track you
              across other apps or websites. The limited data involved:
            </p>
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>
                {/* The lifetime unlock is retired — PaywallView no longer offers it,
                    so a policy describing it as a current option was describing a
                    purchase nobody can make. */}
                <strong style={{ color: INK }}>Purchases.</strong> Your subscription
                to Elite Tempo Pro, monthly or yearly, is processed entirely by Apple
                through the App Store. We never see your payment-card details. Apple
                provides only an anonymized record that an entitlement exists, so the
                app can unlock. (Some early customers hold a one-time lifetime unlock,
                which works the same way.)
              </li>
              <li>
                <strong style={{ color: INK }}>
                  Your swing videos and timings (stored on your device).
                </strong>{" "}
                Videos and timing data you create in Time Your Swing are stored
                locally on your device. We do not upload your videos or swing data
                to any server. Videos you record in the app are also saved to your
                device&apos;s Photos library, with your permission, so you keep the
                footage.
              </li>
              <li>
                <strong style={{ color: INK }}>
                  Optional email opt-in (only if you choose).
                </strong>{" "}
                If you voluntarily submit your first name and email through an
                opt-in form, we store that, and your consent, in our Elite Prep
                contact database (hosted on Supabase), tagged as an Elite Tempo
                contact. Entirely optional, separate from any purchase, and
                requires your explicit consent.
              </li>
            </ul>
          </Section>

          {/* This section is new because the website now measures its own traffic
              and the policy above promises no tracking. Rather than quietly
              weakening that promise, the distinction is spelled out: the app still
              embeds nothing, and the site uses a cookieless first-party counter. If
              Google Analytics or an ad pixel is ever added, this section stops being
              accurate and has to be rewritten — along with a consent banner. */}
          <Section title="This website">
            <p className="mb-3">
              The pages on eliteprep.app use{" "}
              <strong style={{ color: INK }}>Vercel Web Analytics</strong> to count
              visits, so we can tell which pages people find useful. It records the
              page visited, the referring site, and coarse details like country,
              browser and device type.
            </p>
            <p className="mb-3">
              It sets{" "}
              <strong style={{ color: INK }}>no cookies</strong>, does not use device
              fingerprinting, does not create a profile of you, and cannot follow you
              to any other website. The figures we see are aggregate counts, not
              individual visitors. We do not use Google Analytics, advertising
              pixels, or any cross-site tracking on this website.
            </p>
            <p>
              If you submit the optional email form on this site, that is covered by
              the opt-in bullet above.
            </p>
          </Section>

          <Section title="Device permissions">
            <p className="mb-3">
              The app requests these only when you use the relevant feature, and
              only to make that feature work on your device:
            </p>
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li><strong style={{ color: INK }}>Camera</strong>, to record a swing video.</li>
              <li><strong style={{ color: INK }}>Microphone</strong>, because recorded videos include audio.</li>
              <li>
                <strong style={{ color: INK }}>Photo Library (add)</strong>, to
                save swings you record into your Photos, and to let you import a
                video you select.
              </li>
            </ul>
            <p className="mt-3">
              Declining a permission simply disables that one capability; the rest
              of the app works normally.
            </p>
          </Section>

          <Section title="How we use data">
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>
                To deliver app functionality (unlock the library; compute and play
                back your swing&apos;s tempo), most of which happens entirely
                on-device.
              </li>
              <li>
                If you opted in: to send you Elite Prep tips, content, and product
                updates by email. We do not sell your information.
              </li>
            </ul>
          </Section>

          <Section title="Sharing">
            <p className="mb-3">
              We do not sell your personal information. We share data only with:
            </p>
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li><strong style={{ color: INK }}>Apple</strong>, as the payment processor and app platform.</li>
              <li>
                <strong style={{ color: INK }}>Supabase</strong>, our database
                provider, which stores opt-in contact records on our behalf.
              </li>
            </ul>
            <p className="mt-3">We may disclose information if required by law.</p>
          </Section>

          <Section title="Data retention & deletion">
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>
                <strong style={{ color: INK }}>On-device data</strong> (swing
                videos, timings) lives only on your device. Delete an individual
                swing in the app to remove its video and data, or delete the app to
                remove all of it. We never hold a copy.
              </li>
              <li>
                <strong style={{ color: INK }}>Email opt-in records</strong> are
                kept until you ask us to remove them. Use the unsubscribe link in
                any email or contact us below.
              </li>
            </ul>
          </Section>

          <Section title="Children">
            <p>
              Elite Tempo is intended for a general audience and is not directed to
              children under 13. We do not knowingly collect personal information
              from children under 13.
            </p>
          </Section>

          <Section title="Your choices">
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>
                Don&apos;t want any data with us? Simply don&apos;t use the optional
                email opt-in, and we hold nothing about you.
              </li>
              <li>Opted in and changed your mind? Unsubscribe or email us to be deleted.</li>
              <li>Manage Camera / Microphone / Photos permissions anytime in iOS Settings.</li>
            </ul>
          </Section>

          <Section title="Changes">
            <p>
              We may update this policy; we&apos;ll revise the effective date above
              and, for material changes, surface a notice in the app.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions or requests:{" "}
              <a href="mailto:ebusalacchi@eliteprep.app" style={{ color: ACCENT }}>
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
      <h2 className="mb-2 text-base font-bold" style={{ color: INK }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
