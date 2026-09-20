import { profile } from "../data/profile";

// One focus style for every hero action. The hero now sits on the ordinary
// page surface rather than a dark overlay, so the ring offset follows the
// page colour instead of being pinned to gray-900.
const CTA_FOCUS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900";

export default function Hero() {
  return (
    <section id="home" className="pt-10 pb-12 sm:pt-16 sm:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          {profile.shortName}
          <span className="text-blue-600 dark:text-blue-400">_</span>
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-gray-900 dark:text-white">
          {profile.title} · {profile.location}
        </p>

        <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {profile.tagline} I&apos;m open to software developer, web developer
          and QA engineer roles.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className={`inline-flex items-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800 ${CTA_FOCUS}`}
          >
            View projects
          </a>
          <a
            href={profile.resumeUrl}
            download="Jeric-Rulete_Resume.pdf"
            className={`inline-flex items-center rounded-full border border-blue-600 px-5 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-600 dark:hover:text-white ${CTA_FOCUS}`}
          >
            Resume (PDF)
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${CTA_FOCUS}`}
          >
            GitHub
          </a>
          <span aria-hidden> · </span>
          <a
            href={`mailto:${profile.personalEmail}`}
            className={`rounded underline underline-offset-4 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${CTA_FOCUS}`}
          >
            {profile.personalEmail}
          </a>
        </p>
      </div>
    </section>
  );
}
