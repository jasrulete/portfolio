import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import { FOCUS_RING } from "./focus-ring";
import { ChevronIcon } from "./project-card";
import SectionHeading from "./section-heading";

type ExperienceItem = (typeof profile.experience)[number];

// A timeline, not cards: date on the left, role on the right, hairlines
// between. The developer roles get full entries; work marked `compact` in
// profile.ts (volunteering, the family business) gets one line each under
// "Also", with its details a click away.
export default function ExperienceSection() {
  const full = profile.experience.filter((item) => !("compact" in item));
  const compact = profile.experience.filter((item) => "compact" in item);

  return (
    <section id="experience" className="py-16 sm:py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Experience" />

        <div className="max-w-4xl">
          {full.map((item) => (
            <TimelineRow key={item.title} period={item.period}>
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="text-muted">{item.org}</p>
              <Highlights items={item.highlights} className="mt-3" />
            </TimelineRow>
          ))}

          {compact.length > 0 && (
            <div className="pt-8">
              <h3 className="text-sm font-semibold text-ink mb-2">Also</h3>
              {compact.map((item) => (
                <CompactRow key={item.title} item={item} />
              ))}
            </div>
          )}

          <Education />
        </div>
      </div>
    </section>
  );
}

function TimelineRow({
  period,
  children,
}: {
  period: string;
  children: React.ReactNode;
}) {
  return (
    <article className="grid gap-1 md:grid-cols-[10rem_1fr] md:gap-8 py-6 border-t border-line first:border-t-0 first:pt-0">
      <p className="font-mono text-sm text-muted md:pt-1">{period}</p>
      <div>{children}</div>
    </article>
  );
}

function Highlights({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("list-disc pl-5 space-y-2 text-muted", className)}>
      {items.map((highlight) => (
        <li key={highlight} className="max-w-prose leading-relaxed">
          {highlight}
        </li>
      ))}
    </ul>
  );
}

function CompactRow({ item }: { item: ExperienceItem }) {
  return (
    <details className="group border-t border-line py-3">
      <summary
        className={cn(
          "cursor-pointer list-none grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-6 sm:items-center min-h-11 rounded-md",
          FOCUS_RING,
        )}
      >
        <span className="flex items-center gap-2">
          <span className="text-accent">
            <ChevronIcon />
          </span>
          <span className="font-medium text-ink">{item.title}</span>
          <span className="text-muted">, {item.org}</span>
        </span>
        <span className="font-mono text-sm text-muted">{item.period}</span>
      </summary>
      <Highlights items={item.highlights} className="mt-3 text-sm" />
    </details>
  );
}

// Education sits with the work history, not with the bio. The coursework
// chips are inert labels.
function Education() {
  const { education, cvUrl } = profile;

  return (
    <div className="pt-12">
      <h3 className="text-xl font-semibold tracking-tight text-ink mb-2">
        Education
      </h3>
      <TimelineRow period={`Graduated ${education.graduated}`}>
        <h4 className="text-lg font-semibold tracking-tight text-ink">
          {education.degree}
        </h4>
        <p className="text-muted">
          {education.school}, {education.campus}
        </p>
        <ul className="mt-2 text-sm text-muted">
          {education.honors.split(" · ").map((honor) => (
            <li key={honor}>{honor}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold text-ink">Relevant coursework</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {education.coursework.map((course) => (
            <li
              key={course}
              className="text-xs px-2.5 py-1 rounded bg-surface border border-line text-muted"
            >
              {course}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <a
            href={cvUrl}
            download="Jeric-Rulete_CV.pdf"
            className={cn(
              "rounded text-accent underline underline-offset-4",
              FOCUS_RING,
            )}
          >
            Full CV (PDF), the longer academic version
          </a>
        </p>
      </TimelineRow>
    </div>
  );
}
