import { cn } from "../../lib/utils";

/**
 * The `jer2x_` wordmark (docs/brand.md §4). The visual text is aria-hidden
 * and the accessible name is the real name, so a screen reader announces
 * "Jeric Rulete" rather than spelling out a handle.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-mono font-semibold tracking-tight", className)}>
      <span aria-hidden>
        jer2x<span className="text-accent">_</span>
      </span>
      <span className="sr-only">Jeric Rulete</span>
    </span>
  );
}

// Same artwork as public/favicon.svg and docs/brand/logo-icon.svg. Change
// all three together.
export function JSquaredIcon({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="7" fill="#17181B" stroke="#26282C" />
      <circle cx="13" cy="8.6" r="1.9" fill="#ECECEC" />
      <path
        d="M13 13v10.2a3.3 3.3 0 0 1-3.3 3.3H8"
        fill="none"
        stroke="#ECECEC"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.4 8.2a2.9 2.9 0 0 1 5.6 0.9c0 1.5-1 2.4-2.3 3.5L18.2 15.6h6.2"
        fill="none"
        stroke="#FFB547"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
