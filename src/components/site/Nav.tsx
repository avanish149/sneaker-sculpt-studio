import { Link } from "@tanstack/react-router";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/custom", label: "Custom" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Link to="/" className="text-sm font-medium uppercase tracking-[0.24em]">
          NAME
        </Link>
        <div className="flex items-center gap-4 overflow-x-auto sm:gap-7">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="shrink-0 border-b-2 border-transparent pb-0.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              activeProps={{ className: "!text-foreground !border-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
