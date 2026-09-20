import { profile } from "../data/profile";
import SectionHeading from "./section-heading";

// Static, always-expanded entries. Three roles with 2–4 bullets each is not
// enough content to justify hiding two thirds of it behind a toggle — and the
// toggle's "+" glyph was read aloud as part of the button name.
export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-14 sm:py-20 border-t border-gray-300 dark:border-gray-700"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Experience" />
        <div className="space-y-6 max-w-3xl">
          {profile.experience.map((item) => (
            <article
              key={item.title}
              className="rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
            >
              <div className="p-5 sm:p-6">
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                  {item.period}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {item.org}
                </p>
              </div>
              <ul className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-3 border-t border-gray-300 dark:border-gray-700 pt-4">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-gray-600 dark:text-gray-300 text-sm flex gap-3"
                  >
                    <span
                      aria-hidden
                      className="text-blue-600 dark:text-blue-400 shrink-0"
                    >
                      ▹
                    </span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>
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
      <h3 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Education
      </h3>
      <article className="rounded-xl shadow-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 sm:p-6">
        <h4 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{education.degree}</h4>
        <p className="text-blue-600 dark:text-blue-400 font-medium">
          {education.school}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {education.campus} · Graduated {education.graduated}
        </p>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
          {education.honors}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          Relevant coursework
        </p>
        <div className="flex flex-wrap gap-2">
          {education.coursework.map((course) => (
            <span
              key={course}
              className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700"
            >
              {course}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm">
          <a
            href={cvUrl}
            download="Jeric-Rulete_CV.pdf"
            className="rounded text-blue-600 dark:text-blue-400 underline underline-offset-4 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800"
          >
            Full CV (PDF) — longer academic version
          </a>
        </p>
      </article>
    </div>
  );
}
