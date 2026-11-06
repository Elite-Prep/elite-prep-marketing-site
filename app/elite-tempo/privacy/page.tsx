
import Chrome from "../Chrome";
import { INK, MUTED, etUrl, SHARE_IMAGES } from "../theme";

export const metadata = {
  openGraph: { images: SHARE_IMAGES },
  twitter: { card: "summary_large_image" as const, images: SHARE_IMAGES },
  alternates: { canonical: etUrl("/privacy") },
  title: "Elite Tempo Privacy Policy",
  description:
    "How Elite Tempo handles your data. Your swings and routines are saved to your private account so they follow you to a new phone. No advertising or cross-app tracking.",
};

export default function EliteTempoPrivacy() {
  return (
    <Chrome>
      <div className="mx-auto max-w-2xl px-5 pt-10 sm:pt-16">

        <h1 className="mb-3 text-[clamp(34px,5vw,52px)] font-semibold leading-[1.05] tracking-[-0.03em]" style={{ color: INK }}>
          Privacy Policy
        </h1>
        <p className="mb-4 text-[15px]" style={{ color: MUTED }}>
          Elite Tempo · Effective June 14, 2026 · Updated November 6, 2026
        </p>
        <p className="mb-10 text-[17px] leading-[1.6]" style={{ color: MUTED }}>
          Elite Tempo (&quot;the app,&quot; &quot;we,&quot; &quot;us&quot;) is
          published by Elite Prep Inc, formerly Elite Prep LLC (&quot;Elite Prep&quot;).
          This policy explains what the app collects and why. The short version:
          <strong style={{ color: INK }}>
            {" "}
            Your swings and routines, videos included, are saved to your own
            private Elite Tempo account, so they come back when you log in on a
            new phone. Only you can see them. We collect usage statistics and
            crash reports so we can tell what is working and fix what breaks. We
            never sell your data or use it for advertising.
          </strong>
        </p>

        <div className="flex flex-col gap-8 text-[17px] leading-[1.6]" style={{ color: MUTED }}>
          <Section title="Your account">
            <p className="mb-3">
              Every copy of the app gets its own private account the first time it
              opens, with no sign up needed. You can log in or sign up with Apple,
              Google, or your email at any time, which keeps everything you have
              saved and lets you use it on another phone.
            </p>
            <p>
              Your account holds what you tell us during setup (your first name,
              skill level, and goals), your email if you log in, and the app
              version, iOS version, device model, language, and time zone. Purchases
              use the Apple ID already signed in on your device.
            </p>
          </Section>

          <Section title="What we collect">
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>
                <strong style={{ color: INK }}>
                  Anonymous usage statistics (TelemetryDeck).
                </strong>{" "}
                App Store builds of Elite Tempo use{" "}
                <strong style={{ color: INK }}>TelemetryDeck</strong>, a
                privacy-focused analytics service, to count how the app is used:
                for example, that onboarding was finished, a tempo was played, a
                practice session was completed and how long it lasted, a swing was
                saved and which club it was labeled with, the subscription screen
                was shown, or a subscription or free trial was started and which
                plan it was. Each report also carries the app version, iOS
                version, device model, and language and region settings. Reports
                are tied to an{" "}
                <strong style={{ color: INK }}>anonymized device identifier</strong>,
                a one-way hash generated on the device, so we can count returning
                users without knowing who they are. We cannot use it to identify
                you, and it is not linked to your name, email, or Apple ID.
              </li>
              <li>
                <strong style={{ color: INK }}>
                  Crash and performance reports (Sentry).
                </strong>{" "}
                When the app crashes or freezes, it sends a diagnostic report to{" "}
                <strong style={{ color: INK }}>Sentry</strong>. The report contains
                technical details: what the app was doing when it failed, the app
                version, iOS version, and device model. The app also sends timing
                measurements of how long screens and tasks take to load, so we can
                find slow spots. Sentry is set up so these reports do{" "}
                <strong style={{ color: INK }}>not</strong> include your name,
                email, IP address, swing videos, or anything else that identifies
                you.
              </li>
              <li>
                <strong style={{ color: INK }}>Purchases.</strong> Your subscription
                to Elite Tempo Pro, monthly or yearly, is processed entirely by{" "}
                <strong style={{ color: INK }}>Apple</strong> through the App Store.
                We never see your payment card details. Apple tells the app only
                whether a subscription or past purchase is active, so the app can
                unlock. See Apple&apos;s privacy policy for how Apple handles
                payments.
              </li>
              <li>
                <strong style={{ color: INK }}>
                  Your swings and routines (saved to your account).
                </strong>{" "}
                When you record or import a swing or a routine, the video and its
                details (your marks, steps, tempo, labels, and ratings) are saved on
                your phone and uploaded to your account, stored with{" "}
                <strong style={{ color: INK }}>Supabase</strong>.{" "}
                <strong style={{ color: INK }}>
                  Only you can see them.
                </strong>{" "}
                We use them only to keep your library safe and on every phone you
                log in on. We do not share them, sell them, or use them for
                advertising. Videos you record in the app are also saved to your
                device&apos;s Photos library, with your permission.
              </li>
              <li>
                <strong style={{ color: INK }}>
                  Optional email opt-in (only if you choose).
                </strong>{" "}
                If you choose to submit your first name and email through the
                opt-in form in the app (for example, to get tips or updates from
                Elite Prep), we store that first name, email, and your consent in
                our Elite Prep contact database (hosted on Supabase), tagged as an
                Elite Tempo contact. This is optional, separate from any purchase,
                and needs your explicit consent. You can opt out at any time (see
                &quot;Your choices&quot;).
              </li>
            </ul>
            <p className="mt-3">
              We do not show ads, we do not build an advertising profile of you,
              and we do not track you across other companies&apos; apps or
              websites.
            </p>
          </Section>

          {/* The app sends anonymous usage counts (TelemetryDeck, since PR #56)
              and crash reports (Sentry, PR #59), described above. The site uses a
              cookieless first-party counter. If Google Analytics or an ad pixel is
              ever added, this section has to be rewritten, with a consent banner. */}
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
              The app asks for these only when you use the feature that needs them,
              and only to make that feature work on your device:
            </p>
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li><strong style={{ color: INK }}>Camera</strong>, to record a swing video.</li>
              <li>
                <strong style={{ color: INK }}>Microphone</strong>, because recorded
                videos include audio, and you can record your own voice for routine
                cues.
              </li>
              <li>
                <strong style={{ color: INK }}>Photo Library (add)</strong>, to save
                swings you record into your Photos. When you import a video, iOS
                shows the app only the video you pick.
              </li>
              <li>
                <strong style={{ color: INK }}>Notifications</strong>, if you start a
                free trial, to remind you before it ends. These reminders are
                scheduled on your device; nothing is sent through our servers.
              </li>
            </ul>
            <p className="mt-3">
              Saying no to a permission turns off only that one feature. The rest of
              the app works normally.
            </p>
          </Section>

          <Section title="How we use data">
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>
                To make the app work (unlock Pro, and compute and play back your
                swing&apos;s tempo). Almost all of this happens on your device.
              </li>
              <li>
                To understand which features get used and where people get stuck,
                using the anonymous usage statistics.
              </li>
              <li>
                To find and fix crashes, freezes, and slow screens, using the crash
                and performance reports.
              </li>
              <li>
                If you opted in: to send you Elite Prep tips, content, and product
                updates by email.
              </li>
            </ul>
            <p className="mt-3">We do not sell your information.</p>
          </Section>

          <Section title="Sharing">
            <p className="mb-3">
              We do not sell your personal information. We share data only with:
            </p>
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li><strong style={{ color: INK }}>Apple</strong>, as the payment processor and app platform.</li>
              <li>
                <strong style={{ color: INK }}>Supabase</strong>, our database
                provider, which stores your account, your swings and routines, and
                opt-in contact records for us.
              </li>
              <li>
                <strong style={{ color: INK }}>TelemetryDeck</strong>, which
                processes the anonymous usage statistics.
              </li>
              <li>
                <strong style={{ color: INK }}>Sentry</strong>, which processes crash
                and performance reports.
              </li>
            </ul>
            <p className="mt-3">We may disclose information if the law requires it.</p>
          </Section>

          <Section title="Data retention and deletion">
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>
                <strong style={{ color: INK }}>Your swings and routines</strong>{" "}
                are kept in your account until you delete them. Deleting a swing in
                the app removes it from your account too. Delete your account in
                Settings to remove your account, your swings and routines, and
                their videos for good. Logging out removes them from that phone.
              </li>
              <li>
                <strong style={{ color: INK }}>Usage statistics and crash reports</strong>{" "}
                are anonymous and are kept by TelemetryDeck and Sentry under their
                standard retention periods. Because they are not tied to you, we
                cannot look up or delete the reports from one person.
              </li>
              <li>
                <strong style={{ color: INK }}>Email opt-in records</strong> are
                kept until you ask us to remove them. To be removed, use the
                unsubscribe link in any email or contact us (below) and we will
                delete your record.
              </li>
            </ul>
          </Section>

          <Section title="Children">
            <p>
              Elite Tempo is meant for a general audience and is not directed to
              children under 13. We do not knowingly collect personal information
              from children under 13.
            </p>
          </Section>

          <Section title="Your choices">
            <ul className="flex list-disc flex-col gap-1.5 pl-5">
              <li>
                Delete your account anytime in Settings, which removes everything
                saved in it.
              </li>
              <li>Opted in and changed your mind? Unsubscribe or email us to be deleted.</li>
              <li>
                Manage Camera, Microphone, Photos, and Notifications permissions
                anytime in iOS Settings.
              </li>
            </ul>
          </Section>

          <Section title="Changes">
            <p>
              We may update this policy. We will change the date above and, for
              important changes, show a notice in the app.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions or requests:{" "}
              <a href="mailto:ebusalacchi@eliteprep.app" className="underline underline-offset-4" style={{ color: INK }}>
                ebusalacchi@eliteprep.app
              </a>
              . Elite Prep Inc.
            </p>
          </Section>
        </div>
      </div>
    </Chrome>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-[20px] font-semibold tracking-[-0.01em]" style={{ color: INK }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
