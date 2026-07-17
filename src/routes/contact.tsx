import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GHLContactForm } from "@/components/GHLContactForm";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">Get In Touch</p>
            <h1 className="font-display text-4xl md:text-6xl font-semibold mb-6">
              Request a <span className="text-gradient-sun italic">Free Quote</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Ready to transform your property? Contact us today for a free, no-obligation estimate.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
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
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card border border-border rounded-3xl p-4 md:p-6 shadow-sm"
            >
              <GHLContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
