"use client";

import { ParticleIcon } from "@/components/ui/ParticleIcon";
import { Particles } from "@/components/ui/MagicUi/Particles";
import { motion } from "motion/react";
import {
  CodeSquare,
  ShieldCheck,
  Award,
  Rocket,
  ClipboardCheck,
  Infinity,
  LucideIcon,
} from "lucide-react";
import React from "react";

import { Reason, ReasonItemProps } from "../types";
import { useIsMobile } from "@/hooks/use-mobile";

const ReasonItem: React.FC<ReasonItemProps> = ({ item, index }) => {
  const isImageLeft = index % 2 === 0;
  const isMobile = useIsMobile();

  const textAnimation = (index: number) => ({
    initial: {opacity: 0, y:50, x: index % 2 === 0 ? 30 : -30 },
    whileInView: { opacity: 1, y:0, x: 0 },
    transition: { duration: 1 },
  });

  const imageAnimation = (index: number) => ({
    initial: { opacity: 0, y:50, x: index % 2 === 0 ? -30 : 30 },
    whileInView: { opacity: 1, y:0, x: 0 },
    transition: { duration: 1 },
  });

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
        isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <motion.div
        {...imageAnimation(index)}
        viewport={{ once: true }}
        className="w-full md:w-1/2 p-4 flex justify-center relative group"
      >
        <div className="relative w-full max-w-sm aspect-square flex items-center justify-center cursor-crosshair">
          <ParticleIcon 
            icon={item.icon} 
            size={item.title === "Long-Term Partnership" ? 360 : 300} 
            color="#3b82f6" 
          />
        </div>
      </motion.div>

      <motion.div {...textAnimation(index)} viewport={{ once: true }} className="w-full md:w-1/2 md:p-8">
        <div className="flex items-center justify-center text-center mb-4">
          <h3 className="text-3xl md:text-5xl text-transparent text-nowrap pb-2 bg-clip-text bg-linear-to-r from-blue-700 to-cyan-500 text-center">
            {item.title}
          </h3>
        </div>
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-slate-300 text-center">
          {item.desc}
        </p>
      </motion.div>
    </div>
  );
};

export default function WhyChooseUs() {
  const isMobile = useIsMobile();
  const reasons: Reason[] = [
    {
      icon: CodeSquare,
      img: "images/why/fundamentals.png",
      title: "Core Engineering",
      desc:
        "We build upon solid computer science fundamentals to architect robust, highly optimized, and maintainable solutions.",
    },
    {
      icon: ShieldCheck,
      img: "images/why/security.png",
      title: "Enterprise Security",
      desc:
        "Security is woven into our development lifecycle. We build fortified architectures designed to protect your most critical data.",
    },
    {
      icon: Award,
      img: "images/why/experts.png",
      title: "Senior Expertise",
      desc:
        "Collaborate directly with battle-tested senior engineers who bring years of specialized domain experience to your project.",
    },
    {
      icon: Rocket,
      img: "images/why/fast.png",
      title: "Agile Delivery",
      desc:
        "We move with startup agility while strictly maintaining code quality, ensuring your systems scale effortlessly from day one.",
    },
    {
      icon: ClipboardCheck,
      img: "images/why/transparent.png",
      title: "Full Transparency",
      desc:
        "No black boxes. We provide clear communication, comprehensive documentation, and complete visibility into our entire process.",
    },
    {
      icon: Infinity,
      img: "images/why/connect.png",
      title: "Long-Term Partnership",
      desc:
        "We don’t just finish projects — we build relationships that last through growth and evolution.",
    },
  ];

  return (
    <section id="why-choose-us" className="relative py-16 md:py-24 lg:py-32 overflow-clip">
      
      {/* Background Curved Border (Rendered first so it sits behind particles and text) */}
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-[340px] sm:top-72 md:top-60 left-1/2 -translate-x-1/2 w-[200vw] md:w-[150vw] h-[200vw] md:h-[150vw] rounded-full scale-120 bg-linear-to-r from-blue-700 to-cyan-400 pt-3 z-0 pointer-events-none"
      >
        <div className="w-full h-full rounded-full bg-black"></div>
      </motion.div>
      
      {/* Sticky Background Particles for the entire section */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Particles 
            className="absolute inset-0" 
            quantity={300}
            color="#0062ff"
            colors={["#0062ff", "#0062ff", "#0062ff", "#0062ff", "#0062ff", "#0062ff", "#06b6d4", "#06b6d4", "#ffffff"]}
            ease={15}
            staticity={20} 
          />
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 lg:px-4 max-w-7xl relative z-10 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-6xl text-white">
            Why{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
              Choose Us
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            We're not just another software company — we're your growth partner,
            driven by technology, design, and results.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-24 mb-12 md:mb-20 relative z-10">
          {reasons.map((item, index) => (
            <ReasonItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
