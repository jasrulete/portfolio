import { FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold">Jeric Rulete</h3>
            <p className="text-gray-400 mt-2">
              Student | Web Developer | Tech Enthusiast
            </p>
          </div>

          <div className="flex space-x-6 text-2xl">
            <a
              href="https://github.com/jasrulete"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="hover:scale-110 transition-transform" />
            </a>

            <a
              href="https://www.facebook.com/hiii.hellooooo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook className="hover:scale-110 transition-transform" />
            </a>

            <a
              href="https://www.instagram.com/rulete.exe/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Jeric Rulete. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
