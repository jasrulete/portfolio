import { useScrollProgress } from "../hooks/use-scroll-progress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    // Decorative: exposing it as a progressbar made screen readers announce
    // every scroll tick.
    <div
      aria-hidden
      className="fixed top-16 left-0 right-0 h-0.5 bg-blue-500 origin-left z-50 pointer-events-none"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
