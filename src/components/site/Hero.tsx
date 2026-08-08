import { Plate, Reveal } from "./primitives";

const TICKER = [
  "PLA+ / NYLON / TITANIUM-INFUSED",
  "PRINTED IN 48HRS",
  "FITS ANY LACE-UP SILHOUETTE",
  "ONE-OF-ONE GEOMETRY",
  "NO MOLDS · NO MINIMUMS",
  "LAYER HEIGHT 0.08MM",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40">
      <div className="blueprint pointer-events-none absolute inset-0 opacity-30" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-5 pb-16 md:px-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 bg-primary" />
              <span className="label-mono">DROP 004 — Exostructure Series</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 font-display text-[clamp(2.9rem,9vw,7rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.04em]">
              Sneakers,
              <br />
              <span className="text-primary">recompiled.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
              3D-printed shoe armor that bridges your top eyelet to your tongue. Measured to
              your silhouette, printed after you order, layer by layer until your shoe looks
              like it grew teeth.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#archive"
                className="group border border-primary bg-primary px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_50px_-12px_var(--primary)] active:translate-y-0"
              >
                Explore the Collection
                <span className="ml-3 inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#fabricator"
                className="border border-border px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary hover:text-primary"
              >
                Design Your Own
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
              {[
                ["48h", "print window"],
                ["11", "material specs"],
                ["1:1", "fit tolerance"],
              ].map(([v, k]) => (
                <div key={k}>
                  <dt className="font-display text-3xl font-extrabold tracking-tight">{v}</dt>
                  <dd className="label-mono mt-1">{k}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 bg-primary/5 blur-3xl" />
            <Plate
              ratio="aspect-[4/5]"
              caption="HERO PRODUCT RENDER — shoe with tongue-to-lace attachment, black nylon"
            />
          </div>
        </Reveal>
      </div>

      <div className="relative border-y border-border bg-surface/60 py-3">
        <div className="flex w-max marquee-track gap-10 whitespace-nowrap">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span
              key={i}
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground"
            >
              {t} <span className="ml-10 text-primary">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
