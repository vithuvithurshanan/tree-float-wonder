import { useEffect, useRef, useState } from "react";

const EMBED_SCRIPT_SRC = "https://link.kdlead.com/js/form_embed.js";
const FORM_SRC =
  "https://link.kdlead.com/widget/form/PfCYLIwBwBPyLIV9h4Gl";

const LOAD_TIMEOUT_MS = 8000;

export function GHLContactForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Load the form only when the contact section is close to the viewport.
  useEffect(() => {
    const container = containerRef.current;

    if (!container || shouldLoad) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldLoad(true);
        observer.disconnect();
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [shouldLoad]);

  // Inject the LeadConnector embed script only after the form is requested.
  useEffect(() => {
    if (!shouldLoad) return;

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT_SRC}"]`,
    );

    if (existingScript) return;

    const script = document.createElement("script");

    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    script.id = "ghl-form-embed-script";

    document.body.appendChild(script);
  }, [shouldLoad]);

  // Start the fallback timeout only after loading begins.
  useEffect(() => {
    if (!shouldLoad || loaded) return;

    const timer = window.setTimeout(() => {
      setShowFallback(true);
    }, LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timer);
  }, [shouldLoad, loaded]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[891px]"
    >
      {!shouldLoad && (
        <div
          className="flex min-h-[891px] items-center justify-center rounded-lg bg-card/40"
          aria-label="Contact form will load when visible"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div
              className="h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary"
              aria-hidden="true"
            />

            <p className="text-sm text-muted-foreground">
              Contact form loading…
            </p>
          </div>
        </div>
      )}

      {shouldLoad && (
        <iframe
          src={FORM_SRC}
          style={{
            width: "100%",
            height: "891px",
            border: "none",
            borderRadius: "8px",
          }}
          id="inline-PfCYLIwBwBPyLIV9h4Gl"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Form 0"
          data-height="891"
          data-layout-iframe-id="inline-PfCYLIwBwBPyLIV9h4Gl"
          data-form-id="PfCYLIwBwBPyLIV9h4Gl"
          title="Contact form"
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-storage-access-by-user-activation"
          allow="storage-access"
          loading="lazy"
          onLoad={() => {
            setLoaded(true);
            setShowFallback(false);
          }}
        />
      )}

      {shouldLoad && showFallback && !loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg bg-card p-8 text-center">
          <p className="max-w-md text-sm text-muted-foreground">
            The form is taking longer than expected to load. Your browser's
            privacy protection or ad blocker may be blocking it. You can also
            contact us directly.
          </p>

          <a
            href="tel:7167108864"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Call 716-710-8864
          </a>
        </div>
      )}
    </div>
  );
}