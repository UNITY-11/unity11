"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import React, { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const ScrollWord = ({ children, progress, range }: { children: React.ReactNode, progress: MotionValue<number>, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }} className="inline-block">{children}</motion.span>;
};

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center 30%"],
  });

  // Parallax effect for the massive background text
  const yText = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.04, 0]);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden flex flex-col items-center justify-center bg-transparent"
    >
      {/* Massive Parallax Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.h1 
          style={{ y: yText, opacity: opacityText }}
          className="text-[26vw] font-black leading-none tracking-tighter text-white whitespace-nowrap"
        >
          UNITY
        </motion.h1>
      </div>

      <div className="container relative z-10 mx-auto px-2 sm:px-4 lg:px-4 text-center max-w-5xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.3] md:leading-[1.3] flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 gap-y-2">
          <ScrollWord progress={scrollYProgress} range={[0.0, 0.15]}>
            <span className="text-white/60">We&apos;re Unity.</span>
          </ScrollWord>
          <ScrollWord progress={scrollYProgress} range={[0.15, 0.3]}>
            We develop custom
          </ScrollWord>
          
          <motion.span 
            style={{ 
              opacity: useTransform(scrollYProgress, [0.3, 0.45], [0, 1]),
              scale: useTransform(scrollYProgress, [0.3, 0.45], [0.8, 1])
            }}
            className="inline-flex items-center justify-center align-middle overflow-hidden rounded-full w-20 sm:w-24 md:w-32 h-9 sm:h-11 md:h-[3.5rem] relative shadow-2xl border border-white/10 group cursor-pointer"
          >
            <Image 
              src="/images/home/heroImg2.jpg" 
              alt="AI Solutions"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-transparent transition-colors duration-500 mix-blend-overlay" />
          </motion.span>
          
          <ScrollWord progress={scrollYProgress} range={[0.45, 0.6]}>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-cyan-300 to-white">
              AI solutions
            </span>
          </ScrollWord>
          
          <ScrollWord progress={scrollYProgress} range={[0.6, 0.75]}>
            for innovative
          </ScrollWord>
          <ScrollWord progress={scrollYProgress} range={[0.75, 0.9]}>
            companies.
          </ScrollWord>
        </h2>

        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1]) }}
          className="mt-12 md:mt-20 flex flex-col items-center gap-6"
        >
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm md:text-base font-medium text-white backdrop-blur-xl transition-all duration-500 hover:bg-white/10 hover:border-white/40 hover:scale-105 overflow-hidden shadow-[0_0_40px_-10px_rgba(34,211,238,0.15)] hover:shadow-[0_0_60px_-15px_rgba(34,211,238,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get in touch
              <FiArrowUpRight className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
            <div className="absolute inset-0 z-0 bg-linear-to-r from-blue-600/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </a>
          
          <p className="text-sm text-white/40 max-w-sm tracking-wide font-light">
            Empowering startups and enterprises through human-centered technology.
          </p>
        </motion.div>
      </div>
      
      {/* Ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-[40rem] w-[40rem] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
    </section>
  );
}
