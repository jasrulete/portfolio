import AboutSection from "../../about-section";

export default function AboutApp() {
  return (
    <div
      className="about-app-container"
      style={{ containerType: "inline-size" } as React.CSSProperties}
    >
      <style>{`
        .about-app-container [id="about"] { padding: 1.5rem !important; background: transparent !important; }
        .about-app-container .grid { grid-template-columns: 1fr !important; }
        .about-app-container .max-w-7xl { max-width: none !important; }
        .about-app-container img {
          width: clamp(80px, 30cqw, 200px) !important;
          height: clamp(80px, 30cqw, 200px) !important;
        }
      `}</style>
      <AboutSection />
    </div>
  );
}
