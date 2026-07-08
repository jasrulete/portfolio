import type { ReactNode } from "react";
import {
  User,
  FolderKanban,
  Sparkles,
  Briefcase,
  Mail,
  TerminalSquare,
  MessageCircleQuestion,
  FileText,
} from "lucide-react";
import { profile } from "../../data/profile";
import { WindowManagerProvider, useWindowManager } from "./window-manager";
import Window from "./Window";
import Taskbar from "./Taskbar";
import AboutApp from "./apps/AboutApp";
import ProjectsApp from "./apps/ProjectsApp";
import SkillsApp from "./apps/SkillsApp";
import ExperienceApp from "./apps/ExperienceApp";
import ContactApp from "./apps/ContactApp";
import TerminalApp from "./apps/TerminalApp";
import ChatbotApp from "./apps/ChatbotApp";

interface IconDef {
  id: string;
  label: string;
  icon: ReactNode;
  width?: number;
  height?: number;
  content: ReactNode;
  isExternalLink?: boolean;
}

const icons: IconDef[] = [
  {
    id: "about",
    label: "About.txt",
    icon: <User size={28} />,
    content: <AboutApp />,
    width: 620,
    height: 480,
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FolderKanban size={28} />,
    content: <ProjectsApp />,
    width: 700,
    height: 520,
  },
  {
    id: "skills",
    label: "Skills.txt",
    icon: <Sparkles size={28} />,
    content: <SkillsApp />,
    width: 560,
    height: 460,
  },
  {
    id: "experience",
    label: "Experience",
    icon: <Briefcase size={28} />,
    content: <ExperienceApp />,
    width: 600,
    height: 460,
  },
  {
    id: "contact",
    label: "Contact.app",
    icon: <Mail size={28} />,
    content: <ContactApp />,
    width: 560,
    height: 480,
  },
  {
    id: "terminal",
    label: "Terminal",
    icon: <TerminalSquare size={28} />,
    content: <TerminalApp />,
    width: 580,
    height: 420,
  },
  {
    id: "chatbot",
    label: "Ask Me",
    icon: <MessageCircleQuestion size={28} />,
    content: <ChatbotApp />,
    width: 380,
    height: 520,
  },
  {
    id: "resume",
    label: "Resume.pdf",
    icon: <FileText size={28} />,
    content: null,
    isExternalLink: true,
  },
];

function DesktopIcons() {
  const { openWindow } = useWindowManager();

  const handleOpen = (icon: IconDef) => {
    if (icon.isExternalLink) {
      window.open(profile.resumeUrl, "_blank");
      return;
    }
    openWindow({
      id: icon.id,
      title: icon.label,
      icon: icon.icon,
      content: icon.content,
      width: icon.width,
      height: icon.height,
    });
  };

  return (
    <div className="absolute top-4 left-4 grid grid-cols-1 gap-4 sm:grid-flow-col sm:grid-rows-4 z-10">
      {icons.map((icon) => (
        <button
          key={icon.id}
          onDoubleClick={() => handleOpen(icon)}
          onTouchEnd={(e) => {
            e.preventDefault();
            handleOpen(icon);
          }}
          className="flex flex-col items-center gap-1 w-20 p-2 rounded-md text-white hover:bg-white/10 focus:bg-white/20 outline-none"
        >
          <span className="drop-shadow-lg">{icon.icon}</span>
          <span className="text-xs text-center drop-shadow-lg leading-tight">
            {icon.label}
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

export default function DesktopOS({ onModeToggle }: { onModeToggle: () => void }) {
  return (
    <WindowManagerProvider>
      <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900">
        <DesktopIcons />
        <WindowLayer />
        <Taskbar onModeToggle={onModeToggle} />
      </div>
    </WindowManagerProvider>
  );
}
