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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
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

function ProjectCard({
  tag1,
  tag2,
  title,
  description,
  image,
  bg,
  index,
}: FeaturedProject) {
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isGradient = bg.startsWith("linear-gradient");

  useEffect(() => {
    const updateSize = () => {
      if (cardRef.current) {
        setDimensions({
          width: cardRef.current.offsetWidth,
          height: cardRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  const generateCardPath = (width: number, height: number) => {
    if (!width || !height) return "";
    const R = 32;

    let CW = width > 400 ? 200 : 120;
    let SW = width > 400 ? 70 : 50;
    const NH = 35;
    let CS = 30;

    if (width < CW + R + 20) {
      CW = width - R - 20;
      SW = Math.max(CW - 30, 20);
      CS = SW * 0.45;
    }

    const cx = width / 2;
    const NW = width > 400 ? 180 : 140;
    const N_SW = width > 400 ? 50 : 40;
    const N_CS = N_SW * 0.5;
    const N_Depth = 20;

    return `
      M ${R} 0
      L ${width - CW} 0
      C ${width - CW + CS} 0, ${width - CW + SW - CS} ${NH}, ${width - CW + SW} ${NH}
      L ${width - R} ${NH}
      A ${R} ${R} 0 0 1 ${width} ${NH + R}
      L ${width} ${height - R}
      A ${R} ${R} 0 0 1 ${width - R} ${height}
      L ${cx + NW/2} ${height}
      C ${cx + NW/2 - N_CS} ${height}, ${cx + NW/2 - N_SW + N_CS} ${height - N_Depth}, ${cx + NW/2 - N_SW} ${height - N_Depth}
      L ${cx - NW/2 + N_SW} ${height - N_Depth}
      C ${cx - NW/2 + N_SW - N_CS} ${height - N_Depth}, ${cx - NW/2 + N_CS} ${height}, ${cx - NW/2} ${height}
      L ${R} ${height}
      A ${R} ${R} 0 0 1 0 ${height - R}
      L 0 ${R}
      A ${R} ${R} 0 0 1 ${R} 0
      Z
    `.replace(/\s+/g, " ").trim();
  };

  const pathD = generateCardPath(dimensions.width, dimensions.height);

  return (
    <motion.div
      ref={cardRef}
      initial={{ y: "30%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: isMobile }}
      transition={{ delay: (index ?? 0) * 0.3, duration: 1, ease: "easeOut" }}
      style={{
        ...(isGradient ? { background: bg } : {}),
        ...(dimensions.width
          ? { clipPath: `url(#clip-project-${index})` }
          : { overflow: "hidden", borderRadius: "2rem" }),
      }}
      className={`group ${isGradient ? "" : bg} w-full shadow-sm flex flex-col justify-between z-40 relative`}
    >
      {pathD && (
        <svg width="0" height="0" className="absolute pointer-events-none">
          <defs>
            <clipPath id={`clip-project-${index}`}>
              <path d={pathD} />
            </clipPath>
          </defs>
        </svg>
      )}
      <motion.div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs bg- px-3 py-1.5 rounded-full  text-white bg-white/40 backdrop-blur-3xl">
            {tag1}
          </span>
          <span className="text-xs bg- px-3 py-1.5 rounded-full  text-white bg-white/40 backdrop-blur-3xl">
            {tag2}
          </span>
        </div>

        <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-sm text-gray-100">{description}</p>
      </motion.div>

      <motion.div
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full h-[200px] rounded-t-4xl overflow-hidden"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-all duration-500"
        />
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white hover:bg-white hover:text-black opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg z-50">
          <IoIosArrowForward className="text-4xl -rotate-45" />
        </button>
      </motion.div>
    </motion.div>
  );
}
