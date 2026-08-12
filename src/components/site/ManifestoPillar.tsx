import type { ReactNode } from "react";
import { Reveal } from "@/components/site/primitives";

export function ManifestoPillar({
  label,
  photos,
  columns,
}: {
  label: string;
  photos: { src: string; alt: string }[];
  columns: [ReactNode, ReactNode];
}) {
  return (
    <section className="px-5 py-16 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="grid gap-3 sm:grid-cols-3">
            {photos.map((p) => (
              <div
                key={p.alt}
                className="pedestal relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  width={512}
                  height={384}
                  className="absolute inset-0 h-full w-full object-contain p-6"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 grid gap-8 md:grid-cols-[220px_1fr] md:gap-14">
            <h2 className="text-5xl font-medium leading-none tracking-tight text-foreground md:text-6xl">
              {label}
            </h2>
            <div className="grid gap-6 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
              <p>{columns[0]}</p>
              <p>{columns[1]}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CinematicBreak({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="pedestal relative h-[46vh] min-h-[280px] w-full overflow-hidden border-y border-border bg-surface md:h-[62vh]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-contain p-10 opacity-90"
      />
    </div>
  );
}

export function Key({ children }: { children: ReactNode }) {
  return <strong className="font-medium text-foreground">{children}</strong>;
}
