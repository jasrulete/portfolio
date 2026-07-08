import { useEffect, useRef, useState } from "react";
import { profile } from "../../../data/profile";

type Line = { type: "input" | "output"; text: string };

const HELP = `Available commands:
  whoami          show a short bio
  about           education info
  skills          list technical skills
  projects        list projects
  ls projects     alias for 'projects'
  experience      work & volunteer history
  contact         how to reach me
  cat resume.pdf  open resume
  clear           clear the terminal
  help            show this list`;

function runCommand(raw: string): string {
  const cmd = raw.trim().toLowerCase();

  if (cmd === "help" || cmd === "") return HELP;

  if (cmd === "whoami") {
    return `${profile.name}\n${profile.title}\n\n${profile.tagline}`;
  }

  if (cmd === "about" || cmd === "cat about.txt") {
    const e = profile.education;
    return `${e.degree}\n${e.school}, ${e.campus}\nExpected: ${e.expected}\nHonors: ${e.honors}`;
  }

  if (cmd === "skills" || cmd === "cat skills.txt") {
    return profile.skillGroups
      .map((g) => `${g.title}: ${g.items.join(", ")}`)
      .join("\n");
  }

  if (cmd === "projects" || cmd === "ls projects" || cmd === "ls") {
    return profile.projects
      .map((p, i) => `${i + 1}. ${p.title} (${p.period}) — ${p.description}`)
      .join("\n\n");
  }

  if (cmd === "experience" || cmd === "cat experience.txt") {
    return profile.experience
      .map((e) => `${e.title} · ${e.org} (${e.period})`)
      .join("\n");
  }

  if (cmd === "contact") {
    return `Email: ${profile.personalEmail}\nGitHub: ${profile.github}\nLocation: ${profile.location}`;
  }

  if (cmd === "cat resume.pdf" || cmd === "resume") {
    if (typeof window !== "undefined") window.open(profile.resumeUrl, "_blank");
    return "Opening resume.pdf ...";
  }

  return `command not found: ${raw}\nType 'help' to see available commands.`;
}

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([
    {
      type: "output",
      text: `Welcome to ${profile.shortName}'s terminal. Type 'help' to get started.`,
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = input;
    if (value.trim().toLowerCase() === "clear") {
      setLines([]);
      setInput("");
      return;
    }
    const output = runCommand(value);
    setLines((prev) => [
      ...prev,
      { type: "input", text: value },
      { type: "output", text: output },
    ]);
    setInput("");
  };

  return (
    <div
      className="h-full bg-gray-950 text-green-400 font-mono text-sm p-3 overflow-auto"
      onClick={(e) => {
        const input = e.currentTarget.querySelector("input") as HTMLInputElement | null;
        input?.focus();
      }}
    >
      {lines.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap mb-1">
          {l.type === "input" ? (
            <span>
              <span className="text-blue-400">jeric@portfolio</span>
              <span className="text-gray-400">:~$ </span>
              {l.text}
            </span>
          ) : (
            <span className="text-gray-300">{l.text}</span>
          )}
        </div>
      ))}
      <form onSubmit={submit} className="flex items-center">
        <span className="text-blue-400">jeric@portfolio</span>
        <span className="text-gray-400 mr-1">:~$</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-400"
          spellCheck={false}
          autoComplete="off"
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
