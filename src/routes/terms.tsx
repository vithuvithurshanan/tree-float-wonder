import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms of Service — Tree Clarence" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <section className="relative py-32 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">Legal</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: July 17, 2026</p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <div>
              <p>
                These Terms of Service govern your use of the Tree Clarence website and services,
                operated by KD Associates Buffalo INC. By using our website or requesting our
                services, you agree to these terms.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Services</h2>
              <p>
                Tree Clarence provides professional tree care services including tree trimming and
                pruning, tree removal, stump grinding, and 24/7 emergency tree service in Clarence
                Center, Buffalo, and surrounding Western New York communities. All quotes are free
                and no-obligation. Final pricing may vary based on an on-site assessment.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">SMS Terms &amp; Conditions</h2>
              <p className="mb-3">
                By providing your phone number and opting in, you consent to receive text messages
                from Tree Clarence (KD Associates Buffalo INC) regarding your inquiries, quotes,
                appointments, and service updates.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Messaging frequency may vary based on your interaction with us.</li>
                <li>Message and data rates may apply.</li>
                <li>
                  You can opt out at any time by replying <span className="text-foreground font-medium">STOP</span>.
                </li>
                <li>
                  For assistance, reply <span className="text-foreground font-medium">HELP</span> or call{" "}
                  <a href="tel:7167108864" className="text-primary hover:underline">716-710-8864</a>.
                </li>
                <li>Consent to receive text messages is not a condition of purchasing any services.</li>
                <li>Carriers are not liable for delayed or undelivered messages.</li>
              </ul>
              <p className="mt-3">
                For details on how we handle your information, see our{" "}
                <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Estimates &amp; Payment</h2>
              <p>
                Written estimates are valid for 30 days unless otherwise stated. Payment is due upon
                completion of work unless other arrangements are agreed to in writing.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Liability</h2>
              <p>
                We are fully licensed and insured. We follow industry safety protocols on every job
                to protect your property and our crew. Our liability is limited to the value of the
                services provided.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Changes to These Terms</h2>
              <p>
                We may update these terms from time to time. Continued use of our website or
                services after changes constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Contact Us</h2>
              <p>
                KD Associates Buffalo INC (Tree Clarence)
                <br />
                9950 County Rd, Clarence Center, NY 14032
                <br />
                Phone: <a href="tel:7167108864" className="text-primary hover:underline">716-710-8864</a>
                <br />
                Email:{" "}
                <a href="mailto:kdassociatebfinc@gmail.com" className="text-primary hover:underline">
                  kdassociatebfinc@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
