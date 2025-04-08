function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/random/1920x1080/?nature')",
        backgroundAttachment: "fixed", // Parallax effect
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className=" z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          <span className="block">Hello, I'm</span>
          <span className="block text-blue-400 mt-2 animate-pulse">
            Your Name
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 mb-8">
          Web Developer & Designer
        </p>
        <a
          href="#projects"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 transform hover:scale-105"
        >
          View My Work
        </a>

        <div className="absolute top-1/2 right-80 transform -translate-x-1/2 animate-bounce">
          <a
            href="#skills"
            className="text-white flex flex-col items-center"
            aria-label="Scroll to skills section"
          >
            <span className="mb-2">Scroll Down</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
      </div>
    </section>
  );
}

export default Hero;
