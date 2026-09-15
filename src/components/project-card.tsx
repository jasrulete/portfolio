// project-card.tsx
//
// The card presentations shared by every projects layout. Split out of
// projects-section.tsx once the section gained a layout switcher: the section
// now owns filtering and layout choice, while this file owns how a single
// project renders.
//
// Three variants, because layout genuinely drives density:
//   ProjectCard        full case study — grid
//   FlipProjectCard    summary front, case study on the back face — flip
//   CompactProjectCard image/title/tags/links — ring and corridor, where a
//                      full case-study card would be unreadable

import { useState } from "react";
import kitchen_line from "../assets/kitchen-line.jpg";
import nexus_crm from "../assets/nexus-crm.jpg";
import pulse from "../assets/pulse.jpg";
import shelfstock from "../assets/shelfstock.jpg";
import { profile } from "../data/profile";
import type { GithubStats } from "../../lib/use-github-stats";
import GithubStatsBadge from "./github-stats-badge";
import { DepthLayer } from "./depth-card";

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
  stats?: GithubStats;
  statsLoading?: boolean;
  statsFailed?: boolean;
}

/** Full case-study card — the grid layout's presentation. */
export function ProjectCard({
  project,
  stats,
  statsLoading,
  statsFailed,
}: ProjectCardProps) {
  return (
    <article
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg flex flex-col h-full border border-gray-100 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors duration-300"
      style={{ transformStyle: "preserve-3d" }}
    >
      <ProjectBanner project={project} />

      <DepthLayer depth={16} className="p-6 flex flex-col flex-grow">
        {/* Links first: the demo and the source are the two clicks worth
            making, and at the bottom they sat under 500px+ of case study. */}
        <ProjectLinks project={project} className="mb-5" />

        <CaseStudy project={project} />

        {"github" in project && project.github && (
          <div className="mb-3">
            <GithubStatsBadge
              stats={stats}
              loading={statsLoading}
              failed={statsFailed}
            />
          </div>
        )}

        <TagList tags={project.tags} />
      </DepthLayer>
    </article>
  );
}

/**
 * Summary on the front, case study on the back face.
 *
 * The card is an <article> with a button inside — not a button wrapping the
 * card. A <button> may only contain phrasing content, so nesting headings and
 * links inside one is invalid and would collapse the whole card into a single
 * accessible name. The face turned away is marked `inert` so its controls
 * never collect focus while invisible.
 */
