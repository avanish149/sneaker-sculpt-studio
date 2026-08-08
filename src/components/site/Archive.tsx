import { useState } from "react";
import { Chip, Plate, Reveal, SectionHeader, TiltCard } from "./primitives";

type Piece = {
  name: string;
  desc: string;
  price: string;
  material: string;
  tags: string[];
  shoe: string;
};

const PIECES: Piece[] = [
  {
    name: "EXOSPINE",
    desc: "Segmented vertebral ridge that walks the lace line and flares over the tongue.",
    price: "$240",
    material: "Matte Nylon",
    tags: ["New"],
    shoe: "Low-top",
  },
  {
    name: "TALON MK II",
    desc: "Four hooked plates, tensioned against the eyelets. Second revision, tighter claw.",
    price: "$285",
    material: "Titanium Composite",
    tags: ["Limited"],
    shoe: "High-top",
  },
  {
    name: "GHOSTPLATE",
    desc: "Translucent shell that fogs under light and disappears against pale uppers.",
    price: "$210",
    material: "Translucent Resin",
    tags: ["New"],
    shoe: "Low-top",
  },
  {
    name: "CARAPACE 09",
    desc: "Overlapping beetle-shell scales with a hinge that breathes when you flex.",
    price: "$320",
    material: "Matte Nylon",
    tags: ["Limited"],
    shoe: "Boot",
  },
  {
    name: "NULLFANG",
    desc: "Minimal two-tooth bracket for people who want the idea, not the noise.",
    price: "$165",
    material: "Matte Nylon",
    tags: ["New"],
    shoe: "Slip-on",
  },
  {
    name: "HALO DRIFT",
    desc: "Glow-charged lattice arch. Eats daylight, pays it back after dark.",
    price: "$295",
    material: "Glow Resin",
    tags: ["Limited"],
    shoe: "Cleat",
  },
];

const FILTERS = ["All", "New", "Limited", "By Shoe Type"] as const;

export function Archive() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [shoe, setShoe] = useState("Low-top");

  const list = PIECES.filter((p) => {
    if (filter === "All") return true;
    if (filter === "By Shoe Type") return p.shoe === shoe;
    return p.tags.includes(filter);
  });

  return (
    <section id="archive" className="relative border-y border-border bg-surface/30 py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeader
          index="02"
          eyebrow="Current Drops"
          title="The archive"
          blurb="Live files, limited runs, and the pieces that survived testing. Prices are per shoe pair."
        />

        <Reveal className="mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>
                {f}
              </Chip>
            ))}
            <span className="ml-auto font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
              {String(list.length).padStart(2, "0")} RESULTS
            </span>
          </div>

          {filter === "By Shoe Type" ? (
            <div className="mt-3 flex flex-wrap gap-2 border-l border-primary/50 pl-4">
              {["Low-top", "High-top", "Slip-on", "Cleat", "Boot"].map((s) => (
                <Chip key={s} active={shoe === s} onClick={() => setShoe(s)}>
                  {s}
                </Chip>
              ))}
            </div>
          ) : null}
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <TiltCard className="group h-full p-4">
                <Plate caption={`PRODUCT RENDER — ${p.name}, ${p.material.toLowerCase()}`} />
                <div className="mt-5 flex items-start justify-between gap-4 px-1">
                  <h3 className="font-display text-xl font-extrabold uppercase tracking-tight transition-colors duration-200 group-hover:text-primary">
                    {p.name}
                  </h3>
                  <span className="font-mono text-sm text-foreground">{p.price}</span>
                </div>
                <p className="mt-2 px-1 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-2 px-1 pb-1">
                  <span className="border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {p.material}
                  </span>
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-primary/50 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
