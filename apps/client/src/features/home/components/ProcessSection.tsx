"use client";

import { easeInOut, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const ProcessCard = ({ step, index }: { step: any; index: number }) => {
  const isBottomRow = index >= 2;
  const isEven = index % 2 === 0;
  const isAlignLeft = isEven !== isBottomRow;
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();

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
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const generateCardPath = (width: number, height: number, isEven: boolean) => {
    if (!width || !height) return "";
    
    const R = 32; 
    const CW = width > 400 ? 200 : 120; // Cutout width from edge
    const SW = 70; // S-curve width
    const NH = 35;  // Depth of the step
    const CS = 30;  
    
    const align = isEven ? 'left' : 'right';

    if (align === 'right') {
      const startTR = width - CW;
      const endTR = width - CW + SW;
      const startBL = CW - SW;
      const endBL = CW;

      return `
        M ${R} 0
        L ${startTR} 0
        C ${startTR + CS} 0, ${endTR - CS} ${NH}, ${endTR} ${NH}
        L ${width - R} ${NH}
        A ${R} ${R} 0 0 1 ${width} ${NH + R}
        L ${width} ${height - R}
        A ${R} ${R} 0 0 1 ${width - R} ${height}
        L ${endBL} ${height}
        C ${endBL - CS} ${height}, ${startBL + CS} ${height - NH}, ${startBL} ${height - NH}
        L ${R} ${height - NH}
        A ${R} ${R} 0 0 1 0 ${height - NH - R}
        L 0 ${R}
        A ${R} ${R} 0 0 1 ${R} 0
        Z
      `.replace(/\s+/g, ' ').trim();
    } else {
      const startTL = CW - SW;
      const endTL = CW;
      const startBR = width - CW;
      const endBR = width - CW + SW;

      return `
        M ${R} ${NH}
        L ${startTL} ${NH}
        C ${startTL + CS} ${NH}, ${endTL - CS} 0, ${endTL} 0
        L ${width - R} 0
        A ${R} ${R} 0 0 1 ${width} ${R}
        L ${width} ${height - NH - R}
        A ${R} ${R} 0 0 1 ${width - R} ${height - NH}
        L ${endBR} ${height - NH}
        C ${endBR - CS} ${height - NH}, ${startBR + CS} ${height}, ${startBR} ${height}
        L ${R} ${height}
        A ${R} ${R} 0 0 1 0 ${height - R}
        L 0 ${NH + R}
        A ${R} ${R} 0 0 1 ${R} ${NH}
        Z
      `.replace(/\s+/g, ' ').trim();
    }
  };

  const pathD_normal = generateCardPath(dimensions.width, dimensions.height, isAlignLeft);
  const pathD_hover = generateCardPath(dimensions.width, dimensions.height, !isAlignLeft);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: isMobile }}
      transition={{ duration: 0.3, ease: easeInOut }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={dimensions.width ? { clipPath: `url(#clip-process-${index})` } : { overflow: 'hidden', borderRadius: '2rem' }}
      className={`group relative text-white p-6 md:p-12 min-h-[14rem] md:h-56 lg:h-[260px] flex flex-col justify-center`}
    >
      {pathD_normal && pathD_hover && (
        <svg width="0" height="0" className="absolute pointer-events-none">
          <defs>
            <clipPath id={`clip-process-${index}`}>
              <motion.path 
                initial={false}
                animate={{ d: isHovered ? pathD_hover : pathD_normal }}
                transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
              />
            </clipPath>
          </defs>
        </svg>
      )}

      {pathD_normal && pathD_hover && (
        <svg width={dimensions.width} height={dimensions.height} className="absolute inset-0 pointer-events-none z-10" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
          <motion.path 
            initial={false}
            animate={{ d: isHovered ? pathD_hover : pathD_normal }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            fill="rgba(59, 130, 246, 0.05)" 
            stroke="#2b6deb" 
            strokeWidth="1.5" 
          />
        </svg>
      )}
      
      <div className="absolute inset-0 bg-[#2b6deb] group-hover:bg-blue-600 transition-colors duration-300 -z-10" />

      <div className="relative z-10 w-full h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: isMobile }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
          className={`w-full md:w-1/2 flex flex-col justify-center text-left mb-2 md:mb-0 ${isAlignLeft ? "md:ml-auto md:pl-6" : "md:mr-auto md:pr-6"}`}
        >
          <p className="text-xl md:text-xl lg:text-2xl font-bold mb-2 mt-2 md:mt-0">
            {step.title}
          </p>
          <p className="text-sm opacity-90 leading-relaxed font-medium">
            {step.desc}
          </p>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: isMobile }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`text-black font-bold leading-none tracking-tighter transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] absolute ${isAlignLeft ? "left-4" : "right-4"} -bottom-8 md:-bottom-14 lg:-bottom-16 text-[100px] sm:text-[120px] md:text-[180px] lg:text-[220px]`}
        >
          {step.number}
        </motion.h3>
      </div>
    </motion.div>
  );
};

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
      className="relative bg-black text-white py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Top Notched Border */}
      <div className="absolute top-0 left-0 w-full flex pointer-events-none z-20">
        <div className="flex-1 border-t-[1.5px] border-[#2b6deb]" />
        <svg width="480" height="60" viewBox="0 0 480 60" className="shrink-0 -mx-[0.5px]">
          <path 
            d="M 0 0.75 C 48 0.75, 72 56.75, 144 56.75 L 336 56.75 C 408 56.75, 432 0.75, 480 0.75" 
            fill="none" stroke="#2b6deb" strokeWidth="1.5" 
          />
        </svg>
        <div className="flex-1 border-t-[1.5px] border-[#2b6deb]" />
      </div>

      {/* Bottom Notched Border */}
      <div className="absolute bottom-0 left-0 w-full flex pointer-events-none z-20">
        <div className="flex-1 border-b-[1.5px] border-[#2b6deb]" />
        <svg width="480" height="60" viewBox="0 0 480 60" className="shrink-0 -mx-[0.5px]">
          <path 
            d="M 0 59.25 C 48 59.25, 72 3.25, 144 3.25 L 336 3.25 C 408 3.25, 432 59.25, 480 59.25" 
            fill="none" stroke="#2b6deb" strokeWidth="1.5" 
          />
        </svg>
        <div className="flex-1 border-b-[1.5px] border-[#2b6deb]" />
      </div>

      {/* linear accents */}
      <div className="absolute bottom-10 right-10 h-64 w-64 bg-linear-to-tr from-cyan-500 to-blue-400 opacity-20 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-6xl text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">
              Process
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            Every successful product starts with a process that blends
            creativity, technology, and collaboration. Here’s how we build
            world-class software.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <ProcessCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
