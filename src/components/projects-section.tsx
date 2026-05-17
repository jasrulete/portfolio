import { useState } from "react";
import { cn } from "../../lib/utils";
import background from "../assets/background.jpg";
import dungeon_descent from "../assets/dungeon.png";
import finance_app from "../assets/finance-app.png";
import honeyos from "../assets/honeyOS.png";
import { profile } from "../data/profile";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";
import TiltCard from "./tilt-card";

const projectImages: Record<string, string> = {
  "Portfolio Website": background,
  "Dungeon Descent": dungeon_descent,
  BudgetWise: finance_app,
  HoneyOS: honeyos,
};

type Filter = (typeof profile.projectFilters)[number];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered =
    filter === "All"
      ? profile.projects
      : profile.projects.filter((p) => "category" in p && p.category === filter);

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
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-105 hover:shadow"
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
                <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col h-full group">
                  <div
                    className="relative overflow-hidden"
                    style={{ paddingBottom: "50%" }}
                  >
                    <img
                      src={projectImages[project.title] ?? background}
                      alt={project.title}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {"category" in project && (
                      <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
                        {project.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                      {project.period}
                    </p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-3 py-1 rounded-full mr-2 mb-2"
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
  return (
    <div className="flex gap-6">
      <a
        href={project.github}
        className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors hover:translate-x-1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GithubIcon />
        Code
      </a>
      {"demo" in project && project.demo && (
        <a
          href={project.demo}
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
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}
