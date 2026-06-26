"use client";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/MagicUi/ScrollBasedVelocity";
import { motion } from "motion/react";
import { Code2, Layers, Smartphone, Cloud, Cpu, Palette } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useIsMobile } from "@/hooks/use-mobile";

import { CustomServiceCard } from "./CustomServiceCard";
import { MarqueeImageCard } from "./MarqueeImageCard";

export default function seServiceSection() {
  const isMobile = useIsMobile();
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
    <section id="services" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0" />

      {/* Blur background accent */}
      <div className="absolute top-50 -left-20 h-64 w-64 bg-linear-to-tr from-blue-600 to-cyan-400 opacity-30 blur-3xl" />
      <div className="absolute bottom-20 -right-20 h-64 w-64 bg-linear-to-tr from-cyan-500 to-sky-400 opacity-30 blur-3xl" />

      <div className="container mx-auto px-2 sm:px-4 lg:px-4 max-w-7xl relative z-10">
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

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <CustomServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-10">
        <ScrollVelocityContainer className="text-4xl md:text-8xl mt-12 md:mt-20 mb-5 bg-clip-text text-blue-500 z-10">
          <ScrollVelocityRow baseVelocity={1} direction={1} className="pb-2 flex items-center overflow-visible">
            {["Custom Software Development", "Mobile Apps", "Web Apps", "SaaS Platforms"].map((item, i) => (
              <React.Fragment key={i}>
                <span className="mx-6">{item}</span>
                <MarqueeImageCard src={`/images/blog/blog${(i % 3) + 1}.png`} alt="project" i={i} direction={1} />
              </React.Fragment>
            ))}
          </ScrollVelocityRow>

          <ScrollVelocityRow
            baseVelocity={1}
            direction={-1}
            className="text-white pb-2 mt-4 flex items-center overflow-visible"
          >
            {["UI/UX Design", "DevOps & Cloud", "API Development", "AI Integrations"].map((item, i) => (
              <React.Fragment key={i}>
                <span className="mx-6">{item}</span>
                <MarqueeImageCard src={`/images/blog/blog${(i % 3) + 1}.png`} alt="project" i={i} direction={-1} />
              </React.Fragment>
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>
    </section>
  );
}
