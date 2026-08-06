// swarm-canvas.tsx
//
// Renders the boids flock from swarm-simulation.ts onto a 2D canvas, applying
// the perspective divide by hand so agents genuinely sit at different depths
// rather than faking parallax.
//
// Purely decorative: `aria-hidden` keeps it out of the accessibility tree,
// since every real hero element already lives in the DOM alongside it.

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/use-prefers-reduced-motion";
import {
  createAgents,
  projectScale,
  step,
  FOCAL,
  type Agent,
  type Bounds,
  type Cursor,
} from "./swarm-simulation";

const HALF_DEPTH = 300;
/** Enough overshoot that agents drift past the edges instead of pooling there. */
const BOUNDS_OVERSCAN = 1.15;

/** Frames simulated before the first paint, so the flock opens mid-motion. */
const WARMUP_FRAMES = 90;
/** Reduced motion still gets a composed still — a blank box is a worse answer. */
const REDUCED_MOTION_FRAMES = 220;

function agentCountFor(width: number): number {
  const base = width < 640 ? 130 : width < 1024 ? 220 : 320;
  // Low-core devices are usually thermally limited phones; ease off there.
  const cores = navigator.hardwareConcurrency ?? 4;
  return cores <= 4 ? Math.round(base * 0.6) : base;
}

export default function SwarmCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let agents: Agent[] = [];
    const bounds: Bounds = { halfWidth: 0, halfHeight: 0, halfDepth: HALF_DEPTH };
    const cursor: Cursor = { x: 0, y: 0, active: false };

    let rafId: number | null = null;
    let onScreen = true;
    let sized = false;
    const order: number[] = [];

    const seedAgents = (count: number) => {
      agents = createAgents(count, bounds);
      order.length = 0;
      for (let i = 0; i < agents.length; i++) order.push(i);
      // Settle before the first paint so the flock opens mid-motion rather
      // than as a random scatter that visibly organises itself.
      const warmup = reducedMotion ? REDUCED_MOTION_FRAMES : WARMUP_FRAMES;
      for (let i = 0; i < warmup; i++) step(agents, bounds, cursor);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Layout isn't settled yet — measuring now would size the buffer wrong.
      if (rect.width === 0 || rect.height === 0) return;

      width = rect.width;
      height = rect.height;
      // Cap DPR: a 3x retina buffer triples fill cost for no visible gain here.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      bounds.halfWidth = (width / 2) * BOUNDS_OVERSCAN;
      bounds.halfHeight = (height / 2) * BOUNDS_OVERSCAN;

      const wanted = agentCountFor(width);
      if (!sized || agents.length !== wanted) {
        seedAgents(wanted);
        sized = true;
      }

      // Static mode never enters the rAF loop, so repaint on every resize.
      if (reducedMotion) draw();
    };

    const draw = () => {
      const cx = width / 2;
      const cy = height / 2;
      ctx.clearRect(0, 0, width, height);

      // Painter's algorithm: farthest (largest z) first, so nearer agents
      // correctly overlap the ones behind them.
      order.sort((i, j) => agents[j].z - agents[i].z);

      for (let n = 0; n < order.length; n++) {
        const a = agents[order[n]];
        const s = projectScale(a.z);
        if (s <= 0) continue;

        const sx = cx + a.x * s;
        const sy = cy + a.y * s;

        // Project a point a few steps ahead to get a true 3D heading, so the
        // triangle turns with the agent instead of always facing the camera.
        const lead = 8;
        const s2 = FOCAL / (FOCAL + a.z + a.vz * lead);
        const ax = cx + (a.x + a.vx * lead) * s2;
        const ay = cy + (a.y + a.vy * lead) * s2;
        const angle = Math.atan2(ay - sy, ax - sx);

        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const len = 7 * s;
        const wide = 3 * s;

        // Depth fade: near agents read bright, far ones sink into the base.
        const t = (a.z + HALF_DEPTH) / (HALF_DEPTH * 2);
        const alpha = Math.max(0.12, 0.85 - t * 0.62);

        ctx.beginPath();
        ctx.moveTo(sx + cos * len, sy + sin * len);
        ctx.lineTo(
          sx - cos * len * 0.6 - sin * wide,
          sy - sin * len * 0.6 + cos * wide
        );
        ctx.lineTo(
          sx - cos * len * 0.6 + sin * wide,
          sy - sin * len * 0.6 - cos * wide
        );
        ctx.closePath();
        // blue-400 — the documented dark-mode accent, kept as the only hue.
        ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
        ctx.fill();
      }
    };

    const frame = () => {
      step(agents, bounds, cursor);
      draw();
      rafId = requestAnimationFrame(frame);
    };

    const play = () => {
      if (rafId === null && onScreen && document.visibilityState === "visible") {
        rafId = requestAnimationFrame(frame);
      }
    };

    const pause = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    // Size immediately when layout is already settled, and let ResizeObserver
    // correct it otherwise — at mount the element often has no size yet, and
    // the observer also catches layout changes no window resize would report.
    resize();
    const sizeObserver = new ResizeObserver(() => resize());
    sizeObserver.observe(canvas);

    // Static mode paints from resize() and never enters the loop.
    if (reducedMotion) {
      return () => sizeObserver.disconnect();
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      cursor.x = e.clientX - rect.left - width / 2;
      cursor.y = e.clientY - rect.top - height / 2;
      cursor.active = e.pointerType === "mouse";
    };
    const onPointerLeave = () => {
      cursor.active = false;
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") play();
      else pause();
    };

    // Stop burning frames once the hero is scrolled past.
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) play();
        else pause();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    play();

    return () => {
      pause();
      sizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}

