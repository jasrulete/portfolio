import profilePhoto from "../assets/profile.webp";
import { profile } from "../data/profile";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";
import { StackBlock } from "./skills-section";

export default function AboutSection({
  onSkillSelect,
}: {
  onSkillSelect?: (skill: string) => void;
}) {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <SectionHeading title="About" />
      <AboutGrid />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* scroll-mt clears the sticky navbar for the palette's "Go to Stack". */}
        <h3
          id="stack"
          className="font-display text-2xl font-bold mb-6 scroll-mt-20"
        >
          Stack
        </h3>
        <StackBlock onSkillSelect={onSkillSelect} />
      </div>
    </section>
  );
}

function AboutGrid() {
  return (
    <AboutGridContainer>
      <ScrollReveal direction="left">
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-2 border-2 border-blue-500/40 rounded-2xl translate-x-3 translate-y-3 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
            <img
              src={profilePhoto}
              alt={profile.name}
              loading="lazy"
              decoding="async"
              className="relative w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right" delay={150}>
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
