import { FaGithub, FaLinkedin } from "react-icons/fa";
import { profile } from "../data/profile";

export default function Footer({
  onDesktopMode,
}: {
  onDesktopMode?: () => void;
}) {
  const { social, shortName, title, location } = profile;

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">{shortName}</h3>
            <p className="text-gray-400 mt-2">
              {title} · {location}
            </p>
          </div>

          <div className="flex space-x-6 text-2xl">
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="hover:scale-110 transition-transform" />
            </a>
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          {/* The only in-page entry point to the desktop-OS mode, besides the
              command palette and the ?view=desktop link. */}
          {onDesktopMode && (
            <p className="mb-3 text-sm">
              <button
                type="button"
                onClick={onDesktopMode}
                className="rounded text-gray-300 underline underline-offset-4 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              >
                I also built this site as a desktop OS →
              </button>
            </p>
          )}
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} {shortName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
