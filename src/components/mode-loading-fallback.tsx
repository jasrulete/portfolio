// Suspense fallback shown while the desktop-OS or mobile-OS chunk is fetched.
// Matches the flat wallpaper both modes render on, so the swap-in is seamless
// rather than a flash of a different colour.
export default function ModeLoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1B1C1F]">
      <div className="h-8 w-8 rounded-full bg-white/30 animate-pulse" aria-hidden />
    </div>
  );
}
