"use client";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
const AboutPage = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 } },
  };

  const zoomInVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white mb-4"
              initial="hidden"
              animate="visible"
              variants={fadeInUpVariants}
            >
              Hi I am Adarsha Paudyal
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white mb-8"
              initial="hidden"
              animate="visible"
              variants={slideInLeftVariants}
            >
              An Electronic Engineer & Web Developer with a passion for creating
              innovative solutions.
            </motion.p>
          </div>
          <motion.div
            className="md:w-1/2 mt-8 md:mt-0"
            initial="hidden"
            animate="visible"
            variants={zoomInVariants}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="/images/profile.jpg"
              width={200}
              height={200}
              alt="Adarsha Paudyal"
              className="rounded-full w-64 h-64 object-cover mx-auto shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeInUpVariants}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto p-8 bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg"
            variants={zoomInVariants}
          >
            <h2 className="text-3xl font-bold text-center mb-6">About Me</h2>
            <p className="text-gray-700 mb-6">
              I am a passionate Electronic Engineer and Web Developer with a
              knack for creating innovative solutions. With a strong foundation
              in both hardware and software, I bring a unique perspective to
              every project I undertake.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
