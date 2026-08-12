import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/primitives";
import { ManifestoPillar, CinematicBreak, Key } from "@/components/site/ManifestoPillar";
import shoe0 from "@/assets/shoe-0.png";
import shoe1 from "@/assets/shoe-1.png";
import shoe2 from "@/assets/shoe-2.png";
import shoe3 from "@/assets/shoe-3.png";
import d1 from "@/assets/design-1.png";
import d2 from "@/assets/design-2.png";
import d3 from "@/assets/design-3.png";
import d4 from "@/assets/design-4.png";

const title = "About — NAME";
const description =
  "NAME makes 3D-printed, made-to-order attachments that clip onto the front of a shoe.";

export const Route = createFileRoute("/about")({
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
  component: About,
});

function About() {
  return (
    <>
      <section className="px-5 pb-4 pt-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="max-w-2xl text-4xl font-medium tracking-tight sm:text-6xl">
              Small parts, made for one pair.
            </h1>
          </Reveal>
        </div>
      </section>

      <ManifestoPillar
        label="FIT"
        photos={[
          { src: shoe1, alt: "[PROCESS PHOTO — piece on shoe close-up]" },
          { src: d1, alt: "[PROCESS PHOTO — snap-fit clip detail]" },
          { src: shoe2, alt: "[PROCESS PHOTO — lace line test]" },
        ]}
        columns={[
          <>
            Every piece clips along the laces and down to the tongue. No glue, no stitching, no
            permanent change to the shoe. The geometry does the work: a <Key>snap-fit</Key> shell
            that flexes once, then holds.
          </>,
          <>
            That means one pair can wear a different design any day. Take it off in a second,
            put another on. <Key>Swap, don't commit.</Key>
          </>,
        ]}
      />

      <ManifestoPillar
        label="PRINT"
        photos={[
          { src: d2, alt: "[PROCESS PHOTO — piece being printed]" },
          { src: d3, alt: "[PROCESS PHOTO — print bed]" },
        ]}
        columns={[
          <>
            Nothing sits in a warehouse. Each order starts as a file and is printed the same
            week — <Key>made to order</Key>, with <Key>no minimums</Key>.
          </>,
          <>
            Short runs let us change a design between batches instead of every two years. Print
            only what's bought means <Key>near-zero waste</Key>.
          </>,
        ]}
      />

      <CinematicBreak src={shoe0} alt="[CINEMATIC BREAK — mood/atmosphere shot]" />

      <ManifestoPillar
        label="MATERIAL"
        photos={[
          { src: d4, alt: "[PROCESS PHOTO — chrome nylon finish]" },
          { src: shoe3, alt: "[PROCESS PHOTO — finish comparison]" },
        ]}
        columns={[
          <>
            We print in nylon and steel-filled composites, then finish by hand. Pieces are
            <Key> light enough to forget</Key> and stiff enough to keep their edge.
          </>,
          <>
            Finishes range from raw matte to polished chrome. Each is tested on a real shoe
            before it ships — <Key>worn, not just rendered</Key>.
          </>,
        ]}
      />

      <ManifestoPillar
        label="STUDIO"
        photos={[
          { src: shoe2, alt: "[PROCESS PHOTO — studio bench]" },
          { src: d1, alt: "[PROCESS PHOTO — sketch to part]" },
          { src: d2, alt: "[PROCESS PHOTO — packing]" },
        ]}
        columns={[
          <>
            NAME is a <Key>small studio</Key>. Designs are drawn, printed, and packed in the same
            room.
          </>,
          <>
            If you want something that doesn't exist yet, ask. Most pieces here started as
            <Key> one custom request</Key>.
          </>,
        ]}
      />
    </>
  );
}
