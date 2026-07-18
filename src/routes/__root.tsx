import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

const FONTS_CSS_HREF =
  "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Fira+Sans:wght@300;400;500;600;700&display=swap";

// Critical CSS inlined into the HTML shell so the browser can paint immediately
// without waiting for the stylesheet network round-trip (~330 ms saved).
// Covers: CSS custom properties, body defaults, hero background, and the dark-mode
// toggle so there is no flash of unstyled / wrong-theme content.
const CRITICAL_CSS = `
:root{--radius:1rem;--background:oklch(0.97 0.015 130);--foreground:oklch(0.25 0.04 150);--card:oklch(0.995 0.005 130);--card-foreground:oklch(0.25 0.04 150);--primary:oklch(0.45 0.09 148);--primary-foreground:oklch(0.97 0.02 130);--secondary:oklch(0.92 0.03 140);--secondary-foreground:oklch(0.28 0.05 148);--muted:oklch(0.93 0.02 140);--muted-foreground:oklch(0.45 0.03 148);--accent:oklch(0.60 0.11 142);--accent-foreground:oklch(0.98 0.01 130);--border:oklch(0.87 0.02 140);--ring:oklch(0.45 0.09 148);--destructive:oklch(0.55 0.19 25);--color-background:var(--background);--color-foreground:var(--foreground);--color-card:var(--card);--color-primary:var(--primary);--color-border:var(--border);--font-display:"DM Serif Display",Georgia,serif;--font-sans:"Fira Sans",system-ui,sans-serif;}
.dark{--background:oklch(0.34 0.032 148);--foreground:oklch(0.97 0.015 130);--card:oklch(0.40 0.038 148);--card-foreground:oklch(0.97 0.015 130);--primary:oklch(0.85 0.08 140);--primary-foreground:oklch(0.28 0.04 150);--secondary:oklch(0.47 0.04 148);--secondary-foreground:oklch(0.97 0.015 130);--muted:oklch(0.41 0.032 148);--muted-foreground:oklch(0.84 0.03 140);--accent:oklch(0.68 0.10 142);--accent-foreground:oklch(0.22 0.04 150);--border:oklch(0.50 0.038 148);--ring:oklch(0.85 0.08 140);--destructive:oklch(0.66 0.18 25);}
*{border-color:var(--color-border);}
body{background-color:var(--color-background);color:var(--color-foreground);font-family:var(--font-sans);-webkit-font-smoothing:antialiased;}
h1,h2,h3{font-family:var(--font-display);letter-spacing:-0.01em;}
`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tree Clarence — Guardians of Ancient Canopies" },
      { name: "description", content: "Tree Clarence tends the world's oldest trees with immersive stories, arborist expertise, and a scroll through the forest canopy." },
      { property: "og:title", content: "Tree Clarence — Guardians of Ancient Canopies" },
      { property: "og:description", content: "Tree Clarence tends the world's oldest trees with immersive stories, arborist expertise, and a scroll through the forest canopy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Tree Clarence — Guardians of Ancient Canopies" },
      { name: "twitter:description", content: "Tree Clarence tends the world's oldest trees with immersive stories, arborist expertise, and a scroll through the forest canopy." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d7360e31-41c2-4f06-a4ee-3c25d7a316ea/id-preview-df1f5271--9ddf648f-a858-48ee-8373-3448baf760c7.lovable.app-1784059896002.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d7360e31-41c2-4f06-a4ee-3c25d7a316ea/id-preview-df1f5271--9ddf648f-a858-48ee-8373-3448baf760c7.lovable.app-1784059896002.png" },
    ],
    links: [
      // No manual preload for the hero image here: it duplicated the <link rel="preload">
      // that React auto-generates from the <img fetchPriority="high"> in HeroSection,
      // and the duplicate (lacking fetchpriority) was winning the priority race.
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      // link.kdlead.com hosts the GHL form iframe and its embed script: preconnecting
      // here saves ~310 ms on LCP according to Lighthouse.
      { rel: "preconnect", href: "https://link.kdlead.com" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* Critical CSS inlined — eliminates the render-blocking stylesheet round-trip */}
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
        {/* Theme toggle runs before paint to avoid flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t!=="light")}catch(e){document.documentElement.classList.add("dark")}})()`,
          }}
        />
        {/* Full Tailwind stylesheet — blocking so utility classes are available before
            first paint. This prevents layout shift from Tailwind utilities applying
            after the page is already visible. Critical CSS above handles base styles
            so the blocking wait is minimal (browser may have it cached). */}
        <link rel="stylesheet" href={appCss} />
        {/* Google Fonts — non-blocking, not on critical path */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement("link");l.rel="stylesheet";l.href=${JSON.stringify(FONTS_CSS_HREF)};l.media="print";l.onload=function(){this.media="all"};document.head.appendChild(l)})()`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={FONTS_CSS_HREF} />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Outlet />
      <Footer />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}
