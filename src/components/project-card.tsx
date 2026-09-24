// project-card.tsx
//
// How a single project renders. Split out of projects-section.tsx when that
// section briefly owned several layouts; the section now owns only the skill
// filter, and this file owns the one card presentation left.

import { useState } from "react";
import kitchen_line from "../assets/kitchen-line.jpg";
import nexus_crm from "../assets/nexus-crm.jpg";
import pulse from "../assets/pulse.jpg";
import shelfstock from "../assets/shelfstock.jpg";
import { profile } from "../data/profile";

export type Project = (typeof profile.projects)[number];

const projectImages: Record<string, string> = {
  ShelfStock: shelfstock,
  "Nexus CRM": nexus_crm,
  Pulse: pulse,
  "Kitchen Line Supply (Shopify Theme)": kitchen_line,
};

/**
 * Undefined on purpose when a project has no screenshot: the banner then
 * renders flat instead of borrowing an unrelated photo, which is what the
 * old shared fallback image did on the two projects that lacked one.
 */
function imageFor(title: string): string | undefined {
  return projectImages[title];
}

export interface ProjectCardProps {
  project: Project;
  /**
   * Set on the first card in the grid only. Its banner is the largest thing
   * above the fold after the hero text, so it loads eagerly at high priority;
   * every other banner stays lazy.
   */
  priority?: boolean;
}

/** Full case-study card. */
export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="card-enter bg-white dark:bg-gray-800 rounded-xl shadow-sm flex flex-col h-full border border-gray-300 dark:border-gray-700 hover:border-blue-600/60 dark:hover:border-blue-400/60 transition-colors duration-150">
      <ProjectBanner project={project} priority={priority} />

      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        {/* Links first: the demo and the source are the two clicks worth
            making, and at the bottom they sat under 500px+ of case study. */}
        <ProjectLinks project={project} className="mb-5" />

        <CaseStudy project={project} />

        <TagList tags={project.tags} />
      </div>
    </article>
  );
}

function ProjectBanner({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  const image = imageFor(project.title);

  return (
    <div className="relative rounded-t-xl" style={{ paddingBottom: "35%" }}>
      <div className="absolute inset-0 overflow-hidden rounded-t-xl">
        {image ? (
          <>
            {/* alt="" — the title is announced by the h3 immediately below. */}
            <ProjectImage src={image} alt="" priority={priority} />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}
      </div>
      <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
        <div>
          <p className="text-sm text-blue-300 font-medium mb-1 drop-shadow-md">
            {project.period}
            {"subtitle" in project && project.subtitle && (
              <span className="text-gray-300 font-normal"> · {project.subtitle}</span>
            )}
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
            {project.title}
          </h3>
        </div>
        {"category" in project && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
            {project.category}
          </span>
        )}
      </div>
    </div>
  );
}

function CaseStudy({ project }: { project: Project }) {
  return (
    <dl className="space-y-5 mb-6 flex-grow">
      <div>
        <dt className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1">
          The Challenge
        </dt>
        <dd className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {project.challenge}
        </dd>
      </div>

      {"architecture" in project && (
        <div>
          <dt className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-1">
            Architecture &amp; Execution
          </dt>
          <dd className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.architecture as string}
          </dd>
        </div>
      )}

      {"outcome" in project && (
        <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
          <dt className="sr-only">Outcome</dt>
          <dd className="text-sm font-medium text-gray-900 dark:text-white">
            <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">
              Outcome:
            </span>
            {project.outcome as string}
          </dd>
        </div>
      )}
    </dl>
  );
}

function TagList({
  tags,
  className,
}: {
  tags: readonly string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {tags.map((tag) => (
        // gray-100/gray-700, not white/gray-800: the card itself is
        // white/gray-800, so a chip in the card colour had only a 1.47:1
        // hairline to separate it. Text stays over the 4.5:1 floor —
        // gray-600 on gray-100 is 6.85:1, gray-300 on gray-700 is 7.00:1.
        <span
          key={tag}
          className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-full font-medium text-xs px-3 py-1.5"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

/**
 * Every screenshot in src/assets is 1280×769. The attributes are stated so a
 * client with no CSS (or a slow one) knows the intrinsic size; the banner's
 * own aspect box is what actually reserves the space, so there is no shift
 * either way.
 */
const SHOT_WIDTH = 1280;
const SHOT_HEIGHT = 769;

function ProjectImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        width={SHOT_WIDTH}
        height={SHOT_HEIGHT}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete) setLoaded(true);
        }}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

/**
 * Demo first as the primary action, source second — and nothing at all when a
 * project has neither, rather than a "coming soon" placeholder that reads as
 * unfinished work. Each link carries the project name for screen readers,
 * which otherwise hear "Live demo" once per card with no way to tell them
 * apart.
 */
function ProjectLinks({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const hasGithub = "github" in project && Boolean(project.github);
  const hasDemo = "demo" in project && Boolean(project.demo);

  if (!hasGithub && !hasDemo) return null;

  const base =
    "inline-flex items-center gap-1.5 rounded-lg font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 px-5 py-3 text-sm";

  return (
    <div className={`flex gap-3 flex-wrap ${className ?? ""}`}>
      {hasDemo && (
        <a
          href={project.demo as string}
          className={`${base} bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalIcon />
          Live demo
          <span className="sr-only"> for {project.title}</span>
        </a>
      )}
      {hasGithub && (
        <a
          href={project.github as string}
          className={`${base} border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-700 active:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
          Source
          <span className="sr-only"> for {project.title}</span>
        </a>
      )}
    </div>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
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
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}
