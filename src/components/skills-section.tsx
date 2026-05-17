import { useState } from "react";
import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-800">
      <SkillsContent activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
    </section>
  );
}

function SkillsContent({
  activeGroup,
  setActiveGroup,
}: {
  activeGroup: string | null;
  setActiveGroup: (v: string | null) => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Technical Skills" />
      <p className="text-center text-gray-500 dark:text-gray-400 -mt-10 mb-10 text-sm">
        Click a category to focus · click again to reset
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
}: {
  group: (typeof profile.skillGroups)[number];
  isActive: boolean;
  isFocused: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full text-left p-6 rounded-xl border transition-all duration-300 cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        isFocused
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-[1.03] -translate-y-1"
          : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50",
        !isActive && "opacity-40 scale-95",
        isActive && !isFocused && "hover:shadow-lg hover:-translate-y-1 hover:border-blue-300"
      )}
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
      <div className="flex flex-wrap gap-2">
        {group.items.map((item, i) => (
          <span
            key={item}
            className={cn(
              "text-sm px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm transition-all duration-300",
              isFocused && "animate-pop"
            )}
            style={isFocused ? { animationDelay: `${i * 50}ms` } : undefined}
          >
            {item}
          </span>
        ))}
      </div>
    </button>
  );
}
