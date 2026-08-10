import { Reveal } from "./primitives";
import shoeImg from "@/assets/hero-shoe.png";
import figurineImg from "@/assets/figurine.png";

type Figurine = {
  left: string;
  top: string;
  drop: string;
  size: number;
  rot: string;
  delay: string;
};

/* positioned along the lace line, running down toward the tongue */
const FIGURINES: Figurine[] = [
  { left: "41%", top: "27%", drop: "220px", size: 44, rot: "-14deg", delay: "0s" },
  { left: "46%", top: "34%", drop: "250px", size: 40, rot: "6deg", delay: "0.7s" },
  { left: "50%", top: "41%", drop: "230px", size: 44, rot: "-6deg", delay: "1.4s" },
  { left: "55%", top: "48%", drop: "270px", size: 38, rot: "12deg", delay: "2.1s" },
  { left: "59%", top: "55%", drop: "290px", size: 34, rot: "-10deg", delay: "2.8s" },

];

export function Hero() {
  return (
    <section id="top" className="px-5 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface">
          <img
            src={shoeImg}
            alt="White sneaker with 3D-printed sculptural attachments along the laces"
            width={1024}
            height={1024}
            className="absolute inset-0 h-full w-full object-contain"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {FIGURINES.map((f, i) => (
              <img
                key={i}
                src={figurineImg}
                alt=""
                loading="lazy"
                className="figurine absolute"
                style={
                  {
                    left: f.left,
                    top: f.top,
                    width: f.size,
                    "--drop": f.drop,
                    "--rot": f.rot,
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
