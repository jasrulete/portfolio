"use client";

import { useState, useEffect } from "react";
import Hero from "./components/hero-section";
import SkillsSection from "./components/skills-section";
import ProjectsSection from "./components/projects-section";
import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import Navbar from "./components/navbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Check user preference for dark mode
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
