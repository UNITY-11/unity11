import { motion } from "motion/react";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { ProjectCardProps } from "../types";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { useEffect, useRef, useState } from "react";

export function ProjectCard({
  tag1,
  tag2,
  title,
  description,
  image,
  bg,
  liveLink,
  index = 0,
  disableAnimation = false,
}: ProjectCardProps) {
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

  let normalizedLiveLink = liveLink;
  if (normalizedLiveLink && !/^https?:\/\//i.test(normalizedLiveLink)) {
    normalizedLiveLink = `https://${normalizedLiveLink}`;
  }

  const cardContent = (
    <motion.div
      ref={cardRef}
      initial={disableAnimation ? false : { y: "30%" }}
      whileInView={{ y: 0 }}
      viewport={{ once: isMobile }}
      transition={disableAnimation ? { duration: 0 } : { delay: (index ?? 0) * 0.3, duration: 1, ease: "easeOut" }}
      style={{
        ...(isGradient ? { background: bg } : {}),
        ...(dimensions.width
          ? { clipPath: `url(#clip-project-${index})` }
          : { overflow: "hidden", borderRadius: "2rem" }),
      }}
      className={`group ${isGradient ? "" : bg} w-full h-full shadow-sm flex flex-col justify-between z-40 relative`}
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
        {(tag1 || tag2) && (
          <div className="flex items-center gap-2 mb-2">
            {tag1 && (
              <span className="text-xs px-3 py-1.5 rounded-full text-white bg-white/40 backdrop-blur-3xl">
                {tag1}
              </span>
            )}
            {tag2 && (
              <span className="text-xs px-3 py-1.5 rounded-full text-white bg-white/40 backdrop-blur-3xl">
                {tag2}
              </span>
            )}
          </div>
        )}

        <h3 className="text-2xl font-semibold mb-2 text-white line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-100 line-clamp-3">{description}</p>
      </motion.div>

      <motion.div
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full aspect-video rounded-t-4xl overflow-hidden mt-auto"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-lg z-50 rounded-full flex items-center justify-center backdrop-blur-md bg-transparent">
          {(() => {
            const colorsMatch = bg.match(/(#[a-fA-F0-9]{3,8}|rgba?\([^)]+\))/g);
            const startColor = colorsMatch ? colorsMatch[0] : "#2052bd";
            const endColor = colorsMatch && colorsMatch.length > 1 ? colorsMatch[1] : startColor;
            return (
              <>
                <svg width="0" height="0" className="absolute">
                  <linearGradient id={`grad-card-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={startColor} />
                    <stop offset="100%" stopColor={endColor} />
                  </linearGradient>
                </svg>
                <style>{`#arrow-icon-${index} path { fill: url(#grad-card-${index}) !important; }`}</style>
                
                {/* Default white border */}
                <div className="absolute inset-0 rounded-full border border-white/30 group-hover:opacity-0 transition-opacity duration-300" />
                
                {/* Gradient border on hover */}
                <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="31" fill="none" stroke={`url(#grad-card-${index})`} strokeWidth="2" />
                </svg>

                <IoIosArrowForward className="text-4xl -rotate-45 text-white group-hover:opacity-0 absolute transition-opacity duration-300" />
                <IoIosArrowForward 
                  id={`arrow-icon-${index}`}
                  className="text-4xl -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute" 
                />
              </>
            );
          })()}
        </div>
      </motion.div>
    </motion.div>
  );

  if (normalizedLiveLink) {
    return (
      <a href={normalizedLiveLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
