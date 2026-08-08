import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Collection", href: "#archive" },
  { label: "The Process", href: "#process" },
  { label: "Custom Build", href: "#fabricator" },
  { label: "About", href: "#manifesto" },
  { label: "Contact", href: "#footer" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        solid
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-10">
        <a href="#top" className="group flex min-w-0 items-center gap-3">
          <span className="font-display text-lg font-extrabold uppercase tracking-[0.32em] transition-colors duration-150 group-hover:text-primary">
            NAME
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.25em] text-muted-foreground sm:inline">
            /MOD-SYS-001
          </span>
        </a>

        <div className="flex items-center gap-8">
          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-link">
                  <span className="brk brk-l">[</span>
                  {l.label}
                  <span className="brk brk-r">]</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#fabricator"
            className="hidden shrink-0 border border-primary bg-primary px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_36px_-10px_var(--primary)] sm:inline-block"
          >
            Start a Build
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="shrink-0 border border-border p-2 text-foreground transition-colors duration-150 hover:border-primary hover:text-primary lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "fixed inset-0 top-[65px] z-40 origin-top bg-background/97 backdrop-blur-lg transition-all duration-250 ease-out lg:hidden",
          open ? "visible scale-y-100 opacity-100" : "invisible scale-y-95 opacity-0",
        )}
      >
        <ul className="blueprint flex h-full flex-col gap-2 px-6 pt-10">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: `${i * 30}ms` }}
                className="block border-b border-border py-5 font-display text-3xl font-extrabold uppercase tracking-tight transition-all duration-200 ease-out active:translate-x-2 active:text-primary"
              >
                <span className="mr-3 font-mono text-xs text-primary">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-8">
            <a
              href="#fabricator"
              onClick={() => setOpen(false)}
              className="block border border-primary bg-primary px-5 py-4 text-center font-mono text-xs uppercase tracking-[0.25em] text-primary-foreground active:scale-[0.98]"
            >
              Start a Build
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
