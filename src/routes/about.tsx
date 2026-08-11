import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/primitives";
import shoe from "@/assets/shoe-1.png";

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
    <section className="px-5 py-16 md:px-10">
      <div className="mx-auto grid max-w-5xl items-center gap-14 md:grid-cols-2">
        <Reveal>
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">About</h1>
          <p className="mt-6 text-muted-foreground">
            NAME makes small sculptural attachments that clip to the front of a shoe, running
            along the laces down to the tongue.
          </p>
          <p className="mt-4 text-muted-foreground">
            Every piece is 3D-printed to order. They snap on and off, so one pair can wear a
            different design any day.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="pedestal relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface">
            <img
              src={shoe}
              alt="[STUDIO IMAGE — shoe with attachment]"
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 h-full w-full object-contain p-6"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
