import { useState, useEffect, lazy, Suspense } from "react";
import Hero from "./components/hero-section";
import AboutSection from "./components/about-section";
import ProjectsSection from "./components/projects-section";
import ExperienceSection from "./components/experience-section";
import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import CommandPalette from "./components/command-palette";
import ModeLoadingFallback from "./components/mode-loading-fallback";

// Only the classic view (the default) ships eagerly — the desktop-OS tree
// (plus every app it contains) is fetched only when a visitor actually
// switches into that mode.
const DesktopOS = lazy(() => import("./components/desktop/DesktopOS"));

type ViewMode = "classic" | "desktop";
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
  // `?view=desktop` first, so the desktop OS has a real, linkable URL; then
  // sessionStorage, not localStorage, because trying the OS mode once should
  // not strand a later visitor (e.g. reopening the link from an email) in the
  // fake OS. The choice survives a reload, not the tab.
  const [mode, setMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "classic";
    if (new URLSearchParams(location.search).get("view") === "desktop") {
      return "desktop";
    }
    return sessionStorage.getItem(MODE_KEY) === "desktop"
      ? "desktop"
      : "classic";
  });
  const [projectTag, setProjectTag] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    sessionStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  // `?view=desktop` is a one-shot deep link. Leaving it in the address bar
  // would make it win on every later reload, so a visitor who exits to the
  // classic view and refreshes lands back in the OS. The line above has
  // already persisted the mode to sessionStorage, which survives the reload.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("view")) return;
    url.searchParams.delete("view");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

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

  return (
    <div className={darkMode ? "dark" : ""}>
      {palette}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-150">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2.5 focus:rounded-lg"
        >
          Skip to content
        </a>
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onOpenPalette={() => setPaletteOpen(true)}
        />
        <main id="main-content">
          <Hero />
          <ProjectsSection
            activeTag={projectTag}
            onClearTag={() => setProjectTag(null)}
          />
          <ExperienceSection />
          <AboutSection onSkillSelect={setProjectTag} />
          <ContactSection />
        </main>
        <Footer onDesktopMode={() => setMode("desktop")} />
      </div>
    </div>
  );
}

export default App;