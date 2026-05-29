"use client";

import Image from "next/image";
import { motion } from "motion/react";
import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 lg:py-48 overflow-hidden bg-[#030712] flex items-center justify-center">
      {/* Huge Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[22vw] font-bold text-white/[0.03] leading-none tracking-tighter"
        >
          UNITY
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-8 text-center max-w-5xl">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white/90 tracking-tight leading-tight md:leading-[1.2]"
        >
          We&apos;re Unity. We develop custom{" "}
          <span className="inline-block align-middle mx-2 overflow-hidden rounded-full w-20 sm:w-24 md:w-28 h-10 sm:h-12 md:h-14 relative top-[-4px] shadow-lg shadow-cyan-500/20">
            <Image 
              src="/images/home/heroImg2.jpg" 
              alt="AI Solutions"
              fill
              className="object-cover"
            />
          </span>{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
            AI solutions
          </span>{" "}
          for innovative companies.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-14 flex justify-center"
        >
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
          >
            Get in touch
            <div className="absolute bottom-0 left-1/2 h-[2px] w-1/3 -translate-x-1/2 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-50 group-hover:opacity-100 group-hover:w-1/2 transition-all duration-300" />
          </a>
        </motion.div>
      </div>
      
      {/* Subtle glowing accents */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />
    </section>
  );
}
