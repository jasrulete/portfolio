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

          <Education />
        </div>
      </div>
    </section>
  );
}

// Education sits with the work history, not with the bio. The coursework
// chips are inert labels: the old hover enlarge/dim was mouse-only, with no
// keyboard or touch equivalent, and revealed nothing.
function Education() {
  const { education, cvUrl } = profile;

  return (
    <div className="pt-6">
      <h3 className="text-xl font-bold mb-4">Education</h3>
      <article className="rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30 p-5">
        <h4 className="text-lg font-semibold mb-1">{education.degree}</h4>
        <p className="text-blue-600 dark:text-blue-400 font-medium">
          {education.school}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {education.campus} · Graduated {education.graduated}
        </p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          {education.honors}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Relevant coursework
        </p>
        <div className="flex flex-wrap gap-2">
          {education.coursework.map((course) => (
            <span
              key={course}
              className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              {course}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <a
            href={cvUrl}
            download="Jeric-Rulete_CV.pdf"
            className="rounded text-blue-600 dark:text-blue-400 underline underline-offset-4 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
          >
            Full CV (PDF) — longer academic version
          </a>
        </p>
      </article>
    </div>
  );
}
