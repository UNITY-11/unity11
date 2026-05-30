"use client";

import { motion } from "motion/react";

export function ServicesHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-24 text-center max-w-4xl mx-auto"
    >
      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
        End-to-End <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-cyan-400 to-teal-400">
          IT Solutions
        </span>
      </h1>
      <p className="text-xl text-gray-400 leading-relaxed">
        We provide a comprehensive suite of technology services designed to modernize 
        your operations, secure your assets, and accelerate your digital growth. 
        Explore our specialized offerings below.
      </p>
    </motion.div>
  );
}
