import { useState } from "react";
import { cn } from "../../lib/utils";
import background from "../assets/background.jpg";
// import chedula from "../assets/chedula-logo.png";
import dungeon_descent from "../assets/dungeon.png";
import finance_app from "../assets/finance-app.png";
import honeyos from "../assets/honeyOS.png";
import minna_no from "../assets/minna-no.png";
import sportal from "../assets/sportal_logo.webp";
import toxic_detector from "../assets/Toxic-image(kaggle sourced).png";
import { profile } from "../data/profile";
import { useGithubStats } from "../../lib/use-github-stats";
import GithubStatsBadge from "./github-stats-badge";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";
import TiltCard from "./tilt-card";

const projectImages: Record<string, string> = {
  "Context-Aware Edge Security Framework": background,
  Sportal: sportal,
  // Chedula: chedula,
  "Toxic Comment Detector": toxic_detector,
  "Minna no Nihongo": minna_no,
  "Portfolio Website": background,
  "Dungeon Descent": dungeon_descent,
  BudgetWise: finance_app,
  HoneyOS: honeyos,
};

type Filter = (typeof profile.projectFilters)[number];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const githubUrls = profile.projects
    .map((p) => ("github" in p ? (p.github as string) : null))
    .filter((url): url is string => Boolean(url));
  const { stats } = useGithubStats(githubUrls);

  const filtered =
    filter === "All"
      ? profile.projects
      : profile.projects.filter(
          (p) => "category" in p && p.category === filter,
        );

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Projects" />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {profile.projectFilters.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                filter === cat
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md scale-105"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-105 hover:shadow",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 100}>
              <TiltCard>
                <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col h-full border border-gray-100 dark:border-gray-700 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors duration-300">
                  {/* Image Banner */}
                  <div
                    className="relative overflow-hidden"
                    style={{ paddingBottom: "35%" }}
                  >
                    <img
                      src={projectImages[project.title] ?? background}
                      alt={project.title}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />

                    <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
                      <div>
                        <p className="text-sm text-blue-300 font-medium mb-1 drop-shadow-md">
                          {project.period}
                          {"subtitle" in project && project.subtitle && (
                            <span className="text-gray-300 font-normal">
                              {" "}
                              · {project.subtitle}
                            </span>
                          )}
                        </p>
                        <h3 className="text-2xl font-bold text-white drop-shadow-md">
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

                  <div className="p-6 flex flex-col flex-grow">
                    {"inProgress" in project && project.inProgress && (
                      <span className="inline-block self-start text-xs font-bold tracking-wide px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 mb-5">
                        IN PROGRESS
                      </span>
                    )}

                    {/* Case Study Structure */}
                    <dl className="space-y-5 mb-6 flex-grow">
                      <div>
                        <dt className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-400 mb-1">
                          The Challenge
                        </dt>
                        <dd className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {"challenge" in project
                            ? (project.challenge as string)
                            : (project.description as string)}
                        </dd>
                      </div>

                      {"architecture" in project && (
                        <div>
                          <dt className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-gray-400 mb-1">
                            Architecture & Execution
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

                    {"github" in project && project.github && (
                      <div className="mb-3">
                        <GithubStatsBadge
                          stats={stats[project.github as string]}
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 text-xs px-3 py-1.5 rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <ProjectLinks project={project} />
                  </div>
                </article>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-12">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}

function ProjectLinks({
  project,
}: {
  project: (typeof profile.projects)[number];
}) {
  const hasGithub = "github" in project && Boolean(project.github);
  const hasDemo = "demo" in project && Boolean(project.demo);

  if (!hasGithub && !hasDemo) {
    return (
      <p className="text-sm text-gray-400 dark:text-gray-500 italic">
        Links coming soon
      </p>
    );
  }

  return (
    <div className="flex gap-6 flex-wrap">
      {hasGithub && (
        <a
          href={project.github as string}
          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors hover:translate-x-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
          Code
        </a>
      )}
      {hasDemo && (
        <a
          href={project.demo as string}
          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors hover:translate-x-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalIcon />
          Live Demo
        </a>
      )}
    </div>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-1"
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
      className="h-5 w-5 mr-1"
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
