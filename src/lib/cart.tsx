import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Design } from "@/lib/designs";

export type CartLine = {
  id: string;
  name: string;
  code: string;
  img: string;
  price: number;
  qty: number;
};

type CartCtx = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (d: Design) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "name-cart-v1";

export function priceToNumber(p: string) {
  return Number(p.replace(/[^0-9.]/g, "")) || 0;
}

export function formatPrice(n: number) {
  return `$${n.toFixed(0)}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + l.qty * l.price, 0);
    return {
      lines,
      count,
      total,
      open,
      setOpen,
      add: (d) =>
        setLines((prev) => {
          const found = prev.find((l) => l.id === d.id);
          if (found) return prev.map((l) => (l.id === d.id ? { ...l, qty: l.qty + 1 } : l));
          return [
            ...prev,
            { id: d.id, name: d.name, code: d.code, img: d.img, price: priceToNumber(d.price), qty: 1 },
          ];
        }),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
        ),
      clear: () => setLines([]),
    };
  }, [lines, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
