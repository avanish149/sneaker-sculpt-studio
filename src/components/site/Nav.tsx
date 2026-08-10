export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" className="text-sm font-medium tracking-[0.2em] uppercase">
          NAME
        </a>
        <div className="flex items-center gap-6">
          <div className="hidden gap-6 sm:flex">
            {[
              ["Shop", "#shop"],
              ["Custom", "#custom"],
              ["About", "#about"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </div>
          <a
            href="#custom"
            className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity duration-150 hover:opacity-85"
          >
            Design Yours
          </a>
        </div>
      </nav>
    </header>
  );
}
