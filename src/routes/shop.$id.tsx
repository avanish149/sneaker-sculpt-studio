import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { DESIGNS, COLLECTIONS } from "@/lib/designs";
import { Reveal } from "@/components/site/primitives";
import { ShoeViewer } from "@/components/site/ShoeViewer";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/shop/$id")({
  head: ({ params }) => {
    const d = DESIGNS.find((x) => x.id === params.id);
    const title = d ? `${d.name} — NAME clip-on attachment` : "Piece — NAME";
    const description = d
      ? `${d.storyTitle}. ${d.story}`
      : "3D-printed clip-on shoe attachments, printed to order.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Product,
});

function Product() {
  const { id } = Route.useParams();
  const design = DESIGNS.find((d) => d.id === id);
  const [attached, setAttached] = useState(true);
  const { add, setOpen, lines, setQty } = useCart();

  if (!design) {
    return (
      <section className="px-5 py-32 text-center md:px-10">
        <h1 className="story-serif text-4xl">Piece not found</h1>
        <Link
          to="/shop"
          className="mt-6 inline-block text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
        >
          Back to shop
        </Link>
      </section>
    );
  }

  const index = DESIGNS.indexOf(design);
  const collection = COLLECTIONS.find((c) => c.id === design.collection);
  const line = lines.find((l) => l.id === design.id);
  const others = DESIGNS.filter((d) => d.id !== design.id).slice(0, 4);

  return (
    <section className="px-5 py-12 md:px-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Shop
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_380px]">
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface p-4 sm:p-8">
              <ShoeViewer
                pinned={index}
                attached={attached}
                hideDots
                caption={
                  attached
                    ? `On shoe — ${design.name}`
                    : "Bare shoe — attachment off"
                }
              />
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setAttached((v) => !v)}
                  className="rounded-full border border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {attached ? "Remove from shoe" : "Try it on the shoe"}
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="lg:sticky lg:top-28">
              {collection && (
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  {collection.season}
                </p>
              )}
              <h1 className="story-serif mt-4 text-5xl">{design.name}</h1>
              <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {design.code}
              </p>

              <div className="mt-8 flex items-baseline justify-between border-y border-border py-4">
                <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {design.material}
                </span>
                <span className="text-lg">
                  {design.status === "sold" ? "Sold out" : design.price}
                </span>
              </div>

              <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {design.storyTitle}
              </p>
              <p className="story-body mt-3 text-foreground/80">{design.story}</p>

              {line && design.status !== "sold" ? (
                <div className="mt-8 flex w-full items-center justify-between rounded-md border border-border px-2 py-1.5">
                  <button
                    type="button"
                    aria-label={`Decrease ${design.name} quantity`}
                    onClick={() => setQty(design.id, line.qty - 1)}
                    className="rounded p-2.5 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-[11px] uppercase tracking-[0.2em]">{line.qty}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${design.name} quantity`}
                    onClick={() => setQty(design.id, line.qty + 1)}
                    className="rounded p-2.5 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={design.status === "sold"}
                  onClick={() => {
                    add(design);
                    setOpen(true);
                  }}
                  className="mt-8 w-full rounded-md border border-border px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {design.status === "sold"
                    ? "Unavailable"
                    : design.status === "soon"
                      ? "Coming soon — add anyway"
                      : "Add to cart"}
                </button>
              )}

              <p className="mt-4 text-xs text-muted-foreground">
                Printed to order. Clips on and off — no glue, no permanent modification.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 border-t border-border pt-10">
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            More pieces
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {others.map((d) => (
              <Link
                key={d.id}
                to="/shop/$id"
                params={{ id: d.id }}
                className="group block"
              >
                <div className="pedestal relative aspect-square overflow-hidden rounded-xl border border-border bg-surface">
                  <img
                    src={d.img}
                    alt={d.label}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="mt-3 text-[11px] uppercase tracking-[0.14em]">{d.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
