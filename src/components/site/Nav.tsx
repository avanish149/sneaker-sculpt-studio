import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, ShoppingBag, X } from "lucide-react";
import { SlideOutNav } from "@/components/site/SlideOutNav";
import { useCart } from "@/lib/cart";

export function Nav() {
  const [search, setSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { count, setOpen } = useCart();

  useEffect(() => {
    if (!search) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearch(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [search]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 md:px-10">
        <div className="flex items-center">
          <SlideOutNav />
        </div>

        <Link
          to="/"
          className="justify-self-center text-sm font-medium uppercase tracking-[0.32em]"
        >
          NAME
        </Link>

        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            aria-label={search ? "Close search" : "Open search"}
            onClick={() => setSearch((s) => !s)}
            className="rounded-md p-2 text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            {search ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </button>
          <button
            type="button"
            aria-label={`Cart (${count} items)`}
            onClick={() => setOpen(true)}
            className="relative rounded-md p-2 text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-border/40 bg-surface/60 transition-[max-height,opacity] duration-200 ease-out ${
          search ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(false);
            navigate({ to: "/shop" });
          }}
          className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-4 md:px-10"
        >
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="search"
            placeholder="SEARCH FOR..."
            className="w-full bg-transparent text-sm uppercase tracking-[0.18em] text-foreground outline-none placeholder:text-muted-foreground"
          />
        </form>
      </div>
    </header>
  );
}
