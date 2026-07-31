// Suspense fallback shown while the desktop-OS or mobile-launcher view mode
// chunk is fetched. Matches the gradient both modes render on, so the
// swap-in is seamless rather than a flash of blank/white screen.
export default function ModeLoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-900">
      <div className="h-8 w-8 rounded-full bg-white/30 animate-pulse" aria-hidden />
    </div>
  );
}
