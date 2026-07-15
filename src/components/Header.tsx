export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between backdrop-blur-md bg-background/30 border-b border-border/40">
      <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
        <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_20px] shadow-primary" />
        Tree Clarence
      </a>
      <nav className="hidden md:flex gap-8 text-sm text-muted-foreground">
        <a href="#services" className="hover:text-foreground transition-colors">Services</a>
        <a href="#about" className="hover:text-foreground transition-colors">About Us</a>
        <a href="#gallery" className="hover:text-foreground transition-colors">Gallery</a>
        <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
      </nav>
      <a href="#contact" className="rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity">
        Get Free Quote
      </a>
    </header>
  );
}
