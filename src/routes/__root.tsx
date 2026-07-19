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

// Critical CSS inlined into the HTML shell — two parts:
// 1. Design tokens + base styles (vars, body, headings)
// 2. Above-fold Tailwind utilities for the hero section, so layout is correct
//    before the full stylesheet loads non-blocking (avoids CLS on first paint).
const CRITICAL_CSS = `
:root{--radius:1rem;--background:oklch(0.97 0.015 130);--foreground:oklch(0.25 0.04 150);--card:oklch(0.995 0.005 130);--card-foreground:oklch(0.25 0.04 150);--primary:oklch(0.45 0.09 148);--primary-foreground:oklch(0.97 0.02 130);--secondary:oklch(0.92 0.03 140);--secondary-foreground:oklch(0.28 0.05 148);--muted:oklch(0.93 0.02 140);--muted-foreground:oklch(0.45 0.03 148);--accent:oklch(0.60 0.11 142);--accent-foreground:oklch(0.98 0.01 130);--border:oklch(0.87 0.02 140);--ring:oklch(0.45 0.09 148);--destructive:oklch(0.55 0.19 25);--color-background:var(--background);--color-foreground:var(--foreground);--color-card:var(--card);--color-card-foreground:var(--card-foreground);--color-primary:var(--primary);--color-primary-foreground:var(--primary-foreground);--color-secondary:var(--secondary);--color-secondary-foreground:var(--secondary-foreground);--color-muted:var(--muted);--color-muted-foreground:var(--muted-foreground);--color-accent:var(--accent);--color-accent-foreground:var(--accent-foreground);--color-border:var(--border);--color-ring:var(--ring);--font-display:"DM Serif Display",Georgia,serif;--font-sans:"Fira Sans",system-ui,sans-serif;--radius-sm:calc(var(--radius) - 4px);--radius-md:calc(var(--radius) - 2px);--radius-lg:var(--radius);--radius-xl:calc(var(--radius) + 4px);}
.dark{--background:oklch(0.34 0.032 148);--foreground:oklch(0.97 0.015 130);--card:oklch(0.40 0.038 148);--card-foreground:oklch(0.97 0.015 130);--primary:oklch(0.85 0.08 140);--primary-foreground:oklch(0.28 0.04 150);--secondary:oklch(0.47 0.04 148);--secondary-foreground:oklch(0.97 0.015 130);--muted:oklch(0.41 0.032 148);--muted-foreground:oklch(0.84 0.03 140);--accent:oklch(0.68 0.10 142);--accent-foreground:oklch(0.22 0.04 150);--border:oklch(0.50 0.038 148);--ring:oklch(0.85 0.08 140);--destructive:oklch(0.66 0.18 25);}
*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:var(--color-border);}
*{margin:0;padding:0;}
html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:var(--font-sans);}
body{background-color:var(--color-background);color:var(--color-foreground);font-family:var(--font-sans);-webkit-font-smoothing:antialiased;line-height:inherit;}
h1,h2,h3{font-family:var(--font-display);letter-spacing:-0.01em;}
img,video{max-width:100%;height:auto;display:block;}
/* Above-fold layout utilities — hero section */
.relative{position:relative}.absolute{position:absolute}.fixed{position:fixed}.inset-0{inset:0}.inset-x-0{left:0;right:0}
.overflow-hidden{overflow:hidden}.overflow-x-hidden{overflow-x:hidden}
.h-\\[100vh\\]{height:100vh}.h-full{height:100%}.h-\\[110\\%\\]{height:110%}.w-full{width:100%}.w-auto{width:auto}.w-\\[130\\%\\]{width:130%}
.max-w-none{max-width:none}
.bottom-0{bottom:0}.bottom-4{bottom:1rem}.bottom-\\[-40px\\]{bottom:-40px}.left-0{left:0}.left-4{left:1rem}.left-1\\/2{left:50%}.top-0{top:0}.top-4{top:1rem}.top-9{top:2.25rem}.z-10{z-index:10}.z-20{z-index:20}.z-50{z-index:50}
.flex{display:flex}.hidden{display:none}.items-center{align-items:center}.justify-center{justify-content:center}.flex-col{flex-direction:column}
.px-4{padding-left:1rem;padding-right:1rem}
.select-none{user-select:none}.pointer-events-none{pointer-events:none}
.-translate-x-1\\/2{transform:translateX(-50%)}.-ml-\\[15\\%\\]{margin-left:-15%}
.object-cover{object-fit:cover}.object-bottom{object-position:bottom}
.text-center{text-align:center}.px-6{padding-left:1.5rem;padding-right:1.5rem}
.opacity-90{opacity:0.9}
/* bg-sky-gradient utility — hero background color, critical to avoid flash */
.bg-sky-gradient{background:linear-gradient(180deg,oklch(0.30 0.05 200) 0%,oklch(0.45 0.08 160) 45%,oklch(0.65 0.11 142) 100%);}
/* nav-frame — fixed header positioning */
.nav-frame{--nav-item-w:4rem;--nav-pad-x:0.5rem;--notch-x:calc(var(--nav-pad-x) + (var(--nav-index,0) + 0.5) * var(--nav-item-w));transition:--notch-x 0.45s cubic-bezier(0.34,1.56,0.64,1);}
@media(min-width:768px){.nav-frame{--nav-item-w:7rem;}.md\\:flex{display:flex;}.md\\:hidden{display:none;}.md\\:bottom-auto{bottom:auto;}}
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
        {/* Critical CSS inlined — covers design tokens + above-fold hero layout.
            The full Tailwind sheet loads non-blocking so it never delays first paint. */}
        <style dangerouslySetInnerHTML={{ __html: CRITICAL_CSS }} />
        {/* Theme toggle runs before paint to avoid flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");document.documentElement.classList.toggle("dark",t!=="light")}catch(e){document.documentElement.classList.add("dark")}})()`,
          }}
        />
        {/* Full Tailwind stylesheet — non-blocking (print→all swap).
            Critical CSS above covers everything needed for first paint, so deferring
            this sheet cannot cause layout shift. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement("link");l.rel="stylesheet";l.href=${JSON.stringify(appCss)};l.media="print";l.onload=function(){this.media="all"};document.head.appendChild(l)})()`,
          }}
        />
        {/* Google Fonts — also non-blocking */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement("link");l.rel="stylesheet";l.href=${JSON.stringify(FONTS_CSS_HREF)};l.media="print";l.onload=function(){this.media="all"};document.head.appendChild(l)})()`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={appCss} />
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
