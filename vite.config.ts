// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { imagetools } from "vite-imagetools";

// `npm run build:firebase` sets FIREBASE_BUILD=1 to produce a fully prerendered static
// site in dist/client for Firebase Hosting. Normal builds keep the default
// Lovable/Cloudflare SSR output — nitro must stay on there, and its .output layout
// is incompatible with TanStack Start's prerender preview server.
const firebaseBuild = !!process.env.FIREBASE_BUILD;

export default defineConfig({
  nitro: firebaseBuild ? false : undefined,
  tanstackStart: {
    server: { entry: "server" },
    ...(firebaseBuild ? { prerender: { enabled: true, crawlLinks: true } } : {}),
  },
  vite: {
    plugins: [imagetools()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // framer-motion is large (~50 KiB gzipped) — isolate it so it's
            // cached independently and only blocks routes that need it.
            if (id.includes("node_modules/framer-motion")) return "framer-motion";
            // Radix UI primitives are shared across many routes — one cache entry.
            if (id.includes("node_modules/@radix-ui")) return "radix-ui";
            // React core — tiny but useful to split for long-term caching.
            if (id.includes("node_modules/react-dom") || id.includes("node_modules/react/")) return "react";
          },
        },
      },
    },
  },
});
