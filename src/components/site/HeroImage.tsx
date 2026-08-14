import { useEffect, useRef, useState, type ReactNode } from "react";
import hero from "@/assets/hero-mountain.jpg";

export function HeroImage({ children }: { children?: ReactNode }) {
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
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      setOffset(Math.max(-1.2, Math.min(1.2, progress)));
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
      className="relative w-full overflow-hidden"
      style={{ height: "min(92vh, 900px)" }}
    >
      <img
        src={hero}
        alt="Person wearing white sneakers on a mountain ridge at golden hour"
        width={1600}
        height={1104}
        className="absolute left-0 h-[130%] w-full object-cover will-change-transform"
        style={{
          top: "-15%",
          transform: `translate3d(0, ${offset * 14}%, 0) scale(${1 + Math.abs(offset) * 0.05})`,
        }}
      />
      {children ? (
        <div className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-black/45 via-black/10 to-transparent">
          <div className="w-full px-5 pb-12 md:px-10 md:pb-16">{children}</div>
        </div>
      ) : null}
    </div>
  );
}
