import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import { countProjectsUsingSkill } from "../data/skill-match";
import { FOCUS_RING } from "./focus-ring";
import SectionHeading from "./section-heading";

// The homepage renders StackBlock inside About (`#stack`); this section
// wrapper exists only for the desktop-OS "Skills.txt" app, which opens the
// same content in its own window.
export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Skills" />
        <StackBlock />
      </div>
    </section>
  );
}

// Plain grouped rows: a group title and a chip row. A chip that maps to at
// least one project is a link back up to the filtered work, shown in the
// accent with its project count; the rest are inert labels. The difference is
// visible at rest, not only on hover, so it holds on touch screens.
export function StackBlock({
  onSkillSelect,
}: {
  onSkillSelect?: (skill: string) => void;
}) {
  return (
    <div className="space-y-6">
      {profile.skillGroups.map((group) => (
        <div key={group.title}>
          <h4 className="text-sm font-semibold text-ink mb-3">{group.title}</h4>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => {
              const projectCount = onSkillSelect
                ? countProjectsUsingSkill(item)
                : 0;
              const chipClass =
                "text-sm px-3 py-1.5 rounded-md border transition-colors duration-150";

              if (projectCount > 0 && onSkillSelect) {
                return (
                  <a
                    key={item}
                    href="#projects"
                    onClick={() => onSkillSelect(item)}
                    title={`View ${projectCount} project${projectCount > 1 ? "s" : ""} using ${item}`}
                    className={cn(
                      chipClass,
                      "border-accent/50 text-accent hover:border-accent hover:bg-accent/10",
                      FOCUS_RING,
                    )}
                  >
                    {item}
                    <span className="ml-2 font-mono text-xs" aria-hidden>
                      {projectCount}
                    </span>
                    <span className="sr-only">
                      , {projectCount} project{projectCount > 1 ? "s" : ""}
                    </span>
                  </a>
                );
              }

              return (
                <span
                  key={item}
                  className={cn(chipClass, "bg-surface border-line text-muted")}
                >
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
