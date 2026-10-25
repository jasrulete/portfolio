import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Moon,
  Sun,
  MonitorSmartphone,
  LayoutTemplate,
  Github,
  ExternalLink,
  FileText,
  Mail,
  ArrowRight,
} from "lucide-react";
import { profile } from "../data/profile";
import { osModeForWidth, type ViewMode } from "../view-mode";

interface Command {
  id: string;
  label: string;
  hint: string;
  keywords?: string;
  icon: React.ReactNode;
  action: () => void;
}

// Mirrors App.tsx's section order, plus "Stack" — the skills list is a
// sub-block of About now, so this is how it stays directly reachable.
const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Selected work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export default function CommandPalette({
  open,
  setOpen,
  darkMode,
  toggleDarkMode,
  setViewMode,
  mode,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  setViewMode: (m: ViewMode) => void;
  mode: ViewMode;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      // Remember where focus came from (the navbar button, a keystroke's
      // target, …) so closing puts it back instead of dropping it on <body>.
      openerRef.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setSelected(0);
      inputRef.current?.focus();
    } else if (wasOpen.current) {
      openerRef.current?.focus?.();
      openerRef.current = null;
    }
    wasOpen.current = open;
  }, [open]);

  const commands = useMemo<Command[]>(() => {
    const close = () => setOpen(false);
    const list: Command[] = [];

    if (mode === "classic") {
      for (const s of SECTIONS) {
        list.push({
          id: `go-${s.id}`,
          label: `Go to ${s.label}`,
          hint: "Section",
          keywords: "navigate jump scroll",
          icon: <ArrowRight size={16} />,
          action: () => {
            close();
            document.getElementById(s.id)?.scrollIntoView();
          },
        });
      }
    }

    list.push(
      {
        id: "theme",
        label: darkMode ? "Switch to light mode" : "Switch to dark mode",
        hint: "Action",
        keywords: "theme dark light toggle appearance",
        icon: darkMode ? <Sun size={16} /> : <Moon size={16} />,
        action: () => {
          close();
          toggleDarkMode();
        },
      },
      // One device-aware entry into OS mode; the viewport picks desktop or
      // phone at that moment (src/view-mode.ts).
      mode === "classic"
        ? {
            id: "view-os",
            label: "Open OS mode",
            hint: "Action",
            keywords: "os desktop mobile phone windows mode view switch",
            icon: <MonitorSmartphone size={16} />,
            action: () => {
              close();
              setViewMode(osModeForWidth(window.innerWidth));
            },
          }
        : {
            id: "view-classic",
            label: "Back to classic view",
            hint: "Action",
            keywords: "classic mode view exit leave switch",
            icon: <LayoutTemplate size={16} />,
            action: () => {
              close();
              setViewMode("classic");
            },
          },
      {
        id: "github-profile",
        label: "Open GitHub profile",
        hint: "Link",
        keywords: "github code repositories",
        icon: <Github size={16} />,
        action: () => {
          close();
          window.open(profile.github, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "download-cv",
        label: "Open CV (PDF)",
        hint: "File",
        keywords: "cv curriculum vitae pdf download",
        icon: <FileText size={16} />,
        action: () => {
          close();
          window.open(profile.cvUrl, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "download-resume",
        label: "Open resume (PDF)",
        hint: "File",
        keywords: "resume pdf download",
        icon: <FileText size={16} />,
        action: () => {
          close();
          window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
        },
      },
      {
        id: "email",
        label: "Send me an email",
        hint: "Contact",
        keywords: "email mail contact message",
        icon: <Mail size={16} />,
        action: () => {
          close();
          window.location.href = `mailto:${profile.personalEmail}`;
        },
      }
    );

    for (const p of profile.projects) {
      if ("github" in p && p.github) {
        list.push({
          id: `gh-${p.title}`,
          label: `${p.title}: view code`,
          hint: "Project",
          keywords: `github repository ${p.tags.join(" ")}`,
          icon: <Github size={16} />,
          action: () => {
            close();
            window.open(p.github as string, "_blank", "noopener,noreferrer");
          },
        });
      }
      if ("demo" in p && p.demo) {
        list.push({
          id: `demo-${p.title}`,
          label: `${p.title}: live demo`,
          hint: "Project",
          keywords: `demo website ${p.tags.join(" ")}`,
          icon: <ExternalLink size={16} />,
          action: () => {
            close();
            window.open(p.demo as string, "_blank", "noopener,noreferrer");
          },
        });
      }
    }

    return list;
  }, [mode, darkMode, toggleDarkMode, setViewMode, setOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint} ${c.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  if (!open) return null;

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[selected]?.action();
    } else if (e.key === "Tab") {
      // The palette's only focusable control is this input — arrow keys
      // drive selection via aria-activedescendant, so Tab has nothing
      // legitimate to move to. Keep focus trapped here instead of letting
      // it escape into the page behind the overlay.
      e.preventDefault();
    }
  };

  const activeOption = filtered[selected];

  return (
    <div
      className="fixed inset-0 z-70 flex items-start justify-center bg-black/60 px-4 pt-[15vh]"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-lg rounded-lg bg-surface text-ink border border-line overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 border-b border-line">
          <Search size={18} className="shrink-0 text-muted" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Type a command or search…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="command-palette-listbox"
            aria-autocomplete="list"
            aria-activedescendant={activeOption ? `command-option-${activeOption.id}` : undefined}
            className="w-full py-3.5 bg-transparent text-ink placeholder:text-muted rounded-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus"
          />
          <kbd className="shrink-0 font-mono text-xs text-muted border border-line rounded-sm px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        <div
          ref={listRef}
          id="command-palette-listbox"
          role="listbox"
          aria-label="Commands"
          className="max-h-[50vh] overflow-y-auto py-2"
        >
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-sm text-muted">
              No commands match &ldquo;{query}&rdquo;
            </p>
          )}
          {filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              id={`command-option-${cmd.id}`}
              type="button"
              role="option"
              tabIndex={-1}
              aria-selected={i === selected}
              onMouseEnter={() => setSelected(i)}
              onClick={() => cmd.action()}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                i === selected
                  ? "bg-accent/10 text-ink"
                  : "text-ink"
              }`}
            >
              <span className="shrink-0 text-muted" aria-hidden>
                {cmd.icon}
              </span>
              <span className="flex-1 truncate">{cmd.label}</span>
              <span className="shrink-0 text-xs text-muted">
                {cmd.hint}
              </span>
            </button>
          ))}
        </div>

        <div className="px-4 py-2 border-t border-line text-xs text-muted flex gap-4">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
