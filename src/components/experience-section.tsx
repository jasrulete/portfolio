import { profile } from "../data/profile";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";

// Static, always-expanded entries. Three roles with 2–4 bullets each is not
// enough content to justify hiding two thirds of it behind a toggle — and the
// toggle's "+" glyph was read aloud as part of the button name.
export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Experience" />
        <div className="space-y-4 max-w-3xl mx-auto">
          {profile.experience.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 100}>
              <article className="rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30 overflow-hidden">
                <div className="p-5">
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                    {item.period}
                  </p>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {item.org}
                  </p>
                </div>
                <ul className="px-5 pb-5 space-y-3 border-t border-gray-200 dark:border-gray-600 pt-4">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-gray-600 dark:text-gray-300 text-sm flex gap-3 group"
                    >
                      <span
                        aria-hidden
                        className="text-blue-500 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        ▹
                      </span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
