"use client";

import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { motion } from "motion/react";
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
        initial={{ y: "100%", x: "100%", opacity: 0 }}
        whileInView={{ y: 0, x: -20, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 3, ease: "easeOut" }}
        className="absolute w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-yellow-200 via-orange-400 to-orange-600 sm:top-14 left-1/2 -translate-x-1/2 md:left-32 md:-translate-x-0 blur-2xl opacity-90"
      />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute md:top-60 w-[150vw] h-[150vw] rounded-full scale-120 bg-linear-to-r from-blue-700 to-cyan-400 pt-3 overflow-hidden"
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
        <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Ready to transform your ideas into reality? Let&apos;s build something extraordinary together.
        </p>

        {/* Call to Action Button */}
        <a
          href="https://wa.me/9846200211"
          target="_blank"
          rel="noopener noreferrer"
          style={{ clipPath: "path('M 12 0 L 80 0 C 84 0, 86 6, 92 6 L 108 6 C 114 6, 116 0, 120 0 L 188 0 A 12 12 0 0 1 200 12 L 200 36 A 12 12 0 0 1 188 48 L 120 48 C 116 48, 114 42, 108 42 L 92 42 C 86 42, 84 48, 80 48 L 12 48 A 12 12 0 0 1 0 36 L 0 12 A 12 12 0 0 1 12 0 Z')" }}
          className="group relative inline-flex h-12 w-[200px] z-10 items-center bg-black transition-transform shadow-md"
        >
          <svg className="absolute inset-0 pointer-events-none z-20" width="200" height="48" viewBox="0 0 200 48">
            <path d="M 12 0 L 80 0 C 84 0, 86 6, 92 6 L 108 6 C 114 6, 116 0, 120 0 L 188 0 A 12 12 0 0 1 200 12 L 200 36 A 12 12 0 0 1 188 48 L 120 48 C 116 48, 114 42, 108 42 L 92 42 C 86 42, 84 48, 80 48 L 12 48 A 12 12 0 0 1 0 36 L 0 12 A 12 12 0 0 1 12 0 Z" fill="none" stroke="#2b6deb" strokeWidth="2" />
          </svg>

          <div className="flex h-full w-[80%] relative z-10 items-center justify-center rounded-xl bg-transparent group-hover:bg-[#2b6deb] transition-all duration-500 ease-in-out group-hover:w-full">
            <span className="text-[#2b6deb] group-hover:text-white transition-colors duration-500 text-sm sm:text-base font-bold tracking-tight whitespace-nowrap">
              Start Your Project
            </span>
          </div>

          <div className="flex h-full w-[20%] relative z-10 items-center justify-center text-[#2b6deb] overflow-hidden transition-all duration-300 ease-in-out group-hover:w-0 group-hover:opacity-0">
            <IoIosArrowForward className="h-5 w-5 flex-shrink-0" />
          </div>
        </a>
        {/* <div className="container absolute left-o bottom-0 h-[10vh] rounded-b-full bg-linear-to-t from-[#2052bd] via-[#207ebd] to-transparent"></div> */}
      </div>
    </div>
  );
};

export default FooterCTA;
