"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Smartphone, Cloud, Cpu, Palette } from "lucide-react";
import React from "react";

export default function ServiceSection() {
  const services = [
    {
      icon: <Code2 className="w-8 h-8 text-cyan-400" />,
      title: "Web Development",
      desc: "Building responsive, high-performance web apps with modern frameworks and clean architecture.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-blue-400" />,
      title: "Mobile App Development",
      desc: "Creating seamless iOS & Android experiences using native and cross-platform technologies.",
    },
    {
      icon: <Cloud className="w-8 h-8 text-sky-400" />,
      title: "Cloud Solutions",
      desc: "Designing and deploying scalable, secure cloud infrastructures for digital transformation.",
    },
    {
      icon: <Layers className="w-8 h-8 text-indigo-400" />,
      title: "UI/UX Design",
      desc: "Crafting human-centered designs with stunning visuals and frictionless usability.",
    },
    {
      icon: <Cpu className="w-8 h-8 text-purple-400" />,
      title: "AI & Automation",
      desc: "Integrating machine learning and intelligent automation to optimize business efficiency.",
    },
    {
      icon: <Palette className="w-8 h-8 text-teal-400" />,
      title: "Brand Identity",
      desc: "Designing cohesive digital identities that connect technology with creativity.",
    },
  ];

  return (
    <section id="services" className="relative bg-black py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0" />

      {/* Blur background accent */}
      <div className="absolute top-20 -left-20 h-64 w-64 bg-linear-to-tr from-blue-600 to-cyan-400 opacity-30 blur-3xl" />
      <div className="absolute bottom-10 -right-20 h-64 w-64 bg-linear-to-tr from-cyan-500 to-sky-400 opacity-30 blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-6xl text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
              Services
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            Empowering businesses with innovative digital solutions that merge design, development, and technology.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400 hover:shadow-cyan-500/10 shadow-md transition-all duration-500"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-white bg-linear-to-tr from-blue-600 to-cyan-400 bg-clip-text group-hover:text-transparent transition">
                {service.title}
              </h3>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
