import { useState } from "react";
import { cn } from "../../lib/utils";
import profilePhoto from "../assets/profile.jpg"
import { profile } from "../data/profile";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";

export default function AboutSection() {
  const { education, cvUrl } = profile;
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <SectionHeading title="About Me" />
      <AboutGrid
        education={education}
        cvUrl={cvUrl}
        hoveredCourse={hoveredCourse}
        setHoveredCourse={setHoveredCourse}
      />
    </section>
  );
}

function AboutGrid({
  education,
  cvUrl,
  hoveredCourse,
  setHoveredCourse,
}: {
  education: (typeof profile)["education"];
  cvUrl: string;
  hoveredCourse: string | null;
  setHoveredCourse: (v: string | null) => void;
}) {
  return (
    <AboutGridContainer>
      <ScrollReveal direction="left">
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={profilePhoto}
              alt={profile.name}
              className="relative w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right" delay={150}>
        <div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {profile.tagline} I enjoy transforming ideas into functional systems
            through clean code, problem-solving, and continuous learning.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-1">{education.degree}</h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {education.school}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
              {education.campus} · {education.expected}
            </p>
            <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-4">
              {education.honors}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Relevant courseworks
            </p>
            <div className="flex flex-wrap gap-2">
              {education.coursework.map((course) => (
                <span
                  key={course}
                  onMouseEnter={() => setHoveredCourse(course)}
                  onMouseLeave={() => setHoveredCourse(null)}
                  className={cn(
                    "text-xs px-3 py-1 rounded-full cursor-default transition-all duration-300",
                    hoveredCourse === course
                      ? "bg-blue-600 text-white scale-110 shadow-md"
                      : hoveredCourse
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 scale-95"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                  )}
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          <a
            href={cvUrl}
            download="Jeric-Rulete_CV.pdf"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </a>
        </div>
      </ScrollReveal>
    </AboutGridContainer>
  );
}

function AboutGridContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {children}
      </div>
    </div>
  );
}
