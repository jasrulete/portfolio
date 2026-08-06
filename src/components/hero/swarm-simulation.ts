// swarm-simulation.ts
//
// Reynolds boids flocking in 3D. Deliberately free of React and the DOM: the
// rules stay testable in isolation and the renderer stays swappable, so if
// this ever needs to become a WebGL scene only the canvas component changes.
//
// Neighbour lookups go through a spatial hash grid. Naive flocking is O(n²)
// — at 320 agents that's ~102k distance checks every frame — while bucketing
// agents into cells the size of the neighbour radius means each agent only
// compares against the 27 cells around it, which is roughly O(n·k).

export interface Agent {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

export interface Bounds {
  halfWidth: number;
  halfHeight: number;
  halfDepth: number;
}

export interface Cursor {
  /** World-space X/Y on the z=0 plane. Ignored while `active` is false. */
  x: number;
  y: number;
  active: boolean;
}

/** Distance from the camera to the z=0 plane; larger = flatter perspective. */
export const FOCAL = 850;

const NEIGHBOUR_RADIUS = 200;
const SEPARATION_RADIUS = 62;
const MAX_SPEED = 1.5;
const MAX_FORCE = 0.055;

// Rule weights. Separation outranks cohesion so clusters stay legible
// instead of collapsing into a single blob.
const W_SEPARATION = 1.5;
const W_ALIGNMENT = 1.2;
const W_COHESION = 1.1;
const W_CONTAINMENT = 1.4;
const W_CURSOR = 0.5;

const CURSOR_RADIUS = 340;

/** Perspective divide. Agents at larger z are farther away and draw smaller. */
export function projectScale(z: number): number {
  return FOCAL / (FOCAL + z);
}

export function createAgents(count: number, bounds: Bounds): Agent[] {
  const agents: Agent[] = [];
  for (let i = 0; i < count; i++) {
    agents.push({
      x: (Math.random() * 2 - 1) * bounds.halfWidth,
      y: (Math.random() * 2 - 1) * bounds.halfHeight,
      z: (Math.random() * 2 - 1) * bounds.halfDepth,
      vx: (Math.random() * 2 - 1) * MAX_SPEED,
      vy: (Math.random() * 2 - 1) * MAX_SPEED,
      vz: (Math.random() * 2 - 1) * MAX_SPEED,
    });
  }
  return agents;
}

/** Standard spatial hash — three large primes keep cell collisions rare. */
function hashCell(cx: number, cy: number, cz: number): number {
  return ((cx * 73856093) ^ (cy * 19349663) ^ (cz * 83492791)) | 0;
}

function buildGrid(agents: Agent[]): Map<number, number[]> {
  const grid = new Map<number, number[]>();
  for (let i = 0; i < agents.length; i++) {
    const a = agents[i];
    const key = hashCell(
      Math.floor(a.x / NEIGHBOUR_RADIUS),
      Math.floor(a.y / NEIGHBOUR_RADIUS),
      Math.floor(a.z / NEIGHBOUR_RADIUS)
    );
    const bucket = grid.get(key);
    if (bucket) bucket.push(i);
    else grid.set(key, [i]);
  }
  return grid;
}

/**
 * Advances the flock one tick, mutating `agents` in place — this runs 60×/sec,
 * so allocating a fresh array per frame would hand the GC needless work.
 */
export function step(agents: Agent[], bounds: Bounds, cursor: Cursor): void {
  const grid = buildGrid(agents);
  const neighbourR2 = NEIGHBOUR_RADIUS * NEIGHBOUR_RADIUS;
  const separationR2 = SEPARATION_RADIUS * SEPARATION_RADIUS;
  const cursorR2 = CURSOR_RADIUS * CURSOR_RADIUS;

  for (let i = 0; i < agents.length; i++) {
    const a = agents[i];

    let sepX = 0, sepY = 0, sepZ = 0, sepN = 0;
    let aliX = 0, aliY = 0, aliZ = 0, aliN = 0;
    let cohX = 0, cohY = 0, cohZ = 0, cohN = 0;

    const cx = Math.floor(a.x / NEIGHBOUR_RADIUS);
    const cy = Math.floor(a.y / NEIGHBOUR_RADIUS);
    const cz = Math.floor(a.z / NEIGHBOUR_RADIUS);

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          const bucket = grid.get(hashCell(cx + dx, cy + dy, cz + dz));
          if (!bucket) continue;

          for (let k = 0; k < bucket.length; k++) {
            const j = bucket[k];
            if (j === i) continue;
            const b = agents[j];

            const ddx = a.x - b.x;
            const ddy = a.y - b.y;
            const ddz = a.z - b.z;
            const d2 = ddx * ddx + ddy * ddy + ddz * ddz;
            if (d2 === 0 || d2 > neighbourR2) continue;

            aliX += b.vx; aliY += b.vy; aliZ += b.vz; aliN++;
            cohX += b.x; cohY += b.y; cohZ += b.z; cohN++;

            if (d2 < separationR2) {
              // Weight by inverse distance so near-misses push hardest.
              const inv = 1 / Math.sqrt(d2);
              sepX += ddx * inv; sepY += ddy * inv; sepZ += ddz * inv;
              sepN++;
            }
          }
        }
      }
    }

    let accX = 0, accY = 0, accZ = 0;

    if (sepN > 0) {
      const s = steerToward(sepX / sepN, sepY / sepN, sepZ / sepN, a);
      accX += s.x * W_SEPARATION;
      accY += s.y * W_SEPARATION;
      accZ += s.z * W_SEPARATION;
    }

    if (aliN > 0) {
      const s = steerToward(aliX / aliN, aliY / aliN, aliZ / aliN, a);
      accX += s.x * W_ALIGNMENT;
      accY += s.y * W_ALIGNMENT;
      accZ += s.z * W_ALIGNMENT;
    }

    if (cohN > 0) {
      const s = steerToward(
        cohX / cohN - a.x,
        cohY / cohN - a.y,
        cohZ / cohN - a.z,
        a
      );
      accX += s.x * W_COHESION;
      accY += s.y * W_COHESION;
      accZ += s.z * W_COHESION;
    }

    // Soft containment rather than wrapping: an agent teleporting across the
    // volume would pop from tiny to huge under perspective.
    if (a.x > bounds.halfWidth) accX -= W_CONTAINMENT * MAX_FORCE;
    else if (a.x < -bounds.halfWidth) accX += W_CONTAINMENT * MAX_FORCE;
    if (a.y > bounds.halfHeight) accY -= W_CONTAINMENT * MAX_FORCE;
    else if (a.y < -bounds.halfHeight) accY += W_CONTAINMENT * MAX_FORCE;
    if (a.z > bounds.halfDepth) accZ -= W_CONTAINMENT * MAX_FORCE;
    else if (a.z < -bounds.halfDepth) accZ += W_CONTAINMENT * MAX_FORCE;

    if (cursor.active) {
      const ddx = cursor.x - a.x;
      const ddy = cursor.y - a.y;
      const ddz = -a.z; // the pointer lives on the z=0 plane
      const d2 = ddx * ddx + ddy * ddy + ddz * ddz;
      if (d2 < cursorR2 && d2 > 0) {
        const falloff = 1 - d2 / cursorR2;
        const s = steerToward(ddx, ddy, ddz, a);
        accX += s.x * W_CURSOR * falloff;
        accY += s.y * W_CURSOR * falloff;
        accZ += s.z * W_CURSOR * falloff;
      }
    }

    a.vx += accX;
    a.vy += accY;
    a.vz += accZ;

    const speed = Math.hypot(a.vx, a.vy, a.vz);
    if (speed > MAX_SPEED) {
      const scale = MAX_SPEED / speed;
      a.vx *= scale; a.vy *= scale; a.vz *= scale;
    }

    a.x += a.vx;
    a.y += a.vy;
    a.z += a.vz;
  }
}

/**
 * Reynolds steering: point `desired` at full speed, then return the correction
 * from the agent's current velocity, clamped so turns stay gradual.
 */
const steerScratch = { x: 0, y: 0, z: 0 };
function steerToward(dx: number, dy: number, dz: number, a: Agent) {
  const len = Math.hypot(dx, dy, dz);
  if (len === 0) {
    steerScratch.x = steerScratch.y = steerScratch.z = 0;
    return steerScratch;
  }
  const k = MAX_SPEED / len;
  let sx = dx * k - a.vx;
  let sy = dy * k - a.vy;
  let sz = dz * k - a.vz;

  const mag = Math.hypot(sx, sy, sz);
  if (mag > MAX_FORCE) {
    const clamp = MAX_FORCE / mag;
    sx *= clamp; sy *= clamp; sz *= clamp;
  }
  steerScratch.x = sx;
  steerScratch.y = sy;
  steerScratch.z = sz;
  return steerScratch;
}
