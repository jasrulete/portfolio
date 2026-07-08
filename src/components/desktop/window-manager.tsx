import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

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

  const openWindow = useCallback((opts: OpenWindowOptions) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === opts.id);
      zRef.current += 1;
      if (existing) {
        return prev.map((w) =>
          w.id === opts.id
            ? { ...w, minimized: false, zIndex: zRef.current }
            : w
        );
      }
      cascadeRef.current = (cascadeRef.current + 1) % 6;
      const width = opts.width ?? 560;
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
        maximized: false,
      };
      return [...prev, newWindow];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const focusWindow = useCallback((id: string) => {
    zRef.current += 1;
    const z = zRef.current;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: z, minimized: false } : w))
    );
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w))
    );
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
