import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

const title = "Customer Care — NAME";
const description =
  "Get help with your NAME order: contact the support team or read answers to common questions.";

export const Route = createFileRoute("/contact")({
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
  component: Contact,
});

const FAQ = [
  {
    q: "How do I attach a piece?",
    a: "It clips over the laces at the front of the shoe. Line it up with the tongue and press until it snaps.",
  },
  {
    q: "Can I remove it without damaging my shoes?",
    a: "Yes. There is no glue or drilling. Pull the clip open and lift it off.",
  },
  { q: "How long does printing take?", a: "Stock designs ship in 3–5 days. Custom builds take about two weeks." },
  { q: "Do you ship internationally?", a: "Yes, worldwide. Delivery is 5–10 days depending on the country." },
];

const field =
  "mt-3 w-full rounded-md border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors duration-150 focus:border-primary";

function Contact() {
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-5 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">Need help?</h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Tell us what's going on and we'll get back to you.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-16 md:grid-cols-2">
          <Reveal>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div>
                <label htmlFor="c-name" className="text-sm text-muted-foreground">
                  Name
                </label>
                <input id="c-name" required className={field} />
              </div>
              <div>
                <label htmlFor="c-email" className="text-sm text-muted-foreground">
                  Email
                </label>
                <input id="c-email" type="email" required className={field} />
              </div>
              <div>
                <label htmlFor="c-order" className="text-sm text-muted-foreground">
                  Order number (optional)
                </label>
                <input id="c-order" className={field} />
              </div>
              <div>
                <label htmlFor="c-msg" className="text-sm text-muted-foreground">
                  Message
                </label>
                <textarea id="c-msg" required rows={5} className={cn(field, "resize-none")} />
              </div>
              <button
                type="submit"
                className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity duration-150 hover:opacity-85"
              >
                {sent ? "Message sent" : "Send message"}
              </button>
            </form>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Common questions
            </h2>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {FAQ.map((item, i) => (
                <div key={item.q}>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm transition-colors duration-150 hover:text-primary"
                  >
                    {item.q}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200",
                        open === i && "rotate-180 text-primary",
                      )}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-200 ease-out"
                    style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-4 text-sm text-muted-foreground">{item.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Or email{" "}
              <a href="mailto:care@name.studio" className="text-foreground underline underline-offset-4">
                care@name.studio
              </a>
              . We reply within one business day.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
