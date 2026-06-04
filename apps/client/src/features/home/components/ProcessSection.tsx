"use client";

import { easeInOut, motion } from "motion/react";
import React from "react";

export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      desc:
        "We understand your goals, analyze your market, and craft a solid roadmap for your digital product.",
    },
    {
      number: "02",
      title: "Design & Prototyping",
      desc:
        "Our design team turns ideas into interactive prototypes with modern UI and seamless UX flows.",
    },
    {
      number: "03",
      title: "Development & Integration",
      desc:
        "We build scalable, high-performance software using cutting-edge technologies and best practices.",
    },
    {
      number: "04",
      title: "Testing & Deployment",
      desc:
        "From QA to production, we ensure flawless performance and smooth deployment across all environments.",
    },
  ];

  return (
    <section
      id="process"
      className="relative bg-black text-white py-20 lg:py-28 overflow-hidden lg:pb-36"
    >
      {/* linear accents */}

      <div className="absolute top-10 left-10 h-64 w-64 bg-linear-to-tr from-blue-600 to-cyan-400 opacity-20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-64 w-64 bg-linear-to-tr from-cyan-500 to-blue-400 opacity-20 blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-6xl text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
              Process
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            Every successful product starts with a process that blends
            creativity, technology, and collaboration. Here’s how we build
            world-class software.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeInOut }}
              className={`group relative bg-blue-600 hover:bg-blue-500 text-white rounded-3xl md:rounded-4xl p-6 md:p-8 min-h-[16rem] md:h-64 lg:h-72 flex flex-col md:flex-row justify-between overflow-hidden transition-colors duration-300 ${
                index > 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="relative h-full w-full md:w-1/2">
                <motion.h3
                  initial={{ y: "50%" }}
                  whileInView={{ y: 0 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    delay: index * 0.05,
                    ease: easeInOut,
                  }}
                  className={`text-black absolute top-0 sm:top-6 md:top-8 group-hover:top-0 md:group-hover:top-2 transition-all duration-500 text-[100px] sm:text-[140px] md:text-[200px] lg:text-[250px] font-bold leading-none ${
                    index > 1 ? "-left-4 md:left-auto md:-right-6 lg:-right-8" : "-left-4 md:-left-6 lg:-left-8"
                  }`}
                >
                  {step.number}
                </motion.h3>
              </div>
              <motion.div
                initial={{ y: "-50%" }}
                whileInView={{ y: 0 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  delay: index * 0.05,
                  ease: easeInOut,
                }}
                className={`h-full w-full md:w-1/2 group-hover:-translate-y-2 transition-transform duration-500 text-white flex flex-col justify-start md:justify-end items-start text-left relative z-10 pt-16 md:pt-0 ${
                  index > 1 ? "md:text-right md:items-end" : ""
                }`}
              >
                <p className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
                  {step.title}
                </p>
                <p className="text-sm md:text-base font-medium opacity-90 max-w-sm">
                  {step.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
