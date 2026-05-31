"use client";

import { motion } from "motion/react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export const AboutHero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      <div className="absolute inset-0 w-full h-full">
        <BackgroundBeams />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6">
            We engineer the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 animate-gradient-x">
              future
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            We don&apos;t just write code. We build resilient, scalable IT solutions that empower businesses to lead in a digital-first world.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
    </section>
  );
};
