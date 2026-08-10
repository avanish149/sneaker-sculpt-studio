import { useState } from "react";
import { Chip, Reveal } from "./primitives";

const STYLES = ["Minimal", "Half coverage", "Full coverage"];
const FINISHES = ["Chrome", "Matte black", "Raw nylon"];

export function CustomBuild() {
  const [style, setStyle] = useState(STYLES[0]);
  const [finish, setFinish] = useState(FINISHES[0]);
  const [sent, setSent] = useState(false);

  return (
    <section id="custom" className="border-y border-border px-5 py-32 md:px-10">
      <div className="mx-auto max-w-xl">
        <Reveal>
          <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">Custom build</h2>
          <p className="mt-4 text-muted-foreground">
            Send us your pair. We design and print a one-of-one piece for it.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <form
            className="mt-12 space-y-10"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div>
              <label htmlFor="photo" className="text-sm text-muted-foreground">
                Photo of your shoe
              </label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                className="mt-3 block w-full rounded-md border border-border bg-surface px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-secondary file:px-4 file:py-1.5 file:text-sm file:text-foreground"
              />
            </div>

            <fieldset>
              <legend className="text-sm text-muted-foreground">Coverage</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {STYLES.map((s) => (
                  <Chip key={s} active={style === s} onClick={() => setStyle(s)}>
                    {s}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm text-muted-foreground">Finish</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {FINISHES.map((f) => (
                  <Chip key={f} active={finish === f} onClick={() => setFinish(f)}>
                    {f}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm text-muted-foreground">
                  Name
                </label>
                <input
                  id="name"
                  required
                  className="mt-3 w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors duration-150 focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="mt-3 w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors duration-150 focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity duration-150 hover:opacity-85"
            >
              {sent ? "Request sent" : "Submit request"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
