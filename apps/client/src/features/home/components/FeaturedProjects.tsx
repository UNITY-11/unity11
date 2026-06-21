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
    // Show 1 item on mobile, 4 on desktop
    const visibleCount = Math.min(isMobile ? 1 : 4, projects.length);
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

          <div className="flex justify-between items-end">
            <h2 className="text-[40px] md:text-[52px] leading-none mt-3 text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4] pb-2">
              Engineering Real-World
              <br /> Digital Impact
            </h2>
          </div>
        </motion.div>

        {featured.length > 0 ? (
          <div className="relative p-4 -m-4 w-full">
            <motion.div 
              layout
              className="flex justify-center md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full"
            >
              <AnimatePresence mode="popLayout">
                {featured.map((p, index) => (
                  <motion.div 
                    layout
                    key={p.id}
                    initial={hasInteracted ? { opacity: 0, x: direction * 50, scale: 0.95 } : false}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={hasInteracted ? { opacity: 0, x: direction * -50, scale: 0.95 } : undefined}
                    className="w-[90vw] sm:w-[350px] md:w-auto shrink-0 md:shrink"
                  >
                    <ProjectCard index={index} disableAnimation={hasInteracted} {...p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        ) : (
          <p className="text-center text-gray-400">No projects available yet.</p>
        )}
      </div>

      <div className="mt-10 right-0 flex justify-center text-blue-500">
        <div className="flex justify-between items-center mx-5">
          <button onClick={handlePrev} className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
            <IoIosArrowBack className="text-lg" />
          </button>
          <button
            onClick={() => router.push("/projects")}
            className="flex items-center rounded-full bg-linear-to-r px-20 py-2 text-[#2052bd] border-2 border-blue-500 shadow-lg transition-all gap-4 hover:gap-8 duration-500 mx-4"
          >
            See More
          </button>
          <button onClick={handleNext} className="w-10 h-10 rounded-full border-2 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all">
            <IoIosArrowForward className="text-lg" />
          </button>
        </div>
      </div>
    </section>
  );
}

import { ProjectCard } from "@/features/projects/components/ProjectCard";
