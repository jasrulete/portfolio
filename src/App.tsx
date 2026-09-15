import { useState, useEffect, lazy, Suspense } from "react";
import { MonitorSmartphone, Smartphone } from "lucide-react";
import Hero from "./components/hero-section";
import AboutSection from "./components/about-section";
import SkillsSection from "./components/skills-section";
import DesignLabSection from "./components/design-lab-section";
import ProjectsSection from "./components/projects-section";
import ExperienceSection from "./components/experience-section";
import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ScrollProgress from "./components/scroll-progress";
import FaqChatbot from "./components/FaqChatbot";
import CommandPalette from "./components/command-palette";
import ModeLoadingFallback from "./components/mode-loading-fallback";

// Only the classic view (the default) ships eagerly — the desktop-OS and
// mobile-launcher trees (plus every app they contain) are fetched only when
// a visitor actually switches into that mode.
const DesktopOS = lazy(() => import("./components/desktop/DesktopOS"));
const MobileOS = lazy(() => import("./components/mobile/MobileOS"));

type ViewMode = "classic" | "desktop" | "mobile";
const MODE_KEY = "portfolio-view-mode";
const THEME_KEY = "portfolio-theme";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) return stored === "dark";
    return (
      window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false
    );
  });
  // sessionStorage, not localStorage: trying the OS modes once should not
  // strand a later visitor (e.g. reopening the link from an email) in the
  // fake OS. The choice survives a reload, not the tab.
  const [mode, setMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "classic";
    return (sessionStorage.getItem(MODE_KEY) as ViewMode) || "classic";
  });
  const [projectTag, setProjectTag] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    sessionStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const palette = (
    <CommandPalette
      open={paletteOpen}
      setOpen={setPaletteOpen}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
      setViewMode={setMode}
      mode={mode}
    />
  );

  if (mode === "desktop") {
    return (
      <div className={darkMode ? "dark" : ""}>
        {palette}
        <Suspense fallback={<ModeLoadingFallback />}>
          <DesktopOS
            onModeToggle={() => setMode("classic")}
            onOpenPalette={() => setPaletteOpen(true)}
          />
        </Suspense>
      </div>
    );
  }

  if (mode === "mobile") {
    return (
      <div className={darkMode ? "dark" : ""}>
        {palette}
        <Suspense fallback={<ModeLoadingFallback />}>
          <MobileOS
            onExit={() => setMode("classic")}
            onOpenPalette={() => setPaletteOpen(true)}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      {palette}
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onOpenPalette={() => setPaletteOpen(true)}
        />
        <ScrollProgress />
        <main id="main-content">
          <Hero />
          <ProjectsSection
            activeTag={projectTag}
            onClearTag={() => setProjectTag(null)}
          />
          <ExperienceSection />
          <SkillsSection onSkillSelect={setProjectTag} />
          <AboutSection />
          <DesignLabSection />
          <ContactSection />
        </main>
        <Footer />
        {/* Fixed widgets — after <main> in the DOM on purpose, so they sit at
            the end of the tab order instead of ahead of the content. */}
        <div className="fixed bottom-5 left-5 z-50 hidden sm:flex flex-col gap-2">
          <button
            onClick={() => setMode("desktop")}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-500 dark:border-gray-400 text-gray-700 dark:text-gray-300 text-xs font-medium shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            title="Switch to desktop OS view"
          >
            <MonitorSmartphone size={14} />
            Desktop mode
          </button>
          <button
            onClick={() => setMode("mobile")}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-500 dark:border-gray-400 text-gray-700 dark:text-gray-300 text-xs font-medium shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            title="Switch to mobile app view"
          >
            <Smartphone size={14} />
            Mobile mode
          </button>
        </div>
        <FaqChatbot />
      </div>
    </div>
  );
}

export default App;