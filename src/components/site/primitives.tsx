import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", className)}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  index,
  total = "04",
  eyebrow,
  title,
  blurb,
}: {
  index: string;
  total?: string;
  eyebrow: string;
  title: string;
  blurb?: string;
}) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[0.3em] text-primary">
          {index} / {total}
        </span>
        <span className="h-px flex-1 bg-border" />
        <span className="label-mono">{eyebrow}</span>
      </div>
      <h2 className="mt-6 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.02em] sm:text-6xl">
        {title}
      </h2>
      {blurb ? (
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">{blurb}</p>
      ) : null}
    </Reveal>
  );
}

export function Plate({
  caption,
  className,
  ratio = "aspect-[4/3]",
}: {
  caption: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <figure className={cn("group/plate", className)}>
      <div
        className={cn(
          "shimmer-plate scanlines relative w-full overflow-hidden border border-border",
          ratio,
        )}
      >
        <div className="blueprint absolute inset-0 opacity-40" />
        <div className="absolute inset-4 border border-dashed border-border/70" />
        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30" />
        <div className="absolute left-1/2 top-1/2 h-px w-16 -translate-x-1/2 -translate-y-1/2 bg-primary/40" />
        <div className="absolute left-1/2 top-1/2 h-16 w-px -translate-x-1/2 -translate-y-1/2 bg-primary/40" />
        <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary/70">
          render pending
        </span>
      </div>
      <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        [{caption}]
      </figcaption>
    </figure>
  );
}

export function Chip({
  active,
  children,
  onClick,
  swatch,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  swatch?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-primary/70 hover:text-primary",
        active
          ? "scale-[1.03] border-primary bg-primary text-primary-foreground shadow-[0_8px_28px_-12px_var(--primary)] hover:text-primary-foreground"
          : "border-border bg-surface text-muted-foreground",
      )}
    >
      {swatch ? (
        <span
          className="h-3 w-3 border border-foreground/25"
          style={{ background: swatch }}
          aria-hidden
        />
      ) : null}
      {children}
    </button>
  );
}

export function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-6px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        "bracket-card glow-hover border border-border bg-surface will-change-transform",
        className,
      )}
      style={{ transition: "transform 180ms ease-out, box-shadow 220ms ease-out" }}
    >
      {children}
    </div>
  );
}

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = 0,
      y = 0,
      rx = 0,
      ry = 0,
      raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest("a, button, input, textarea, select, [role='button']");
      if (ring.current)
        ring.current.style.setProperty("--r-scale", interactive ? "1.9" : "1");
      if (ring.current)
        ring.current.style.borderColor = interactive
          ? "var(--primary)"
          : "color-mix(in oklab, var(--foreground) 45%, transparent)";
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(var(--r-scale, 1))`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div ref={dot} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-primary" />
      <div
        ref={ring}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border border-foreground/40 transition-[border-color] duration-150"
      />
    </div>
  );
}
