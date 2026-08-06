// depth-card.tsx
//
// A tilt card that keeps a real 3D context, so nested layers genuinely sit at
// different depths instead of rotating as one flat plane.
//
// Two details make that work, and both are easy to get wrong:
//   1. `perspective` is a CSS property on the *wrapper*, not a perspective()
//      call inside the transform — only the property applies to a whole
//      preserve-3d subtree.
//   2. `transform-style: preserve-3d` must survive down to the layers. Any
//      ancestor with `overflow` other than `visible` silently forces it back
//      to `flat`, which is why clipping happens on inner boxes here rather
//      than on the card itself.

import { useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion";

interface DepthCardProps {
  children: React.ReactNode;
  className?: string;
  /** Peak rotation in degrees at the card's corners. */
  maxTilt?: number;
  /** Larger = shallower, less distorted perspective. */
  perspective?: number;
}

export default function DepthCard({
  children,
  className,
  maxTilt = 8,
  perspective = 1100,
}: DepthCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  // Pointer events with an explicit mouse check: touch devices fire these too,
  // and a tilt that sticks after a tap reads as a rendering bug.
  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: -(py - 0.5) * 2 * maxTilt,
      ry: (px - 0.5) * 2 * maxTilt,
    });
    setGlare({ x: px * 100, y: py * 100, opacity: 1 });
  };

  const reset = () => {
    setTilt({ rx: 0, ry: 0 });
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <div
      ref={ref}
      className={cn("relative h-full", className)}
      style={{ perspective: `${perspective}px` }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      <div
        className="relative h-full transition-transform duration-200 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        }}
      >
        {children}

        {/* Specular sheen tracking the cursor. Sits above the layers but
            stays pointer-transparent so it never eats clicks on links. */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            transform: "translateZ(60px)",
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.16), transparent 55%)`,
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}

/**
 * Lifts its children toward the viewer inside a DepthCard. Positive `depth`
 * comes forward, negative recedes.
 */
export function DepthLayer({
  depth,
  className,
  children,
}: {
  depth: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={className}
      style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
