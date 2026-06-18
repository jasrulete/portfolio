import { useEffect, useState } from "react";
import background from "../assets/background.jpg";
import { profile } from "../data/profile";
import { useTypewriter } from "../hooks/use-typewriter";
import { usePrefersReducedMotion } from "../hooks/use-prefers-reduced-motion";
import HeroParticles from "./hero-particles";
import ScrollReveal from "./scroll-reveal";

export default function Hero() {
  const roleText = useTypewriter(profile.roles);
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
      <HeroParticles />

      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-40"
        style={{
          background: reducedMotion
            ? undefined
            : `radial-gradient(600px circle at ${50 + mouse.x * 2}% ${40 + mouse.y * 2}%, rgba(99, 102, 241, 0.35), transparent 50%)`,
        }}
      />

      <div className="z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-20">
        <ScrollReveal>
          <div>
            <p className="text-blue-300 text-sm sm:text-base font-medium tracking-wide uppercase mb-3">
              {profile.title}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
              <span className="block text-gray-200 text-2xl sm:text-3xl font-semibold mb-2">
                Hello, I&apos;m
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[length:200%_auto] animate-gradient-x">
                {profile.name}
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-2 h-9">
              <span className="text-blue-400">{roleText}</span>
              <span className="animate-blink text-blue-400">|</span>
            </p>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {profile.tagline}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticLink
                href="#projects"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-md hover:shadow-lg hover:shadow-purple-500/25"
              >
                View My Work
              </MagneticLink>
              <MagneticLink
                href={profile.cvUrl}
                download="Jeric-Rulete-CV.pdf"
                className="border-2 border-white/80 text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-gray-900"
              >
                Download CV
              </MagneticLink>
              <MagneticLink
                href={profile.resumeUrl}
                download="Jeric Rulete_Resume.pdf"
                className="border-2 border-white/40 text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-gray-900"
              >
                Download Resume
              </MagneticLink>
              <MagneticLink
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold py-3 px-8 rounded-full hover:text-blue-300"
              >
                GitHub →
              </MagneticLink>
            </div>
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
  return (
    <a
      {...props}
      className={`inline-block transition-all duration-300 transform hover:scale-105 active:scale-95 ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
