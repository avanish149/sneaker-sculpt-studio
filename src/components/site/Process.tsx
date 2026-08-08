import { Plate, Reveal, SectionHeader } from "./primitives";

const STEPS = [
  {
    n: "01",
    t: "Scan / Reference",
    d: "You send photos. We match your silhouette against our library or measure a new one.",
  },
  {
    n: "02",
    t: "Model",
    d: "Geometry is grown parametrically around your lace line, then stress-checked at the hinge.",
  },
  {
    n: "03",
    t: "Print",
    d: "0.08mm layers, printed in your chosen material. Supports cut by hand, never sanded flat.",
  },
  {
    n: "04",
    t: "Finish & Ship",
    d: "Dyed, sealed, test-fitted on a last, packed in a foam-cut case, out the door.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative border-y border-border bg-surface/30 py-28">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHeader
          index="04"
          eyebrow="From scan to step"
          title="How it's made"
          blurb="Four stages, one file, zero inventory."
        />

        <div className="grid gap-px bg-border md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <div className="group h-full bg-background p-7 transition-colors duration-200 hover:bg-surface">
                <div className="font-display text-6xl font-extrabold leading-none text-border transition-colors duration-300 group-hover:text-primary">
                  {s.n}
                </div>
                <h3 className="mt-6 font-display text-lg font-bold uppercase tracking-tight transition-colors duration-200 group-hover:text-primary">
                  {s.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                <div className="mt-7">
                  <Plate ratio="aspect-[16/10]" caption={`Diagram: stage ${s.n} ${s.t}`} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
