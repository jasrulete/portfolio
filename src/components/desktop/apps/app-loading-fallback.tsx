// Suspense fallback for lazy-loaded app content inside a desktop Window or
// the mobile launcher's full-screen app view. Uses the same skeleton-pulse
// language as github-stats-badge.tsx (already covered by the
// prefers-reduced-motion override in index.css).
export default function AppLoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3 animate-pulse" aria-hidden>
        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
