import { useCallback, useRef } from "react";
import { X, Minus, Square, Copy } from "lucide-react";
import { useWindowManager, type WindowState } from "./window-manager";

const TASKBAR_HEIGHT = 48;
const MIN_WIDTH = 300;
const MIN_HEIGHT = 220;

export default function Window({ win }: { win: WindowState }) {
  const { closeWindow, focusWindow, minimizeWindow, toggleMaximize, updateBounds } =
    useWindowManager();
  const dragRef = useRef<{
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);
  const resizeRef = useRef<{
    startX: number;
    startY: number;
    origW: number;
    origH: number;
  } | null>(null);

  const onDragStart = useCallback(
    (e: React.PointerEvent) => {
      if (win.maximized) return;
      focusWindow(win.id);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origX: win.x,
        origY: win.y,
      };
      (e.target as Element).setPointerCapture(e.pointerId);
    },
    [win, focusWindow]
  );

  const onDragMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      const maxY =
        (typeof window !== "undefined" ? window.innerHeight : 800) - TASKBAR_HEIGHT - 32;
      updateBounds(win.id, {
        x: Math.max(0, dragRef.current.origX + dx),
        y: Math.max(0, Math.min(maxY, dragRef.current.origY + dy)),
      });
    },
    [win.id, updateBounds]
  );

  const onDragEnd = useCallback(() => {
    dragRef.current = null;
  }, []);

  const onResizeStart = useCallback(
    (e: React.PointerEvent) => {
      if (win.maximized) return;
      e.stopPropagation();
      focusWindow(win.id);
      resizeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        origW: win.width,
        origH: win.height,
      };
      (e.target as Element).setPointerCapture(e.pointerId);
    },
    [win, focusWindow]
  );

  const onResizeMove = useCallback(
    (e: React.PointerEvent) => {
      if (!resizeRef.current) return;
      const dx = e.clientX - resizeRef.current.startX;
      const dy = e.clientY - resizeRef.current.startY;
      updateBounds(win.id, {
        width: Math.max(MIN_WIDTH, resizeRef.current.origW + dx),
        height: Math.max(MIN_HEIGHT, resizeRef.current.origH + dy),
      });
    },
    [win.id, updateBounds]
  );

  const onResizeEnd = useCallback(() => {
    resizeRef.current = null;
  }, []);

  if (win.minimized) return null;

  const style = win.maximized
    ? {
        left: 8,
        top: 8,
        width: `calc(100vw - 16px)`,
        height: `calc(100vh - ${TASKBAR_HEIGHT + 16}px)`,
        zIndex: win.zIndex,
      }
    : {
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      };

  return (
    <div
      className="fixed flex flex-col rounded-lg overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800"
      style={style}
      onPointerDown={() => focusWindow(win.id)}
    >
      <div
        className="flex items-center justify-between px-3 py-2 bg-gray-100 dark:bg-gray-900 border-b border-black/10 dark:border-white/10 cursor-grab active:cursor-grabbing select-none touch-none"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onDoubleClick={() => toggleMaximize(win.id)}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="shrink-0 text-blue-600 dark:text-blue-400">{win.icon}</span>
          <span className="text-sm font-medium truncate text-gray-800 dark:text-gray-100">
            {win.title}
          </span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            aria-label="Minimize"
            className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(win.id);
            }}
          >
            <Minus size={14} />
          </button>
          <button
            aria-label="Maximize"
            className="p-1.5 rounded hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize(win.id);
            }}
          >
            {win.maximized ? <Copy size={12} /> : <Square size={12} />}
          </button>
          <button
            aria-label="Close"
            className="p-1.5 rounded hover:bg-red-500 hover:text-white text-gray-600 dark:text-gray-300"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(win.id);
            }}
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white dark:bg-gray-800">
        {win.content}
      </div>

      {!win.maximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize touch-none"
          onPointerDown={onResizeStart}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeEnd}
        >
          <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-gray-400 dark:border-gray-500" />
        </div>
      )}
    </div>
  );
}
