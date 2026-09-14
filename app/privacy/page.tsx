import Link from "next/link";
import Logo from "../components/Logo";

const TEXT_HEAD = "#f0f0f0";
const TEXT_BODY = "#b3b3b3";
const BRAND = "#9ABBC6";

export const metadata = {
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy — Elite Prep",
  description:
    "How Elite Prep collects, uses, and protects information from athletes and coaches using the Service.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen px-6 py-10" style={{ background: "#111112" }}>
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 flex items-center justify-between">
          <Link href="/" aria-label="Elite Prep home">
            <Logo width={120} showBeta={false} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm hover:opacity-80"
            style={{ color: BRAND }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
        </div>

        <h1
          className="text-3xl font-semibold mb-2 sm:text-4xl"
          style={{ color: TEXT_HEAD, fontFamily: "var(--font-manrope), sans-serif" }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm mb-10" style={{ color: TEXT_BODY }}>
          Last updated: April 23, 2026
        </p>

        <div
          className="flex flex-col gap-8 text-sm leading-relaxed"
          style={{ color: "#d4d4d4" }}
        >
          <Section title="Overview">
            <p>
              Elite Prep (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
              builds tools that help golfers plan, prepare for, and review their
              training and tournament rounds. This Privacy Policy describes
              what we collect, how we use it, and the choices you have. It
              applies to the Elite Prep web and mobile applications and any
              related services (collectively, the &quot;Service&quot;).
            </p>
          </Section>

          <Section title="Information you give us">
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>
                <strong>Account info:</strong> name, email address, password
                (stored hashed), and — if you sign in with Google or Apple — the
                basic profile data those providers share with us (your name,
                email, and a provider user ID).
              </li>
              <li>
                <strong>Player profile:</strong> handicap index, primary goal,
                practice hours per week, and other answers from the onboarding
                questionnaire.
              </li>
              <li>
                <strong>Performance data you log:</strong> rounds, hole-by-hole
                shot data, practice sessions, training sessions, mental
                check-ins, scheduled events, and anything else you enter.
              </li>
              <li>
                <strong>Optional profile fields:</strong> avatar image, date of
                birth, gender, ZIP code, and team / coach affiliations if you
                choose to add them.
              </li>
              <li>
                <strong>Communications:</strong> messages you send us through
                support channels.
              </li>
            </ul>
          </Section>

          <Section title="Information we collect automatically">
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>
                <strong>Device and usage data:</strong> browser type, device
                type, operating system, IP address, time-zone, and basic logs
                of how the Service is used.
              </li>
              <li>
                <strong>Cookies and local storage:</strong> we use browser
                storage to keep you signed in and to remember preferences. We
                do not currently use third-party advertising cookies.
              </li>
              <li>
                <strong>Push notification tokens:</strong> if you opt in to
                push notifications.
              </li>
              {/* Added when the marketing site gained analytics. The measurement
                  runs from the root layout, so it applies to every page on
                  eliteprep.app — including the Elite Tempo and Reel Prep pages —
                  and this is the policy that covers the website as a whole. If
                  Google Analytics or an advertising pixel is ever added, this
                  bullet stops being accurate and needs rewriting, along with a
                  consent banner for EU visitors. */}
              <li>
                <strong>Website analytics:</strong> pages on eliteprep.app use
                Vercel Web Analytics to count visits — the page viewed, the
                referring site, and coarse details like country, browser and
                device type. It sets no cookies, does not fingerprint your
                device, does not build a profile of you, and cannot follow you to
                other websites. We see aggregate counts, not individual visitors.
                We do not use Google Analytics or advertising pixels.
              </li>
            </ul>
          </Section>

          <Section title="How we use your information">
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>To provide, operate, and improve the Service.</li>
              <li>
                To compute your stats, Readiness score, streaks, and other
                features that depend on your logged data.
              </li>
              <li>
                To share your activity with coaches and team members you have
                explicitly joined.
              </li>
              <li>
                To send transactional emails and, if you opt in, push
                notifications.
              </li>
              <li>To respond to support requests.</li>
              <li>To detect and prevent fraud, abuse, and security issues.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </Section>

          <Section title="How we share your information">
            <p className="mb-3">
              We do not sell your personal information. We share it only in
              these situations:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>
                <strong>Service providers:</strong> we use Supabase (database
                and authentication), Vercel (hosting), and OAuth providers
                (Google, Apple) to run the Service. They process data on our
                behalf under their own privacy commitments.
              </li>
              <li>
                <strong>Coaches and teams:</strong> if you join a team, the
                coach who owns that team can see the activity and stats
                associated with your participation.
              </li>
              <li>
                <strong>Legal:</strong> we may disclose information if required
                by law, subpoena, or to protect our rights, property, or the
                safety of our users.
              </li>
              <li>
                <strong>Business transfers:</strong> if Elite Prep is acquired
                or merged, your information may be transferred to the new
                owner, subject to the same protections.
              </li>
            </ul>
          </Section>

          <Section title="Data retention">
            <p>
              We keep your information for as long as your account is active
              and as needed to provide the Service. If you delete your account,
              we delete your personal information within 30 days, except where
              we need to retain it to comply with legal obligations, resolve
              disputes, or enforce agreements.
            </p>
          </Section>

          <Section title="Security">
            <p>
              We use industry-standard safeguards including encryption in
              transit (HTTPS) and at rest, and access controls on our backend.
              No method of transmission or storage is completely secure, so we
              cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="Your rights and choices">
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>
                <strong>Access and update:</strong> you can view and edit your
                profile, goals, and logged activity from within the app at any
                time.
              </li>
              <li>
                <strong>Delete:</strong> you can delete individual logs from
                your activity history. To delete your entire account, email{" "}
                <a
                  href="mailto:ebusalacchi@eliteprep.app"
                  style={{ color: BRAND }}
                >
                  ebusalacchi@eliteprep.app
                </a>{" "}
                and we will process it within 30 days.
              </li>
              <li>
                <strong>Export:</strong> request a copy of your data by
                emailing the address above.
              </li>
              <li>
                <strong>Push notifications:</strong> opt out at any time in
                your device or browser settings, or in the app&apos;s
                notification preferences.
              </li>
            </ul>
          </Section>

          <Section title="Children's privacy">
            <p>
              The Service is not directed to children under 13. We do not
              knowingly collect personal information from children under 13.
              If you believe a child under 13 has provided us personal
              information, please contact us and we will delete it. If you are
              a parent of a user between 13 and the age of majority, please
              review these terms with them.
            </p>
          </Section>

          <Section title="State and international privacy rights">
            <p>
              Depending on where you live, you may have additional rights such
              as the right to know, the right to delete, the right to correct,
              the right to opt out of certain data uses, and the right not to
              be discriminated against for exercising your rights. To exercise
              any of these rights, email us at the address below. We will
              verify your identity before fulfilling the request.
            </p>
          </Section>

          <Section title="International users">
            <p>
              The Service is operated from the United States. If you are
              outside the U.S., be aware that your information will be
              processed in the U.S., which may have data protection laws
              different from your jurisdiction.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time. If we make
              material changes, we will notify you in the app or by email and
              update the &quot;Last updated&quot; date above.
            </p>
          </Section>

          <Section title="Contact us">
            <p>
              Questions about this Privacy Policy or how we handle your data?
              Email{" "}
              <a
                href="mailto:ebusalacchi@eliteprep.app"
                style={{ color: BRAND }}
              >
                ebusalacchi@eliteprep.app
              </a>
              .
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2
        className="text-base font-semibold mb-2"
        style={{ color: TEXT_HEAD }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}
