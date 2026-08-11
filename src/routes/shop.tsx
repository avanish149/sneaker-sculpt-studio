import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DESIGNS } from "@/lib/designs";
import { Reveal } from "@/components/site/primitives";
import { ShoeViewer } from "@/components/site/ShoeViewer";

const title = "Shop — NAME Clip-On Shoe Attachments";
const description =
  "The current NAME collection of 3D-printed clip-on shoe attachments. Printed to order.";

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

  return (
    <section className="px-5 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">Collection</h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Select a piece to preview it on the shoe.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {DESIGNS.map((d, i) => (
              <Reveal key={d.id} delay={i * 60}>
                <button
                  onClick={() => setPinned(i)}
                  className="w-full text-left transition-transform duration-200 ease-out hover:-translate-y-1"
                >
                  <div className="pedestal relative aspect-square overflow-hidden rounded-xl border border-border bg-surface">
                    <img
                      src={d.img}
                      alt={d.label}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="absolute inset-0 h-full w-full object-contain p-8 drop-shadow-[0_18px_28px_rgba(0,0,0,0.55)]"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h2 className="text-base">{d.name}</h2>
                    <span className="text-sm text-muted-foreground">{d.price}</span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {d.material}
                  </p>
                </button>
              </Reveal>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <ShoeViewer pinned={pinned} />
          </aside>
        </div>
      </div>
    </section>
  );
}
