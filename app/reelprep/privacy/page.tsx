// Mockingbird's privacy policy (the app was called Reel Prep, hence the URL, which stays put because
// both stores' Data safety / privacy fields point at it). Separate from /privacy, which covers Elite
// Prep and describes golf performance data — Mockingbird handles a different set entirely (shared links, transcripts, drill
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
  title: "Mockingbird Privacy Policy",
  description: "How Mockingbird collects, uses, and stores your information, and how to delete it."
}

const LAST_UPDATED = "September 30, 2026"

export default function MockingbirdPrivacyPolicy() {
  return (
    <div className="min-h-screen px-6 py-12" style={{ background: "var(--bg)" }}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-medium mb-2" style={{ color: "var(--text-primary)" }}>
          Mockingbird Privacy Policy
        </h1>
        <p className="text-sm mb-10" style={{ color: "var(--text-tertiary)" }}>
          Last updated {LAST_UPDATED}
        </p>

        <div className="flex flex-col gap-8 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <Section title="Overview">
            <p>
              Mockingbird (formerly called Reel Prep) is made by Elite Prep Inc. It lets you save
              content you find online, like videos, posts, web pages, and podcast episodes about
              workouts, projects, recipes, and routines, and turns it into steps you can actually
              follow. This policy explains what the app collects, why, and who else sees
              it. It covers the Mockingbird mobile app only; Elite Prep&apos;s
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
              You can delete your Mockingbird account, and everything in it, from inside the app at
              any time. You do not need to contact us and you do not need to explain why.
            </p>

            <h3 className="text-sm font-semibold mt-4 mb-1.5" style={{ color: "var(--text-primary)" }}>
              To delete your account and all of its data
            </h3>
            <ol className="list-decimal pl-5 flex flex-col gap-1.5">
              <li>Open Mockingbird and go to your <strong>Account</strong> page.</li>
              <li>Tap your name at the top.</li>
              <li>Tap <strong>Delete account</strong>.</li>
              <li>
                Confirm twice. The app asks once, then asks again, because deletion is permanent
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
              Anything you saved, and any protocol, collection, or workout, can be deleted from inside the
              app, which removes it and its logged sets and reps from our systems. If you want a
              larger clear out, for example everything you have ever imported but not your account,
              email the address above and say what you want removed.
            </p>

            <h3 className="text-sm font-semibold mt-4 mb-1.5" style={{ color: "var(--text-primary)" }}>
              What is deleted, and what is kept
            </h3>
            <p>Deleting your account permanently removes:</p>
            <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1.5">
              <li>Your account record, including your email address</li>
              <li>Everything you saved, and every protocol, collection, and workout</li>
              <li>The links you shared and the transcripts and text extracted from them</li>
              <li>Any photos you added</li>
              <li>Your workout history, including logged sets and reps</li>
            </ul>
            <p className="mt-2">
              Nothing in your library is retained for our own use afterwards. Two narrow
              exceptions: any records we are required by law to keep, and encrypted backups that
              still hold copies at the moment of deletion. Those are overwritten on a rolling basis
              and are fully gone within 30 days. We hold no payment details, because the app takes
              no payments.
            </p>
            <p className="mt-2">
              Usage events and crash reports, described under{" "}
              <em>Information collected automatically</em>, are not deleted with your account.
              They are linked only to random ids, never to your email address or name, and the
              services that hold them delete them automatically after a limited time. If you want
              the usage events linked to your account deleted sooner, email us before you delete
              your account and we will remove them.
            </p>

            <h3 className="text-sm font-semibold mt-4 mb-1.5" style={{ color: "var(--text-primary)" }}>
              If you use Mockingbird without an account
            </h3>
            <p>
              Your library is stored under an anonymous id instead of an account. You can delete
              anything you saved from inside the app, and deleting it removes it from our systems.
              Deleting the app from your phone does not delete what is stored on our servers, so
              delete your saved items first. To remove everything at once, create an account from
              your Account page using email or Google, which keeps your library, and then delete
              that account using the steps above.
            </p>
          </Section>

          <Section title="Information you give us">
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>
                <strong>Account details. </strong>
                Your email address, and a password if you create an account that way. You can
                instead sign in with Apple or Google. With Apple we receive whatever address Apple
                chooses to share, including a private relay address if you choose to hide yours;
                with Google we receive your email address and name. You can also use the app
                without an account, in which case we store your library under an anonymous id.
              </li>
              <li>
                <strong>Links you share. </strong>
                When you share a video, post, web page, or podcast episode into Mockingbird, we
                store that web address and the text we extract from it. If you open a web page
                with the app&apos;s built-in browser, the page loads directly from that website;
                we only receive its text when you choose to import it.
              </li>
              <li>
                <strong>Content you create. </strong>
                What you save, your protocols, collections, and workouts, text you type in, and the
                sets and reps you log.
              </li>
              <li>
                <strong>Photos. </strong>
                If you import from photos, or add a picture to something you saved, those images
                are stored and read so the app can turn them into steps. The app asks for camera
                and photo library access only at the moment you choose to add one.
              </li>
            </ul>
          </Section>

          <Section title="Information collected automatically">
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>
                <strong>Usage events. </strong>
                A small number of events about how the app is used: that onboarding was finished,
                that an import was started, succeeded or failed (with the kind of source, such as
                &ldquo;YouTube&rdquo;, and how long it took), that something was saved, and that
                something was marked done. Also which screens are opened, and when the app is
                opened or closed. These carry a random device id and, if you have an account, your
                account&apos;s random user id. They never include the link you imported, your email
                address, or your name. The analytics service may use your IP address to estimate a
                rough location, such as your country.
              </li>
              <li>
                <strong>Crash reports. </strong>
                If the app crashes or hits an error, a report is sent with technical details: what
                went wrong, where in the code, your device model, operating system version, and
                app version. Crash reports are set up not to include your email address or name.
              </li>
            </ul>
            <p className="mt-2">
              We use these to find out where the app breaks and where people get stuck, and to
              fix it. They are not used for advertising.
            </p>
          </Section>

          <Section title="How your information is used">
            <p>
              To run the app: to keep you signed in, to save your library across devices, to turn
              what you share into steps you can follow, and to find and fix problems. We do not sell your
              information, we do not share it with advertisers, and we do not use it to build
              advertising profiles.
            </p>
          </Section>

          <Section title="Services we rely on">
            <p>
              Mockingbird sends limited information to the following companies so the app can
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
                Reads the content you share, including videos and photos, in order to extract the
                steps, amounts, and instructions from it. It receives that content, not your
                identity.
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
                <strong>PostHog. </strong>
                Receives the usage events described above.
              </li>
              <li>
                <strong>Sentry. </strong>
                Receives the crash reports described above.
              </li>
              <li>
                <strong>Apple and Google. </strong>
                Handle Sign in with Apple and Sign in with Google, if you use them.
              </li>
            </ul>
          </Section>

          <Section title="Content from other platforms">
            <p>
              Mockingbird works with links to services such as YouTube, Instagram, TikTok, and
              Facebook. We only retrieve what is already publicly available at the address you
              share. We have no access to your accounts on those platforms, and sharing a link to
              Mockingbird does not connect them.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              Your library stays until you delete it or close your account. Deleting something you
              saved, or a protocol or collection, removes it from our systems. Deleting your account removes
              your account record and the content attached to it; backups holding copies are
              overwritten on a rolling basis within 30 days. See{" "}
              <em>Deleting your account and your data</em> above for the steps.
            </p>
          </Section>

          <Section title="Your choices">
            <ul className="list-disc pl-5 flex flex-col gap-1.5">
              <li>You can edit or delete anything you saved, and any protocol or collection, from inside the app.</li>
              <li>
                You can delete your account and everything in it from your Account page, or by email. See{" "}
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
              restricted to your own account. Photos you add are the one exception: they are
              stored at long, randomly generated web addresses so the app can display them, which
              means anyone who has the exact address could open the image. No system is perfectly secure, so we cannot promise
              absolute protection. We do not hold payment card details, and we do not store
              passwords in a readable form.
            </p>
          </Section>

          <Section title="Children">
            <p>
              Mockingbird is not directed at children under 13, and we do not knowingly collect
              information from them. If you believe a child has given us information, contact us
              and we will remove it.
            </p>
          </Section>

          <Section title="International users">
            <p>
              Mockingbird is operated from the United States, and the services listed above may
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
              For questions, deletion requests, or anything else, write to{" "}
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
