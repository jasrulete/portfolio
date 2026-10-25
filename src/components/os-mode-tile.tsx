import { cn } from "../../lib/utils";
import { FOCUS_RING } from "./focus-ring";

/**
 * The Selected work entry point into OS mode. The copy changes with the
 * viewport because the mode does: the same button opens the desktop OS on a
 * computer and the phone OS below 768px (src/view-mode.ts). The preview is
 * drawn in CSS, two windows and a taskbar over the OS wallpaper colour.
 */
export function OsModeTile({ onOpen }: { onOpen: () => void }) {
  return (
    <article className="md:col-span-2 grid md:grid-cols-[1fr_16rem] bg-surface border border-line rounded-lg overflow-hidden">
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight text-ink">
          <span className="md:hidden">This site also runs as a phone OS</span>
          <span className="hidden md:inline">
            This site also runs as an operating system
          </span>
        </h3>
        <p className="mt-1.5 max-w-prose text-sm text-muted leading-relaxed">
          <span className="md:hidden">
            Home screen, apps, a terminal and games.
          </span>
          <span className="hidden md:inline">
            Draggable windows, a terminal, Minesweeper and a camera app that
            takes a photo when you give it a thumbs-up. On a phone it opens as
            a home screen instead.
          </span>
        </p>
        <button
          type="button"
          onClick={onOpen}
          className={cn(
            "mt-2 inline-flex items-center min-h-11 rounded-md text-sm font-semibold text-accent hover:underline underline-offset-4",
            FOCUS_RING,
          )}
        >
          Open OS mode
        </button>
      </div>

      <div
        aria-hidden
        className="hidden md:block relative min-h-36 bg-[#1B1C1F] border-l border-line"
      >
        <div className="absolute left-6 top-5 w-32 h-20 rounded bg-[#E9E9EA]">
          <div className="h-2.5 rounded-t bg-[#CFD0D2]" />
        </div>
        <div className="absolute left-24 top-12 w-36 h-20 rounded bg-[#E9E9EA] shadow-[0_2px_6px_rgb(0_0_0/0.4)]">
          <div className="h-2.5 rounded-t bg-[#CFD0D2]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-4 bg-surface border-t border-line" />
      </div>
    </article>
  );
}
