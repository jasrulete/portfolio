import { useState, useEffect } from "react";
import { MonitorSmartphone } from "lucide-react";
import Hero from "./components/hero-section";
import AboutSection from "./components/about-section";
import SkillsSection from "./components/skills-section";
import ProjectsSection from "./components/projects-section";
import ExperienceSection from "./components/experience-section";
import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ScrollProgress from "./components/scroll-progress";
import FaqChatbot from "./components/FaqChatbot";
import DesktopOS from "./components/desktop/DesktopOS";

type ViewMode = "classic" | "desktop";
const MODE_KEY = "portfolio-view-mode";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "classic";
    return (localStorage.getItem(MODE_KEY) as ViewMode) || "classic";
  });

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleViewMode = () => {
    setMode((m) => (m === "classic" ? "desktop" : "classic"));
  };

  if (mode === "desktop") {
    return (
      <div className={darkMode ? "dark" : ""}>
        <DesktopOS onModeToggle={toggleViewMode} />
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <ScrollProgress />
        <button
          onClick={toggleViewMode}
          className="fixed bottom-5 left-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white text-sm font-medium shadow-lg hover:bg-blue-700 transition-colors"
          title="Switch to desktop OS view"
        >
          <MonitorSmartphone size={16} />
          Desktop mode
        </button>
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <FaqChatbot />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
