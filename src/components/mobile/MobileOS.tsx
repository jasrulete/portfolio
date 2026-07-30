import { useEffect, useState } from "react";
import { ChevronLeft, Monitor } from "lucide-react";
import { profile } from "../../data/profile";
import { OS_APPS, DOCK_APP_IDS, type OSAppDef } from "../../data/os-apps";

export default function MobileOS({ onExit }: { onExit: () => void }) {
  const [openApp, setOpenApp] = useState<OSAppDef | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const handleOpen = (app: OSAppDef) => {
    if (app.isExternalLink) {
      window.open(profile.resumeUrl, "_blank");
      return;
    }
    setOpenApp(app);
  };

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900 text-white">
      {/* Status bar */}
      <div className="relative z-20 flex items-center justify-between px-4 h-10 text-xs font-display bg-black/20">
        <span>{time}</span>
        <button
          onClick={onExit}
          aria-label="Exit mobile view"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
        >
          <Monitor size={12} />
          Exit
        </button>
      </div>

      {openApp ? (
        <div className="absolute inset-x-0 top-10 bottom-0 z-10 flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <header className="flex items-center gap-1 px-2 h-12 shrink-0 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <button
              onClick={() => setOpenApp(null)}
              aria-label="Back to home screen"
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="font-display text-sm font-bold">{openApp.label}</h1>
          </header>
          <div className="flex-1 overflow-y-auto">{openApp.content}</div>
        </div>
      ) : (
        <div className="relative h-full flex flex-col">
          {/* Home screen clock */}
          <div className="text-center mt-10 mb-8">
            <p className="font-display text-5xl font-bold drop-shadow-lg">{time}</p>
            <p className="mt-2 text-sm text-white/80">
              {profile.shortName}
              <span className="text-blue-300">_</span> · portfolio
            </p>
          </div>

          {/* App grid */}
          <div className="grid grid-cols-4 gap-x-2 gap-y-6 px-6 max-w-md w-full mx-auto">
            {OS_APPS.map((app) => (
              <button
                key={app.id}
                onClick={() => handleOpen(app)}
                className="flex flex-col items-center gap-1.5 group"
              >
                <span className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 group-hover:bg-white/25 group-active:scale-90 transition-all drop-shadow-lg">
                  {app.icon}
                </span>
                <span className="text-xs drop-shadow">{app.label}</span>
              </button>
            ))}
          </div>

          {/* Dock */}
          <div className="mt-auto mb-6 mx-auto flex gap-6 px-6 py-3 rounded-3xl bg-white/10">
            {OS_APPS
              .filter((a) => DOCK_APP_IDS.includes(a.id))
              .map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleOpen(app)}
                  aria-label={app.label}
                  className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-90 transition-all"
                >
                  {app.icon}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
