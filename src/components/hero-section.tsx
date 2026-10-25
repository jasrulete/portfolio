import profilePhoto from "../assets/profile.webp";
import { cn } from "../../lib/utils";
import { profile } from "../data/profile";
import { FOCUS_RING } from "./focus-ring";

// Copy is fixed by the approved design
// (docs/superpowers/specs/2026-10-24-portfolio-redesign-design.md). The photo
// stays in colour and sits beside the text on wide screens, above it on phones.
export default function Hero() {
  return (
    <section id="home" className="pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:gap-12 lg:items-end">
        <img
          src={profilePhoto}
          alt={profile.name}
          width={190}
          height={230}
          loading="eager"
          decoding="async"
          className="w-24 h-28 lg:w-[190px] lg:h-[230px] object-cover rounded-md lg:order-last"
        />

        <div>
          <p className="text-sm text-muted">
            <strong className="text-ink font-medium">Available now</strong> for
            contract work and full-time developer roles. Based in Cebu City.
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl font-bold tracking-tight text-ink">
            I build full-stack web apps, and I write the tests that keep them
            working.
          </h1>

          <p className="mt-5 max-w-prose text-base sm:text-lg text-muted leading-relaxed">
            Mostly Next.js, TypeScript and PostgreSQL.
            <span className="hidden sm:inline">
              {" "}
              I like finding the bug that only shows up when two people click
              at the same moment, fixing it, and writing down why.
            </span>
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#projects"
              className={cn(
                "inline-flex justify-center items-center rounded-md bg-accent-fill px-5 py-3 text-sm font-semibold text-on-accent transition-opacity duration-150 hover:opacity-90",
                FOCUS_RING,
              )}
            >
              See projects
            </a>
            <a
              href={profile.resumeUrl}
              download="Jeric-Rulete_Resume.pdf"
              className={cn(
                "inline-flex justify-center items-center rounded-md border border-line px-5 py-3 text-sm font-semibold text-ink transition-colors duration-150 hover:border-accent",
                FOCUS_RING,
              )}
            >
              Download résumé (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
