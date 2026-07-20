import { useEffect, useState, type CSSProperties } from "react";
import { Home, Image, Mail, Moon, Sun, TreePine, Users } from "lucide-react";
import { cn } from "@/lib/utils";
// Rendered at 48-56px; serve a properly downsized webp instead of the raw 465 KB PNG.
import logo from "@/assets/logo.png?w=112&format=webp&quality=65&url";

const NAV_ITEMS = [
  { id: "top", label: "Home", icon: Home },
  { id: "services", label: "Services", icon: TreePine },
  { id: "about", label: "About", icon: Users },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "contact", label: "Contact", icon: Mail },
];

function ThemeToggle() {
  // Read the theme synchronously from the DOM (set by the inline script in __root.tsx)
  // so the correct icon renders on first paint with no hydration shift.
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "dark"; // SSR default matches the inline script default
  });

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/30 bg-card/30 text-foreground shadow-xl shadow-black/10 backdrop-blur-md transition-colors hover:bg-card/50"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
}

export function Header() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // entry.boundingClientRect is pre-computed by the browser when the IO
        // callback fires — reading it here does NOT force a reflow.
        // We track the last-known top per section and update on intersection change
        // so we never read layout properties outside the IO callback.
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        // Use the entry's pre-computed boundingClientRect (no forced reflow)
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActive(topMost.target.id);
      },
      { rootMargin: "-40% 0px -59% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === active),
  );
  const ActiveIcon = NAV_ITEMS[activeIndex].icon;

  return (
    <>
      <a
        href="/#top"
        aria-label="Tree Clarence home"
        className="fixed left-4 top-4 z-50 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/30 bg-white shadow-xl shadow-black/10 md:hidden"
      >
        <img src={logo} alt="Tree Clarence logo" width={48} height={48} className="h-full w-full object-cover scale-125" />
      </a>

      <header className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 md:bottom-auto md:top-9">
        <div className="flex items-center gap-3">
          <a
            href="/#top"
            aria-label="Tree Clarence home"
            className="hidden h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/30 bg-white shadow-xl shadow-black/10 md:flex"
          >
            <img src={logo} alt="Tree Clarence logo" width={48} height={48} className="h-full w-full object-cover scale-125" />
          </a>
          <div
              className="nav-frame relative"
              style={{ "--nav-index": activeIndex } as CSSProperties}
            >
              <nav className="nav-notch flex items-end rounded-full border border-border/30 bg-card/40 px-2 shadow-xl shadow-black/10 backdrop-blur-xl">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = active === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setActive(item.id)}
                      aria-current={isActive ? "page" : undefined}
                      className="relative flex h-16 w-16 flex-col items-center justify-end pb-2 md:w-28"
                    >
                      <span
                        className={cn(
                          "mb-1 text-muted-foreground transition-opacity duration-300",
                          isActive && "opacity-0",
                        )}
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                      <span
                        className={cn(
                          "text-[11px] tracking-wide transition-colors duration-300",
                          isActive ? "font-semibold text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                    </a>
                  );
                })}
              </nav>
              <span className="nav-bubble pointer-events-none absolute top-0 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/30 bg-card/50 text-foreground shadow-lg shadow-black/20 backdrop-blur-xl">
                <ActiveIcon className="h-5 w-5" strokeWidth={2.2} />
              </span>
            </div>
            <ThemeToggle />
          </div>
        </header>
    </>
  );
}
