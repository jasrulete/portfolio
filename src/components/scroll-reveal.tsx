import { cn } from "../../lib/utils";
import { useInView } from "../hooks/use-in-view";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
};

const hidden = {
  up: "opacity-0 translate-y-10",
  left: "opacity-0 -translate-x-10",
  right: "opacity-0 translate-x-10",
  scale: "opacity-0 scale-95",
};

const visible = {
  up: "opacity-100 translate-y-0",
  left: "opacity-100 translate-x-0",
  right: "opacity-100 translate-x-0",
  scale: "opacity-100 scale-100",
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:scale-100",
        inView ? visible[direction] : hidden[direction],
        className
      )}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
