"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  FiHome,
  FiInfo,
  FiLogOut,
  FiMail,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
const SkyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session, status } = useSession();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (session) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [session]);

  const menuItems = [
    {
      name: "Home",
      icon: <FiHome />,
      href: "/",
      customStyle: "text-3xl font-bold",
    },
    { name: "About", icon: <FiInfo />, href: "/about" },
    { name: "Contact", icon: <FiMail />, href: "/contact" },
  ];

  const authItems = !auth
    ? [
        {
          name: "Login",
          icon: <FiLogIn />,
          href: "/api/auth/signin",
        },
        { name: "Signup", icon: <FiUserPlus />, href: "/signup" },
      ]
    : [
        // <button onClick={() => signIn()}>Sign in</button>
        {
          name: "LogOut",
          icon: <FiLogOut />,
          href: "/api/auth/signout",
          className: "btn-red",
        },
        { name: "Signup", icon: <FiUserPlus />, href: "/signup" },
      ];

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      className="sticky top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-opacity-80 backdrop-blur-md shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <motion.div
              className="flex-shrink-0 text-white font-bold text-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              NGL
              {/* {auth ? <h1>{session.user.username}</h1> : <h1>GUEST</h1>} */}
            </motion.div>
          </div>
          {!isMobile && (
            <div className="hidden md:flex flex-grow justify-center">
              <div className="flex items-center space-x-4">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-white hover:bg-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out flex items-center space-x-1"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          )}
          {!isMobile && (
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {authItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-white hover:bg-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out flex items-center space-x-1"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          )}
          {isMobile && (
            <div className="-mr-2 flex md:hidden">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500 focus:ring-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {[...menuItems, ...authItems].map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:bg-white hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out  items-center space-x-2"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default SkyNavbar;
