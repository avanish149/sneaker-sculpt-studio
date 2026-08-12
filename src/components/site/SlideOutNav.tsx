import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronRight, ChevronLeft } from "lucide-react";

const MAIN = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/custom", label: "Custom" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const SUB = [
  { to: "/about", label: "The Process" },
  { to: "/community", label: "Community Wall" },
  { to: "/contact", label: "Early Access" },
] as const;

export function SlideOutNav() {
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<"main" | "studio">("main");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    setTimeout(() => setPanel("main"), 250);
  };

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

      <div
        aria-hidden={!open}
        onClick={close}
        className={`fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-y-0 left-0 z-[70] flex w-[min(88vw,360px)] flex-col border-r border-border bg-surface transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
            {panel === "main" ? "Menu" : "Studio"}
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

        <div className="relative flex-1 overflow-hidden">
          <nav
            className={`absolute inset-0 flex flex-col gap-1 px-6 transition-transform duration-300 ease-out ${
              panel === "main" ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {MAIN.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={close}
                activeOptions={{ exact: l.to === "/" }}
                className="py-3 text-2xl tracking-tight text-muted-foreground transition-colors duration-150 hover:text-foreground"
                activeProps={{ className: "!text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setPanel("studio")}
              className="mt-2 flex items-center justify-between border-t border-border py-4 text-2xl tracking-tight text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              Studio
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>

          <nav
            className={`absolute inset-0 flex flex-col gap-1 px-6 transition-transform duration-300 ease-out ${
              panel === "studio" ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              type="button"
              onClick={() => setPanel("main")}
              className="mb-3 flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            {SUB.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={close}
                className="py-3 text-2xl tracking-tight text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="px-6 py-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Printed to order
        </p>
      </aside>
    </>
  );
}
