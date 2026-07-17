import { useEffect, useState } from "react";

const EMBED_SCRIPT_SRC = "https://link.kdlead.com/js/form_embed.js";
const LOAD_TIMEOUT_MS = 8000;

export function GHLContactForm() {
  const [loaded, setLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loaded) setShowFallback(true);
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [loaded]);

  return (
    <div className="relative">
      <iframe
        src="https://link.kdlead.com/widget/form/PfCYLIwBwBPyLIV9h4Gl"
        style={{ width: "100%", height: "891px", border: "none", borderRadius: "8px" }}
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
        title="Form 0"
        onLoad={() => setLoaded(true)}
      />

      {showFallback && !loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            The form is taking a while to load. If it doesn't appear, your browser's ad
            blocker or privacy shield may be blocking it — try disabling it for this site,
            or reach us directly:
          </p>
          <a
            href="tel:7167108864"
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Call 716-710-8864
          </a>
        </div>
      )}
    </div>
  );
}
