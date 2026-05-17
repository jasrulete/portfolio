import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

export function useTypewriter(words: readonly string[], typingMs = 80, pauseMs = 2200) {
  const reducedMotion = usePrefersReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setText(words[0] ?? "");
      return;
    }

    const current = words[wordIndex] ?? "";

    if (!deleting && text === current) {
      const pause = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(pause);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      setText(next);
    }, deleting ? typingMs / 2 : typingMs);

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingMs, pauseMs, reducedMotion]);

  return text;
}
