import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroImage } from "@/components/site/HeroImage";
import { Reveal } from "@/components/site/primitives";
import { Triptych } from "@/components/site/ManifestoPillar";

import d1 from "@/assets/design-1.png";
import shoe2 from "@/assets/shoe-2.png";
import d3 from "@/assets/design-3.png";

const title = "NAME — Snap-On 3D-Printed Shoe Attachments";
const description =
  "NAME 3D-prints clip-on sculptural attachments for the front of your shoes. Printed to order, on and off in seconds.";

export const Route = createFileRoute("/")({
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
  component: Home,
});

function Home() {
  return (
    <>
    <section className="pb-20">
      <HeroImage>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h1 className="text-4xl font-medium tracking-tight text-primary-foreground drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] sm:text-6xl">
              See every design. On your shoes.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-5 max-w-md text-primary-foreground/85">
              Each piece is 3D-printed to order and clips onto the laces. Snap it on, swap it
              out, no glue.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-9 flex items-center justify-center gap-6">
              <Link
                to="/shop"
                className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_30px_-10px] shadow-primary transition-opacity duration-150 hover:opacity-85"
              >
                Browse the Shop
              </Link>
              <Link
                to="/custom"
                className="text-sm text-primary-foreground/80 underline-offset-4 transition-colors duration-150 hover:text-primary-foreground hover:underline"
              >
                Build Your Own
              </Link>
            </div>
          </Reveal>
        </div>
      </HeroImage>
    </section>

    <section className="px-5 pb-20 md:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            The story
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="story-serif mt-6 text-4xl leading-[1.05] sm:text-6xl">
            We started by breaking a shoe we loved.
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="story-drop mt-8 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
            The first attachment was glued on, ruined a good pair, and looked incredible for about
            a week. Everything since has been an argument with that mistake: how do you add
            something sculptural to a shoe without taking the shoe away from its owner? The answer
            turned out to be geometry — a clip that flexes once and holds, printed the same week
            you order it, off again in a second.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
            Now every piece we make gets a story of its own: where the shape came from, what it
            took to print, and how it wears. Read them in the shop — they're the closest thing we
            have to a size guide.
          </p>
        </Reveal>
      </div>
    </section>

    <Triptych
      panels={[
        { src: d1, alt: "[PLACEHOLDER DESIGN 1 — detail]", caption: "01 / Clip" },
        { src: shoe2, alt: "[SHOE RENDER — side view]", caption: "02 / Fit" },
        { src: d3, alt: "[PLACEHOLDER DESIGN 3 — detail]", caption: "03 / Swap" },
      ]}
    />
    </>

  );
}
