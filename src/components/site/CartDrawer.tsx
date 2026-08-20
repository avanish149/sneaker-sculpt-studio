import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Minus, Plus, Trash2, Check, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart, formatPrice } from "@/lib/cart";

const FREE_SHIP = 180;

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
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  if (!mounted) return null;

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const remaining = Math.max(0, FREE_SHIP - total);
  const progress = Math.min(100, (total / FREE_SHIP) * 100);

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
        className={`fixed inset-y-0 right-0 z-[90] flex w-[min(92vw,420px)] flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <span className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
            Cart{count > 0 ? ` (${count})` : ""}
          </span>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setOpen(false)}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {!done && lines.length > 0 && (
          <div className="border-b border-border px-6 py-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {remaining > 0
                ? `${formatPrice(remaining)} away from free shipping`
                : "Free shipping unlocked"}
            </p>
            <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {done ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <Check className="h-8 w-8 text-primary" />
              <p className="text-sm uppercase tracking-[0.18em]">Order placed</p>
              <p className="text-xs text-muted-foreground">
                Demo checkout — no payment was taken.
              </p>
              <button
                onClick={() => setOpen(false)}
                className="mt-2 text-[11px] uppercase tracking-[0.18em] underline underline-offset-4"
              >
                Keep browsing
              </button>
            </div>
          ) : lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              <Link
                to="/shop"
                onClick={() => setOpen(false)}
                className="rounded-md border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-surface"
              >
                Browse pieces
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-4 py-4 first:pt-0">
                  <div className="pedestal h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
                    <img src={l.img} alt={l.name} className="h-full w-full object-contain p-2" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] uppercase tracking-[0.14em]">{l.code}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatPrice(l.price)} each
                        </p>
                      </div>
                      <span className="shrink-0 text-sm">{formatPrice(l.price * l.qty)}</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => setQty(l.id, l.qty - 1)}
                          className="rounded-l-full px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-sm tabular-nums">{l.qty}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => setQty(l.id, l.qty + 1)}
                          className="rounded-r-full px-2.5 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        aria-label={`Remove ${l.name}`}
                        onClick={() => remove(l.id)}
                        className="ml-auto rounded p-1 text-muted-foreground transition-colors hover:text-destructive"
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
            <div className="flex items-baseline justify-between text-xs text-muted-foreground">
              <span className="uppercase tracking-[0.18em]">Shipping</span>
              <span>{remaining > 0 ? "Calculated at checkout" : "Free"}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between text-sm">
              <span className="uppercase tracking-[0.18em] text-muted-foreground">Total</span>
              <span className="text-base">{formatPrice(total)}</span>
            </div>
            <button
              onClick={() => {
                clear();
                setDone(true);
              }}
              className="mt-4 w-full rounded-md bg-primary px-4 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              Checkout · {formatPrice(total)}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="mt-2 w-full py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Continue shopping
            </button>
            <p className="mt-1 text-center text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Printed to order
            </p>
          </div>
        )}
      </aside>
    </>,
    document.body,
  );
}
