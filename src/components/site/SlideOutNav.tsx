import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronRight } from "lucide-react";
import { COLLECTIONS } from "@/lib/designs";

type SubItem = { to: string; hash?: string; label: string };
type Item = { to: string; label: string; sub?: SubItem[] };

const MAIN: Item[] = [
  { to: "/", label: "Home" },
  {
    to: "/shop",
    label: "Shop",
    sub: [
      { to: "/shop", label: "All pieces" },
      ...COLLECTIONS.map((c) => ({
        to: "/shop",
        hash: c.id,
        label: c.name,
      })),
    ],
  },
  { to: "/custom", label: "Custom" },
  {
    to: "/about",
    label: "Studio",
    sub: [
      { to: "/about", label: "The Process" },
      { to: "/community", label: "Community Wall" },
      { to: "/contact", label: "Early Access" },
    ],
  },
  { to: "/community", label: "Community" },
  { to: "/contact", label: "Contact" },
];

export function SlideOutNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    setTimeout(() => setExpanded(null), 250);
  };

  const panelUI = (
    <>
      <div
        aria-hidden={!open}
        onClick={close}
        className={`fixed inset-0 z-[80] bg-foreground/25 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-y-0 left-0 z-[90] flex w-[min(88vw,360px)] flex-col border-r border-border bg-background transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <span className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
            Menu
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav
          className="flex-1 overflow-y-auto px-6 py-4"
          onMouseLeave={() => setExpanded(null)}
        >
          {MAIN.map((l) => {
            const isOpen = expanded === l.label;
            return (
              <div
                key={l.label}
                onMouseEnter={() => setExpanded(l.sub ? l.label : null)}
              >
                {l.sub ? (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : l.label)}
                    onFocus={() => setExpanded(l.label)}
                    className={`flex w-full items-center justify-between py-3 text-left text-2xl tracking-tight transition-colors duration-150 ${
                      isOpen ? "text-foreground" : "text-muted-foreground"
                    } hover:text-foreground`}
                  >
                    {l.label}
                    <ChevronRight
                      className={`h-5 w-5 transition-transform duration-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={l.to}
                    onClick={close}
                    activeOptions={{ exact: l.to === "/" }}
                    className="block py-3 text-2xl tracking-tight text-muted-foreground transition-colors duration-150 hover:text-foreground"
                    activeProps={{ className: "!text-foreground" }}
                  >
                    {l.label}
                  </Link>
                )}

                {l.sub && (
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="ml-1 border-l border-border pb-2 pl-4">
                        {l.sub.map((s) => (
                          <Link
                            key={s.label}
                            to={s.to}
                            {...(s.hash ? { hash: s.hash } : {})}
                            onClick={close}
                            tabIndex={isOpen ? 0 : -1}
                            className="flex items-baseline justify-between py-2 text-base tracking-tight text-muted-foreground transition-colors duration-150 hover:text-foreground"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <p className="border-t border-border px-6 py-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Printed to order
        </p>
      </aside>
    </>
  );

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="shrink-0 rounded-md border border-border p-2 text-muted-foreground transition-colors duration-150 hover:border-foreground/40 hover:text-foreground"
      >
        <Menu className="h-4 w-4" />
      </button>
      {mounted && createPortal(panelUI, document.body)}
    </>
  );
}
