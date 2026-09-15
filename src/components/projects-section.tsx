import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import { normalizeSkill } from "../data/skill-match";
import { useGithubStats } from "../../lib/use-github-stats";
import SectionHeading from "./section-heading";
import {
  LayoutSwitcher,
  ProjectsLayout,
  type ProjectLayout,
} from "./project-layouts";

type Filter = (typeof profile.projectFilters)[number];

export default function Projects({
  activeTag = null,
  onClearTag,
}: {
  activeTag?: string | null;
  onClearTag?: () => void;
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [layout, setLayout] = useState<ProjectLayout>("grid");

  useEffect(() => {
    if (activeTag) setFilter("All");
  }, [activeTag]);

  const githubUrls = profile.projects
    .map((p) => ("github" in p ? (p.github as string) : null))
    .filter((url): url is string => Boolean(url));
  const { stats, loading: statsLoading, failed: statsFailed } = useGithubStats(githubUrls);

  const filtered = activeTag
    ? profile.projects.filter((p) =>
        p.tags.some((t) => normalizeSkill(t) === normalizeSkill(activeTag)),
      )
    : filter === "All"
      ? profile.projects
      : profile.projects.filter(
          (p) => "category" in p && p.category === filter,
        );

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Projects" />

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {profile.projectFilters.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setFilter(cat);
                onClearTag?.();
              }}
              aria-pressed={!activeTag && filter === cat}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                filter === cat
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-105 hover:shadow",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-12">
          <LayoutSwitcher value={layout} onChange={setLayout} />
        </div>

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

        <ProjectsLayout
          layout={layout}
          projects={filtered}
          stats={stats}
          statsLoading={statsLoading}
          statsFailed={statsFailed}
        />

        {filtered.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400 py-12">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
