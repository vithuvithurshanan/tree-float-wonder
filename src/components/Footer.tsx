export function Footer() {
  return (
    <footer className="border-t border-border/50 px-6 md:px-12 py-10 text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-4 bg-background">
      <span>© {new Date().getFullYear()} Tree Clarence Trust</span>
      <span>Clarence Vale · Kept by hand, kept by time.</span>
    </footer>
  );
}
