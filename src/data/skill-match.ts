import { profile } from "./profile";

/** Skill names and project tags don't always match exactly (e.g. "HTML5" vs "HTML"). */
const ALIASES: Record<string, string> = {
  html5: "html",
  css3: "css",
};

export function normalizeSkill(name: string): string {
  const n = name
    .toLowerCase()
    .replace(/\s*\(.*\)\s*/, "")
    .trim();
  return ALIASES[n] ?? n;
}

export function countProjectsUsingSkill(skill: string): number {
  const n = normalizeSkill(skill);
  return profile.projects.filter((p) =>
    p.tags.some((t) => normalizeSkill(t) === n)
  ).length;
}
