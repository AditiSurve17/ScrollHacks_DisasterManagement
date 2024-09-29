import React from "react";
import BannerPng from "../../assets/banner3.png";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";

const Banner3 = () => {
  return (
    <section>
      <div className="container py-14 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0">
        {/* Banner Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="text-center md:text-left space-y-4 lg:max-w-[450px]">
            <h1 className="text-5xl font-bold !leading-snug">
            Empowering Disaster-Affected Communities            </h1>
            <p className="text-xl text-dark2">
            Access essential resources and training to aid in disaster recovery and resilience-building. Our hub provides the tools needed to create lasting impact through education and action.            </p>
            <a href="https://www.youtube.com/watch?v=43M5mZuzHF8"
  className="primary-btn !mt-8">
   Floods
</a>
<a href="https://www.youtube.com/watch?v=BLEPakj1YTY"
  className="primary-btn !mt-8 !ml-4" // Added left margin to create space
  >
  Earthquakes
</a>
<a href="https://www.youtube.com/watch?v=xHRbnuB9F1I"
  className="primary-btn !mt-8 !ml-4" // Added left margin to create space
  >
  Hurricanes
</a>
<a href="https://www.youtube.com/watch?v=_bNLtjHG9dM"
  className="primary-btn !mt-8 !ml-4" // Added left margin to create space
  >
  Fires
</a>
<a href="https://www.youtube.com/watch?v=m7EDddq9ftQ"
  className="primary-btn !mt-8 !ml-4" // Added left margin to create space
  >
  Tsunamis
</a>
<a href="https://www.youtube.com/watch?v=Z-w_z9yobpE"
  className="primary-btn !mt-8 !ml-4" // Added left margin to create space
  >
  Volcanic erruptions
</a>

          </div>
        </motion.div>
        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src={BannerPng}
            alt=""
            className="w-[350px] md:max-w-[450px] object-cover drop-shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner3;
