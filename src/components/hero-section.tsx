function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between items-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://source.unsplash.com/random/1920x1080/?nature')`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Content */}
      <div className="z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
            <span className="block">Hello, I'm</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mt-2 animate-pulse">
              RULETE, JERIC ASHLEY S.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Student | Web Developer | Tech Enthusiast
          </p>
          <a
            href="#projects"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            View My Work
          </a>
        </div>
      </div>

      {/* Scroll Down */}
      <div className="z-10 mb-20 text-white flex flex-col items-center animate-bounce">
        <a
            href="#skills"
            className="text-white flex flex-col items-center"
            aria-label="Scroll to skills section"
          >
        <span className="text-sm font-medium mb-2">Scroll Down</span>
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
    </section>
  );
}
export default Hero;