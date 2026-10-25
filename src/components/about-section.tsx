import SectionHeading from "./section-heading";
import { StackBlock } from "./skills-section";

// The photo lives in the hero now, and the project specifics live in Selected
// work, so the bio stays short and says what the tiles can't.
export default function AboutSection({
  onSkillSelect,
}: {
  onSkillSelect?: (skill: string) => void;
}) {
  return (
    <section id="about" className="py-16 sm:py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About" />

        <div className="prose-flow max-w-prose text-lg text-muted leading-relaxed">
          <p>
            I&apos;m a full-stack web developer in Cebu City. I graduated with a
            BS in Computer Science from the University of the Philippines Cebu
            in July 2026, and I&apos;m doing contract development work now.
            I&apos;m open to software developer, web developer and QA engineer
            roles.
          </p>
          <p>
            Most of my work is Next.js and TypeScript over PostgreSQL or
            SQLite, plus Shopify themes in Liquid. I care about the part after
            it works: the tests, the edge cases and the write-up.
          </p>
          <p>
            My thesis was a smart-home IoT security framework that picks
            between AES-128 and ChaCha20 for each device based on its context.
            I also co-wrote an agent-based model of bridge degradation in
            NetLogo for a modelling course. I still write my technical reports
            in LaTeX, by choice.
          </p>
        </div>

        <div className="mt-14">
          {/* scroll-mt clears the sticky navbar for the palette's "Go to Stack". */}
          <h3
            id="stack"
            className="text-xl font-semibold tracking-tight mb-6 scroll-mt-20 text-ink"
          >
            Stack
          </h3>
          <StackBlock onSkillSelect={onSkillSelect} />
        </div>
      </div>
    </section>
  );
}
