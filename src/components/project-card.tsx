// project-card.tsx
//
// The three ways a project renders in Selected work, picked by its `tier` in
// profile.ts: one large feature tile, smaller tiles, and plain list rows.
// Every form keeps the full case study behind a native <details>, so the
// detail stays in the DOM for crawlers and screen readers while the page
// stays scannable. See docs/brand.md §6.

import { useState } from "react";
import kitchen_line from "../assets/kitchen-line.jpg";
import nexus_crm from "../assets/nexus-crm.jpg";
import pulse from "../assets/pulse.jpg";
import shelfstock from "../assets/shelfstock.jpg";
import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import { FOCUS_RING } from "./focus-ring";

export type Project = (typeof profile.projects)[number];

const projectImages: Record<string, string> = {
  ShelfStock: shelfstock,
  "Nexus CRM": nexus_crm,
  Pulse: pulse,
  "Kitchen Line Supply (Shopify Theme)": kitchen_line,
};

const TILE =
  "card-enter bg-surface border border-line rounded-lg overflow-hidden flex flex-col hover:border-accent/60 has-[:focus-visible]:border-accent/60 transition-colors duration-150";

/** The one large tile: screenshot, summary and the facts that prove it. */
export function FeatureTile({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const image = projectImages[project.title];

  return (
    <article className={cn(TILE, "md:row-span-2")}>
      {image && (
        <div className="relative aspect-video border-b border-line">
          <ProjectImage src={image} priority={priority} />
        </div>
      )}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold tracking-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-2 max-w-prose text-muted leading-relaxed">
          {project.summary}
        </p>
        {"facts" in project && (
          // Value above label, no separator glyphs: three facts, not a
          // "A · B · C" meta string.
          <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {project.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col-reverse">
                <dt className="text-xs text-muted">{fact.label}</dt>
                <dd className="font-mono text-lg text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <ProjectLinks project={project} className="mt-5" />
        <CaseStudyDisclosure project={project} />
      </div>
    </article>
  );
}

/** A smaller tile for projects with a screenshot but less to show up front. */
export function ProjectTile({ project }: { project: Project }) {
  const image = projectImages[project.title];

  return (
    <article className={TILE}>
      {image && (
        <div className="relative h-32 border-b border-line">
          <ProjectImage src={image} priority={false} />
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold tracking-tight text-ink">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm text-muted leading-relaxed">
          {project.summary}
        </p>
        <ProjectLinks project={project} className="mt-4" />
        <CaseStudyDisclosure project={project} />
      </div>
    </article>
  );
}

/** A plain row for research and smaller projects. */
export function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="py-4 border-b border-line">
      <div className="grid gap-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] md:gap-6">
        <h4 className="font-semibold text-ink">{project.title}</h4>
        <p className="text-sm text-muted leading-relaxed">{project.summary}</p>
        <p className="font-mono text-sm text-muted md:text-right">
          {yearOf(project.period)}
        </p>
      </div>
      <CaseStudyDisclosure project={project} withLinks compact />
    </article>
  );
}

/** The last four-digit year in a period string ("July – August 2026" → 2026). */
function yearOf(period: string): string {
  const years = period.match(/\d{4}/g);
  return years ? years[years.length - 1] : "";
}

function CaseStudyDisclosure({
  project,
  withLinks = false,
  compact = false,
}: {
  project: Project;
  withLinks?: boolean;
  compact?: boolean;
}) {
  return (
    <details className={cn("disclosure-grow group", compact ? "mt-2" : "mt-4")}>
      <summary
        className={cn(
          "cursor-pointer list-none inline-flex items-center gap-2 rounded-md min-h-11 text-sm font-semibold text-accent",
          FOCUS_RING,
        )}
      >
        <ChevronIcon />
        How it was built
        <span className="sr-only">, {project.title}</span>
      </summary>
      <CaseStudy project={project} />
      {withLinks && <ProjectLinks project={project} className="mt-5" />}
      <TagList tags={project.tags} className="mt-5" />
    </details>
  );
}

function CaseStudy({ project }: { project: Project }) {
  return (
    <div className="mt-3 space-y-5 max-w-prose">
      <p className="text-ink leading-relaxed">{project.description}</p>
      <dl className="space-y-5">
        <div>
          <dt className="text-sm font-semibold text-ink mb-1">The challenge</dt>
          <dd className="text-muted leading-relaxed">{project.challenge}</dd>
        </div>
        {"architecture" in project && (
          <div>
            <dt className="text-sm font-semibold text-ink mb-1">
              How it&apos;s built
            </dt>
            <dd className="text-muted leading-relaxed">
              {project.architecture as string}
            </dd>
          </div>
        )}
        {"outcome" in project && (
          <div>
            <dt className="text-sm font-semibold text-ink mb-1">Outcome</dt>
            <dd className="text-muted leading-relaxed">
              {project.outcome as string}
            </dd>
          </div>
        )}
      </dl>
    </div>
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
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Stack">
      {tags.map((tag) => (
        <li
          key={tag}
          className="font-mono text-xs text-muted border border-line rounded px-2 py-1"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

/**
 * Every screenshot in src/assets is 1280×769. The attributes give a client
 * with no CSS the intrinsic size; the parent box reserves the space, so there
 * is no layout shift either way.
 */
const SHOT_WIDTH = 1280;
const SHOT_HEIGHT = 769;

function ProjectImage({ src, priority }: { src: string; priority: boolean }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <div className="absolute inset-0 bg-line animate-pulse" />}
      {/* alt="" — the title is announced by the heading right below. */}
      <img
        src={src}
        alt=""
        width={SHOT_WIDTH}
        height={SHOT_HEIGHT}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete) setLoaded(true);
        }}
        className={cn(
          "absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-200",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />
    </>
  );
}

/**
 * Demo first, source second, and nothing when a project has neither. Text
 * links rather than buttons: the page has one filled button (the hero's), and
 * a tile full of them would compete with it. Each link carries the project
 * name for screen readers.
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

  const base = cn(
    "inline-flex items-center gap-1.5 rounded-md min-h-11 text-sm font-semibold transition-colors duration-150",
    FOCUS_RING,
  );

  return (
    <div className={cn("flex gap-5 flex-wrap", className)}>
      {hasDemo && (
        <a
          href={project.demo as string}
          className={cn(base, "text-accent hover:underline underline-offset-4")}
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
          className={cn(base, "text-muted hover:text-ink")}
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

/**
 * Points right when the disclosure is shut and down when it is open. The
 * rotation rides the global prefers-reduced-motion backstop in index.css.
 */
export function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 shrink-0 transition-transform duration-150 group-open:rotate-90"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}
