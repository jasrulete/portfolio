import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import { countProjectsUsingSkill } from "../data/skill-match";
import SectionHeading from "./section-heading";

// The homepage renders StackBlock inside About (`#stack`); this section
// wrapper exists only for the desktop-OS "Skills.txt" app, which opens the
// same content in its own window.
export default function SkillsSection() {
  return (
    <section id="skills" className="py-14 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Skills" />
        <StackBlock />
      </div>
    </section>
  );
}

// Plain grouped rows: a group title and a chip row. A chip that maps to at
// least one project is a link back up to the filtered projects grid; the rest
// are inert labels, and the difference is visible at rest, not only on hover.
export function StackBlock({
  onSkillSelect,
}: {
  onSkillSelect?: (skill: string) => void;
}) {
  return (
    <div className="space-y-6">
      {profile.skillGroups.map((group) => (
        <div key={group.title}>
          <h4 className="text-lg font-semibold mb-3">{group.title}</h4>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => {
              const projectCount = onSkillSelect
                ? countProjectsUsingSkill(item)
                : 0;
              // The chips no longer sit inside a card, so they carry their own
              // hairline boundary.
              const chipClass =
                "text-xs px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-150";

              if (projectCount > 0 && onSkillSelect) {
                return (
                  <a
                    key={item}
                    href="#projects"
                    onClick={() => onSkillSelect(item)}
                    title={`View ${projectCount} project${projectCount > 1 ? "s" : ""} using ${item}`}
                    className={cn(
                      chipClass,
                      // Blue text plus a visible count: on a touch screen the
                      // hover state was the only thing separating a chip that
                      // filters the projects grid from one that does nothing.
                      "text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white active:bg-blue-700 active:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900",
                    )}
                  >
                    {item}
                    <span className="ml-1.5 font-semibold" aria-hidden>
                      ·&nbsp;{projectCount}
                    </span>
                    <span className="sr-only">
                      , {projectCount} project{projectCount > 1 ? "s" : ""}
                    </span>
                  </a>
                );
              }

              return (
                <span key={item} className={chipClass}>
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
