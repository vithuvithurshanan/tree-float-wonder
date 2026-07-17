import { Clock, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const QUICK_LINKS = [
  { href: "/#top", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About Us" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#contact", label: "Contact" },
];

const SERVICES = [
  "Tree Trimming & Pruning",
  "Tree Removal",
  "Stump Grinding",
  "24/7 Emergency Tree Service",
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background px-6 md:px-12 pt-16 pb-28 md:pb-10 text-sm text-muted-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <a href="/#top" className="mb-4 flex items-center gap-3 font-display text-lg font-semibold tracking-tight text-foreground">
              <img
                src={logo}
                alt="Tree Clarence logo"
                className="h-14 w-14 shrink-0 rounded-2xl bg-white object-cover"
              />
              Tree Clarence
            </a>
            <p className="leading-relaxed">
              Buffalo's premier tree experts. Locally owned and operated, committed to the highest
              standards of care, safety, and customer satisfaction.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 font-display text-base text-foreground">Quick Links</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-display text-base text-foreground">Our Services</h3>
            <ul className="space-y-2.5">
              {SERVICES.map((service) => (
                <li key={service}>
                  <a href="/#services" className="transition-colors hover:text-foreground">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-display text-base text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="tel:7167108864" className="transition-colors hover:text-foreground">
                  716-710-8864
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a
                  href="mailto:kdassociatebfinc@gmail.com"
                  className="break-all transition-colors hover:text-foreground"
                >
                  kdassociatebfinc@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <address className="not-italic">
                  9950 County Rd
                  <br />
                  Clarence Center, NY 14032
                </address>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  Mon – Sat: 7:00 AM – 7:00 PM
                  <br />
                  Emergency: 24/7
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <span>© {new Date().getFullYear()} Tree Clarence · KD Associates Buffalo INC. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </a>
            <a href="/terms" className="transition-colors hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
