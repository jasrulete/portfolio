import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import { normalizeSkill } from "../data/skill-match";
import { FOCUS_RING } from "./focus-ring";
import { OsModeTile } from "./os-mode-tile";
import { FeatureTile, ProjectRow, ProjectTile } from "./project-card";
import SectionHeading from "./section-heading";

// Selected work: tiles for the projects with the most behind them, then the
// OS-mode tile, then a plain list for research and smaller work. Which group a
// project lands in is its `tier` in profile.ts. A skill filter applies to both
// groups, and a group with nothing left disappears, heading and all.
export default function Projects({
  activeTag = null,
  onClearTag,
  onOpenOs,
}: {
  activeTag?: string | null;
  onClearTag?: () => void;
  /** Present only on the classic page, so the OS's own Projects app has no tile. */
  onOpenOs?: () => void;
}) {
  const filtered = activeTag
    ? profile.projects.filter((p) =>
        p.tags.some((t) => normalizeSkill(t) === normalizeSkill(activeTag)),
      )
    : profile.projects;

  const tiled = filtered.filter((p) => p.tier !== "list");
  const listed = filtered.filter((p) => p.tier === "list");
  const showOsTile = Boolean(onOpenOs) && !activeTag;

  return (
    <section id="projects" className="py-16 sm:py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Selected work" />

        {activeTag && (
          <div className="flex mb-8">
            <button
              type="button"
              onClick={() => onClearTag?.()}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm text-ink bg-surface border border-accent/60 hover:border-accent transition-colors duration-150",
                FOCUS_RING,
              )}
            >
              Showing projects using
              <span className="font-mono font-semibold text-accent">
                {activeTag}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Clear skill filter</span>
            </button>
          </div>
        )}

        {(tiled.length > 0 || showOsTile) && (
          <div className="grid grid-cols-1 md:grid-cols-[1.55fr_1fr] gap-4 sm:gap-5">
            {tiled.map((project, i) =>
              project.tier === "feature" ? (
                <FeatureTile key={project.title} project={project} priority={i === 0} />
              ) : (
                <ProjectTile key={project.title} project={project} />
              ),
            )}
            {showOsTile && onOpenOs && <OsModeTile onOpen={onOpenOs} />}
          </div>
        )}

        {listed.length > 0 && (
          <div className={tiled.length > 0 || showOsTile ? "mt-14" : undefined}>
            <h3 className="text-lg font-semibold tracking-tight text-ink mb-3">
              Research and smaller projects
            </h3>
            <div className="border-t border-line">
              {listed.map((project) => (
                <ProjectRow key={project.title} project={project} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-12">
            <p className="text-muted">
              No projects tagged &ldquo;{activeTag}&rdquo; yet.
            </p>
            <button
              type="button"
              onClick={() => onClearTag?.()}
              className={cn(
                "mt-4 inline-flex items-center rounded-md border border-line px-4 py-2.5 text-sm font-semibold text-ink hover:border-accent transition-colors duration-150",
                FOCUS_RING,
              )}
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
