import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const TASKBAR_HEIGHT = 48; // matches Window.tsx

export interface WindowState {
  id: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  prevBounds?: { x: number; y: number; width: number; height: number };
  opener?: HTMLElement; // element to return focus to on close/minimize
}

export interface OpenWindowOptions {
  id: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
  width?: number;
  height?: number;
}

interface WindowManagerContextValue {
  windows: WindowState[];
  openWindow: (opts: OpenWindowOptions) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateBounds: (
    id: string,
    bounds: Partial<Pick<WindowState, "x" | "y" | "width" | "height">>
  ) => void;
}

const WindowManagerContext = createContext<WindowManagerContextValue | null>(
  null
);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const zRef = useRef(10);
  const cascadeRef = useRef(0);
  const windowsRef = useRef<WindowState[]>([]);

  useEffect(() => {
    windowsRef.current = windows;
  }, [windows]);

  const openWindow = useCallback((opts: OpenWindowOptions) => {
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : undefined;
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === opts.id);
      zRef.current += 1;
      if (existing) {
        return prev.map((w) =>
          w.id === opts.id
            ? { ...w, minimized: false, zIndex: zRef.current, opener }
            : w
        );
      }
      cascadeRef.current = (cascadeRef.current + 1) % 6;
      // On small screens draggable windows are clumsy — open maximized instead.
      const isSmallScreen =
        typeof window !== "undefined" && window.innerWidth < 768;
      const width = Math.min(
        opts.width ?? 560,
        typeof window !== "undefined" ? window.innerWidth - 16 : 560
      );
      const height = opts.height ?? 420;
      const baseX =
        typeof window !== "undefined"
          ? Math.max(24, window.innerWidth / 2 - width / 2)
          : 120;
      const baseY =
        typeof window !== "undefined"
          ? Math.max(24, window.innerHeight / 2 - height / 2 - 24)
          : 80;
      const newWindow: WindowState = {
        id: opts.id,
        title: opts.title,
        icon: opts.icon,
        content: opts.content,
        x: baseX + cascadeRef.current * 24,
        y: baseY + cascadeRef.current * 20,
        width,
        height,
        zIndex: zRef.current,
        minimized: false,
        maximized: isSmallScreen,
        opener,
        prevBounds: isSmallScreen
          ? {
              x: baseX + cascadeRef.current * 24,
              y: baseY + cascadeRef.current * 20,
              width,
              height,
            }
          : undefined,
      };
      return [...prev, newWindow];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    const opener = windowsRef.current.find((w) => w.id === id)?.opener;
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (opener && document.contains(opener)) opener.focus();
  }, []);

  const focusWindow = useCallback((id: string) => {
    zRef.current += 1;
    const z = zRef.current;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: z, minimized: false } : w))
    );
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    const win = windowsRef.current.find((w) => w.id === id);
    const willMinimize = win ? !win.minimized : false;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w))
    );
    if (willMinimize && win?.opener && document.contains(win.opener)) {
      win.opener.focus();
    }
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.prevBounds) {
          return { ...w, maximized: false, ...w.prevBounds };
        }
        return {
          ...w,
          maximized: true,
          prevBounds: { x: w.x, y: w.y, width: w.width, height: w.height },
        };
      })
    );
  }, []);

  const updateBounds = useCallback(
    (
      id: string,
      bounds: Partial<Pick<WindowState, "x" | "y" | "width" | "height">>
    ) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, ...bounds } : w))
      );
    },
    []
  );

  // Non-maximized windows keep the bounds they were given at open/drag/resize
  // time, so shrinking the browser afterward can otherwise leave them
  // clipped or off-screen — reclamp on viewport resize.
  useEffect(() => {
    let rafId: number | null = null;

    const reclamp = () => {
      rafId = null;
      const maxWidth = window.innerWidth - 16;
      const maxHeight = window.innerHeight - TASKBAR_HEIGHT - 16;
      setWindows((prev) =>
        prev.map((w) => {
          if (w.maximized) return w;
          const width = Math.min(w.width, maxWidth);
          const height = Math.min(w.height, maxHeight);
          const x = Math.max(0, Math.min(w.x, window.innerWidth - width));
          const y = Math.max(
            0,
            Math.min(w.y, window.innerHeight - TASKBAR_HEIGHT - height)
          );
          return { ...w, width, height, x, y };
        })
      );
    };

    // Coalesce rapid-fire resize events into at most one reclamp per frame,
    // instead of remapping every open window on every tick of a drag-resize.
    const handleResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(reclamp);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        focusWindow,
        minimizeWindow,
        toggleMaximize,
        updateBounds,
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx) {
    throw new Error("useWindowManager must be used within WindowManagerProvider");
  }
  return ctx;
}
