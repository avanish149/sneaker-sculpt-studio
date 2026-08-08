import { Instagram, Twitter, Youtube } from "lucide-react";

const LINKS = ["Collection", "The Process", "Custom Build", "About", "Contact"];
const HREFS = ["#archive", "#process", "#fabricator", "#manifesto", "#footer"];

export function Footer() {
  return (
    <footer id="footer" className="relative border-t border-border bg-surface/40">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:grid-cols-[1.2fr_1fr_1.1fr] md:px-10">
        <div>
          <div className="font-display text-2xl font-extrabold uppercase tracking-[0.32em]">
            NAME
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Wearable armor plating for sneakers. One file, one foot, one run.
          </p>
          <div className="mt-7 flex gap-3">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#footer"
                aria-label="Social link"
                className="border border-border p-2.5 text-muted-foreground transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-[0_10px_30px_-14px_var(--primary)]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <nav>
          <div className="label-mono">Index</div>
          <ul className="mt-5 space-y-3">
            {LINKS.map((l, i) => (
              <li key={l}>
                <a href={HREFS[i]} className="nav-link">
                  <span className="brk brk-l">[</span>
                  {l}
                  <span className="brk brk-r">]</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <div className="label-mono">Get drop alerts</div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Limited runs sell out in hours. We email once per drop, never otherwise.
          </p>
          <form
            className="mt-5 flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@domain.com"
              className="min-w-0 flex-1 border border-border bg-background px-4 py-3 text-sm transition-all duration-200 focus:border-primary focus:shadow-[0_0_28px_-10px_var(--primary)] focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 border border-primary bg-primary px-5 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-foreground transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_14px_40px_-12px_var(--primary)] active:translate-y-0"
            >
              Notify me
            </button>
          </form>
        </div>
      </div>

      <div className="relative border-t border-border px-5 py-6 md:px-10">
        <p className="mx-auto max-w-[1400px] font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          NAME © 2025 — Printed on demand, worn on purpose.
        </p>
      </div>
    </footer>
  );
}
