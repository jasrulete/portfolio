// project-layouts.tsx
//
// The four ways the projects section can present the same filtered list, plus
// the control that switches between them.
//
// Grid stays the default deliberately: a visitor skimming for a minute should
// not have to click through a carousel to see the work. The spatial layouts
// are an opt-in demonstration of the CSS 3D techniques documented in the
// Design Lab, applied to real content.
//
// Every layout keeps all projects in the DOM — the ring marks off-screen
// panels aria-hidden and announces the active one, rather than unmounting
// them, so nothing becomes unreachable to assistive tech.

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, LayoutGrid, RotateCw, Disc3, Layers } from "lucide-react";
import { cn } from "../../lib/utils";
import type { GithubStats } from "../../lib/use-github-stats";
import DepthCard from "./depth-card";
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion";
import {
  CompactProjectCard,
  FlipProjectCard,
  ProjectCard,
  type Project,
} from "./project-card";

export type ProjectLayout = "grid" | "flip" | "corridor" | "ring";

const PROJECT_LAYOUTS: {
  id: ProjectLayout;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "grid", label: "Grid", icon: <LayoutGrid size={14} /> },
  { id: "flip", label: "Flip", icon: <RotateCw size={14} /> },
  { id: "corridor", label: "Corridor", icon: <Layers size={14} /> },
  { id: "ring", label: "Ring", icon: <Disc3 size={14} /> },
];

export function LayoutSwitcher({
  value,
  onChange,
}: {
  value: ProjectLayout;
  onChange: (l: ProjectLayout) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Projects layout"
      className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      {PROJECT_LAYOUTS.map((l) => (
        <button
          key={l.id}
          type="button"
          role="radio"
          aria-checked={value === l.id}
          onClick={() => onChange(l.id)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            value === l.id
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          )}
        >
          {l.icon}
          {l.label}
        </button>
      ))}
    </div>
  );
}

interface LayoutProps {
  // readonly: profile.projects is an `as const` tuple, so the unfiltered
  // list arrives readonly. Accepting it is correct rather than casting.
  projects: readonly Project[];
  stats: Record<string, GithubStats>;
  statsLoading: boolean;
  statsFailed: Record<string, true>;
}

export function ProjectsLayout({
  layout,
  ...props
}: LayoutProps & { layout: ProjectLayout }) {
  if (layout === "flip") return <FlipLayout {...props} />;
  if (layout === "corridor") return <CorridorLayout {...props} />;
  if (layout === "ring") return <RingLayout {...props} />;
  return <GridLayout {...props} />;
}

// Project cards are deliberately not wrapped in ScrollReveal: a card that
// fades in on a delay is a card a fast scroller sees as an empty box.
function GridLayout({ projects, stats, statsLoading, statsFailed }: LayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <DepthCard key={project.title}>
          <ProjectCard
            project={project}
            stats={"github" in project ? stats[project.github as string] : undefined}
            statsLoading={statsLoading}
            statsFailed={
              "github" in project
                ? Boolean(statsFailed[project.github as string])
                : false
            }
          />
        </DepthCard>
      ))}
    </div>
  );
}

function FlipLayout({ projects }: LayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <FlipProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}

// Dimensions live in JS, not Tailwind classes, because the scroll maths below
// depends on them — a class and a constant drifting apart is exactly how the
// last card became unreachable before.
const CARD_W = 352;
const CARD_H = 560;
const CORRIDOR_GAP = 40;
const CARD_W_MIN = 240;

