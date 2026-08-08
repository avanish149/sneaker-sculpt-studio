import { useState } from "react";
import { UploadCloud } from "lucide-react";
import { Chip, Reveal, SectionHeader } from "./primitives";

const SHOE_TYPES = ["Low-top", "High-top", "Slip-on", "Cleat", "Boot"];
const COVERAGE = ["Lace-Line Only", "Full Tongue Wrap", "Side Panel Extension"];
const MATERIALS = [
  { label: "Matte Black Nylon", swatch: "#1b1b1f" },
  { label: "Translucent Resin", swatch: "#cfe6e4" },
  { label: "Titanium Composite", swatch: "#8b9098" },
  { label: "Glow Resin", swatch: "#c6ff3d" },
];
const FINISHES = [
  { label: "Lime", swatch: "#c6ff3d" },
  { label: "Cyan", swatch: "#4dfff3" },
  { label: "Molten", swatch: "#ff5c2b" },
  { label: "Bone", swatch: "#ece7dc" },
  { label: "Void", swatch: "#0a0a0c" },
];

const inputCls =
  "w-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 ease-out focus:border-primary focus:shadow-[0_0_28px_-10px_var(--primary)] focus:outline-none";

export function Fabricator() {
  const [shoe, setShoe] = useState("");
  const [coverage, setCoverage] = useState("");
  const [material, setMaterial] = useState("");
  const [finish, setFinish] = useState("");
  const [fileName, setFileName] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pressed, setPressed] = useState(false);
  const [sent, setSent] = useState(false);

  const spec: [string, string][] = [
    ["Reference", fileName || "—"],
    ["Silhouette", shoe || "—"],
    ["Coverage", coverage || "—"],
    ["Material", material || "—"],
    ["Accent", finish || "—"],
    ["Operator", name || "—"],
  ];

  const filled = spec.filter(([, v]) => v !== "—").length;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setPressed(true);
    setSent(true);
    window.setTimeout(() => setPressed(false), 520);
  };

  return (
    <section id="fabricator" className="mx-auto max-w-[1400px] px-5 py-28 md:px-10">
      <SectionHeader
        index="03"
        eyebrow="Custom Fit Lab"
        title="The fabricator"
        blurb="Fill the build sheet. We answer with a render, a quote, and a print slot — usually inside two days."
      />

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <form
            onSubmit={submit}
            className="listening scanlines relative border border-border bg-surface p-6 md:p-9"
          >
            <div className="blueprint pointer-events-none absolute inset-0 opacity-25" />
            <div className="relative space-y-9">
              <Field n="01" label="Upload a photo of your shoe">
                <label className="group flex cursor-pointer flex-col items-center justify-center gap-3 border border-dashed border-border bg-background/60 px-6 py-10 text-center transition-all duration-200 ease-out hover:border-primary hover:shadow-[0_0_40px_-18px_var(--primary)]">
                  <UploadCloud
                    size={26}
                    className="text-muted-foreground transition-colors duration-200 group-hover:text-primary"
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {fileName || "drop image / click to scan"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  />
                </label>
              </Field>

              <Field n="02" label="Shoe type">
                <ChipRow items={SHOE_TYPES} value={shoe} onChange={setShoe} />
              </Field>

              <Field n="03" label="Coverage style">
                <ChipRow items={COVERAGE} value={coverage} onChange={setCoverage} />
              </Field>

              <Field n="04" label="Material">
                <div className="flex flex-wrap gap-2">
                  {MATERIALS.map((m) => (
                    <Chip
                      key={m.label}
                      swatch={m.swatch}
                      active={material === m.label}
                      onClick={() => setMaterial(m.label)}
                    >
                      {m.label}
                    </Chip>
                  ))}
                </div>
              </Field>

              <Field n="05" label="Accent finish">
                <div className="flex flex-wrap gap-3">
                  {FINISHES.map((f) => (
                    <button
                      key={f.label}
                      type="button"
                      aria-label={f.label}
                      aria-pressed={finish === f.label}
                      onClick={() => setFinish(f.label)}
                      className={`h-9 w-9 border transition-all duration-200 ease-out hover:-translate-y-1 ${
                        finish === f.label
                          ? "scale-110 border-primary shadow-[0_0_22px_-6px_var(--primary)]"
                          : "border-border"
                      }`}
                      style={{ background: f.swatch }}
                    />
                  ))}
                </div>
              </Field>

              <Field n="06" label="Notes / inspiration">
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your vision or drop a reference link"
                  className={inputCls}
                />
              </Field>

              <Field n="07" label="Contact">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className={inputCls}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className={inputCls}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </Field>

              <button
                type="submit"
                className={`w-full border border-primary bg-primary px-6 py-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary-foreground transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_50px_-12px_var(--primary)] active:translate-y-0 ${
                  pressed ? "pressed" : ""
                }`}
              >
                Submit Build Request
              </button>
              {sent ? (
                <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  Request queued — we'll reply to {email || "your inbox"} within 48h
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>

        <Reveal delay={120}>
          <aside className="sticky top-28 border border-border bg-surface p-7">
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-lg font-extrabold uppercase tracking-[0.1em]">
                Your spec sheet
              </h3>
              <span className="font-mono text-[10px] tracking-[0.2em] text-primary">
                {filled}/6
              </span>
            </div>
            <div className="mt-3 h-px w-full bg-border">
              <div
                className="h-px bg-primary transition-all duration-300 ease-out"
                style={{ width: `${(filled / 6) * 100}%` }}
              />
            </div>
            <dl className="mt-6 space-y-4">
              {spec.map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-3">
                  <dt className="label-mono shrink-0">{k}</dt>
                  <span className="h-px flex-1 bg-border" />
                  <dd
                    className={`max-w-[55%] truncate text-right font-mono text-xs ${
                      v === "—" ? "text-muted-foreground" : "text-primary"
                    }`}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
              Estimates are generated after we review your reference photo. Nothing prints
              until you approve the render.
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  n,
  label,
  children,
}: {
  n: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.25em] text-primary">{n}</span>
        <span className="label-mono text-foreground/80">{label}</span>
      </div>
      {children}
    </div>
  );
}

function ChipRow({
  items,
  value,
  onChange,
}: {
  items: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <Chip key={i} active={value === i} onClick={() => onChange(i)}>
          {i}
        </Chip>
      ))}
    </div>
  );
}
