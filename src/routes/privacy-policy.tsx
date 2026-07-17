import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — Tree Clarence" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <section className="relative py-32 px-6 md:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">Legal</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-12">Last updated: July 17, 2026</p>

          <div className="space-y-10 text-muted-foreground leading-relaxed">
            <div>
              <p>
                Tree Clarence, operated by KD Associates Buffalo INC ("we," "us," or "our"), respects
                your privacy. This Privacy Policy explains how we collect, use, and protect your
                information when you visit our website or use our services.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Information We Collect</h2>
              <p>
                When you contact us or request a quote, we may collect your name, email address,
                phone number, property address, and any details you provide about the services you
                need.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to your inquiries and provide quotes</li>
                <li>To schedule and perform tree care services</li>
                <li>To send appointment reminders and service updates</li>
                <li>To improve our website and services</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">SMS / Text Messaging</h2>
              <p className="mb-3">
                If you opt in to receive text messages from us, we will use your phone number solely
                to communicate with you about your inquiries, quotes, appointments, and services.
              </p>
              <p className="mb-3 font-medium text-foreground">
                No mobile information will be shared with third parties or affiliates for marketing
                or promotional purposes. All the above categories exclude text messaging originator
                opt-in data and consent; this information will not be shared with any third parties.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Message frequency varies based on your interaction with us.</li>
                <li>Message and data rates may apply.</li>
                <li>Reply STOP at any time to opt out of receiving text messages.</li>
                <li>Reply HELP for assistance, or contact us at 716-710-8864.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Sharing of Information</h2>
              <p>
                We do not sell, rent, or trade your personal information. We may share information
                only with service providers who help us operate our business (such as scheduling or
                payment processing), and only as necessary to provide our services or as required by
                law.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Data Security</h2>
              <p>
                We take reasonable measures to protect your personal information from unauthorized
                access, use, or disclosure.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl text-foreground mb-3">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, contact us at:
                <br />
                <br />
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
