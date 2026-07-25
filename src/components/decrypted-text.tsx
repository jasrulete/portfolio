import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion";

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[]<>/\\|=+*#";

/**
 * Terminal-style scramble-reveal (inspired by react-bits' Decrypted Text,
 * reimplemented without dependencies). Renders plain text for reduced motion
 * and whenever the effect hasn't fired, so it degrades safely.
 */
export default function DecryptedText({
  text,
  trigger = "view",
  speed = 35,
  className,
}: {
  text: string;
  /** "mount" scrambles immediately; "view" waits until scrolled into view. */
  trigger?: "mount" | "view";
  speed?: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const play = () => {
      if (played.current) return;
      played.current = true;
      let revealed = 0;
      intervalRef.current = setInterval(() => {
        revealed += 1;
        if (revealed >= text.length) {
          setDisplay(text);
          clearInterval(intervalRef.current);
          return;
        }
        setDisplay(
          text.slice(0, revealed) +
            Array.from({ length: text.length - revealed }, (_, i) =>
              text[revealed + i] === " "
                ? " "
                : SCRAMBLE_CHARS[
                    Math.floor(Math.random() * SCRAMBLE_CHARS.length)
                  ]
            ).join("")
        );
      }, speed);
    };

    if (trigger === "mount") {
      play();
    } else {
      const el = ref.current;
      if (!el || typeof IntersectionObserver === "undefined") return;
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            obs.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      return () => {
        obs.disconnect();
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [text, trigger, speed, reducedMotion]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
