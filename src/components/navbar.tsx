import { useState } from "react";
import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import { useActiveSection } from "../hooks/use-active-section";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const navLinks = [
  { href: "#home", id: "home", label: "Home" },
  { href: "#about", id: "about", label: "About" },
  { href: "#skills", id: "skills", label: "Skills" },
  { href: "#projects", id: "projects", label: "Projects" },
  { href: "#experience", id: "experience", label: "Experience" },
  { href: "#contact", id: "contact", label: "Contact" },
];

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur shadow-md">
      <NavContent
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeSection={activeSection}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </nav>
  );
}

function NavContent({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  darkMode,
  toggleDarkMode,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;
  activeSection: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
}) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a
              href="#home"
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              {profile.shortName}
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  activeSection === link.id
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
                )}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-500 rounded-full" />
                )}
              </a>
            ))}
            <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} />
          </div>

          <div className="md:hidden flex items-center">
            <DarkModeToggle darkMode={darkMode} onToggle={toggleDarkMode} mobile />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-800 shadow-lg border-t border-gray-100 dark:border-gray-700">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "block px-3 py-2 rounded-md transition-colors",
                activeSection === link.id
                  ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

function DarkModeToggle({
  darkMode,
  onToggle,
  mobile,
}: {
  darkMode: boolean;
  onToggle: () => void;
  mobile?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:rotate-12 active:scale-90",
        mobile && "mr-2"
      )}
      aria-label="Toggle dark mode"
    >
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </button>
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