export function FlipProjectCard({ project }: { project: Project }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <article className="h-[36rem]" style={{ perspective: "1400px" }}>
      <div
        className="relative h-full w-full transition-transform duration-500 motion-reduce:transition-none"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          inert={flipped}
          className="absolute inset-0 flex flex-col rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          <ProjectBanner project={project} flat />
          <div className="p-6 flex flex-col flex-grow">
            <TagList tags={project.tags} className="mb-4" />
            <button
              type="button"
              onClick={() => setFlipped(true)}
              className="mt-auto self-start rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              View case study →
            </button>
          </div>
        </div>

        {/* Back */}
        <div
          inert={!flipped}
          className="absolute inset-0 flex flex-col rounded-xl border border-blue-500/40 bg-white dark:bg-gray-800 p-6 shadow-lg"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="font-display text-lg font-bold mb-4 shrink-0">
            {project.title}
          </h3>
          <div className="flex-1 overflow-y-auto">
            <CaseStudy project={project} />
          </div>
          <div className="shrink-0 pt-4 border-t border-gray-100 dark:border-gray-700">
            <ProjectLinks project={project} />
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Image, title, tags and links — for the ring and corridor layouts.
 *
 * `featured` expands the content to include the case study. The card's box
 * stays the same size either way: in the corridor the width feeds the scroll
 * maths, so a card that changed size while centred would shift every other
 * card's position and fight the very centring that triggered it.
 */
export function CompactProjectCard({
  project,
  featured,
}: {
  project: Project;
  featured?: boolean;
}) {
  const image = imageFor(project.title);

  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="relative shrink-0" style={{ paddingBottom: "46%" }}>
        {image ? (
          <>
            <ProjectImage src={image} alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}
        <h3
          className={`absolute bottom-3 left-4 right-4 text-base font-bold text-white drop-shadow-md ${
            image ? "" : "font-display"
          }`}
        >
          {project.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden p-4">
        <ProjectLinks project={project} className="mb-3 shrink-0" small />

        <TagList
          tags={project.tags.slice(0, featured ? 6 : 3)}
          className="mb-3 shrink-0"
          small
        />

        {featured && (
          <div className="flex-1 overflow-y-auto pr-1 text-left [&_dl]:mb-0 [&_dd]:text-xs">
            <CaseStudy project={project} />
          </div>
        )}
      </div>
    </article>
  );
}

function ProjectBanner({
  project,
  flat,
}: {
  project: Project;
  flat?: boolean;
}) {
  // The positioning must sit on whichever element is the outermost overlay
  // box. DepthLayer applies a transform, and a transform makes an element the
  // containing block for absolutely-positioned descendants — so nesting an
  // `absolute` div inside it would anchor the title to a zero-height box at
  // the top of the banner instead of the banner itself.
  const overlayPosition =
    "absolute bottom-4 left-5 right-5 flex justify-between items-end";
  const image = imageFor(project.title);

  const overlayContent = (
    <>
      <div>
        <p className="text-sm text-blue-300 font-medium mb-1 drop-shadow-md">
          {project.period}
          {"subtitle" in project && project.subtitle && (
            <span className="text-gray-300 font-normal"> · {project.subtitle}</span>
          )}
        </p>
        <h3
          className={`text-2xl font-bold text-white drop-shadow-md ${
            image ? "" : "font-display"
          }`}
        >
          {project.title}
        </h3>
      </div>
      {"category" in project && (
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
          {project.category}
        </span>
      )}
    </>
  );

  return (
    // The clip lives on the inner box rather than here: any non-visible
    // overflow on an ancestor collapses the card's 3D context back to flat.
    <div
      className="relative rounded-t-xl"
      style={{
        paddingBottom: "35%",
        transformStyle: flat ? undefined : "preserve-3d",
      }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-t-xl">
        {image ? (
          <>
            {/* alt="" — the title is announced by the h3 immediately below. */}
            <ProjectImage src={image} alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}
      </div>
      {flat ? (
        <div className={overlayPosition}>{overlayContent}</div>
      ) : (
        <DepthLayer depth={38} className={overlayPosition}>
          {overlayContent}
        </DepthLayer>
      )}
    </div>
  );
}

function CaseStudy({ project }: { project: Project }) {
  return (
    <dl className="space-y-5 mb-6 flex-grow">
      <div>
        <dt className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-400 mb-1">
          The Challenge
        </dt>
        <dd className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {project.challenge}
        </dd>
      </div>

      {"architecture" in project && (
        <div>
          <dt className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-400 mb-1">
            Architecture &amp; Execution
          </dt>
          <dd className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.architecture as string}
          </dd>
        </div>
      )}

      {"outcome" in project && (
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <dt className="sr-only">Outcome</dt>
          <dd className="text-sm font-medium text-gray-900 dark:text-gray-200">
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
  small,
}: {
  tags: readonly string[];
  className?: string;
  small?: boolean;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className={`bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full font-medium ${
            small ? "text-[10px] px-2 py-0.5" : "text-xs px-3 py-1.5"
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete) setLoaded(true);
        }}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 hover:scale-105 ${
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
  small,
}: {
  project: Project;
  className?: string;
  small?: boolean;
}) {
  const hasGithub = "github" in project && Boolean(project.github);
  const hasDemo = "demo" in project && Boolean(project.demo);

  if (!hasGithub && !hasDemo) return null;

  const size = small ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm";
  const base = `inline-flex items-center gap-1.5 rounded-full font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 ${size}`;

  return (
    <div className={`flex gap-3 flex-wrap ${className ?? ""}`}>
      {hasDemo && (
        <a
          href={project.demo as string}
          className={`${base} bg-blue-600 text-white hover:bg-blue-700`}
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
          className={`${base} border border-gray-500 text-gray-700 hover:border-blue-600 hover:text-blue-600 dark:border-gray-400 dark:text-gray-200 dark:hover:border-blue-400 dark:hover:text-blue-400`}
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
