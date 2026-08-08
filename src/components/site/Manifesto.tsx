import { Plate, Reveal } from "./primitives";

export function Manifesto() {
  return (
    <section id="manifesto" className="mx-auto max-w-[1400px] px-5 py-28 md:px-10">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.85fr]">
        <Reveal>
          <span className="label-mono">Manifesto</span>
          <p className="mt-7 font-display text-3xl font-extrabold uppercase leading-[1.02] tracking-[-0.02em] sm:text-5xl">
            A shoe is a surface.
            <span className="text-muted-foreground">
              {" "}
              We treat it like an unfinished part waiting for its bracket.
            </span>
          </p>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            NAME started in a garage with one resin printer and a pair of beat low-tops that
            deserved better. We don't hold stock, we don't cut molds, and we don't print
            anything nobody asked for. Every file is made for one person's foot, one shoe, one
            idea — then it goes back in the drawer.
          </p>
          <div className="mt-10 flex flex-wrap gap-10 border-t border-border pt-7">
            {[
              ["Print-on-demand", "zero dead stock"],
              ["Studio", "Rotterdam / remote"],
              ["Founded", "2023"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="font-mono text-sm text-primary">{k}</div>
                <div className="label-mono mt-1">{v}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Plate ratio="aspect-[4/5]" caption="Studio image: founder at print wall, low light" />
        </Reveal>
      </div>
    </section>
  );
}
