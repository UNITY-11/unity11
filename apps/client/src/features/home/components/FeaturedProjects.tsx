"use client";

import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { FeaturedProject } from "../types";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Project } from "@/features/projects/types";

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export default function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [startIndex, setStartIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [direction, setDirection] = useState(1);

  const getVisibleProjects = () => {
    if (projects.length === 0) return [];
    // Always render 4 items so mobile can swipe through them natively
    const visibleCount = Math.min(4, projects.length);
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(projects[(startIndex + i) % projects.length]);
    }
    return visible;
  };

  const featured = getVisibleProjects();

  const handleNext = () => {
    if (projects.length === 0) return;
    setHasInteracted(true);
    setDirection(1);
    setStartIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    if (projects.length === 0) return;
    setHasInteracted(true);
    setDirection(-1);
    setStartIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-black">
      <div className="container mx-auto px-2 sm:px-4 lg:px-4 max-w-7xl">
        <motion.div
          initial={{ y: "30%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12 md:mb-16 lg:mb-20 flex flex-col justify-center items-center text-center"
        >
          <p className="text-xs tracking-wider text-blue-500">
            FEATURED PROJECTS
          </p>

          <div className="flex justify-between items-end max-w-xl">
            <h2 className="text-[30px] md:text-[52px] leading-none mt-3 text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4] pb-2">
              Engineering Real World
              Digital Impact
            </h2>
          </div>
        </motion.div>

        {featured.length > 0 ? (
          <div className="relative p-4 w-full">
            <motion.div
              layout
              className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-[5vw] sm:px-0"
            >
              <AnimatePresence mode="popLayout">
                {featured.map((p, index) => (
                  <motion.div
                    layout
                    key={p.id}
                    initial={hasInteracted ? { opacity: 0, x: direction * 50, scale: 0.95 } : { opacity: 0, y: 30 }}
                    animate={hasInteracted ? { opacity: 1, x: 0, scale: 1 } : undefined}
                    whileInView={!hasInteracted ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    exit={hasInteracted ? { opacity: 0, x: direction * -50, scale: 0.95 } : undefined}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-[90vw] sm:w-[350px] md:w-auto shrink-0 md:shrink snap-center"
                  >
                    <ProjectCard index={index} disableAnimation={true} {...p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          <p className="text-center text-gray-400">No projects available yet.</p>
        )}
      </div>

      <div className="mt-14 right-0 flex justify-center text-blue-500">
        <div className="flex justify-center items-center gap-4">
          <button 
            onClick={handlePrev} 
            className="group relative flex items-center justify-center w-10 h-10 text-[#0062ff] transition-colors duration-300"
          >
            <svg className="absolute inset-0 z-0" width="40" height="40" viewBox="0 0 40 40">
              <path 
                d="M 1 1 L 27 1 L 39 13 L 39 39 L 13 39 L 1 27 Z" 
                className="fill-transparent stroke-current group-hover:fill-current transition-colors duration-300" 
                strokeWidth="2" 
              />
            </svg>
            <IoIosArrowBack className="relative z-10 text-lg transition-colors duration-300 group-hover:text-white" />
          </button>

          <button
            onClick={() => router.push("/projects")}
            className="group relative flex items-center justify-center w-56 h-10 text-[#0062ff] transition-colors duration-300"
          >
            <svg className="absolute inset-0 z-0" width="224" height="40" viewBox="0 0 224 40">
              <path 
                d="M 17 1 L 223 1 L 223 23 L 207 39 L 1 39 L 1 17 Z" 
                className="fill-transparent stroke-current group-hover:fill-current transition-colors duration-300" 
                strokeWidth="2" 
              />
            </svg>
            <span className="relative z-10 font-semibold tracking-wide transition-colors duration-300 group-hover:text-white">
              See More
            </span>
          </button>

          <button 
            onClick={handleNext} 
            className="group relative flex items-center justify-center w-10 h-10 text-[#0062ff] transition-colors duration-300"
          >
            <svg className="absolute inset-0 z-0" width="40" height="40" viewBox="0 0 40 40">
              <path 
                d="M 13 1 L 39 1 L 39 27 L 27 39 L 1 39 L 1 13 Z" 
                className="fill-transparent stroke-current group-hover:fill-current transition-colors duration-300" 
                strokeWidth="2" 
              />
            </svg>
            <IoIosArrowForward className="relative z-10 text-lg transition-colors duration-300 group-hover:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}

import { ProjectCard } from "@/features/projects/components/ProjectCard";
