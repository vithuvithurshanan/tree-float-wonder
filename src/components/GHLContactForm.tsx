import { useEffect } from "react";

const EMBED_SCRIPT_SRC = "https://link.kdlead.com/js/form_embed.js";

export function GHLContactForm() {
  useEffect(() => {
    if (document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
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
    />
  );
}
