import AboutSection from "../../about-section";

export default function AboutApp() {
  return (
    <div
      className="about-app-container"
      style={{ containerType: "inline-size" } as React.CSSProperties}
    >
      <style>{`
        .about-app-container [id="about"] { padding: 1.5rem !important; background: transparent !important; border-top: 0 !important; }
        .about-app-container .max-w-6xl { max-width: none !important; }
      `}</style>
      <AboutSection />
    </div>
  );
}
