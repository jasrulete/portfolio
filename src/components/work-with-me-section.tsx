import { cn } from "../../lib/utils";
import { FOCUS_RING } from "./focus-ring";
import SectionHeading from "./section-heading";

/**
 * The buyer-facing block, and the only one on the page.
 *
 * HARD CAP — do not grow this without a decision: under 180 words, prose
 * only, no icons, no column grid, no tier table, no prices, no testimonials,
 * no client names. Every service named here has a project on this same page
 * with a demo link and source behind it; nothing is claimed that the cards
 * above cannot back. It sits directly above Contact because a recruiter has
 * already read everything they came for by this point, and a buyer who has
 * decided to act is exactly here.
 *
 * There is deliberately no nav item: section order is mirrored in four files
 * (App.tsx, navbar.tsx, use-active-section.ts, command-palette.tsx) and this
 * block is an additive stop on the scroll, not a fifth destination. The
 * trade-off is that the navbar keeps showing "About" while this is on screen.
 */
export default function WorkWithMeSection() {
  return (
    <section
      id="work-with-me"
      className="py-16 sm:py-24 border-t border-line scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Work with me" />

        <div className="max-w-prose prose-flow text-base text-muted leading-relaxed">
          <p>
            What I build, with a demo and source for each on this page:
            full-stack web apps (ShelfStock, Nexus CRM), Shopify themes
            written from scratch (Kitchen Line Supply), and AI features that
            work on your own records, with a rule-based fallback for when
            there is no API key. If you want something else built, ask and
            I&apos;ll tell you honestly whether it&apos;s work I can do.
          </p>
          <p>
            How an engagement runs: we scope it first, and I quote the project
            once we both know what it is. Smaller open-ended work can run
            hourly instead. You get a preview URL early and small changes you
            can review as they land, the code goes in a repository you own,
            and if there is a cheaper or simpler way to get what you want,
            including not hiring me, I&apos;ll say so.
          </p>
          <p>
            I&apos;m open to project work at any time, once the scope and
            timeline are clear. Email me and I&apos;ll reply within one
            business day.
          </p>
        </div>

        <p className="mt-6 text-sm">
          <a
            href="#contact"
            className={cn(
              "rounded text-accent font-semibold underline underline-offset-4",
              FOCUS_RING,
            )}
          >
            Tell me what you&apos;re building
          </a>
        </p>
      </div>
    </section>
  );
}
