import { Suspense } from "react";
import { profile } from "../../data/profile";
import { OS_APPS, type OSAppDef } from "../../data/os-apps";
import { WindowManagerProvider, useWindowManager } from "./window-manager";
import Window from "./Window";
import Taskbar from "./Taskbar";
import AppLoadingFallback from "./apps/app-loading-fallback";

function DesktopIcons() {
  const { openWindow } = useWindowManager();

  const handleOpen = (app: OSAppDef) => {
    if (app.isExternalLink) {
      window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const Component = app.Component!;
    openWindow({
      id: app.id,
      title: app.desktopLabel,
      icon: app.icon,
      content: (
        <Suspense fallback={<AppLoadingFallback />}>
          <Component />
        </Suspense>
      ),
      width: app.windowSize?.width,
      height: app.windowSize?.height,
    });
  };

  return (
    // Four columns below sm: a single column of 13 icons inside an
    // overflow-hidden desktop left the last five unreachable on a phone.
    <div className="absolute top-4 left-4 grid grid-cols-4 gap-2 sm:grid-cols-none sm:gap-4 sm:grid-flow-col sm:grid-rows-4 z-10">
      {OS_APPS.map((app) => (
        <button
          key={app.id}
          onClick={() => handleOpen(app)}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleOpen(app);
          }}
          className="flex flex-col items-center gap-1 w-16 sm:w-20 p-2 rounded-md text-white hover:bg-white/10 focus:bg-white/20 focus-visible:ring-2 focus-visible:ring-white outline-none"
        >
          <span className="drop-shadow-lg">{app.icon}</span>
          {/* A solid scrim, not a drop shadow: white-on-sky-600 is 4.1:1 and
              text-shadow does not count toward contrast. */}
          <span className="text-xs text-center leading-tight rounded bg-black/40 px-1">
            {app.desktopLabel}
          </span>
        </button>
      ))}
    </div>
  );
}

function WindowLayer() {
  const { windows } = useWindowManager();
  return (
    <>
      {windows.map((w) => (
        <Window key={w.id} win={w} />
      ))}
    </>
  );
}

export default function DesktopOS({
  onModeToggle,
  onOpenPalette,
}: {
  onModeToggle: () => void;
  onOpenPalette: () => void;
}) {
  return (
    <WindowManagerProvider>
      <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900">
        <DesktopIcons />
        <WindowLayer />
        <Taskbar onModeToggle={onModeToggle} onOpenPalette={onOpenPalette} />
      </div>
    </WindowManagerProvider>
  );
}
