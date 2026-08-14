import { useEffect, useRef, useState } from "react";
import hero from "@/assets/hero-mountain.jpg";

export function HeroImage() {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 (below viewport) .. 1 (above viewport)
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      setOffset(Math.max(-1, Math.min(1, progress)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden rounded-2xl"
      style={{ aspectRatio: "16 / 10" }}
    >
      <img
        src={hero}
        alt="Person wearing white sneakers on a mountain ridge at golden hour"
        width={1600}
        height={1104}
        className="absolute left-0 h-[128%] w-full object-cover will-change-transform"
        style={{
          top: "-14%",
          transform: `translate3d(0, ${offset * 12}%, 0) scale(${1 + Math.abs(offset) * 0.04})`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-border" />
    </div>
  );
}
