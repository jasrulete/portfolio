// lucide-react was already a dependency; these two glyphs were the only reason
// the site carried a second icon package, so that package is gone.
import { Github, Linkedin } from "lucide-react";
import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import { FOCUS_RING } from "./focus-ring";
import { Wordmark } from "./wordmark";

export default function Footer({ onOpenOs }: { onOpenOs?: () => void }) {
  const { social, title, location } = profile;

  return (
    <footer className="bg-canvas border-t border-line py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center">
          <div>
            <Wordmark className="text-xl text-ink" />
            <p className="mt-2 text-sm text-muted">
              {title}, {location}
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("p-2.5 rounded-md text-muted hover:text-ink transition-colors duration-150", FOCUS_RING)}
              aria-label="GitHub"
            >
              <Github size={22} aria-hidden />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("p-2.5 rounded-md text-muted hover:text-ink transition-colors duration-150", FOCUS_RING)}
              aria-label="LinkedIn"
            >
              <Linkedin size={22} aria-hidden />
            </a>
          </div>
        </div>

        <div className="border-t border-line mt-8 pt-8 flex flex-col sm:flex-row gap-3 justify-between text-sm text-muted">
          {/* One of the OS-mode entry points, with the navbar button, the
              Selected work tile and the command palette. */}
          {onOpenOs && (
            <button
              type="button"
              onClick={onOpenOs}
              className={cn(
                "self-start rounded underline underline-offset-4 hover:text-ink transition-colors duration-150",
                FOCUS_RING,
              )}
            >
              This site also runs as an operating system
            </button>
          )}
          <p>&copy; {new Date().getFullYear()} Jeric Rulete</p>
        </div>
      </div>
    </footer>
  );
}