function CorridorLayout({ projects }: LayoutProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [trackWidth, setTrackWidth] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setTrackWidth(el.clientWidth));
    ro.observe(el);
    setTrackWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // The fixed 352px card was wider than the content area of a 375px phone,
  // so it overflowed sideways on its own. Cap it to the track and derive the
  // scroll maths from the measured width rather than the constant.
  const cardW = trackWidth
    ? Math.max(CARD_W_MIN, Math.min(CARD_W, trackWidth - 48))
    : CARD_W;
  const corridorItem = cardW + CORRIDOR_GAP;
  // Half a viewport minus half a card, less one gap (the flex gap after the
  // spacer supplies that). Rendered as real flex items rather than padding:
  // an overflowing flex container's end padding does not count toward
  // scrollWidth, which left the final card short of centre.
  const edgeSpacer = `calc(50% - ${cardW / 2 + CORRIDOR_GAP}px)`;

  // Rounding rather than a distance threshold: this guarantees exactly one
  // featured card, so two never expand at once mid-scroll.
  const activeIndex = Math.min(
    projects.length - 1,
    Math.max(0, Math.round(scrollLeft / corridorItem))
  );

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={(e) => setScrollLeft(e.currentTarget.scrollLeft)}
        className="overflow-x-auto pb-10 pt-6"
        style={{ perspective: "1200px", scrollSnapType: "x mandatory" }}
      >
        <div
          className="flex"
          style={{ gap: CORRIDOR_GAP, transformStyle: "preserve-3d" }}
        >
          <div aria-hidden className="shrink-0" style={{ width: edgeSpacer }} />

          {projects.map((project, i) => {
            // With the spacers above and below, card i's centre sits exactly
            // i * CORRIDOR_ITEM to the right of the viewport centre at
            // scrollLeft 0 — so distance from centre is just that minus how
            // far we have scrolled.
            const fromCentre = i * corridorItem - scrollLeft;
            const offset = trackWidth ? fromCentre / (trackWidth / 2) : 0;
            const c = Math.max(-1.6, Math.min(1.6, offset));
            const t = Math.abs(c);
            return (
              // The flex item stays untransformed on purpose. Chrome derives
              // scrollable overflow from *transformed* boxes, so transforming
              // this element directly made the receding right-hand cards
              // project narrower than their layout box and shrank the scroll
              // range — leaving the last card unable to reach centre.
              <div
                key={project.title}
                className="shrink-0"
                style={{
                  width: cardW,
                  height: CARD_H,
                  scrollSnapAlign: "center",
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="h-full w-full"
                  style={
                    reducedMotion
                      ? undefined
                      : {
                          // Centred card comes toward the viewer; the rest turn
                          // away and recede, so one card is always the subject.
                          transform: `rotateY(${c * -32}deg) translateZ(${60 - t * 220}px)`,
                          opacity: 1 - Math.min(0.5, t * 0.36),
                          zIndex: Math.round(100 - t * 50),
                        }
                  }
                >
                  <CompactProjectCard
                    project={project}
                    featured={i === activeIndex}
                  />
                </div>
              </div>
            );
          })}

          <div aria-hidden className="shrink-0" style={{ width: edgeSpacer }} />
        </div>
      </div>
      <p className="text-center text-xs text-gray-600 dark:text-gray-400">
        Scroll sideways — the centred card turns to face you.
      </p>
    </div>
  );
}

function RingLayout({ projects }: LayoutProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  // Reset when the filtered list changes, so the ring never points at a
  // panel that no longer exists.
  useEffect(() => setIndex(0), [projects.length]);

  if (projects.length === 0) return null;

  const step = 360 / projects.length;
  // Minimum radius before neighbouring panels intersect is
  // (width/2) / tan(180/n); 300px keeps 256px-wide cards clear at n >= 5.
  const radius = Math.max(300, (128 / Math.tan(Math.PI / projects.length)) * 1.1);

  return (
    <div>
      {/* Clipping wrapper sits outside the 3D chain: it has no preserve-3d of
          its own, so it bounds the ring without flattening it. */}
      <div className="overflow-hidden">
        <div
          className="relative h-[26rem]"
          style={{ perspective: "1600px" }}
        >
          <div
            className={cn(
              "absolute inset-0",
              !reducedMotion && "transition-transform duration-500 ease-out"
            )}
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(-${radius}px) rotateY(${-index * step}deg)`,
            }}
          >
            {projects.map((project, i) => (
              // inert as well as aria-hidden: without it, Tab lands on the
              // Live demo / Source links of panels facing away from the
              // viewer, with nothing announced and nothing visible.
              <div
                key={project.title}
                aria-hidden={i !== index}
                inert={i !== index}
                className="absolute left-1/2 top-1/2 h-80 w-64"
                style={{
                  // Centring must live in the inline transform: an inline
                  // transform replaces Tailwind's -translate utilities wholesale.
                  transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
                }}
              >
                <CompactProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-4">
        <RingButton
          label="Previous project"
          onClick={() => setIndex((i) => (i - 1 + projects.length) % projects.length)}
        >
          <ChevronLeft size={18} />
        </RingButton>
        <p
          aria-live="polite"
          className="min-w-[12rem] text-center text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {projects[index]?.title}
          <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">
            {index + 1}/{projects.length}
          </span>
        </p>
        <RingButton
          label="Next project"
          onClick={() => setIndex((i) => (i + 1) % projects.length)}
        >
          <ChevronRight size={18} />
        </RingButton>
      </div>
    </div>
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
      className="rounded-full border border-gray-300 p-3 text-gray-600 transition-colors hover:border-blue-500 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-gray-600 dark:text-gray-300"
    >
      {children}
    </button>
  );
}
