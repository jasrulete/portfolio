import { useEffect, useState, type ReactNode } from "react";
import {
  User,
  FolderKanban,
  Sparkles,
  Palette,
  Briefcase,
  Mail,
  TerminalSquare,
  MessageCircleQuestion,
  FileText,
  ChevronLeft,
  Monitor,
  Camera,
  Hand,
  Gamepad2,
  Bomb,
} from "lucide-react";
import { profile } from "../../data/profile";
import AboutApp from "../desktop/apps/AboutApp";
import ProjectsApp from "../desktop/apps/ProjectsApp";
import SkillsApp from "../desktop/apps/SkillsApp";
import DesignLabApp from "../desktop/apps/DesignLabApp";
import ExperienceApp from "../desktop/apps/ExperienceApp";
import ContactApp from "../desktop/apps/ContactApp";
import TerminalApp from "../desktop/apps/TerminalApp";
import ChatbotApp from "../desktop/apps/ChatbotApp";
import CameraApp from "../desktop/apps/CameraApp";
import GestureApp from "../desktop/apps/GestureApp";
import SnakeApp from "../desktop/apps/SnakeApp";
import MinesweeperApp from "../desktop/apps/MinesweeperApp";

interface MobileAppDef {
  id: string;
  label: string;
  icon: ReactNode;
  content: ReactNode;
  isExternalLink?: boolean;
}

const apps: MobileAppDef[] = [
  { id: "about", label: "About", icon: <User size={26} />, content: <AboutApp /> },
  { id: "projects", label: "Projects", icon: <FolderKanban size={26} />, content: <ProjectsApp /> },
  { id: "skills", label: "Skills", icon: <Sparkles size={26} />, content: <SkillsApp /> },
  { id: "design", label: "Design", icon: <Palette size={26} />, content: <DesignLabApp /> },
  { id: "experience", label: "Experience", icon: <Briefcase size={26} />, content: <ExperienceApp /> },
  { id: "contact", label: "Contact", icon: <Mail size={26} />, content: <ContactApp /> },
  { id: "terminal", label: "Terminal", icon: <TerminalSquare size={26} />, content: <TerminalApp /> },
  { id: "chatbot", label: "Ask Me", icon: <MessageCircleQuestion size={26} />, content: <ChatbotApp /> },
  { id: "camera", label: "Camera", icon: <Camera size={26} />, content: <CameraApp /> },
  { id: "gestures", label: "Gestures", icon: <Hand size={26} />, content: <GestureApp /> },
  { id: "snake", label: "Snake", icon: <Gamepad2 size={26} />, content: <SnakeApp /> },
  { id: "mines", label: "Mines", icon: <Bomb size={26} />, content: <MinesweeperApp /> },
  { id: "resume", label: "Resume", icon: <FileText size={26} />, content: null, isExternalLink: true },
];

const DOCK_IDS = ["about", "projects", "contact", "terminal"];

export default function MobileOS({ onExit }: { onExit: () => void }) {
  const [openApp, setOpenApp] = useState<MobileAppDef | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const handleOpen = (app: MobileAppDef) => {
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
            {apps.map((app) => (
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
            {apps
              .filter((a) => DOCK_IDS.includes(a.id))
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
