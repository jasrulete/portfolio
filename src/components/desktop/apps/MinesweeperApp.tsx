import { useEffect, useState } from "react";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

interface Cell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adj: number;
}

type Status = "ready" | "playing" | "won" | "lost";

const NUMBER_COLORS = [
  "",
  "text-blue-600 dark:text-blue-400",
  "text-green-600 dark:text-green-400",
  "text-red-600 dark:text-red-400",
  "text-purple-700 dark:text-purple-400",
  "text-amber-700 dark:text-amber-500",
  "text-teal-600 dark:text-teal-400",
  "text-gray-800 dark:text-gray-200",
  "text-gray-500",
];

function emptyBoard(): Cell[][] {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adj: 0,
    }))
  );
}

function neighbors(r: number, c: number): [number, number][] {
  const out: [number, number][] = [];
  for (let dr = -1; dr <= 1; dr++)
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) out.push([nr, nc]);
    }
  return out;
}

/** Mines are placed on first reveal, keeping that cell and its neighbors safe. */
function placeMines(board: Cell[][], safeR: number, safeC: number): Cell[][] {
  const next = board.map((row) => row.map((c) => ({ ...c })));
  const safe = new Set([
    `${safeR},${safeC}`,
    ...neighbors(safeR, safeC).map(([r, c]) => `${r},${c}`),
  ]);
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (next[r][c].mine || safe.has(`${r},${c}`)) continue;
    next[r][c].mine = true;
    placed++;
  }
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      next[r][c].adj = neighbors(r, c).filter(([nr, nc]) => next[nr][nc].mine)
        .length;
  return next;
}

function floodReveal(board: Cell[][], r: number, c: number): Cell[][] {
  const next = board.map((row) => row.map((cell) => ({ ...cell })));
  const queue: [number, number][] = [[r, c]];
  while (queue.length) {
    const [cr, cc] = queue.pop()!;
    const cell = next[cr][cc];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (cell.adj === 0 && !cell.mine) {
      neighbors(cr, cc).forEach(([nr, nc]) => {
        if (!next[nr][nc].revealed) queue.push([nr, nc]);
      });
    }
  }
  return next;
}

export default function MinesweeperApp() {
  const [board, setBoard] = useState<Cell[][]>(emptyBoard);
  const [status, setStatus] = useState<Status>("ready");
  const [flagMode, setFlagMode] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  const flags = board.flat().filter((c) => c.flagged).length;
  const revealedCount = board.flat().filter((c) => c.revealed).length;

  const reset = () => {
    setBoard(emptyBoard());
    setStatus("ready");
    setSeconds(0);
    setFlagMode(false);
  };

  const toggleFlag = (r: number, c: number) => {
    if (status === "won" || status === "lost" || board[r][c].revealed) return;
    setBoard((b) =>
      b.map((row, ri) =>
        row.map((cell, ci) =>
          ri === r && ci === c ? { ...cell, flagged: !cell.flagged } : cell
        )
      )
    );
  };

  const reveal = (r: number, c: number) => {
    if (status === "won" || status === "lost") return;
    if (board[r][c].flagged || board[r][c].revealed) return;

    let next = board;
    if (status === "ready") {
      next = placeMines(board, r, c);
      setStatus("playing");
    }

    if (next[r][c].mine) {
      setBoard(
        next.map((row) =>
          row.map((cell) => (cell.mine ? { ...cell, revealed: true } : cell))
        )
      );
      setStatus("lost");
      return;
    }

    next = floodReveal(next, r, c);
    setBoard(next);
    const revealed = next.flat().filter((cell) => cell.revealed).length;
    if (revealed === ROWS * COLS - MINES) setStatus("won");
  };

  const onCellClick = (r: number, c: number) => {
    if (flagMode) toggleFlag(r, c);
    else reveal(r, c);
  };

  return (
    <div className="p-4 flex flex-col items-center gap-3 select-none">
      <div className="flex items-center gap-3 font-display text-sm">
        <span aria-label="Mines remaining">
          <span aria-hidden>⚑</span> {MINES - flags}
        </span>
        <span className="text-gray-500 dark:text-gray-400">{seconds}s</span>
        <button
          type="button"
          onClick={() => setFlagMode((f) => !f)}
          aria-pressed={flagMode}
          className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors ${
            flagMode
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"
          }`}
        >
          Flag mode
        </button>
        <button
          type="button"
          onClick={reset}
          className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
        >
          Reset
        </button>
      </div>

      <p
        role="status"
        className="font-display text-sm h-5 text-gray-700 dark:text-gray-300"
      >
        {status === "won" && `Cleared in ${seconds}s — nice.`}
        {status === "lost" && "Boom. Reset to try again."}
        {(status === "ready" || status === "playing") &&
          `${ROWS * COLS - MINES - revealedCount} cells to go`}
      </p>

      <div
        className="grid gap-0.5"
        style={{ gridTemplateColumns: `repeat(${COLS}, 2rem)` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              type="button"
              onClick={() => onCellClick(r, c)}
              onContextMenu={(e) => {
                e.preventDefault();
                toggleFlag(r, c);
              }}
              aria-label={`Cell ${r + 1},${c + 1}`}
              className={`w-8 h-8 rounded text-sm font-display font-bold flex items-center justify-center transition-colors ${
                cell.revealed
                  ? cell.mine
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer"
              }`}
            >
              {cell.revealed
                ? cell.mine
                  ? "✸"
                  : cell.adj > 0 && (
                      <span className={NUMBER_COLORS[cell.adj]}>{cell.adj}</span>
                    )
                : cell.flagged && <span aria-hidden>⚑</span>}
            </button>
          ))
        )}
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        Right-click (or Flag mode) to flag · first click is always safe
      </p>
    </div>
  );
}
