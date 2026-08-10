import { Plate, Reveal } from "./primitives";

const PIECES = [
  { name: "Spine 01", price: "$180" },
  { name: "Talon", price: "$220" },
  { name: "Droplet", price: "$140" },
  { name: "Carapace", price: "$260" },
  { name: "Fang", price: "$150" },
  { name: "Halo", price: "$240" },
];

export function Shop() {
  return (
    <section id="shop" className="px-5 py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Collection</h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PIECES.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <div className="transition-transform duration-200 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:drop-shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
                <Plate ratio="aspect-square" caption={`PRODUCT RENDER — ${p.name}`} />
                <div className="mt-4 flex items-baseline justify-between">
                  <h3 className="text-base">{p.name}</h3>
                  <span className="text-sm text-muted-foreground">{p.price}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
