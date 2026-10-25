import { useState, useEffect, lazy, Suspense } from "react";
import Hero from "./components/hero-section";
import AboutSection from "./components/about-section";
import ProjectsSection from "./components/projects-section";
import ExperienceSection from "./components/experience-section";
import WorkWithMeSection from "./components/work-with-me-section";
import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import CommandPalette from "./components/command-palette";
import ModeLoadingFallback from "./components/mode-loading-fallback";
import { initialViewMode, osModeForWidth, type ViewMode } from "./view-mode";

// Only the classic view (the default) ships eagerly. Each OS tree, plus every
// app it contains, is fetched only when a visitor actually opens that mode.
const DesktopOS = lazy(() => import("./components/desktop/DesktopOS"));
const MobileOS = lazy(() => import("./components/mobile/MobileOS"));

const MODE_KEY = "portfolio-view-mode";
const THEME_KEY = "portfolio-theme";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    // Dark is the brand default; a saved choice still wins. Mirrors the
    // pre-paint script in index.html.
    const stored = localStorage.getItem(THEME_KEY);
    return stored ? stored === "dark" : true;
  });
  // `?view=` first, so each OS has a real, linkable URL; then sessionStorage,
  // not localStorage, because trying OS mode once should not strand a later
  // visitor (e.g. reopening the link from an email) in the fake OS. The choice
  // survives a reload, not the tab. See src/view-mode.ts.
  const [mode, setMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "classic";
    return initialViewMode(location.search, sessionStorage.getItem(MODE_KEY));
  });
  const [projectTag, setProjectTag] = useState<string | null>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light");
    // Hand the pre-paint script's inline <html> background back to React. The
    // script in index.html sets it before the stylesheet loads so a
    // dark-preferring visitor sees no white frame; without this line it would
    // stay dark behind the page after a toggle to light mode.
    document.documentElement.style.backgroundColor = darkMode
      ? "#101113"
      : "";
    document.documentElement.style.colorScheme = darkMode ? "dark" : "light";
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

  // The viewport picks the OS once, on entry; resizing afterwards does not
  // swap it.
  const openOs = () => setMode(osModeForWidth(window.innerWidth));

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
      <div className="min-h-screen bg-canvas text-ink transition-colors duration-150">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-accent-fill focus:text-on-accent focus:px-4 focus:py-2.5 focus:rounded-md"
        >
          Skip to content
        </a>
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onOpenPalette={() => setPaletteOpen(true)}
          onOpenOs={openOs}
        />
        <main id="main-content">
          <Hero />
          <ProjectsSection
            activeTag={projectTag}
            onClearTag={() => setProjectTag(null)}
            onOpenOs={openOs}
          />
          <ExperienceSection />
          <AboutSection onSkillSelect={setProjectTag} />
          {/* Deliberately not in the four-file nav order: an additive stop on
              the scroll, not a fifth nav destination. See the component. */}
          <WorkWithMeSection />
          <ContactSection />
        </main>
        <Footer onOpenOs={openOs} />
      </div>
    </div>
  );
}

export default App;