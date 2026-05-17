import { useState, useEffect } from "react";
import Hero from "./components/hero-section";
import AboutSection from "./components/about-section";
import SkillsSection from "./components/skills-section";
import ProjectsSection from "./components/projects-section";
import ExperienceSection from "./components/experience-section";
import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ScrollProgress from "./components/scroll-progress";

function App() {
  const [darkMode, setDarkMode] = useState(false);

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
        <ScrollProgress />
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
