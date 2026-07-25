import { useEffect, useRef, useState } from "react";
import background from "../assets/background.jpg";
import { profile } from "../data/profile";
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion";
import DecryptedText from "./decrypted-text";
import ScrollReveal from "./scroll-reveal";

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between items-center overflow-hidden px-4 sm:px-6"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url(${background})`,
          transform: reducedMotion
            ? undefined
            : `translate(${mouse.x}px, ${mouse.y}px) scale(1.08)`,
        }}
      />
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-20">
        <ScrollReveal>
          <div>
            <p className="font-display text-blue-300 text-sm sm:text-base tracking-wide mb-4">
              {profile.title}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              <DecryptedText text={profile.shortName} trigger="mount" speed={55} />
              <span className="text-blue-400">_</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              {profile.tagline}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <MagneticLink
                href="#projects"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg"
              >
                View my work
              </MagneticLink>
              <MagneticLink
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/80 text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-gray-900"
              >
                GitHub
              </MagneticLink>
            </div>
            <p className="mt-6 text-sm text-gray-300">
              <a
                href={profile.cvUrl}
                download="Jeric-Rulete-CV.pdf"
                className="underline underline-offset-4 hover:text-white transition-colors"
              >
                Download CV
              </a>
              <span className="mx-2 text-gray-500">·</span>
              <a
                href={profile.resumeUrl}
                download="Jeric Rulete_Resume.pdf"
                className="underline underline-offset-4 hover:text-white transition-colors"
              >
                Resume
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>

      <div className="z-10 mb-20 text-white flex flex-col items-center">
        <a
          href="#about"
          className="group flex flex-col items-center"
          aria-label="Scroll to about section"
        >
          <span className="text-sm font-medium mb-2 group-hover:text-blue-300 transition-colors">
            Scroll Down
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

function MagneticLink({
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || reducedMotion || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px) scale(1.05)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <a
      {...props}
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block transition-transform duration-200 ease-out active:scale-95 ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
