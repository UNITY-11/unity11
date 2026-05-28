"use client";

import { easeInOut, motion } from "framer-motion";
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
      className="relative bg-blue-700 text-white py-20 lg:py-28 overflow-hidden lg:pb-36"
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
            <span>
              Process
            </span>
          </h2>
          <p className="mt-4 text-slate-100 text-lg max-w-2xl mx-auto">
            Every successful product starts with a process that blends
            creativity, technology, and collaboration. Here’s how we build
            world-class software.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: easeInOut }}
              className={`group relative bg-linear-to-b from-white to-transparent hover:to-white text-blue-700 rounded-4xl p-8 h-52 flex justify-between overflow-hidden transition-colors duration-300 ${
                index > 1 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="relative h-full w-full ">
                <motion.h3
                  initial={{ y: "50%" }}
                  whileInView={{ y: 0 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    delay: index * 0.05,
                    ease: easeInOut,
                  }}
                  className={`text-blue-700 absolute -top-8 group-hover:-top-16 transition-all duration-500  text-[90px] sm:text-[250px] ${
                    index > 1 ? "-right-6" : "-left-6"
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
                className="h-full w-full group-hover:mt-6 transition-all duration-500 text-blue-600"
              >
                <p className="text-base sm:text-xl font-semibold">
                  {step.title}
                </p>
                <p className="text-sm mt-3 max-w-xs">{step.desc}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
