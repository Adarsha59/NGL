"use client";
import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/adarsha-paudyal-67a651317/",
      icon: <FaLinkedin />,
    },
    {
      name: "GitHub",
      url: "https://github.com/Adarsha59",
      icon: <FaGithub />,
    },
    {
      name: "Website 1",
      url: "https://yomovie.netlify.app",
      icon: <FaGlobe />,
    },
    {
      name: "Website 2",
      url: "https://aadarshapaudyal.com.np",
      icon: <FaGlobe />,
    },
    {
      name: "GitHub Pages",
      url: "https://adarsha59.github.io/",
      icon: <FaGlobe />,
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@moviehunt59",
      icon: <FaYoutube />,
    },
    {
      name: "Twitter",
      url: "https://x.com/Adarsha59",
      icon: <FaTwitter />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-10"
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h1
          className="text-4xl font-bold mb-8 text-white"
          style={{
            textShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          Contact Me
        </h1>
        <p
          className="text-lg text-gray-200 mb-6"
          style={{
            textShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          You can find me on the following platforms:
        </p>
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
          style={{
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
            padding: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
          }}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white/20 shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-white/30 transition duration-300 ease-in-out"
            >
              <div
                className="text-3xl text-white mb-4"
                style={{
                  filter: "drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.2))",
                }}
              >
                {link.icon}
              </div>
              <p
                className="text-sm font-medium text-white"
                style={{
                  textShadow: "0px 0px 2px rgba(0, 0, 0, 0.2)",
                }}
              >
                {link.name}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
