import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { DESIGNS, COLLECTIONS } from "@/lib/designs";
import { Reveal } from "@/components/site/primitives";
import { ShoeViewer } from "@/components/site/ShoeViewer";
import { useCart } from "@/lib/cart";

const title = "Shop — NAME Clip-On Shoe Attachments";
const description =
  "Browse the NAME collections — Winter, Chrome and Raw. 3D-printed clip-on shoe attachments, printed to order.";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [pinned, setPinned] = useState<number | null>(null);
  const { add, setOpen, lines, setQty } = useCart();

  return (
    <section className="px-5 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1 className="story-serif text-5xl sm:text-7xl">Collections</h1>
          <p className="mt-5 max-w-lg text-muted-foreground">
            Three drops, three ways of finishing a print. Select a piece to preview it on the shoe.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_360px]">
          <div className="space-y-24">
            {COLLECTIONS.map((c) => {
              const items = DESIGNS.filter((d) => d.collection === c.id);
              if (items.length === 0) return null;
              return (
                <div key={c.id} id={c.id}>
                  <Reveal>
                    <header className="border-t border-border pt-8">
                      <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                        {c.season}
                      </p>
                      <h2 className="story-serif mt-4 text-4xl sm:text-5xl">{c.headline}</h2>
                      <p className="story-drop mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                        {c.story}
                      </p>
                    </header>
                  </Reveal>

                  <div className="mt-10 grid gap-10 sm:grid-cols-2">
                    {items.map((d, i) => {
                      const idx = DESIGNS.indexOf(d);
                      const line = lines.find((l) => l.id === d.id);
                      return (
                        <Reveal key={d.id} delay={i * 60}>
                          <div>
                            <button
                              onClick={() => setPinned(idx)}
                              className="w-full text-left transition-transform duration-200 ease-out hover:-translate-y-1"
                            >
                              <div className="pedestal relative aspect-square overflow-hidden rounded-xl border border-border bg-surface">
                                {d.status && (
                                  <span
                                    className={
                                      "absolute left-3 top-3 z-10 rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] " +
                                      (d.status === "sold"
                                        ? "border-border bg-background/70 text-muted-foreground"
                                        : "border-primary bg-primary text-primary-foreground")
                                    }
                                  >
                                    {d.status === "sold" ? "Sold out" : "Coming soon"}
                                  </span>
                                )}
                                <img
                                  src={d.img}
                                  alt={d.label}
                                  loading="lazy"
                                  width={512}
                                  height={512}
                                  className={
                                    "absolute inset-0 h-full w-full object-contain p-8 drop-shadow-[0_18px_28px_rgba(0,0,0,0.18)] " +
                                    (d.status === "sold" ? "opacity-40 grayscale" : "")
                                  }
                                />
                              </div>
                              <p
                                className={
                                  "mt-4 text-[11px] uppercase tracking-[0.14em] " +
                                  (d.status === "sold" ? "text-muted-foreground" : "text-foreground")
                                }
                              >
                                {d.code}
                              </p>
                              <div className="mt-1 flex items-baseline justify-between">
                                <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                                  {d.material}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  {d.status === "sold" ? "Sold out" : d.price}
                                </span>
                              </div>
                              <h3 className="story-serif mt-4 text-2xl">{d.storyTitle}</h3>
                              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {d.story}
                              </p>
                            </button>

                            {line && d.status !== "sold" ? (
                              <div className="mt-4 flex w-full items-center justify-between rounded-md border border-border px-2 py-1.5">
                                <button
                                  type="button"
                                  aria-label={`Decrease ${d.name} quantity`}
                                  onClick={() => setQty(d.id, line.qty - 1)}
                                  className="rounded p-2 text-muted-foreground transition-colors hover:text-primary"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="text-[11px] uppercase tracking-[0.2em]">
                                  {line.qty}
                                </span>
                                <button
                                  type="button"
                                  aria-label={`Increase ${d.name} quantity`}
                                  onClick={() => setQty(d.id, line.qty + 1)}
                                  className="rounded p-2 text-muted-foreground transition-colors hover:text-primary"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                disabled={d.status === "sold"}
                                onClick={() => {
                                  add(d);
                                  setOpen(true);
                                }}
                                className="mt-4 w-full rounded-md border border-border px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-foreground"
                              >
                                {d.status === "sold" ? "Unavailable" : "Add to cart"}
                              </button>
                            )}
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <ShoeViewer pinned={pinned} />
          </aside>
        </div>
      </div>
    </section>
  );
}
