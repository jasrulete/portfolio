import { useState } from "react";
import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import { countProjectsUsingSkill } from "../data/skill-match";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";

export default function Skills({
  onSkillSelect,
}: {
  onSkillSelect?: (skill: string) => void;
}) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
      <SkillsContent
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
        onSkillSelect={onSkillSelect}
      />
    </section>
  );
}

function SkillsContent({
  activeGroup,
  setActiveGroup,
  onSkillSelect,
}: {
  activeGroup: string | null;
  setActiveGroup: (v: string | null) => void;
  onSkillSelect?: (skill: string) => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Skills" />
      <p className="text-center text-gray-500 dark:text-gray-400 -mt-10 mb-10 text-sm">
        Click a category to focus{onSkillSelect && " · click a skill to see it used in projects"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profile.skillGroups.map((group, index) => (
          <ScrollReveal key={group.title} delay={index * 80}>
            <SkillGroupCard
              group={group}
              isActive={activeGroup === null || activeGroup === group.title}
              isFocused={activeGroup === group.title}
              onSelect={() =>
                setActiveGroup(
                  activeGroup === group.title ? null : group.title
                )
              }
              onSkillSelect={onSkillSelect}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function SkillGroupCard({
  group,
  isActive,
  isFocused,
  onSelect,
  onSkillSelect,
}: {
  group: (typeof profile.skillGroups)[number];
  isActive: boolean;
  isFocused: boolean;
  onSelect: () => void;
  onSkillSelect?: (skill: string) => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "w-full p-6 rounded-xl border transition-all duration-300 cursor-pointer",
        isFocused
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-[1.03] -translate-y-1"
          : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50",
        !isActive && "opacity-40 scale-95",
        isActive && !isFocused && "hover:shadow-lg hover:-translate-y-1 hover:border-blue-300"
      )}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        className="w-full text-left rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400 flex items-center justify-between">
          {group.title}
          <span
            className={cn(
              "text-xs transition-transform duration-300",
              isFocused && "rotate-180"
            )}
          >
            ▾
          </span>
        </h3>
      </button>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item, i) => {
          const projectCount = onSkillSelect ? countProjectsUsingSkill(item) : 0;
          const chipClass = cn(
            "text-sm px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm transition-all duration-300",
            isFocused && "animate-pop"
          );
          const chipStyle = isFocused
            ? { animationDelay: `${i * 50}ms` }
            : undefined;

          if (projectCount > 0 && onSkillSelect) {
            return (
              <a
                key={item}
                href="#projects"
                onClick={(e) => {
                  e.stopPropagation();
                  onSkillSelect(item);
                }}
                title={`View ${projectCount} project${projectCount > 1 ? "s" : ""} using ${item}`}
                className={cn(
                  chipClass,
                  // Blue text plus a visible count: on a touch screen the
                  // hover state was the only thing separating a chip that
                  // filters the projects grid from one that does nothing.
                  "text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                )}
                style={chipStyle}
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
            <span key={item} className={chipClass} style={chipStyle}>
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}
