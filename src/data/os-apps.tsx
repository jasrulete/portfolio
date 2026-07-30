// Single source of truth for the apps shared by the desktop-OS and mobile
// launcher view modes — previously hand-duplicated in DesktopOS.tsx and
// MobileOS.tsx, which let their icons/labels drift out of sync.

import type { ReactNode } from "react";
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
  Camera,
  Hand,
  Gamepad2,
  Bomb,
} from "lucide-react";
import AboutApp from "../components/desktop/apps/AboutApp";
import ProjectsApp from "../components/desktop/apps/ProjectsApp";
import SkillsApp from "../components/desktop/apps/SkillsApp";
import DesignLabApp from "../components/desktop/apps/DesignLabApp";
import ExperienceApp from "../components/desktop/apps/ExperienceApp";
import ContactApp from "../components/desktop/apps/ContactApp";
import TerminalApp from "../components/desktop/apps/TerminalApp";
import ChatbotApp from "../components/desktop/apps/ChatbotApp";
import CameraApp from "../components/desktop/apps/CameraApp";
import GestureApp from "../components/desktop/apps/GestureApp";
import SnakeApp from "../components/desktop/apps/SnakeApp";
import MinesweeperApp from "../components/desktop/apps/MinesweeperApp";

export interface OSAppDef {
  id: string;
  label: string; // mobile launcher label
  desktopLabel: string; // desktop icon/window-title label (file-extension flavor)
  icon: ReactNode;
  content: ReactNode;
  isExternalLink?: boolean;
  windowSize?: { width: number; height: number }; // desktop-only default window size
}

export const OS_APPS: OSAppDef[] = [
  {
    id: "about",
    label: "About",
    desktopLabel: "About.txt",
    icon: <User size={28} />,
    content: <AboutApp />,
    windowSize: { width: 620, height: 480 },
  },
  {
    id: "projects",
    label: "Projects",
    desktopLabel: "Projects",
    icon: <FolderKanban size={28} />,
    content: <ProjectsApp />,
    windowSize: { width: 700, height: 520 },
  },
  {
    id: "skills",
    label: "Skills",
    desktopLabel: "Skills.txt",
    icon: <Sparkles size={28} />,
    content: <SkillsApp />,
    windowSize: { width: 560, height: 460 },
  },
  {
    id: "design",
    label: "Design",
    desktopLabel: "Design.sys",
    icon: <Palette size={28} />,
    content: <DesignLabApp />,
    windowSize: { width: 680, height: 520 },
  },
  {
    id: "experience",
    label: "Experience",
    desktopLabel: "Experience",
    icon: <Briefcase size={28} />,
    content: <ExperienceApp />,
    windowSize: { width: 600, height: 460 },
  },
  {
    id: "contact",
    label: "Contact",
    desktopLabel: "Contact.app",
    icon: <Mail size={28} />,
    content: <ContactApp />,
    windowSize: { width: 560, height: 480 },
  },
  {
    id: "terminal",
    label: "Terminal",
    desktopLabel: "Terminal",
    icon: <TerminalSquare size={28} />,
    content: <TerminalApp />,
    windowSize: { width: 580, height: 420 },
  },
  {
    id: "chatbot",
    label: "Ask Me",
    desktopLabel: "Ask Me",
    icon: <MessageCircleQuestion size={28} />,
    content: <ChatbotApp />,
    windowSize: { width: 380, height: 520 },
  },
  {
    id: "camera",
    label: "Camera",
    desktopLabel: "Camera.app",
    icon: <Camera size={28} />,
    content: <CameraApp />,
    windowSize: { width: 560, height: 560 },
  },
  {
    id: "gestures",
    label: "Gestures",
    desktopLabel: "Gestures.ai",
    icon: <Hand size={28} />,
    content: <GestureApp />,
    windowSize: { width: 560, height: 600 },
  },
  {
    id: "snake",
    label: "Snake",
    desktopLabel: "Snake.exe",
    icon: <Gamepad2 size={28} />,
    content: <SnakeApp />,
    windowSize: { width: 460, height: 620 },
  },
  {
    id: "mines",
    label: "Mines",
    desktopLabel: "Mines.exe",
    icon: <Bomb size={28} />,
    content: <MinesweeperApp />,
    windowSize: { width: 420, height: 560 },
  },
  {
    id: "resume",
    label: "Resume",
    desktopLabel: "Resume.pdf",
    icon: <FileText size={28} />,
    content: null,
    isExternalLink: true,
  },
];

export const DOCK_APP_IDS = ["about", "projects", "contact", "terminal"];
