import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DESIGNS } from "@/lib/designs";
import shoe0 from "@/assets/shoe-0.png";
import shoe1 from "@/assets/shoe-1.png";
import shoe2 from "@/assets/shoe-2.png";
import shoe3 from "@/assets/shoe-3.png";
import { cn } from "@/lib/utils";

const ANGLES = [
  { src: shoe0, label: "front", x: "50%", y: "44%" },
  { src: shoe1, label: "3/4 left", x: "52%", y: "52%" },
  { src: shoe2, label: "side", x: "44%", y: "56%" },
  { src: shoe3, label: "back", x: "50%", y: "50%" },
];

const HOLD = 3200;

export function ShoeViewer({
  pinned,
  attached = true,
  hideDots = false,
  caption,
}: {
  pinned?: number | null;
  attached?: boolean;
  hideDots?: boolean;
  caption?: string;
}) {
  const [angle, setAngle] = useState(0);
  const [active, setActive] = useState(pinned ?? 0);
  const drag = useRef<{ x: number; angle: number } | null>(null);

  useEffect(() => {
    if (pinned != null) {
      setActive(pinned);
      return;
    }
    const t = setInterval(() => setActive((a) => (a + 1) % DESIGNS.length), HOLD);
    return () => clearInterval(t);
  }, [pinned]);

  const rotate = (dir: number) => setAngle((a) => (a + dir + ANGLES.length) % ANGLES.length);

  const view = ANGLES[angle]!;
  const design = DESIGNS[active]!;

  return (
    <div className="w-full select-none">
      <div className="flex items-center justify-center gap-2 sm:gap-6">
        <RotateButton dir={-1} onClick={() => rotate(-1)} />

        <div
          className="pedestal relative aspect-square w-full max-w-md touch-pan-y rounded-2xl"
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, angle };
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d) return;
            const steps = Math.round((e.clientX - d.x) / 70);
            if (steps !== 0) {
              setAngle(((d.angle + steps) % ANGLES.length + ANGLES.length) % ANGLES.length);
            }
          }}
          onPointerUp={() => (drag.current = null)}
          onPointerLeave={() => (drag.current = null)}
        >
          <img
            src={view.src}
            alt={`[SHOE RENDER — ${view.label} view]`}
            width={1024}
            height={1024}
            className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.18)]"
          />
          {attached && (
            <img
              key={`${design.id}-${angle}`}
              src={design.img}
              alt={design.label}
              width={512}
              height={512}
              className="attach-drop pointer-events-none absolute"
              style={{ left: view.x, top: view.y, width: design.size }}
            />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Drag to rotate
          </div>
        </div>

        <RotateButton dir={1} onClick={() => rotate(1)} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {DESIGNS.map((d, i) => (
          <button
            key={d.id}
            aria-label={d.name}
            onClick={() => setActive(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-200",
              i === active ? "w-7 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Preview mode — {design.name}
      </p>
    </div>
  );
}

function RotateButton({ dir, onClick }: { dir: number; onClick: () => void }) {
  const Icon = dir < 0 ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      aria-label={dir < 0 ? "Rotate left" : "Rotate right"}
      className="shrink-0 rounded-full border border-border bg-surface p-2.5 text-muted-foreground transition-colors duration-150 hover:border-primary hover:text-foreground"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
