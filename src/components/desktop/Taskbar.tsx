import { useEffect, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { useWindowManager } from "./window-manager";

export default function Taskbar({ onModeToggle }: { onModeToggle: () => void }) {
  const { windows, focusWindow, minimizeWindow } = useWindowManager();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000 * 30);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 z-[9999] flex items-center justify-between px-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-black/10 dark:border-white/10">
      <div className="flex items-center gap-1 overflow-x-auto">
        <button
          onClick={onModeToggle}
          className="flex items-center gap-1.5 px-3 h-9 rounded-md text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 shrink-0"
          title="Switch to classic site view"
        >
          <LayoutGrid size={14} />
          Classic view
        </button>
        <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-1 shrink-0" />
        {windows.map((w) => (
          <button
            key={w.id}
            onClick={() => (w.minimized ? focusWindow(w.id) : minimizeWindow(w.id))}
            className={`flex items-center gap-1.5 px-3 h-9 rounded-md text-xs font-medium shrink-0 transition-colors ${
              w.minimized
                ? "text-gray-500 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/10"
                : "bg-blue-500/10 text-blue-700 dark:text-blue-300"
            }`}
          >
            <span className="text-blue-600 dark:text-blue-400">{w.icon}</span>
            <span className="max-w-[100px] truncate">{w.title}</span>
          </button>
        ))}
      </div>
      <div className="text-xs font-medium text-gray-600 dark:text-gray-300 pr-2 shrink-0">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
    </div>
  );
}
