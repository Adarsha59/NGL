import React from "react";
import { FaLinkedin, FaGithub, FaYoutube, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-4xl font-bold mb-2">NGL</h2>
          <p
            className="text-lg text-center mb-6"
            aria-label="Get anonymous feedback from friends with ease"
          >
            Get anonymous feedback from friends with ease
          </p>
          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com/in/adarsha-paudyal-67a651317/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="transform transition-all duration-300 hover:scale-110"
            >
              <FaLinkedin className="text-2xl hover:text-blue-400" />
            </a>
            <a
              href="https://github.com/Adarsha59"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="transform transition-all duration-300 hover:scale-110"
            >
              <FaGithub className="text-2xl hover:text-gray-400" />
            </a>
            <a
              href="https://www.youtube.com/@moviehunt59"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="transform transition-all duration-300 hover:scale-110"
            >
              <FaYoutube className="text-2xl hover:text-red-500" />
            </a>
            <a
              href="https://x.com/Adarsha59"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Profile"
              className="transform transition-all duration-300 hover:scale-110"
            >
              <FaTwitter className="text-2xl hover:text-blue-300" />
            </a>
          </div>
        </div>
        <div className="text-center text-gray-400 text-sm">
          © 2024 NGL. All Rights Reserved || Adarsha Paudyal
        </div>
      </div>
    </footer>
  );
};

export default Footer;
