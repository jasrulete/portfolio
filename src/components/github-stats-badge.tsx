// github-stats-badge.tsx
//
// Small inline badge for live GitHub stats. Uses plain inline SVGs (no new
// dependency) to match the style of the GithubIcon/ExternalIcon already
// defined in projects-section.tsx.

import type { GithubStats } from "../../lib/use-github-stats";

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function GithubStatsBadge({
  stats,
}: {
  stats: GithubStats | undefined;
}) {
  if (!stats) return null;

  return (
    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
      {stats.stars > 0 && (
        <span className="flex items-center gap-1">
          <svg
            className="h-3.5 w-3.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.363 1.118l1.287 3.957c.3.921-.755 1.688-1.538 1.118l-3.367-2.447a1 1 0 00-1.176 0l-3.367 2.447c-.783.57-1.838-.197-1.538-1.118l1.287-3.957a1 1 0 00-.363-1.118L2.062 9.383c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.956z" />
          </svg>
          {stats.stars}
        </span>
      )}
      {stats.language && <span>{stats.language}</span>}
      <span title={new Date(stats.pushedAt).toLocaleDateString()}>
        Updated {timeAgo(stats.pushedAt)}
      </span>
    </div>
  );
}
