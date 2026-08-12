import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoeViewer } from "@/components/site/ShoeViewer";
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
    <section className="px-5 pb-28 pt-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        <ShoeViewer pinned={null} />

        <div className="mt-14 text-center">
          <Reveal>
            <h1 className="text-4xl font-medium tracking-tight sm:text-6xl">
              See every design. On your shoes.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mx-auto mt-5 max-w-md text-muted-foreground">
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
                className="text-sm text-muted-foreground underline-offset-4 transition-colors duration-150 hover:text-foreground hover:underline"
              >
                Build Your Own
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
