import DesignLabSection from "./design-lab-section";

const THEME_KEY = "portfolio-theme";

// Same seed as App.tsx: the stored choice wins, then the OS preference. This
// page has no toggle, so the class is read once at render.
function prefersDark() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored === "dark";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

// The standalone /portfolio/design/ page. The back link is deliberately the
// first focusable element on the page.
export default function DesignLabPage() {
  return (
    <div className={prefersDark() ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <a
            href={import.meta.env.BASE_URL}
            className="inline-flex items-center rounded text-sm font-medium text-blue-600 dark:text-blue-400 underline underline-offset-4 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          >
            ← Back to the portfolio
          </a>
        </header>
        <main>
          <DesignLabSection />
        </main>
      </div>
    </div>
  );
}
