"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Smartphone, Cloud, Cpu, Palette } from "lucide-react";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function seServiceSection() {
  const services = [
    {
      icon: <Layers />,
      title: "UI/UX Design",
      desc:
        "Crafting human-centered designs with stunning visuals and frictionless usability.",
      imageUrl: "images/service/ui.png",
    },
    {
      icon: <Code2 />,
      title: "Web Development",
      desc:
        "Building responsive, high-performance web apps with modern frameworks and clean architecture.",
      imageUrl: "images/service/website.png",
    },
    {
      icon: <Smartphone />,
      title: "Mobile App Development",
      desc:
        "Creating seamless iOS & Android experiences using native and cross-platform technologies.",
      imageUrl: "images/service/mobile.png",
    },
    {
      icon: <Cloud />,
      title: "Cloud Solutions",
      desc:
        "Designing and deploying scalable, secure cloud infrastructures for digital transformation.",
      imageUrl: "images/service/cloud.png",
    },
    {
      icon: <Cpu />,
      title: "AI & Automation",
      desc:
        "Integrating machine learning and intelligent automation to optimize business efficiency.",
      imageUrl: "images/service/aiml.png",
    },
    {
      icon: <Palette />,
      title: "Brand Identity",
      desc:
        "Designing cohesive digital identities that connect technology with creativity.",
      imageUrl: "images/service/branding.png",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0" />

      {/* Blur background accent */}
      <div className="absolute top-50 -left-20 h-64 w-64 bg-linear-to-tr from-blue-600 to-cyan-400 opacity-30 blur-3xl" />
      <div className="absolute bottom-20 -right-20 h-64 w-64 bg-linear-to-tr from-cyan-500 to-sky-400 opacity-30 blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-7xl text-[#2052bd]">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
              Services
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            Empowering businesses with innovative digital solutions that merge
            design, development, and technology.
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
              className="relative group rounded-4xl overflow-hidden border-4 border-blue-100 shadow-2xl transition-all duration-500 p-1"
            >
              {/* 1. Background Image */}
              <img
                src={service.imageUrl}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-100 scale-110"
              />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="h-full flex flex-col justify-between bg-blue-500/60 mt-30 rounded-4xl p-4 backdrop-blur-md">
                  {/* Top content wrapper (Title & Desc) */}
                  <div className="w-70">
                    <h3 className="text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-white text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                   <div className="absolute top-6 right-6 rounded-full p-3 bg-white/20 backdrop-blur-xs text-white">
                    {service.icon}
                  </div>
                  {/* Bottom content wrapper (Icon & Button) */}
                  <div className="mt-6">
                    {/* Button (like 'Check Availability') */}
                    <button className="flex justify-center items-center gap-2 hover:gap-4 px-4 py-2 text-sm text-blue-400 bg-white backdrop-blur-2xl rounded-full font-medium transition-all duration-300 focus:ring-offset-black/50">
                      Learn More <IoIosArrowForward className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
