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
