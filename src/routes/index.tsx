import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { GHLContactForm } from "@/components/GHLContactForm";

// Hero image lives in /public so the URL is stable for the <link rel="preload"> in __root.tsx
const heroTree = "/tree-hero.jpg";
import midMountains from "@/assets/tree-mid.png?w=1920&format=webp&quality=80&url";
import midMountainsSmall from "@/assets/tree-mid.png?w=960&format=webp&quality=75&url";
import foreGrass from "@/assets/tree-fore.png?w=1920&format=webp&quality=80&url";
import foreGrassSmall from "@/assets/tree-fore.png?w=960&format=webp&quality=75&url";

export const Route = createFileRoute("/")({
  component: Index,
});

function FloatingLeaves() {
  const [leaves, setLeaves] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const newLeaves = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: Math.random() * 15 + 10,
      size: Math.random() * 1.5 + 0.5,
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute rounded-full bg-primary/40 blur-[1px]"
          style={{
            left: `${leaf.left}%`,
            top: -20,
            width: `${leaf.size * 6}px`,
            height: `${leaf.size * 6}px`,
          }}
          animate={{
            y: ["0vh", "120vh"],
            x: [0, Math.random() * 150 - 75, Math.random() * 150 - 75],
            rotate: [0, 360, 720],
            opacity: [0, 1, 0.8, 0],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function Index() {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { damping: 25, stiffness: 120, mass: 0.2 });

  return (
    <main className="relative overflow-x-hidden bg-background text-foreground">
      <HeroSection smoothScrollY={smoothScrollY} />
      <ServicesSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}

function HeroSection({ smoothScrollY }: { smoothScrollY: any }) {
  const yBg = useTransform(smoothScrollY, [0, 1000], [0, 150]);
  const yMid = useTransform(smoothScrollY, [0, 1000], [0, 350]);
  const yTree = useTransform(smoothScrollY, [0, 1000], [0, 500]);
  const yFore = useTransform(smoothScrollY, [0, 1000], [0, -150]);
  const yText = useTransform(smoothScrollY, [0, 1000], [0, 250]);
  const opacityText = useTransform(smoothScrollY, [0, 600], [1, 0]);

  return (
    <section id="top" className="relative h-[100vh] w-full overflow-hidden bg-sky-gradient">
      <FloatingLeaves />

      {/* Sky glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: yBg }}
      >
        <div className="absolute left-1/2 top-[18%] -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-primary/40 blur-3xl animate-float-slow" />
      </motion.div>

      {/* Distant mountains */}
      <motion.img
        src={midMountains}
        srcSet={`${midMountainsSmall} 960w, ${midMountains} 1920w`}
        sizes="100vw"
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        decoding="async"
        loading="eager"
        className="absolute bottom-0 left-0 w-full select-none pointer-events-none opacity-90"
        style={{ y: yMid }}
      />

      {/* Hero tree — LCP image. fetchPriority makes React's auto-generated
          <link rel="preload"> (and the request itself) high priority. */}
      <motion.img
        src={heroTree}
        alt="Ancient oak silhouette at sunrise"
        width={1920}
        height={1280}
        decoding="async"
        fetchPriority="high"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[110%] w-auto max-w-none object-cover object-bottom"
        style={{ y: yTree, x: "-50%" }}
      />

      {/* Foreground grass */}
      <motion.img
        src={foreGrass}
        srcSet={`${foreGrassSmall} 960w, ${foreGrass} 1920w`}
        sizes="100vw"
        alt=""
        aria-hidden
        width={1920}
        height={600}
        decoding="async"
        loading="eager"
        className="absolute bottom-[-40px] left-0 w-[130%] -ml-[15%] select-none pointer-events-none"
        style={{ y: yFore }}
      />

      {/* Hero copy */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ y: yText, opacity: opacityText }}
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="uppercase tracking-[0.4em] text-xs text-[oklch(0.88_0.08_140)] mb-6"
        >
          Quality Tree Services
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] max-w-4xl text-[oklch(0.97_0.015_130)] drop-shadow-md"
        >
          Buffalo's <span className="text-gradient-sun italic">Premier</span><br />Tree Experts.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 max-w-xl text-base md:text-lg text-[oklch(0.97_0.015_130)]/85 drop-shadow"
        >
          Locally owned and operated tree service company committed to the highest standards of care, safety, and customer satisfaction.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          href="#services"
          className="mt-10 rounded-full border border-white/40 bg-black/10 px-6 py-3 text-sm text-[oklch(0.97_0.015_130)] backdrop-blur-sm hover:bg-white/15 transition-colors"
        >
          View Our Services ↓
        </motion.a>
      </motion.div>
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
  return (
    <section id="services" className="relative py-32 px-6 md:px-12 text-foreground">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">What We Do</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold mb-6">
            Our <span className="text-gradient-sun italic">Services</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            From routine maintenance to emergency response, we handle all your tree care needs with expertise and professionalism.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass-green animate-glass-fly relative rounded-3xl p-8 overflow-hidden hover:border-primary/60 transition-colors"
              style={{ animationDelay: `${i * 0.8}s` }}
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
              
              <a
                href="#contact"
                className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Get a Quote <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative py-32 px-6 md:px-12 bg-card/30 border-y border-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
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
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                  className="glass-green animate-glass-fly flex items-center gap-4 p-4 rounded-2xl"
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-medium text-sm">{item.title}</span>
                </motion.div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started Today
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 relative z-10 bg-card">
              <img 
                src="https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75&fm=webp" 
                srcSet="https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp 600w, https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75&fm=webp 800w"
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Arborist at work" 
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative blob behind image */}
            <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl z-0" />
            
            {/* Badge overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-green-solid animate-glass-fly absolute -bottom-8 -left-8 rounded-2xl p-6 z-20"
            >
              <span className="block font-display text-5xl text-primary font-bold mb-1">15+</span>
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Years of<br/>Excellence</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

const galleryImages = [
  { src: heroTree, title: "Tree Care Excellence", span: "col-span-1 md:col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1593007622835-188cc06da0ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp", title: "Precision Trimming", span: "col-span-1" },
  { src: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp", title: "Safe Removal", span: "col-span-1" },
  { src: "https://images.unsplash.com/photo-1588693895085-f5e976693a12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=75&fm=webp", title: "Stump Grinding", span: "col-span-1" },
  { src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=75&fm=webp", title: "Emergency Response", span: "col-span-1 md:col-span-2" },
];

function GallerySection() {
  return (
    <section id="gallery" className="relative py-32 px-6 md:px-12 text-foreground">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">Our Work</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold mb-6">
            Project <span className="text-gradient-sun italic">Gallery</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            See the quality and craftsmanship we bring to every project we complete in the Buffalo area.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px]">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${img.span}`}
            >
              <img 
                src={img.src} 
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 bg-card/20 border-t border-border/40 text-foreground">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.4em] text-xs text-primary mb-4">Get In Touch</p>
          <h2 className="font-display text-4xl md:text-6xl font-semibold mb-6">
            Request a <span className="text-gradient-sun italic">Free Quote</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Ready to transform your property? Contact us today for a free, no-obligation estimate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="glass-green animate-glass-fly flex gap-4 items-start rounded-2xl p-6 hover:border-primary/50 transition-colors">
              <span className="text-3xl bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl shrink-0">📞</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Call Us Anytime</p>
                <a href="tel:7167108864" className="text-2xl font-semibold hover:text-primary transition-colors block mb-1">716-710-8864</a>
                <p className="text-sm text-muted-foreground">Available 24/7 for emergencies</p>
              </div>
            </div>

            <div
              className="glass-green animate-glass-fly flex gap-4 items-start rounded-2xl p-6 hover:border-primary/50 transition-colors"
              style={{ animationDelay: "0.7s" }}
            >
              <span className="text-3xl bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl shrink-0">📍</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Our Location</p>
                <address className="not-italic text-lg mb-1">9950 County Rd<br />Clarence Center, NY 14032<br />United States</address>
              </div>
            </div>

            <div
              className="glass-green animate-glass-fly flex gap-4 items-start rounded-2xl p-6 hover:border-primary/50 transition-colors"
              style={{ animationDelay: "1.4s" }}
            >
              <span className="text-3xl bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl shrink-0">🕐</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Business Hours</p>
                <p className="text-lg mb-1">Mon – Sat: 7:00 AM – 7:00 PM</p>
                <p className="text-sm text-muted-foreground">Emergency: 24/7</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-green animate-glass-fly rounded-3xl p-4 md:p-6"
            style={{ animationDelay: "0.4s", animationDuration: "8s" }}
          >
            <GHLContactForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
