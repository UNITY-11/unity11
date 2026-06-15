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
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeInOut }}
              className={`group relative bg-[#2b6deb] hover:bg-blue-600 text-white rounded-3xl md:rounded-4xl p-6 md:p-12 min-h-[14rem] md:h-56 lg:h-[260px] flex flex-col justify-between md:justify-center overflow-hidden transition-colors duration-300`}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                className={`relative z-10 w-full md:w-1/2 flex flex-col justify-center text-left mb-2 md:mb-0 ${isEven ? "md:ml-auto md:pl-6" : "md:mr-auto md:pr-6"}`}
              >
                <p className="text-xl md:text-xl lg:text-2xl font-bold mb-2 mt-2 md:mt-0">
                  {step.title}
                </p>
                <p className="text-sm opacity-90 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`text-black font-bold leading-none tracking-tighter transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isEven ? "self-start md:left-4" : "self-end md:right-4"} md:absolute md:-bottom-14 lg:-bottom-16 md:group-hover:-translate-y-12 lg:group-hover:-translate-y-16 text-[100px] sm:text-[120px] md:text-[180px] lg:text-[220px] -mb-4 md:mb-0`}
              >
                {step.number}
              </motion.h3>
            </motion.div>
          )})}
        </div>
      </div>
    </section>
  );
}
