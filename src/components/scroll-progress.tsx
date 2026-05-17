import { useScrollProgress } from "../hooks/use-scroll-progress";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
      className="fixed top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 origin-left z-50 pointer-events-none"
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
