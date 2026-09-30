// Mockingbird's support page, the URL App Store Connect asks for. It lives beside the privacy policy
// under /reelprep (the app's old name) so both store links share one path. Apple only needs a page
// that says how to reach a person, so it stays short: contact, the two things people ask most, and
// the deletion steps, which the privacy policy already states in full.
export const metadata = {
  alternates: { canonical: "/reelprep/support" },
  title: "Mockingbird Support",
  description: "How to get help with Mockingbird, and how to delete your account."
}

export default function MockingbirdSupport() {
  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "var(--bg)" }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-medium mb-10" style={{ color: "var(--text-primary)" }}>
          Mockingbird Support
        </h1>

        <div className="flex flex-col gap-8 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <Section title="Contact us">
            <p>
              Email{" "}
              <a href="mailto:feedback@eliteprep.app" className="underline" style={{ color: "var(--brand)" }}>
                feedback@eliteprep.app
              </a>{" "}
              with a question, a problem, or an idea. If an import came out wrong, include the link
              you shared so we can look at it.
            </p>
          </Section>

          <Section title="An import did not work">
            <p>
              Some posts are private, removed, or blocked by the site they are on, and those cannot
              be read. If a public video or post fails, try again in a minute, then email us the
              link.
            </p>
          </Section>

          <Section title="Deleting your account">
            <p>
              Open Mockingbird, go to your <strong>Account</strong> page, tap your name at the top,
              then tap <strong>Delete account</strong>. The full details of what is deleted are in
              the{" "}
              <a href="/reelprep/privacy" className="underline" style={{ color: "var(--brand)" }}>
                privacy policy
              </a>
              .
            </p>
          </Section>

          <Section title="Who makes Mockingbird">
            <p>Mockingbird is made by Elite Prep Inc.</p>
          </Section>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{title}</h2>
      {children}
    </section>
  )
}
