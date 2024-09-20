"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
const SignupForm = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Form Data Submitted:", formData);
      await axios.post(`${baseUrl}/api/signup`, formData);
      toast.success("Signup successful!");
      router.push("/api/auth/signin");

      // Redirect to home page after successful signup
    } catch (error) {
      toast.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="w-full max-w-md">
        <form
          className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300 ease-in-out"
          onSubmit={handleSubmit} // Move onSubmit here to the form
        >
          <h2 className="text-3xl font-bold text-center text-black mb-8">
            Sign Up
          </h2>

          <div className="mb-6 relative">
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className="w-full px-4 py-3 rounded-lg bg-opacity-20 bg-white border border-gray-300 focus:ring-2 focus:ring-purple-200 text-black placeholder-gray-300 outline-none transition-all duration-300"
              placeholder="Username"
              required
            />
          </div>

          <div className="mb-6 relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-opacity-20 bg-white border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-black placeholder-gray-300 outline-none transition-all duration-300"
              placeholder="Email"
              required
            />

            <FaEnvelope className="absolute left-3 top-4 text-gray-300" />
          </div>

          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-opacity-20 bg-white border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-black placeholder-gray-300 outline-none transition-all duration-300"
              placeholder="Password"
              required
            />

            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-300 hover:text-black transition-all duration-300"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-black font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>

          <div className="text-center mt-4">
            <a
              href="#"
              className="text-sm text-purple-200 hover:text-black transition-all duration-300 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
