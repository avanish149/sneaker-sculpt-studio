import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { DESIGNS, COLLECTIONS } from "@/lib/designs";
import { Reveal } from "@/components/site/primitives";
import { useCart } from "@/lib/cart";

const title = "Shop — NAME Clip-On Shoe Attachments";
const description =
  "Browse NAME by season — Season 0, 1 and 2. 3D-printed clip-on shoe attachments, printed to order.";

export const Route = createFileRoute("/shop/")({
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
  const [season, setSeason] = useState<string>("all");
  const { add, setOpen, lines, setQty } = useCart();

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "");
      if (COLLECTIONS.some((c) => c.id === h)) {
        setSeason(h);
        document.getElementById(h)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const shown = COLLECTIONS.filter((c) => season === "all" || c.id === season);
  const count = DESIGNS.filter(
    (d) => season === "all" || d.collection === season,
  ).length;

  return (
    <section className="px-5 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            Shop — {count} piece{count === 1 ? "" : "s"} in view
          </p>
          <h1 className="story-serif mt-4 text-5xl sm:text-7xl">Seasons</h1>
          <p className="mt-5 max-w-lg text-muted-foreground">
            Each season is a way of finishing a print. Select a piece to preview it on the shoe.
          </p>
        </Reveal>

        <div className="sticky top-16 z-30 -mx-5 mt-10 border-y border-border bg-background/85 px-5 py-3 backdrop-blur md:-mx-10 md:px-10">
          <div className="flex gap-2 overflow-x-auto">
            {[{ id: "all", name: "All" }, ...COLLECTIONS].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSeason(c.id);
                  if (c.id !== "all") {
                    document
                      .getElementById(c.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={
                  "shrink-0 rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors " +
                  (season === c.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground")
                }
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <div className="space-y-24">
            {shown.map((c) => {
              const items = DESIGNS.filter((d) => d.collection === c.id);
              if (items.length === 0) return null;
              return (
                <div key={c.id} id={c.id} className="scroll-mt-36">
                  <Reveal>
                    <header className="relative border-t border-border pt-8">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -top-2 right-0 select-none text-7xl font-light leading-none text-foreground/[0.06] sm:text-8xl"
                      >
                        0{COLLECTIONS.indexOf(c) + 1}
                      </span>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                        {c.season}
                      </p>
                      <h2 className="story-serif mt-4 text-4xl sm:text-5xl">
                        {c.name}. <span className="text-muted-foreground">{c.headline}</span>
                      </h2>
                      <p className="story-body mt-5 max-w-2xl text-muted-foreground">
                        {c.story}
                      </p>
                    </header>
                  </Reveal>

                  <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((d, i) => {
                      const line = lines.find((l) => l.id === d.id);
                      return (
                        <Reveal key={d.id} delay={i * 60}>
                          <div className="group">
                            <Link
                              to="/shop/$id"
                              params={{ id: d.id }}
                              className="block w-full text-left transition-transform duration-200 ease-out hover:-translate-y-1"
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
                                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-card/92 p-5 opacity-0 backdrop-blur-sm transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                    {d.storyTitle}
                                  </p>
                                  <p className="story-body mt-2 text-sm text-foreground/80">
                                    {d.story}
                                  </p>
                                </div>
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
                            </Link>

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

        </div>
      </div>
    </section>
  );
}
