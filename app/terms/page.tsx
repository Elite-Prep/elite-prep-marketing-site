import Link from "next/link";
import Logo from "../components/Logo";

const TEXT_HEAD = "#f0f0f0";
const TEXT_BODY = "#b3b3b3";
const BRAND = "#9ABBC6";

export const metadata = {
  alternates: { canonical: "/terms" },
  title: "Terms of Service — Elite Prep",
  description:
    "The agreement governing your access to and use of Elite Prep.",
};

export default function TermsOfService() {
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
          Terms of Service
        </h1>
        <p className="text-sm mb-10" style={{ color: TEXT_BODY }}>
          Last updated: April 23, 2026
        </p>

        <div
          className="flex flex-col gap-8 text-sm leading-relaxed"
          style={{ color: "#d4d4d4" }}
        >
          <Section title="1. Agreement">
            <p>
              These Terms of Service (&quot;Terms&quot;) form a binding
              agreement between you and Elite Prep (&quot;Elite Prep,&quot;
              &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) governing
              your access to and use of the Elite Prep mobile and web
              applications, including app.eliteprep.app and any related
              services (collectively, the &quot;Service&quot;). By creating an
              account or using the Service, you agree to be bound by these
              Terms and our Privacy Policy. If you do not agree, do not use
              the Service.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <p>
              You must be at least 13 years old to create an account. If you
              are between 13 and the age of majority in your jurisdiction, you
              represent that a parent or legal guardian has reviewed and
              agreed to these Terms on your behalf. Coaches who manage
              athletes under 18 are responsible for confirming they have
              appropriate authority to do so. If we learn we have collected
              personal information from a child under 13 without proper
              consent, we will delete that information promptly.
            </p>
          </Section>

          <Section title="3. Your account">
            <p>
              You are responsible for keeping your login credentials secure
              and for all activity that occurs under your account. Notify us
              immediately at ebusalacchi@eliteprep.app if you suspect
              unauthorized use. You agree to provide accurate information when
              creating an account and to keep that information current.
            </p>
          </Section>

          <Section title="4. Acceptable use">
            <p>
              You agree not to: (a) use the Service for any unlawful purpose;
              (b) impersonate another person; (c) attempt to gain unauthorized
              access to any part of the Service or its underlying systems; (d)
              reverse engineer, decompile, or disassemble any part of the
              Service except as permitted by law; (e) use the Service to
              transmit malware, spam, or harassing content; or (f) interfere
              with or disrupt the Service or the servers or networks connected
              to it.
            </p>
          </Section>

          <Section title="5. Your content">
            <p>
              The Service lets you log rounds, practice sessions, training,
              mental check-ins, and related performance data (&quot;Your
              Content&quot;). You retain all rights to Your Content. By
              submitting Your Content, you grant Elite Prep a worldwide,
              non-exclusive, royalty-free license to host, store, process, and
              display Your Content solely as needed to operate, improve, and
              provide the Service to you and, where applicable, to coaches and
              teams you have explicitly joined.
            </p>
          </Section>

          <Section title="6. Coaches, teams, and shared data">
            <p>
              If you join a team using a coach&apos;s invite code or otherwise
              grant a coach access, you authorize that coach to view your
              activity, performance metrics, and other data associated with
              that team relationship. You can leave a team at any time from
              your profile settings, which will end ongoing data sharing for
              activity logged after you leave.
            </p>
          </Section>

          <Section title="7. Intellectual property">
            <p>
              The Service, including its software, design, brand, and content
              (other than Your Content), is owned by Elite Prep and protected
              by intellectual property laws. We grant you a limited, personal,
              non-transferable, non-exclusive license to use the Service in
              accordance with these Terms. No other rights are granted by
              implication.
            </p>
          </Section>

          <Section title="8. Performance disclaimer">
            <p>
              Elite Prep is a tool to help you plan and track training. We do
              not guarantee any specific outcome — including improvements in
              handicap, scoring, ranking, or physical fitness. The Service is
              provided for informational and tracking purposes and is not a
              substitute for professional coaching, medical advice, or
              supervised athletic training. Consult a qualified professional
              before starting or modifying any training program.
            </p>
          </Section>

          <Section title="9. Service availability">
            <p>
              We work to keep the Service available, but we do not guarantee
              uninterrupted or error-free access. We may modify, suspend, or
              discontinue features at any time with or without notice.
            </p>
          </Section>

          <Section title="10. Termination">
            <p>
              You may close your account at any time. We may suspend or
              terminate your access if we believe you have violated these
              Terms or to protect the Service or other users. On termination,
              sections that by their nature should survive (intellectual
              property, disclaimers, limitation of liability, indemnification,
              and governing law) will remain in effect.
            </p>
          </Section>

          <Section title="11. Disclaimers">
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, AND NON-INFRINGEMENT, TO THE FULLEST EXTENT
              PERMITTED BY LAW.
            </p>
          </Section>

          <Section title="12. Limitation of liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ELITE PREP WILL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, ARISING
              OUT OF OR RELATED TO YOUR USE OF THE SERVICE. OUR TOTAL
              LIABILITY FOR ANY CLAIM RELATED TO THE SERVICE WILL NOT EXCEED
              THE AMOUNT YOU PAID US IN THE TWELVE MONTHS BEFORE THE CLAIM
              AROSE, OR USD $100, WHICHEVER IS GREATER.
            </p>
          </Section>

          <Section title="13. Indemnification">
            <p>
              You agree to indemnify and hold Elite Prep, its officers,
              employees, and agents harmless from any claim, demand, or
              damages arising from your use of the Service, Your Content, or
              your violation of these Terms.
            </p>
          </Section>

          <Section title="14. Governing law">
            <p>
              These Terms are governed by the laws of the State of [STATE],
              United States, without regard to conflict-of-law principles.
              Any dispute arising under these Terms will be brought
              exclusively in the state or federal courts located in [COUNTY],
              [STATE], and you consent to the personal jurisdiction of those
              courts.
            </p>
          </Section>

          <Section title="15. Changes to these Terms">
            <p>
              We may update these Terms from time to time. If we make
              material changes, we will notify you in the app or by email.
              Continued use of the Service after the changes take effect
              means you accept the updated Terms.
            </p>
          </Section>

          <Section title="16. Contact">
            <p>
              Questions about these Terms? Email us at{" "}
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
