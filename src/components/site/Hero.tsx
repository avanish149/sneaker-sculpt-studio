import { Plate, Reveal } from "./primitives";

type Figurine = {
  left: string;
  top: string;
  drop: string;
  size: number;
  delay: string;
};

const FIGURINES: Figurine[] = [
  { left: "48%", top: "26%", drop: "120px", size: 26, delay: "0s" },
  { left: "43%", top: "24%", drop: "150px", size: 18, delay: "0.5s" },
  { left: "54%", top: "23%", drop: "165px", size: 20, delay: "0.9s" },
  { left: "46%", top: "22%", drop: "195px", size: 14, delay: "1.4s" },
  { left: "52%", top: "25%", drop: "210px", size: 16, delay: "1.9s" },
];

export function Hero() {
  return (
    <section id="top" className="px-5 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          <Plate
            ratio="aspect-[4/3]"
            caption="SHOE RENDER — clean studio shot, front-facing"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {FIGURINES.map((f, i) => (
              <span
                key={i}
                className="figurine absolute"
                style={
                  {
                    left: f.left,
                    top: f.top,
                    width: f.size,
                    height: f.size * 1.4,
                    "--drop": f.drop,
                    "--delay": f.delay,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Reveal>
            <h1 className="text-5xl font-medium tracking-tight sm:text-6xl">
              Your shoes, upgraded.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground">
              3D-printed sculptural attachments, made one at a time for your pair.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <a
              href="#custom"
              className="mt-9 inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity duration-150 hover:opacity-85"
            >
              Design Yours
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
