import profilePhoto from "../assets/profile.webp";
import { profile } from "../data/profile";
import SectionHeading from "./section-heading";
import { StackBlock } from "./skills-section";

export default function AboutSection({
  onSkillSelect,
}: {
  onSkillSelect?: (skill: string) => void;
}) {
  return (
    <section
      id="about"
      className="py-14 sm:py-20 border-t border-gray-300 dark:border-gray-700"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About" />
        <AboutGrid />
        <div className="mt-12">
          {/* scroll-mt clears the sticky navbar for the palette's "Go to Stack". */}
          <h3
            id="stack"
            className="text-xl sm:text-2xl font-bold mb-6 scroll-mt-20 text-gray-900 dark:text-white"
          >
            Stack
          </h3>
          <StackBlock onSkillSelect={onSkillSelect} />
        </div>
      </div>
    </section>
  );
}

function AboutGrid() {
  return (
    <AboutGridContainer>
      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute -inset-2 border-2 border-blue-600/40 dark:border-blue-400/40 rounded-xl translate-x-3 translate-y-3" />
          <img
            src={profilePhoto}
            alt={profile.name}
            loading="lazy"
            decoding="async"
            className="relative w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-xl shadow-sm"
          />
        </div>
      </div>

      <div>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          I&apos;m a full-stack web developer in Cebu City. I graduated with a
          BS in Computer Science from the University of the Philippines Cebu
          in July 2026. I&apos;m doing contract development work at the
          moment, and I&apos;m open to software developer, web developer and
          QA engineer roles.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
          Most of what I build is full-stack web work: Next.js and TypeScript
          over PostgreSQL or SQLite. ShelfStock is a store whose checkout
          locks the stock row so two buyers can&apos;t both take the last
          unit, with 262 API tests behind it. Nexus CRM has Playwright
          end-to-end tests and an eval that fires prompt-injection payloads at
          its AI layer. On the Shopify side, Kitchen Line Supply is a theme I
          wrote from an empty folder in Liquid, and its cart, filters and
          mobile menu keep working with JavaScript switched off. The part I
          like is finding what breaks quietly — then fixing it and writing it
          down.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          My thesis was a security framework for smart-home IoT that uses a
          decision tree to judge threat level and switches each device between
          AES-128 and ChaCha20 based on its context; across 180 simulation
          runs it cut mean response time by 63.40% and energy use by 27.39%
          against static encryption. I also co-wrote an agent-based model of
          bridge degradation in NetLogo for a modelling course. I still write
          my technical reports in LaTeX, by choice.
        </p>
      </div>
    </AboutGridContainer>
  );
}

function AboutGridContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
      {children}
    </div>
  );
}
