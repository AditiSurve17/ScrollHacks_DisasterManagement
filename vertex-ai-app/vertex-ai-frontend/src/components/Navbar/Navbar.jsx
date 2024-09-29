import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import LoginSignupPage from "../LoginSignupPage"; // Import the login/signup page

const NavbarMenu = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "About Us",
    link: "#",
  },
  {
    id: 3,
    title: "Emergency Contact",
    link: "#",
  },
  {
    id: 4,
    title: "Donate",
    link: "#",
  },
  {
    id: 5,
    title: "Contact Us",
    link: "#",
  },
];

const Navbar = () => {
  const [showSignup, setShowSignup] = useState(false); // State to toggle the sign-up modal

  const handleSignupClick = () => {
    setShowSignup(true); // Show the sign-up form when clicked
  };

  const closeModal = () => {
    setShowSignup(false); // Close the modal
  };

  return (
    <nav className="sticky relative z-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky container py-10 flex justify-between items-center"
      >
        {/* Logo section */}
        <div>
          <h1 className="font-bold text-3xl">CrisisGuard</h1>
        </div>
        {/* Menu section */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-3">
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <a
                  href={menu.path}
                  className="inline-block py-2 px-3 text-xl hover:text-secondary relative group"
                >
                  <div className="w-2 h-2 text-5xl bg-secondary absolute mt-5 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
                  {menu.title}
                </a>
              </li>
            ))}
            <button className="primary-btn" onClick={handleSignupClick}>
              Join Us
            </button>
          </ul>
        </div>
        {/* Mobile Hamburger menu section */}
        <div className="lg:hidden">
          <IoMdMenu className="text-4xl" />
        </div>
      </motion.div>

      {/* Sign Up modal */}
      {showSignup && <LoginSignupPage closeModal={closeModal} />} {/* Show modal */}
    </nav>
  );
};

export default Navbar;
