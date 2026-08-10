import { Plate, Reveal } from "./primitives";

export function About() {
  return (
    <section id="about" className="px-5 py-32 md:px-10">
      <div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">About</h2>
          <p className="mt-6 text-muted-foreground">
            NAME makes small sculptural attachments that clip to the front of a shoe. Every
            piece is printed to order, one at a time, for a single pair.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <Plate ratio="aspect-[4/3]" caption="STUDIO IMAGE — piece in hand" />
        </Reveal>
      </div>
    </section>
  );
}
