// Which of the three UIs App.tsx renders. "desktop" and "mobile" are the two
// OS modes; the visitor asks for "OS mode" and the viewport picks which one.

export type ViewMode = "classic" | "desktop" | "mobile";

/** Matches Tailwind's `md` breakpoint, where the desktop OS starts to fit. */
export const OS_BREAKPOINT = 768;

const VIEW_MODES: readonly ViewMode[] = ["classic", "desktop", "mobile"];

function isViewMode(value: string | null): value is ViewMode {
  return VIEW_MODES.includes(value as ViewMode);
}

/** The OS to open for a viewport, decided once when the visitor enters it. */
export function osModeForWidth(width: number): "desktop" | "mobile" {
  return width >= OS_BREAKPOINT ? "desktop" : "mobile";
}

/**
 * `?view=desktop` or `?view=mobile` wins, so each OS has a linkable URL and
 * the literal link is honoured on any device. Otherwise the per-tab
 * sessionStorage value, and anything unrecognised falls back to classic.
 */
export function initialViewMode(search: string, stored: string | null): ViewMode {
  const fromUrl = new URLSearchParams(search).get("view");
  if (fromUrl === "desktop" || fromUrl === "mobile") return fromUrl;
  return isViewMode(stored) ? stored : "classic";
}
