import { useState } from "react";
import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Leadership & Experience" />
        <div className="space-y-4 max-w-3xl mx-auto">
          {profile.experience.map((item, index) => {
            const isOpen = expanded === index;
            return (
              <ScrollReveal key={item.title} delay={index * 100}>
                <article
                  className={cn(
                    "rounded-xl border transition-all duration-300 overflow-hidden",
                    isOpen
                      ? "border-blue-500 shadow-lg bg-blue-50/50 dark:bg-blue-900/10"
                      : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30 hover:border-blue-300",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                        {item.period}
                      </p>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {item.org}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "text-2xl text-blue-500 transition-transform duration-300 shrink-0 mt-1",
                        isOpen && "rotate-45",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <ExperiencePanel
                    isOpen={isOpen}
                    highlights={item.highlights}
                  />
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperiencePanel({
  isOpen,
  highlights,
}: {
  isOpen: boolean;
  highlights: readonly string[];
}) {
  return (
    <div
      className={cn(
        "grid transition-all duration-300 ease-in-out",
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
    >
      <div className="overflow-hidden">
        {/* Inside ExperiencePanel component */}
        <ul className="px-5 pb-5 space-y-3 border-t border-blue-200/50 dark:border-blue-800/50 pt-4">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="text-gray-600 dark:text-gray-300 text-sm flex gap-3 group"
            >
              <span className="text-blue-500 shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                ▹
              </span>
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
