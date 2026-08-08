import { Ruler, Printer, Layers, Users } from "lucide-react";
import { Reveal, SectionHeader, TiltCard } from "./primitives";

const FEATURES = [
  {
    icon: Ruler,
    title: "Parametric Fit",
    body: "Every mod is measured against your exact shoe model, so it locks onto the lace line and tongue and refuses to shift mid-stride.",
  },
  {
    icon: Printer,
    title: "Print-to-Order",
    body: "Nothing sits in a warehouse. Your piece starts printing after you order, which means geometry and colorway can flex per customer.",
  },
  {
    icon: Layers,
    title: "Material Library",
    body: "Matte nylon, translucent resin, titanium-flecked composite, glow filament. Swap the spec, keep the silhouette.",
  },
  {
    icon: Users,
    title: "Designer Collabs",
    body: "Rotating limited runs cut with independent 3D artists. When the run ends, the file gets retired.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-[1400px] px-5 py-28 md:px-10">
      <SectionHeader
        index="01"
        eyebrow="Spec Overview"
        title="What makes a mod"
        blurb="Four constraints we refuse to compromise on. Everything else is negotiable."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 90}>
            <TiltCard className="group h-full p-7">
              <div className="flex items-center justify-between">
                <f.icon
                  size={22}
                  className="text-muted-foreground transition-colors duration-200 group-hover:text-primary"
                />
                <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-8 font-display text-xl font-bold uppercase tracking-tight transition-all duration-200 group-hover:tracking-[0.02em] group-hover:text-primary">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
