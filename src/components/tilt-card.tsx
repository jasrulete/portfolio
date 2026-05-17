import { useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function TiltCard({ children, className }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTransform(
      `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale3d(1.02, 1.02, 1.02)`
    );
    setGlare({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleLeave = () => {
    setTransform("");
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("relative transition-transform duration-200 ease-out", className)}
      style={{ transform: transform || undefined }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 z-10"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.15), transparent 55%)`,
        }}
      />
      {children}
    </div>
  );
}
