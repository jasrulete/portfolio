import { useCallback, useEffect, useRef, useState } from "react";

const GRID = 20;
const CELL = 20;
const BEST_KEY = "portfolio-snake-best";

type Point = { x: number; y: number };

export default function SnakeApp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(
    () => Number(localStorage.getItem(BEST_KEY)) || 0
  );

  const snakeRef = useRef<Point[]>([{ x: 10, y: 10 }]);
  const dirRef = useRef<Point>({ x: 1, y: 0 });
  const nextDirRef = useRef<Point>({ x: 1, y: 0 });
  const foodRef = useRef<Point>({ x: 15, y: 10 });

  const placeFood = useCallback(() => {
    let p: Point;
    do {
      p = {
        x: Math.floor(Math.random() * GRID),
        y: Math.floor(Math.random() * GRID),
      };
    } while (snakeRef.current.some((s) => s.x === p.x && s.y === p.y));
    foodRef.current = p;
  }, []);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#1f2937";
    ctx.fillRect(0, 0, GRID * CELL, GRID * CELL);
    ctx.fillStyle = "#d97706";
    const f = foodRef.current;
    ctx.fillRect(f.x * CELL + 3, f.y * CELL + 3, CELL - 6, CELL - 6);
    snakeRef.current.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? "#60a5fa" : "#2563eb";
      ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
    });
  }, []);

  const reset = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    setScore(0);
    setGameOver(false);
    placeFood();
    setRunning(true);
  }, [placeFood]);

  // Game tick
  useEffect(() => {
    if (!running) return;
    const speed = Math.max(70, 140 - score * 4);
    const id = setInterval(() => {
      dirRef.current = nextDirRef.current;
      const head = snakeRef.current[0];
      const next = {
        x: head.x + dirRef.current.x,
        y: head.y + dirRef.current.y,
      };
      const hitWall =
        next.x < 0 || next.y < 0 || next.x >= GRID || next.y >= GRID;
      const hitSelf = snakeRef.current.some(
        (s) => s.x === next.x && s.y === next.y
      );
      if (hitWall || hitSelf) {
        setRunning(false);
        setGameOver(true);
        setBest((b) => {
          const nb = Math.max(b, score);
          localStorage.setItem(BEST_KEY, String(nb));
          return nb;
        });
        return;
      }
      snakeRef.current = [next, ...snakeRef.current];
      if (next.x === foodRef.current.x && next.y === foodRef.current.y) {
        setScore((s) => s + 1);
        placeFood();
      } else {
        snakeRef.current.pop();
      }
      draw();
    }, speed);
    return () => clearInterval(id);
  }, [running, score, draw, placeFood]);

  // Keyboard controls
  useEffect(() => {
    const turn = (x: number, y: number) => {
      const d = dirRef.current;
      if (d.x === -x && d.y === -y) return; // no reversing
      nextDirRef.current = { x, y };
    };
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k))
        e.preventDefault();
      if (k === "arrowup" || k === "w") turn(0, -1);
      else if (k === "arrowdown" || k === "s") turn(0, 1);
      else if (k === "arrowleft" || k === "a") turn(-1, 0);
      else if (k === "arrowright" || k === "d") turn(1, 0);
      else if (k === " ") {
        if (gameOver) reset();
        else setRunning((r) => !r);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gameOver, reset]);

  useEffect(() => {
    draw();
  }, [draw]);

  const turnButton = (x: number, y: number, label: string, aria: string) => (
    <button
      type="button"
      aria-label={aria}
      onClick={() => {
        const d = dirRef.current;
        if (d.x === -x && d.y === -y) return;
        nextDirRef.current = { x, y };
      }}
      className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-display font-bold active:scale-90 transition-transform"
    >
      {label}
    </button>
  );

  return (
    <div className="p-4 flex flex-col items-center gap-3 select-none">
      <div className="flex items-center gap-4 font-display text-sm">
        <span>
          Score: <strong className="text-blue-600 dark:text-blue-400">{score}</strong>
        </span>
        <span className="text-gray-500 dark:text-gray-400">Best: {best}</span>
        <button
          type="button"
          onClick={() => (gameOver || !running ? reset() : setRunning(false))}
          className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
        >
          {running ? "Pause" : gameOver ? "Restart" : "Start"}
        </button>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GRID * CELL}
          height={GRID * CELL}
          className="rounded-lg max-w-full"
        />
        {(!running || gameOver) && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
            <p className="font-display text-white text-sm text-center px-4">
              {gameOver
                ? `Game over — ${score} point${score === 1 ? "" : "s"}. Space or Restart to retry.`
                : "Arrows / WASD to move · Space to pause"}
            </p>
          </div>
        )}
      </div>

      {/* Touch controls */}
      <div className="grid grid-cols-3 gap-1 sm:hidden">
        <span />
        {turnButton(0, -1, "↑", "Move up")}
        <span />
        {turnButton(-1, 0, "←", "Move left")}
        {turnButton(0, 1, "↓", "Move down")}
        {turnButton(1, 0, "→", "Move right")}
      </div>
    </div>
  );
}
