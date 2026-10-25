import { useState } from "react";
import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import { useActiveSection } from "../hooks/use-active-section";
import { FOCUS_RING } from "./focus-ring";
import { Wordmark } from "./wordmark";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onOpenPalette?: () => void;
  onOpenOs?: () => void;
}

// Order mirrors the section order in App.tsx. "Home" is omitted because the
// wordmark to the left of this list already links to #home. The projects
// section is labelled "Work" but keeps its `projects` id so old deep links
// still land.
const navLinks = [
  { href: "#projects", id: "projects", label: "Work" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#about", id: "about", label: "About" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function Navbar({
  darkMode,
  toggleDarkMode,
  onOpenPalette,
  onOpenOs,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <nav className="sticky top-0 z-50 bg-canvas/95 border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className={cn("rounded-sm text-lg text-ink", FOCUS_RING)}>
            <Wordmark />
          </a>

          {/* The full row needs lg: eight controls crowd a 768px tablet, so
              tablets get the menu like phones do. */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-150",
                  FOCUS_RING,
                  activeSection === link.id
                    ? "text-accent"
                    : "text-muted hover:text-ink",
                )}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent" />
                )}
              </a>
            ))}
            {onOpenOs && (
              <button
                type="button"
                onClick={onOpenOs}
                className={cn(
                  "ml-3 px-3 py-2 rounded-md border border-line text-sm font-medium text-ink hover:border-accent transition-colors duration-150",
                  FOCUS_RING,
                )}
              >
                Open OS mode
              </button>
            )}
            <a
              href={profile.resumeUrl}
              download="Jeric-Rulete_Resume.pdf"
              className={cn(
                "px-3 py-2.5 rounded-md text-sm font-medium text-muted hover:text-ink transition-colors duration-150",
                FOCUS_RING,
              )}
            >
              Résumé
            </a>
            {onOpenPalette && (
              <button
                type="button"
                onClick={onOpenPalette}
                aria-label="Open command palette"
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-2 rounded-md border border-line text-muted hover:text-ink transition-colors duration-150",
                  FOCUS_RING,
                )}
              >
                <SearchIcon />
                <kbd className="font-mono text-xs">Ctrl K</kbd>
              </button>
            )}
            <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "p-2.5 rounded-md text-ink hover:bg-surface transition-colors duration-150",
                FOCUS_RING,
              )}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <div
        inert={!isMenuOpen}
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-200 ease-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-canvas border-t border-line">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "block px-3 py-2.5 rounded-md transition-colors duration-150",
                FOCUS_RING,
                activeSection === link.id
                  ? "bg-surface text-accent"
                  : "text-ink hover:bg-surface",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {onOpenOs && (
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenOs();
                }}
                className={cn(
                  "px-3 py-3 rounded-md border border-line text-sm font-medium text-ink",
                  FOCUS_RING,
                )}
              >
                Open OS mode
              </button>
            )}
            <a
              href={profile.resumeUrl}
              download="Jeric-Rulete_Resume.pdf"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "px-3 py-3 rounded-md border border-line text-center text-sm font-medium text-ink",
                FOCUS_RING,
              )}
            >
              Résumé
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function DarkModeToggle({
  darkMode,
  onToggle,
}: {
  darkMode: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "p-2.5 rounded-md text-muted hover:text-ink transition-colors duration-150",
        FOCUS_RING,
      )}
      aria-label="Toggle dark mode"
      aria-pressed={darkMode}
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function SearchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
