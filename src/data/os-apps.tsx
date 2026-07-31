// Single source of truth for the apps shared by the desktop-OS and mobile
// launcher view modes — previously hand-duplicated in DesktopOS.tsx and
// MobileOS.tsx, which let their icons/labels drift out of sync.

import { lazy, type ComponentType, type ReactNode } from "react";
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

// Each app's own chunk is fetched only when that app is actually opened,
// instead of every app shipping in the main bundle regardless of view mode.
const AboutApp = lazy(() => import("../components/desktop/apps/AboutApp"));
const ProjectsApp = lazy(() => import("../components/desktop/apps/ProjectsApp"));
const SkillsApp = lazy(() => import("../components/desktop/apps/SkillsApp"));
const DesignLabApp = lazy(() => import("../components/desktop/apps/DesignLabApp"));
const ExperienceApp = lazy(() => import("../components/desktop/apps/ExperienceApp"));
const ContactApp = lazy(() => import("../components/desktop/apps/ContactApp"));
const TerminalApp = lazy(() => import("../components/desktop/apps/TerminalApp"));
const ChatbotApp = lazy(() => import("../components/desktop/apps/ChatbotApp"));
const CameraApp = lazy(() => import("../components/desktop/apps/CameraApp"));
const GestureApp = lazy(() => import("../components/desktop/apps/GestureApp"));
const SnakeApp = lazy(() => import("../components/desktop/apps/SnakeApp"));
const MinesweeperApp = lazy(() => import("../components/desktop/apps/MinesweeperApp"));

export interface OSAppDef {
  id: string;
  label: string; // mobile launcher label
  desktopLabel: string; // desktop icon/window-title label (file-extension flavor)
  icon: ReactNode;
  Component?: ComponentType; // absent only for the resume external link
  isExternalLink?: boolean;
  windowSize?: { width: number; height: number }; // desktop-only default window size
}

export const OS_APPS: OSAppDef[] = [
  {
    id: "about",
    label: "About",
    desktopLabel: "About.txt",
    icon: <User size={28} />,
    Component: AboutApp,
    windowSize: { width: 620, height: 480 },
  },
  {
    id: "projects",
    label: "Projects",
    desktopLabel: "Projects",
    icon: <FolderKanban size={28} />,
    Component: ProjectsApp,
    windowSize: { width: 700, height: 520 },
  },
  {
    id: "skills",
    label: "Skills",
    desktopLabel: "Skills.txt",
    icon: <Sparkles size={28} />,
    Component: SkillsApp,
    windowSize: { width: 560, height: 460 },
  },
  {
    id: "design",
    label: "Design",
    desktopLabel: "Design.sys",
    icon: <Palette size={28} />,
    Component: DesignLabApp,
    windowSize: { width: 680, height: 520 },
  },
  {
    id: "experience",
    label: "Experience",
    desktopLabel: "Experience",
    icon: <Briefcase size={28} />,
    Component: ExperienceApp,
    windowSize: { width: 600, height: 460 },
  },
  {
    id: "contact",
    label: "Contact",
    desktopLabel: "Contact.app",
    icon: <Mail size={28} />,
    Component: ContactApp,
    windowSize: { width: 560, height: 480 },
  },
  {
    id: "terminal",
    label: "Terminal",
    desktopLabel: "Terminal",
    icon: <TerminalSquare size={28} />,
    Component: TerminalApp,
    windowSize: { width: 580, height: 420 },
  },
  {
    id: "chatbot",
    label: "Ask Me",
    desktopLabel: "Ask Me",
    icon: <MessageCircleQuestion size={28} />,
    Component: ChatbotApp,
    windowSize: { width: 380, height: 520 },
  },
  {
    id: "camera",
    label: "Camera",
    desktopLabel: "Camera.app",
    icon: <Camera size={28} />,
    Component: CameraApp,
    windowSize: { width: 560, height: 560 },
  },
  {
    id: "gestures",
    label: "Gestures",
    desktopLabel: "Gestures.ai",
    icon: <Hand size={28} />,
    Component: GestureApp,
    windowSize: { width: 560, height: 600 },
  },
  {
    id: "snake",
    label: "Snake",
    desktopLabel: "Snake.exe",
    icon: <Gamepad2 size={28} />,
    Component: SnakeApp,
    windowSize: { width: 460, height: 620 },
  },
  {
    id: "mines",
    label: "Mines",
    desktopLabel: "Mines.exe",
    icon: <Bomb size={28} />,
    Component: MinesweeperApp,
    windowSize: { width: 420, height: 560 },
  },
  {
    id: "resume",
    label: "Resume",
    desktopLabel: "Resume.pdf",
    icon: <FileText size={28} />,
    // no Component: external link, never rendered
    isExternalLink: true,
  },
];

export const DOCK_APP_IDS = ["about", "projects", "contact", "terminal"];
