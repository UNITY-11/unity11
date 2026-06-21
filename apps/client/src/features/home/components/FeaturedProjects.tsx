"use client";

import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { FeaturedProject } from "../types";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Project } from "@/features/projects/types";

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export default function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const featured = projects.slice(0, 4);

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-black">
      <div className="container mx-auto px-2 sm:px-4 lg:px-4 max-w-7xl">
        <motion.div
          initial={{ y: "30%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: isMobile }}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {featured.map((p, index) => (
            <ProjectCard key={p.id} index={index} {...p} />
          ))}
        </div>
        ) : (
          <p className="text-center text-gray-400">No projects available yet.</p>
        )}
      </div>

      <div className="mt-10 right-0 flex justify-center text-blue-500">
        <div className="flex justify-between items-center mx-5">
          <button className="w-10 h-10 rounded-full border-2 flex items-center justify-center">
            <IoIosArrowBack className="text-lg" />
          </button>
          <button
            onClick={() => router.push("/projects")}
            className="flex items-center rounded-full bg-linear-to-r px-20 py-2 text-[#2052bd] border-2 border-blue-500 shadow-lg transition-all gap-4 hover:gap-8 duration-500"
          >
            See More
          </button>
          <button className="w-10 h-10 rounded-full border-2 flex items-center justify-center">
            <IoIosArrowForward className="text-lg" />
          </button>
        </div>
      </div>
    </section>
  );
}

import { ProjectCard } from "@/features/projects/components/ProjectCard";
