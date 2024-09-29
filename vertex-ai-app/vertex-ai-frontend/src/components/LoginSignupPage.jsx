import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import loginImage from "../assets/loginImage.png" // Import login image
import signupImage from "../assets/signupImage.png"; // Import sign-up image

const LoginSignupPage = ({ closeModal }) => {
  const [isLogin, setIsLogin] = useState(false); // Initially show Sign-Up

  const toggleForm = () => {
    setIsLogin(!isLogin); // Toggle between login and signup
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // handle sign-up form submission here
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-8 relative">
        <button className="absolute top-2 right-4 text-xl" onClick={closeModal}>
          &times;
        </button>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6">
            {isLogin ? (
              <>
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-4 relative">
                    <label className="block text-gray-700">Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your password"
                    />
                    <FaEyeSlash className="absolute right-4 top-10 cursor-pointer" />
                  </div>
                  <button className="w-full bg-red-500 text-white py-2 rounded-lg">
                    Log In
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSignupSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-4 relative">
                    <label className="block text-gray-700">Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your password"
                    />
                    <FaEyeSlash className="absolute right-4 top-10 cursor-pointer" />
                  </div>
                  <button className="w-full bg-red-500 text-white py-2 rounded-lg">
                    Sign Up
                  </button>
                </form>
              </>
            )}
            <p className="text-center mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleForm}
                className="text-red-500 hover:underline ml-2"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </div>

          {/* Image Section */}
          <div className="hidden md:block p-6 flex justify-center items-center">
            <motion.img
              src={isLogin ? loginImage : signupImage} // Toggle between login and sign-up images
              alt={isLogin ? "Login" : "Sign Up"}
              className="max-w-full h-auto"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
