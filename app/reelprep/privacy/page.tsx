// Reel Prep's privacy policy. Separate from /privacy, which covers Elite Prep and describes golf
// performance data — Reel Prep handles a different set entirely (shared links, transcripts, drill
// photos), and Google checks that a declared Data safety form matches the policy behind the URL.
//
// This page lives here rather than in the web app repo because eliteprep.app is served by THIS
// project. The original copy was merged to Elite-Prep-Web-App-V2 (PR #245), which serves a
// different host, so https://eliteprep.app/reelprep/privacy 404'd and Google rejected the app
// three times over — once for the privacy URL, once for the delete-account URL, once for the
// delete-data URL. All three Data safety fields point at this one page, so it has to satisfy the
// privacy-policy rules AND Play's deletion-URL rules: name the app and developer, feature the
// deletion steps prominently, and state what is deleted, what is kept, and for how long.
// That is what "Deleting your account and your data" is doing up near the top — do not bury it.
export const metadata = {
  alternates: { canonical: "/reelprep/privacy" },
  title: "Reel Prep Privacy Policy",
  description: "How Reel Prep collects, uses, and stores your information, and how to delete it."
}

const LAST_UPDATED = "August 7, 2026"

export default function ReelPrepPrivacyPolicy() {
  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "var(--bg)" }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-medium mb-2" style={{ color: "var(--text-primary)" }}>
          Reel Prep Privacy Policy
        </h1>
        <p className="text-sm mb-10" style={{ color: "var(--text-tertiary)" }}>
          Last updated {LAST_UPDATED}
        </p>

        <div className="flex flex-col gap-8 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <Section title="Overview">
            <p>
              Reel Prep is made by Elite Prep Inc. It lets you save training content you find
              online — videos, posts, and podcast episodes — and turns it into drills, protocols,
              and workouts you can actually follow. This policy explains what the app collects,
              why, and who else sees it. It covers the Reel Prep mobile app only; Elite Prep&apos;s
              golf performance products are covered by a{" "}
              <a href="/privacy" style={{ color: "var(--brand)" }}>separate policy</a>.
            </p>
            {/* This page is served from eliteprep.app, which counts visits. The
                policy above is about the app, so without this line a visitor
                reading it would have no disclosure covering the page they are on. */}
            <p className="mt-3">
              This page itself is part of the eliteprep.app website, which uses
              cookieless analytics to count visits. That is described in the{" "}
              <a href="/privacy" style={{ color: "var(--brand)" }}>
                Elite Prep privacy policy
              </a>
              , under &ldquo;Information we collect automatically&rdquo;.
            </p>
          </Section>

          <Section title="Deleting your account and your data">
            <p>
              You can delete your Reel Prep account, and everything in it, from inside the app at
              any time. You do not need to contact us and you do not need to explain why.
            </p>

            <h3 className="text-sm font-semibold mt-4 mb-1.5" style={{ color: "var(--text-primary)" }}>
              To delete your account and all of its data
            </h3>
            <ol className="list-decimal pl-5 flex flex-col gap-1.5">
              <li>Open Reel Prep and go to <strong>Settings</strong>.</li>
              <li>Tap <strong>Account settings</strong>.</li>
              <li>Tap <strong>Delete account</strong>.</li>
              <li>
                Confirm twice — the app asks once, then asks again, because deletion is permanent
                and cannot be undone.
              </li>
            </ol>
            <p className="mt-2">
              If you would rather we did it for you, or you can no longer sign in, email{" "}
              <a href="mailto:ebusalacchi@eliteprep.app" style={{ color: "var(--brand)" }}>
                ebusalacchi@eliteprep.app
              </a>{" "}
              from the address on your account and we will delete it within 30 days.
            </p>

            <h3 className="text-sm font-semibold mt-4 mb-1.5" style={{ color: "var(--text-primary)" }}>
              To delete some of your data without closing your account
            </h3>
            <p>
              Any individual drill, protocol, collection, or workout can be deleted from inside the
              app, which removes it and its logged sets and reps from our systems. If you want a
              larger clear-out — for example every drill you have ever imported, but not your
              account — email the address above and say what you want removed.
            </p>

            <h3 className="text-sm font-semibold mt-4 mb-1.5" style={{ color: "var(--text-primary)" }}>
              What is deleted, and what is kept
            </h3>
            <p>Deleting your account permanently removes:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1.5">
              <li>Your account record, including your email address</li>
              <li>Every drill, protocol, collection, and workout you saved</li>
              <li>The links you shared and the transcripts and text extracted from them</li>
              <li>Any photos you attached to a drill</li>
              <li>Your workout history, including logged sets and reps</li>
            </ul>
            <p className="mt-2">
              Nothing about you is retained for our own use afterwards. Two narrow exceptions: any
              records we are required by law to keep, and encrypted backups that still hold copies
              at the moment of deletion — those are overwritten on a rolling basis and are fully
              gone within 30 days. We hold no payment details, because the app takes no payments.
            </p>
          </Section>

          <Section title="Information you give us">
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>
                <strong>Account details. </strong>
                Your email address, and a password if you create an account that way. You can
                instead sign in with Apple, in which case we receive whatever address Apple
                chooses to share — including a private relay address if you choose to hide yours.
              </li>
              <li>
                <strong>Links you share. </strong>
                When you share a video, post, or podcast episode into Reel Prep, we store that web
                address and the text we extract from it.
              </li>
              <li>
                <strong>Content you create. </strong>
                Drills, protocols, collections, workouts, and the sets and reps you log while
                working out.
              </li>
              <li>
                <strong>Photos. </strong>
                If you attach a picture to a drill, that image is stored. The app asks for camera
                and photo library access only at the moment you choose to add one.
              </li>
            </ul>
          </Section>

          <Section title="How your information is used">
            <p>
              To run the app: to keep you signed in, to save your library across devices, and to
              turn a link you share into a structured drill or protocol. We do not sell your
              information, we do not share it with advertisers, and we do not use it to build
              advertising profiles.
            </p>
          </Section>

          <Section title="Services we rely on">
            <p>
              Reel Prep sends limited information to the following companies so the app can
              function. Each of them acts on our behalf and under their own privacy terms.
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-2">
              <li>
                <strong>Supabase. </strong>
                Hosts our database, file storage, and sign-in system. Your account and everything
                in your library lives here.
              </li>
              <li>
                <strong>Google (Gemini). </strong>
                Reads the text of content you share in order to extract the exercises, sets, and
                instructions from it. It receives that content, not your identity.
              </li>
              <li>
                <strong>Supadata. </strong>
                Produces transcripts of videos and podcast episodes you share.
              </li>
              <li>
                <strong>Apify and RapidAPI. </strong>
                Fetch publicly available media and details for the links you share.
              </li>
              <li>
                <strong>Fly.io. </strong>
                Runs the background service that cuts short clips out of source videos.
              </li>
              <li>
                <strong>Apple. </strong>
                Handles Sign in with Apple, if you use it.
              </li>
            </ul>
          </Section>

          <Section title="Content from other platforms">
            <p>
              Reel Prep works with links to services such as YouTube, Instagram, TikTok, and
              Facebook. We only retrieve what is already publicly available at the address you
              share. We have no access to your accounts on those platforms, and sharing a link to
              Reel Prep does not connect them.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              Your library stays until you delete it or close your account. Deleting a drill,
              protocol, or collection removes it from our systems. Deleting your account removes
              your account record and the content attached to it; backups holding copies are
              overwritten on a rolling basis within 30 days. See{" "}
              <em>Deleting your account and your data</em> above for the steps.
            </p>
          </Section>

          <Section title="Your choices">
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>You can edit or delete any drill, protocol, or collection from inside the app.</li>
              <li>
                You can delete your account and everything in it from Settings, or by email — see{" "}
                <em>Deleting your account and your data</em> above.
              </li>
              <li>
                You can request a copy of the information we hold about you at the address below.
              </li>
              <li>
                Photo and camera access can be revoked at any time in your device settings. Doing
                so only prevents you from adding new pictures.
              </li>
            </ul>
          </Section>

          <Section title="Security">
            <p>
              Information is encrypted in transit and at rest, and access to your library is
              restricted to your own account. No system is perfectly secure, so we cannot promise
              absolute protection — but we do not hold payment card details, and we do not store
              passwords in a readable form.
            </p>
          </Section>

          <Section title="Children">
            <p>
              Reel Prep is not directed at children under 13, and we do not knowingly collect
              information from them. If you believe a child has given us information, contact us
              and we will remove it.
            </p>
          </Section>

          <Section title="International users">
            <p>
              Reel Prep is operated from the United States, and the services listed above may
              process information in the United States and elsewhere. Using the app means your
              information may be transferred to and stored in those places.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We will update this page when the app changes what it collects, and we will move the
              date at the top when we do. Material changes will be announced in the app.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions, deletion requests, or anything else — write to{" "}
              <a href="mailto:ebusalacchi@eliteprep.app" style={{ color: "var(--brand)" }}>
                ebusalacchi@eliteprep.app
              </a>{" "}
              and we will get back to you.
            </p>
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
