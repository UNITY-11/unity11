import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { Particles } from "../ui/MagicUi/Particles";

const FooterCTA: React.FC = () => {
  return (
    <div
      className="
        relative w-full  mx-auto
        flex flex-col items-center justify-center
        overflow-hidden rounded-2xl
        text-center px-10 pb-30  pt-60"
    >
      <motion.div
        initial={{ y: "100%", x: "100%" }}
        whileInView={{ y: 0, x: -20 }}
        transition={{ delay: 0.5, duration: 5, ease: "easeOut" }}
        className=" absolute w-[350px] h-[350px] rounded-full bg-linear-to-b from-white to-blue-600 top-14 left-16 blur-xl rotate-90"
      />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-60 w-[150vw] h-[150vw] rounded-full scale-120 bg-linear-to-r from-blue-700 to-cyan-400 pt-3 overflow-hidden"
      >
         <Particles
        className="absolute inset-0 z-0"
        quantity={1111}
        color="#0062ff"
      />
        <div className="w-full h-full rounded-full bg-black"></div>
      </motion.div>
      <div className="w-full flex flex-col justify-center items-center pb-[10vh] z-10">
        {/* Heading */}
        <h2 className="max-w-5xl text-4xl md:text-6xl bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent mb-4 pb-2">
          Don't just build. Build to last.
        </h2>

        {/* Subheading */}
        <p className="text-lg text-gray-300 mb-8 z-10">
          We craft scalable, high-performance software that drives real results.
        </p>

        {/* Call to Action Button */}
        <button
          className="
           text-[#1a7ae1] hover:bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] hover:text-white font-semibold
          py-3 px-6 rounded-full
          transition-all duration-300 
          z-10 flex justify-center items-center gap-2 hover:gap-4 border-2 hover:border-black
        "
        >
          Start Your Project
          <span className="text-2xl">
            <IoIosArrowForward />
          </span>
        </button>
        {/* <div className="container absolute left-o bottom-0 h-[10vh] rounded-b-full bg-linear-to-t from-[#2052bd] via-[#207ebd] to-transparent"></div> */}
      </div>
    </div>
  );
};

export default FooterCTA;
