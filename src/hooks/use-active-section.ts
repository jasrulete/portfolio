import { useEffect, useState } from "react";

// Must stay in DOM order: pick() walks this list and keeps the last section
// that has crossed the marker line.
const SECTION_IDS = ["home", "projects", "experience", "about", "contact"];

export function useActiveSection() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const pick = () => {
      const marker = window.innerHeight * 0.4;
      let current = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= marker) {
          current = id;
        }
      }
      // At the very bottom, the last section is active even if it's too
      // short to ever cross the marker line.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
          if (document.getElementById(SECTION_IDS[i])) {
            current = SECTION_IDS[i];
            break;
          }
        }
      }
      setActiveId(current);
    };

    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => {
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };
  }, []);

  return activeId;
}
