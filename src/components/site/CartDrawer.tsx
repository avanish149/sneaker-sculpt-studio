import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Minus, Plus, Trash2, Check } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart";

export function CartDrawer() {
  const { open, setOpen, lines, total, remove, setQty, clear } = useCart();
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!open) return;
    setDone(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[80] bg-foreground/25 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`fixed inset-y-0 right-0 z-[90] flex w-[min(92vw,400px)] flex-col border-l border-border bg-background transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <span className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Cart</span>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setOpen(false)}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {done ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <Check className="h-8 w-8 text-primary" />
              <p className="text-sm uppercase tracking-[0.18em]">Order placed</p>
              <p className="text-xs text-muted-foreground">
                Demo checkout — no payment was taken.
              </p>
            </div>
          ) : lines.length === 0 ? (
            <p className="mt-10 text-center text-sm text-muted-foreground">Your cart is empty.</p>
          ) : (
            <ul className="flex flex-col gap-5">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-4">
                  <div className="pedestal h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                    <img src={l.img} alt={l.name} className="h-full w-full object-contain p-2" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] uppercase tracking-[0.14em]">{l.code}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{formatPrice(l.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => setQty(l.id, l.qty - 1)}
                        className="rounded border border-border p-1 text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{l.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => setQty(l.id, l.qty + 1)}
                        className="rounded border border-border p-1 text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        aria-label={`Remove ${l.name}`}
                        onClick={() => remove(l.id)}
                        className="ml-auto rounded p-1 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {!done && lines.length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <div className="flex items-baseline justify-between text-sm">
              <span className="uppercase tracking-[0.18em] text-muted-foreground">Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              onClick={() => {
                clear();
                setDone(true);
              }}
              className="mt-4 w-full rounded-md bg-primary px-4 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Checkout
            </button>
            <p className="mt-2 text-center text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Printed to order
            </p>
          </div>
        )}
      </aside>
    </>,
    document.body,
  );
}
