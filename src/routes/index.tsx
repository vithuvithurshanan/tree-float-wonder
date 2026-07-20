import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties } from "react";


// Lazy-load the GHL contact form — it's below the fold and brings in ~34 KiB of
// framer-motion + iframe code that shouldn't block the initial bundle parse.
const GHLContactForm = lazy(() =>
  import("@/components/GHLContactForm").then((m) => ({ default: m.GHLContactForm }))
);

// Lightweight alternative to framer-motion's whileInView for below-fold sections.
// Uses native IntersectionObserver + CSS transitions — no JS animation loop.
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// Hero image lives in /public so the URL is stable for the <link rel="preload"> in __root.tsx.
// WebP variants generated at build time via scripts/convert-hero.mjs
const heroTree = "/tree-hero.webp";
const heroTreeSrcSet = "/tree-hero-960.webp 960w, /tree-hero.webp 1920w";
import midMountains from "@/assets/tree-mid.png?w=1920&format=webp&quality=80&url";
import midMountainsSmall from "@/assets/tree-mid.png?w=960&format=webp&quality=75&url";
import foreGrass from "@/assets/tree-fore.png?w=1920&format=webp&quality=26&url";
import foreGrassMedium from "@/assets/tree-fore.png?w=960&format=webp&quality=26&url";
// Lighthouse flagged tree-fore 800w as over-compressed — q=16 saves ~6.6 KiB over q=26
import foreGrassTight from "@/assets/tree-fore.png?w=800&format=webp&quality=16&url";
import foreGrassSmall from "@/assets/tree-fore.png?w=640&format=webp&quality=16&url";
// Lighthouse flagged tree-hero gallery 900w as over-compressed — q=34 saves ~4.6 KiB over q=45
import heroThumb from "@/assets/tree-hero.jpg?w=900&format=webp&quality=34&url";
import heroThumbSmall from "@/assets/tree-hero.jpg?w=600&format=webp&quality=34&url";

export const Route = createFileRoute("/")({
  // Inject the LCP preload here (not in __root.tsx) so we can reference the
  // actual hashed Vite asset URLs. __root.tsx would need stable public/ paths;
  // route-level head() runs after module imports are resolved, so we get the
  // real URLs and the browser can correctly match the preload to the <img>.
  head: () => ({
    links: [
      {
        rel: "preload",
        as: "image",
        href: midMountains,
        // fetchpriority is a valid HTML attribute; React/TanStack types may lag
        
        fetchPriority: "high",
        imageSrcSet: `${midMountainsSmall} 960w, ${midMountains} 1920w`,
        imageSizes: "100vw",
      },
    ],
  }),
  component: Index,
});

