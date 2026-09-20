import { profile } from "../data/profile";
import { normalizeSkill } from "../data/skill-match";
import SectionHeading from "./section-heading";
import { ProjectCard } from "./project-card";

export default function Projects({
  activeTag = null,
  onClearTag,
}: {
  activeTag?: string | null;
  onClearTag?: () => void;
}) {
  const filtered = activeTag
    ? profile.projects.filter((p) =>
        p.tags.some((t) => normalizeSkill(t) === normalizeSkill(activeTag)),
      )
    : profile.projects;

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Projects" />

        {/* The Design Lab is its own page now; this is one of its two entry
            points (the other is in the footer). */}
        <p className="text-center -mt-10 mb-10 text-sm">
          <a
            href={`${import.meta.env.BASE_URL}design/`}
            className="rounded text-blue-600 dark:text-blue-400 underline underline-offset-4 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          >
            The design system behind this site →
          </a>
        </p>

        {activeTag && (
          <div className="flex justify-center -mt-6 mb-10">
            <button
              type="button"
              onClick={() => onClearTag?.()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            >
              Showing projects using
              <span className="font-bold">{activeTag}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Clear skill filter</span>
            </button>
          </div>
        )}

        {/* Project cards are deliberately not wrapped in ScrollReveal: a card
            that fades in on a delay is a card a fast scroller sees as an
            empty box. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No projects tagged &ldquo;{activeTag}&rdquo; yet.
            </p>
            <button
              type="button"
              onClick={() => onClearTag?.()}
              className="mt-4 inline-flex items-center rounded-full border border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
