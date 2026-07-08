import AboutSection from "../../about-section";

export default function AboutApp() {
  return (
    <div
      className="
        [&_section]:!py-6 [&_section]:!bg-transparent
        [&_.grid]:!grid-cols-1
        [&_img]:!w-32 [&_img]:!h-32
        [&_.max-w-7xl]:!max-w-none
      "
    >
      <AboutSection />
    </div>
  );
}
