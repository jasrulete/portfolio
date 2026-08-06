// design-lab-3d.tsx
//
// Four live demonstrations of the CSS 3D techniques this site uses, shown in
// the Design Lab the same way the colour tokens and motion tiers are: as
// something a visitor can actually poke at, not a screenshot.
//
// Everything here is CSS 3D on real DOM — no WebGL, no dependencies. That is
// a deliberate choice for content: the cards stay focusable, selectable and
// screen-reader legible, which a <canvas> gallery could never be.

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DepthCard, { DepthLayer } from "./depth-card";
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion";

const PANELS = ["Sportal", "Toxic Detector", "Minna no Nihongo", "HoneyOS", "BudgetWise"];

/** 1 — Layers separated on the Z axis inside a tilting card. */
export function DepthLayersDemo() {
  return (
    <DemoFrame
      label="Depth layers"
      note="Nested layers sit at different Z depths, so the card has real volume."
    >
      <DepthCard className="w-full max-w-[16rem]">
        <div className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <DepthLayer depth={0}>
            <div className="h-16 rounded-lg bg-blue-600/90" />
          </DepthLayer>
          <DepthLayer depth={34} className="mt-3">
            <p className="font-display text-sm font-bold">Project title</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Lifts toward you
            </p>
          </DepthLayer>
          <DepthLayer depth={58} className="mt-3">
            <span className="inline-block rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              Front-most
            </span>
          </DepthLayer>
        </div>
      </DepthCard>
    </DemoFrame>
  );
}

/** 2 — A card with two faces, rotated through 3D space. */
export function FlipCardDemo() {
  const [flipped, setFlipped] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <DemoFrame
      label="Flip card"
      note="Detail lives on the back face — revealed on demand, not dumped up front."
    >
      {/* A real button, so this works by keyboard as well as by pointer. */}
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label={flipped ? "Show front of card" : "Show back of card"}
        className="w-full max-w-[16rem] rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        style={{ perspective: "1100px" }}
      >
        <div
          className={`relative h-32 w-full ${reducedMotion ? "" : "transition-transform duration-500"}`}
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          <FlipFace className="border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <p className="font-display text-sm font-bold">Sportal</p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Click or press Enter
            </p>
          </FlipFace>
          <FlipFace
            back
            className="border-blue-500/40 bg-blue-600 text-white"
          >
            <p className="text-xs leading-relaxed">
              Next.js · Prisma · MongoDB — automated bracket generation
            </p>
          </FlipFace>
        </div>
      </button>
    </DemoFrame>
  );
}

function FlipFace({
  children,
  className,
  back,
}: {
  children: React.ReactNode;
  className?: string;
  back?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center rounded-xl border p-4 text-center shadow-md ${className}`}
      style={{
        backfaceVisibility: "hidden",
        transform: back ? "rotateY(180deg)" : undefined,
      }}
    >
      {children}
    </div>
  );
}

/** 3 — Depth driven by scroll position rather than by cursor. */
export function ScrollDepthDemo() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setTrackWidth(el.clientWidth));
    observer.observe(el);
    setTrackWidth(el.clientWidth);
    return () => observer.disconnect();
  }, []);

  const ITEM = 108; // width + gap, keeps the maths readable

  return (
    <DemoFrame
      label="Scroll-driven depth"
      note="Distance from centre maps to Z — items recede as they leave the middle."
    >
      <div
        ref={trackRef}
        onScroll={(e) => setScrollLeft(e.currentTarget.scrollLeft)}
        className="w-full overflow-x-auto pb-3"
        style={{ perspective: "700px" }}
      >
        <div className="flex gap-3 px-[35%]" style={{ transformStyle: "preserve-3d" }}>
          {PANELS.map((name, i) => {
            const centre = i * ITEM + ITEM / 2 - scrollLeft;
            const offset = trackWidth ? (centre - trackWidth / 2) / (trackWidth / 2) : 0;
            const clamped = Math.max(-1.5, Math.min(1.5, offset));
            const style = reducedMotion
              ? undefined
              : {
                  transform: `rotateY(${clamped * -32}deg) translateZ(${-Math.abs(clamped) * 90}px)`,
                  opacity: 1 - Math.min(0.6, Math.abs(clamped) * 0.45),
                };
            return (
              <div
                key={name}
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-center text-[11px] font-medium shadow-md dark:border-gray-700 dark:bg-gray-800"
                style={style}
              >
                {name}
              </div>
            );
          })}
        </div>
      </div>
    </DemoFrame>
  );
}

/** 4 — Panels distributed around a cylinder you rotate through. */
export function RingCarouselDemo() {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const step = 360 / PANELS.length;
  // Minimum radius before neighbouring panels intersect is
  // (width/2) / tan(180/n) ≈ 88px for five 128px panels — 120 leaves margin.
  const radius = 120;

  return (
    <DemoFrame
      label="Ring carousel"
      note="Panels sit on a cylinder; the ring rotates rather than the panels sliding."
    >
      {/* Clipping wrapper deliberately sits outside the 3D chain: it has no
          preserve-3d of its own, so it bounds the rotating ring without
          flattening it. */}
      <div className="w-full overflow-hidden">
        <div className="relative h-32 w-full" style={{ perspective: "900px" }}>
          <div
            className={`absolute inset-0 ${reducedMotion ? "" : "transition-transform duration-500 ease-out"}`}
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(-${radius}px) rotateY(${-index * step}deg)`,
            }}
          >
            {PANELS.map((name, i) => (
              <div
                key={name}
                aria-hidden={i !== index}
                className="absolute left-1/2 top-1/2 flex h-20 w-32 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-center text-xs font-medium shadow-md dark:border-gray-700 dark:bg-gray-800"
                style={{
                  // Centering must live here, not in Tailwind's -translate-x-1/2:
                  // an inline transform replaces the utility classes wholesale.
                  transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
                }}
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <RingButton
          label="Previous project"
          onClick={() => setIndex((i) => (i - 1 + PANELS.length) % PANELS.length)}
        >
          <ChevronLeft size={16} />
        </RingButton>
        <p className="min-w-[7rem] text-center text-xs text-gray-500 dark:text-gray-400" aria-live="polite">
          {PANELS[index]}
        </p>
        <RingButton
          label="Next project"
          onClick={() => setIndex((i) => (i + 1) % PANELS.length)}
        >
          <ChevronRight size={16} />
        </RingButton>
      </div>
    </DemoFrame>
  );
}

function RingButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="rounded-full border border-gray-300 p-2 text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-600 dark:text-gray-300"
    >
      {children}
    </button>
  );
}

function DemoFrame({
  label,
  note,
  children,
}: {
  label: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <div className="flex min-h-[14rem] flex-1 flex-col items-center justify-center overflow-hidden rounded-lg bg-gray-50 p-4 dark:bg-gray-900/40">
        {children}
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{note}</p>
    </div>
  );
}
