import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";


const GHLContactForm = lazy(() =>
  import("@/components/GHLContactForm").then((m) => ({ default: m.GHLContactForm }))
);

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
        <div className="fade-up in-view text-center mb-16">
            <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">Get In Touch</p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold mb-6">
              Request a <span className="text-gradient-sun italic">Free Quote</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Ready to transform your property? Contact us today for a free, no-obligation estimate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
            {/* Contact Info */}
            <div className="fade-left in-view flex flex-col gap-6">
              <div className="flex gap-4 items-start bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
                <span className="text-3xl bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl shrink-0">
                  📞
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Call Us Anytime</p>
                  <a
                    href="tel:7167108864"
                    className="text-2xl font-semibold hover:text-primary transition-colors block mb-1"
                  >
                    716-710-8864
                  </a>
                  <p className="text-sm text-muted-foreground">Available 24/7 for emergencies</p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
                <span className="text-3xl bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl shrink-0">
                  📍
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Our Location</p>
                  <address className="not-italic text-lg mb-1">
                    9950 County Rd
                    <br />
                    Clarence Center, NY 14032
                    <br />
                    United States
                  </address>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-card/50 border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors">
                <span className="text-3xl bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl shrink-0">
                  🕐
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Business Hours</p>
                  <p className="text-lg mb-1">Mon – Sat: 7:00 AM – 7:00 PM</p>
                  <p className="text-sm text-muted-foreground">Emergency: 24/7</p>
                </div>
              </div>
        </div>

            {/* Contact Form */}
           <div className="fade-up in-view bg-card border border-border rounded-3xl p-4 md:p-6 shadow-sm"
style={{ transitionDelay: "0.2s" }}>
              <Suspense fallback={
                <div className="w-full rounded-xl bg-card/40 animate-pulse" style={{ height: 891 }} aria-label="Loading contact form…" />
              }>
                <GHLContactForm />
              </Suspense>
           </div>
          </div>
        </div>
      </section>
    </main>
  );
}
