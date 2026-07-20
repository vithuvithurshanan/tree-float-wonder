import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";


const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Please tell us your name." })
    .max(100, { message: "Name must be less than 100 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." })
    .max(255, { message: "Email must be less than 255 characters." }),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9() .-]{10,20}$/, { message: "Please enter a valid phone number." }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(1000, { message: "Message must be less than 1000 characters." }),
});

type ContactValues = z.infer<typeof contactSchema>;
type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: keyof ContactValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: ContactErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof ContactValues;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    // Simulate submission
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSent(true);
    setValues({ name: "", email: "", phone: "", message: "" });
    setSmsConsent(false);
    toast.success("Message sent", {
      description: "We'll be in touch within a few days.",
    });
  };

  if (sent) {
    return (
     <div className="contact-success-pop mx-auto max-w-md rounded-2xl border border-primary/40 bg-primary/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="font-display text-2xl mb-2">Message received.</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Thanks for reaching out. An arborist will reply from the grove within a few days.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full rounded-xl bg-background border px-4 py-3 text-sm outline-none transition-colors focus:border-primary placeholder:text-muted-foreground/60";

  return (
    <form onSubmit={onSubmit} noValidate className="mx-auto max-w-xl text-left space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={values.name}
            onChange={update("name")}
            maxLength={100}
            aria-invalid={!!errors.name}
            className={`${inputBase} ${errors.name ? "border-destructive" : "border-border"}`}
            placeholder="Elowen Clarence"
          />
          {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={update("email")}
            maxLength={255}
            aria-invalid={!!errors.email}
            className={`${inputBase} ${errors.email ? "border-destructive" : "border-border"}`}
            placeholder="you@grove.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={update("phone")}
          maxLength={20}
          aria-invalid={!!errors.phone}
          className={`${inputBase} ${errors.phone ? "border-destructive" : "border-border"}`}
          placeholder="(716) 555-0123"
        />
        {errors.phone && <p className="mt-1.5 text-xs text-destructive">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
          Message
        </label>
        <textarea
          id="message"
          value={values.message}
          onChange={update("message")}
          maxLength={1000}
          rows={5}
          aria-invalid={!!errors.message}
          className={`${inputBase} resize-none ${errors.message ? "border-destructive" : "border-border"}`}
          placeholder="Tell us when you'd like to visit, or which trees you'd love to meet…"
        />
        <div className="mt-1.5 flex justify-between text-xs">
          <span className="text-destructive">{errors.message ?? ""}</span>
          <span className="text-muted-foreground/70">{values.message.length}/1000</span>
        </div>
      </div>
      <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed cursor-pointer">
        <input
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          By checking this box, I agree to receive SMS text messages from Tree Clarence
          (KD Associates Buffalo INC) regarding quotes, appointments, and service updates.
          Message frequency varies. Message and data rates may apply. Reply STOP to opt out
          or HELP for help. See our{" "}
          <a href="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms" className="underline underline-offset-2 hover:text-foreground">
            Terms of Service
          </a>
          . Consent is not a condition of purchase.
        </span>
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
