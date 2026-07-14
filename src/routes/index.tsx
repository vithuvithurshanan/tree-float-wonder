import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroTree from "@/assets/tree-hero.jpg";
import midMountains from "@/assets/tree-mid.png";
import foreGrass from "@/assets/tree-fore.png";

export const Route = createFileRoute("/")({
  component: Index,
});

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Index() {
  const y = useScrollY();

  return (
    <main className="relative overflow-x-hidden bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-md bg-background/30 border-b border-border/40">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_20px] shadow-primary" />
          Tree Clarence
        </a>
        <nav className="hidden md:flex gap-8 text-sm text-muted-foreground">
          <a href="#story" className="hover:text-foreground transition-colors">Story</a>
          <a href="#grove" className="hover:text-foreground transition-colors">The Grove</a>
          <a href="#craft" className="hover:text-foreground transition-colors">Craft</a>
          <a href="#visit" className="hover:text-foreground transition-colors">Visit</a>
        </nav>
        <a href="#visit" className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity">
          Plan a visit
        </a>
      </header>

      {/* HERO — parallax layers */}
      <section id="top" className="relative h-[100vh] w-full overflow-hidden bg-sky-gradient">
        {/* Sky glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ transform: `translateY(${y * 0.15}px)` }}
        >
          <div className="absolute left-1/2 top-[18%] -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-primary/40 blur-3xl animate-float-slow" />
        </div>

        {/* Distant mountains */}
        <img
          src={midMountains}
          alt=""
          aria-hidden
          className="absolute bottom-0 left-0 w-full select-none pointer-events-none opacity-90"
          style={{ transform: `translateY(${y * 0.35}px)` }}
        />

        {/* Hero tree */}
        <img
          src={heroTree}
          alt="Ancient oak silhouette at sunrise"
          width={1920}
          height={1280}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[110%] w-auto max-w-none object-cover object-bottom"
          style={{ transform: `translate(-50%, ${y * 0.5}px)` }}
        />

        {/* Foreground grass */}
        <img
          src={foreGrass}
          alt=""
          aria-hidden
          className="absolute bottom-[-40px] left-0 w-[130%] -ml-[15%] select-none pointer-events-none"
          style={{ transform: `translateY(${y * -0.15}px)` }}
        />

        {/* Hero copy */}
        <div
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
          style={{ transform: `translateY(${y * 0.25}px)`, opacity: Math.max(0, 1 - y / 600) }}
        >
          <p className="uppercase tracking-[0.4em] text-xs text-primary/90 mb-6">Est. 1892 — Clarence Vale</p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] max-w-4xl">
            Where the <span className="text-gradient-sun italic">oldest trees</span><br />still speak.
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/80">
            Tree Clarence is a living archive of ancient canopies — tended, studied, and quietly guarded for the next two hundred years.
          </p>
          <a
            href="#story"
            className="mt-10 rounded-full border border-foreground/30 px-6 py-3 text-sm hover:bg-foreground/10 transition-colors"
          >
            Begin the walk ↓
          </a>
        </div>
      </section>

      {/* STORY */}
      <StorySection />

      {/* GROVE grid */}
      <GroveSection />

      {/* CRAFT parallax band */}
      <CraftSection y={y} />

      {/* VISIT */}
      <VisitSection />

      <footer className="border-t border-border/50 px-6 md:px-12 py-10 text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-4">
        <span>© {new Date().getFullYear()} Tree Clarence Trust</span>
        <span>Clarence Vale · Kept by hand, kept by time.</span>
      </footer>
    </main>
  );
}

function StorySection() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section id="story" className="relative py-32 md:py-44 px-6 md:px-12 bg-background">
      <div
        ref={ref}
        className={`mx-auto max-w-3xl text-center transition-all duration-1000 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <p className="uppercase tracking-[0.4em] text-xs text-primary mb-6">Chapter I</p>
        <h2 className="font-display text-4xl md:text-6xl leading-tight mb-8">
          A grove passed down<br />through four generations.
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          In 1892, botanist Elowen Clarence planted twelve saplings on a windswept ridge.
          A century later, those trees form the spine of a private woodland home to more
          than 40 rare species — many older than the country that surrounds them.
        </p>
      </div>

      <div className="mx-auto max-w-5xl mt-24 grid grid-cols-3 gap-8 text-center">
        {[
          { n: "134", l: "Years tended" },
          { n: "42", l: "Rare species" },
          { n: "9", l: "Trees over 300 years" },
        ].map((s, i) => (
          <div
            key={s.l}
            className={`transition-all duration-700 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: `${200 + i * 150}ms` }}
          >
            <div className="font-display text-5xl md:text-6xl text-gradient-sun">{s.n}</div>
            <div className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function GroveSection() {
  const trees = [
    { name: "The Elder Oak", age: "412 yrs", note: "Planted before the vale had a name." },
    { name: "Silverbark Beech", age: "228 yrs", note: "Its bark glows white under moonlight." },
    { name: "Clarence Cedar", age: "301 yrs", note: "Elowen's first sapling, still standing." },
    { name: "Whispering Ash", age: "184 yrs", note: "Named for the sound its leaves make." },
  ];
  return (
    <section id="grove" className="relative px-6 md:px-12 py-32 bg-card/50 border-y border-border/40">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">Chapter II</p>
            <h2 className="font-display text-4xl md:text-5xl max-w-xl">Meet the residents of the grove.</h2>
          </div>
          <a href="#visit" className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground">
            Book a guided walk →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trees.map((t) => (
            <article
              key={t.name}
              className="group relative rounded-2xl border border-border bg-background/60 p-8 hover:border-primary/60 transition-colors overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl">{t.name}</h3>
                <span className="text-xs uppercase tracking-widest text-primary">{t.age}</span>
              </div>
              <p className="mt-4 text-muted-foreground">{t.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CraftSection({ y }: { y: number }) {
  return (
    <section id="craft" className="relative h-[80vh] overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 scale-110"
        style={{
          backgroundImage: `url(${heroTree})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${(y - 1600) * 0.2}px) scale(1.15)`,
          filter: "brightness(0.55) contrast(1.05)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background" />
      <div className="relative z-10 max-w-3xl text-center px-6">
        <p className="uppercase tracking-[0.4em] text-xs text-primary mb-6">Chapter III</p>
        <h2 className="font-display text-4xl md:text-6xl leading-tight">
          Slow craft. <span className="italic text-gradient-sun">Sharp tools.</span>
        </h2>
        <p className="mt-6 text-lg text-foreground/85">
          Every pruning cut is planned a decade in advance. Every wound is sealed with beeswax
          harvested from the grove's own hives. We work at the speed of the tree, not the calendar.
        </p>
      </div>
    </section>
  );
}

function VisitSection() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section id="visit" className="px-6 md:px-12 py-32 bg-background">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl rounded-3xl border border-border bg-card p-10 md:p-16 text-center transition-all duration-1000 ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">Chapter IV</p>
        <h2 className="font-display text-4xl md:text-5xl mb-6">Walk the grove with us.</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-10">
          Twelve visitors a day. Two hours on foot. One arborist as your guide. Reservations open the first
          Monday of each season.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = e.currentTarget as HTMLFormElement;
            f.reset();
          }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            placeholder="you@grove.com"
            className="flex-1 rounded-full bg-background border border-border px-5 py-3 text-sm outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Notify me
          </button>
        </form>
      </div>
    </section>
  );
}
