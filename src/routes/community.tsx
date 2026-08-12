import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/primitives";
import s0 from "@/assets/shoe-0.png";
import s1 from "@/assets/shoe-1.png";
import s2 from "@/assets/shoe-2.png";
import s3 from "@/assets/shoe-3.png";
import d1 from "@/assets/design-1.png";
import d3 from "@/assets/design-3.png";

const title = "Community Wall — NAME";
const description = "How people wear NAME: customer shoes with clip-on 3D-printed attachments.";

export const Route = createFileRoute("/community")({
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
  component: Community,
});

const WALL = [
  { src: s0, who: "@rei" },
  { src: d1, who: "Mara" },
  { src: s2, who: "@tvo" },
  { src: s1, who: "Dani" },
  { src: d3, who: "@kx.build" },
  { src: s3, who: "Ines" },
];

function Community() {
  return (
    <section className="px-5 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">Community Wall</h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Pieces in the wild. Sent in by people wearing them.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WALL.map((w, i) => (
            <Reveal key={w.who} delay={i * 60}>
              <figure>
                <div className="pedestal relative aspect-square overflow-hidden rounded-xl border border-border bg-surface">
                  <img
                    src={w.src}
                    alt={`[COMMUNITY PHOTO — ${w.who}]`}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="absolute inset-0 h-full w-full object-contain p-8"
                  />
                </div>
                <figcaption className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {w.who}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