// Pure CSS animation (see .animate-leaf-fall in styles.css) instead of framer-motion:
// 25 particles animating forever via JS motion values was a significant continuous
// main-thread cost (Lighthouse flagged high Style & Layout / Script Evaluation time).
// CSS transform/opacity keyframes run on the compositor thread instead.
function FloatingLeaves() {
  const [leaves, setLeaves] = useState<
    { id: number; left: number; delay: number; duration: number; size: number; sway: number }[]
  >([]);

  useEffect(() => {
    const newLeaves = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: Math.random() * 15 + 10,
      size: Math.random() * 1.5 + 0.5,
      sway: Math.random() * 150 - 75,
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="animate-leaf-fall absolute rounded-full bg-primary/40 blur-[1px]"
          style={
            {
              left: `${leaf.left}%`,
              top: -20,
              width: `${leaf.size * 6}px`,
              height: `${leaf.size * 6}px`,
              animationDuration: `${leaf.duration}s`,
              animationDelay: `${leaf.delay}s`,
              "--leaf-sway": `${leaf.sway}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function Index() {
  return (
    <main className="relative overflow-x-hidden bg-background text-foreground">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section id="top" className="relative h-[100vh] w-full overflow-hidden bg-sky-gradient">
      <FloatingLeaves />

      {/* Sky glow — parallax via CSS scroll-driven animation */}
      <div className="parallax-bg absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-primary/40 blur-3xl animate-float-slow" />
      </div>

      {/* Distant mountains */}
      <img
  src={midMountains}
  srcSet={`${midMountainsSmall} 960w, ${midMountains} 1920w`}
  sizes="100vw"
  alt=""
  aria-hidden
  width={1920}
  height={1080}
  decoding="async"
  loading="eager"
  fetchPriority="high"
  className="parallax-mid absolute bottom-0 left-0 w-full select-none pointer-events-none opacity-90"
/>

      {/* Hero tree — LCP image */}
      <img
        src={heroTree}
        srcSet={heroTreeSrcSet}
        sizes="100vw"
        alt="Ancient oak silhouette at sunrise"
        width={1920}
        height={1280}
        decoding="async"
        fetchPriority="high"
        loading="eager"
       className="parallax-tree absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none object-cover object-bottom"
      />

      {/* Foreground grass */}
      <img
        src={foreGrass}
        srcSet={`${foreGrassSmall} 640w, ${foreGrassTight} 800w, ${foreGrassMedium} 960w, ${foreGrass} 1920w`}
        sizes="100vw"
        alt=""
        aria-hidden
        width={1920}
        height={600}
        decoding="async"
        loading="eager"
        className="parallax-fore absolute bottom-[-40px] left-0 w-[130%] -ml-[15%] select-none pointer-events-none"
      />

      {/* Hero copy — entrance animations only (run once, no scroll reads) */}
      <div className="parallax-text relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="hero-fade-up hero-delay-1 uppercase tracking-[0.4em] text-xs text-[oklch(0.88_0.08_140)] mb-6">
          Quality Tree Services
        </p>
        <h1 className="hero-fade-up hero-delay-2 font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] max-w-4xl text-[oklch(0.97_0.015_130)] drop-shadow-md">
          Buffalo's <span className="text-gradient-sun italic">Premier</span><br />Tree Experts.
        </h1>
        <p className="hero-fade-up hero-delay-3 mt-6 max-w-xl text-base md:text-lg text-[oklch(0.97_0.015_130)]/85 drop-shadow">
          Locally owned and operated tree service company committed to the highest standards of care, safety, and customer satisfaction.
        </p>
        <a
  href="#services"
  className="hero-pop-in hero-delay-4 mt-10 rounded-full border border-white/40 bg-black/10 px-6 py-3 text-sm text-[oklch(0.97_0.015_130)] backdrop-blur-sm hover:bg-white/15 transition-colors"
>
          View Our Services ↓
        </a>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Tree Trimming & Pruning",
    icon: "✂️",
    desc: "Expert shaping and pruning to promote healthy growth, enhance curb appeal, and maintain the beauty of your landscape.",
  },
  {
    title: "Tree Removal",
    icon: "🪓",
    desc: "Safe and efficient removal of hazardous, dead, or unwanted trees. We handle all sizes with industry-leading equipment.",
  },
  {
    title: "Stump Grinding",
    icon: "⚙️",
    desc: "Complete stump removal that eliminates tripping hazards and frees your yard for replanting, landscaping, or lawn expansion.",
  },
  {
    title: "Emergency Tree Service",
    icon: "🚨",
    desc: "Round-the-clock emergency response for storm-damaged or fallen trees. We're ready to protect your property at any hour.",
    badge: "24/7",
  },
];

function ServicesSection() {
  const heading = useInView();
  return (
    <section id="services" className="relative py-32 px-6 md:px-12 text-foreground">
      <div className="max-w-6xl mx-auto">
        <div
          ref={heading.ref}
          className={`fade-up text-center mb-16 ${heading.visible ? "in-view" : ""}`}
        >
          <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">What We Do</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold mb-6">
            Our <span className="text-gradient-sun italic">Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            From routine maintenance to emergency response, we handle all your tree care needs with expertise and professionalism.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, delay }: { s: typeof services[0]; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <article
      ref={ref}
      className={`fade-in group glass-green animate-glass-fly relative rounded-3xl p-8 overflow-hidden hover:border-primary/60 transition-colors ${visible ? "in-view" : ""}`}
      style={{ animationDelay: `${delay * 8}s`, transitionDelay: `${delay}s` }}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex justify-between items-start mb-6">
        <div className="text-4xl bg-primary/10 w-16 h-16 flex items-center justify-center rounded-2xl">
          {s.icon}
        </div>
        {s.badge && (
          <span className="text-xs font-bold uppercase tracking-wider bg-destructive/10 text-destructive px-3 py-1 rounded-full">
            {s.badge}
          </span>
        )}
      </div>
      <h3 className="font-display text-3xl mb-4">{s.title}</h3>
      <p className="text-muted-foreground leading-relaxed mb-8">{s.desc}</p>
      <a href="#contact" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
        Get a Quote <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </a>
    </article>
  );
}

function AboutSection() {
  const left = useInView();
  const right = useInView();
  return (
    <section id="about" className="relative py-32 px-6 md:px-12 bg-card/30 border-y border-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div ref={left.ref} className={`fade-left ${left.visible ? "in-view" : ""}`}>
            <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">About Us</p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-8 leading-tight">
              Buffalo's <span className="text-gradient-sun italic">Premier</span> Tree Experts
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground mb-10">
              <p>
                We are a locally owned and operated tree service company committed to the highest standards of care, safety, and customer satisfaction in Buffalo, NY and surrounding Western New York communities.
              </p>
              <p>
                Our certified arborists bring years of hands-on experience to every job — from routine trimming to complex removals. We use state-of-the-art equipment and follow all industry safety protocols to protect your property and our crew.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                { title: "Licensed & Insured", icon: "✅" },
                { title: "Certified Arborists", icon: "🏆" },
                { title: "24/7 Emergency", icon: "⚡" },
                { title: "Complete Cleanup", icon: "🌿" },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`fade-in glass-green animate-glass-fly flex items-center gap-4 p-4 rounded-2xl ${left.visible ? "in-view" : ""}`}
                  style={{ animationDelay: `${i * 0.6}s`, transitionDelay: `${0.2 + i * 0.1}s` }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started Today
            </a>
          </div>

          <div ref={right.ref} className={`fade-in relative ${right.visible ? "in-view" : ""}`}>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 relative z-10 bg-card">
              <img 
                src="https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=55&fm=webp"
                srcSet="https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=55&fm=webp 600w, https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=55&fm=webp 800w"
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Arborist at work" 
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl z-0" />
            <div className={`fade-in glass-green-solid animate-glass-fly absolute -bottom-8 -left-8 rounded-2xl p-6 z-20 ${right.visible ? "in-view" : ""}`} style={{ transitionDelay: "0.4s" }}>
              <span className="block font-display text-5xl text-primary font-bold mb-1">15+</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years of<br/>Excellence</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// Builds a right-sized srcset from an Unsplash photo id (q=35).
function unsplashSrcSet(photoId: string, widths: number[]) {
  return widths
    .map((w) => `https://images.unsplash.com/${photoId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${w}&q=35&fm=webp ${w}w`)
    .join(", ");
}

// The gallery grid lives inside a max-w-6xl (1152px) container with md:px-12
// (48px) side padding and md:gap-6 (24px) gaps between 3 columns — so a plain
// "33vw"/"66vw" sizes value keeps growing past ~1248px viewport even though
// the real column width caps out at 368px/760px, causing the browser to pick
// oversized srcset candidates on wide desktop screens. calc() ties sizes to
// the actual column math instead, capped with a fixed px value once the
// container maxes out.
const SINGLE_SPAN_SIZES = "(min-width: 1248px) 368px, (min-width: 768px) calc(33.33vw - 48px), 100vw";
const DOUBLE_SPAN_SIZES = "(min-width: 1248px) 760px, (min-width: 768px) calc(66.67vw - 72px), 100vw";

const galleryImages = [
  {
    src: heroThumb,
    srcSet: `${heroThumbSmall} 600w, ${heroThumb} 900w`,
    sizes: DOUBLE_SPAN_SIZES,
    title: "Tree Care Excellence",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=35&fm=webp",
    srcSet: unsplashSrcSet("photo-1542601906990-b4d3fb778b09", [400, 600, 800]),
    sizes: SINGLE_SPAN_SIZES,
    title: "Precision Trimming",
    span: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=35&fm=webp",
    srcSet: unsplashSrcSet("photo-1622383563227-04401ab4e5ea", [400, 600, 800]),
    sizes: SINGLE_SPAN_SIZES,
    title: "Safe Removal",
    span: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=35&fm=webp",
    srcSet: unsplashSrcSet("photo-1416879595882-3373a0480b5b", [400, 600, 800]),
    sizes: SINGLE_SPAN_SIZES,
    title: "Stump Grinding",
    span: "col-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=35&fm=webp",
    srcSet: unsplashSrcSet("photo-1502082553048-f009c37129b9", [500, 800, 1100]),
    sizes: DOUBLE_SPAN_SIZES,
    title: "Emergency Response",
    span: "col-span-1 md:col-span-2",
  },
];

function GallerySection() {
  const heading = useInView();
  return (
    <section id="gallery" className="relative py-32 px-6 md:px-12 text-foreground">
      <div className="max-w-6xl mx-auto">
        <div ref={heading.ref} className={`fade-up text-center mb-16 ${heading.visible ? "in-view" : ""}`}>
          <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">Our Work</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold mb-6">
            Project <span className="text-gradient-sun italic">Gallery</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            See the quality and craftsmanship we bring to every project we complete in the Buffalo area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
          {galleryImages.map((img, i) => (
            <GalleryItem key={i} img={img} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ img, delay }: { img: typeof galleryImages[0]; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={`fade-in group relative rounded-2xl overflow-hidden cursor-pointer ${img.span} ${visible ? "in-view" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes={img.sizes}
        alt={img.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
        <span className="text-lg font-medium text-foreground translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          {img.title}
        </span>
      </div>
    </div>
  );
}

function ContactSection() {
  const heading = useInView();
  const left = useInView();
  const right = useInView();
  
  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 bg-card/20 border-t border-border/40 text-foreground">
      <div className="max-w-6xl mx-auto">
        <div ref={heading.ref} className={`fade-up text-center mb-16 ${heading.visible ? "in-view" : ""}`}>
          <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">Get In Touch</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold mb-6">
            Request a <span className="text-gradient-sun italic">Free Quote</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Ready to transform your property? Contact us today for a free, no-obligation estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          <div ref={left.ref} className={`fade-left flex flex-col gap-6 ${left.visible ? "in-view" : ""}`}>
            <div className="glass-green animate-glass-fly flex gap-4 items-start rounded-2xl p-6 hover:border-primary/50 transition-colors">
              <span className="text-3xl bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl shrink-0">📞</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Call Us Anytime</p>
                <a href="tel:7167108864" className="text-2xl font-semibold hover:text-primary transition-colors block mb-1">716-710-8864</a>
                <p className="text-sm text-muted-foreground">Available 24/7 for emergencies</p>
              </div>
            </div>
            <div className="glass-green animate-glass-fly flex gap-4 items-start rounded-2xl p-6 hover:border-primary/50 transition-colors" style={{ animationDelay: "0.7s" }}>
              <span className="text-3xl bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl shrink-0">📍</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Our Location</p>
                <address className="not-italic text-lg mb-1">9950 County Rd<br />Clarence Center, NY 14032<br />United States</address>
              </div>
            </div>
            <div className="glass-green animate-glass-fly flex gap-4 items-start rounded-2xl p-6 hover:border-primary/50 transition-colors" style={{ animationDelay: "1.4s" }}>
              <span className="text-3xl bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl shrink-0">🕐</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Business Hours</p>
                <p className="text-lg mb-1">Mon – Sat: 7:00 AM – 7:00 PM</p>
                <p className="text-sm text-muted-foreground">Emergency: 24/7</p>
              </div>
            </div>
          </div>

          <div ref={right.ref} className={`fade-in glass-green animate-glass-fly rounded-3xl p-4 md:p-6 ${right.visible ? "in-view" : ""}`} style={{ animationDelay: "0.4s", animationDuration: "8s" }}>
            <Suspense fallback={
              <div className="w-full rounded-xl bg-card/40 animate-pulse" style={{ height: 891 }} aria-label="Loading contact form…" />
            }>
              <GHLContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
