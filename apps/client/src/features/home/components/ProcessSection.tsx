"use client";

import { easeInOut, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

const ProcessCard = ({ step, index }: { step: any; index: number }) => {
  const isEven = index % 2 === 0;
  const isBottom = index >= 2;
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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

  const generateCardPath = (width: number, height: number, isEven: boolean, isBottom: boolean) => {
    if (!width || !height) return "";
    
    const R = 32; 
    const CW = width > 400 ? 200 : 120; // Cutout width from edge
    const SW = 70; // S-curve width
    const NH = 35;  // Depth of the step
    const CS = 30;  
    
    const align = isEven ? 'left' : 'right';

    if (!isBottom) {
      if (align === 'right') {
        const startS = width - CW;
        const endS = width - CW + SW;
        
        return `
          M ${R} 0
          L ${startS} 0
          C ${startS + CS} 0, ${endS - CS} ${NH}, ${endS} ${NH}
          L ${width - R} ${NH}
          A ${R} ${R} 0 0 1 ${width} ${NH + R}
          L ${width} ${height - R}
          A ${R} ${R} 0 0 1 ${width - R} ${height}
          L ${R} ${height}
          A ${R} ${R} 0 0 1 0 ${height - R}
          L 0 ${R}
          A ${R} ${R} 0 0 1 ${R} 0
          Z
        `.replace(/\s+/g, ' ').trim();
      } else {
        const startS = CW - SW;
        const endS = CW;

        return `
          M ${R} ${NH}
          L ${startS} ${NH}
          C ${startS + CS} ${NH}, ${endS - CS} 0, ${endS} 0
          L ${width - R} 0
          A ${R} ${R} 0 0 1 ${width} ${R}
          L ${width} ${height - R}
          A ${R} ${R} 0 0 1 ${width - R} ${height}
          L ${R} ${height}
          A ${R} ${R} 0 0 1 0 ${height - R}
          L 0 ${NH + R}
          A ${R} ${R} 0 0 1 ${R} ${NH}
          Z
        `.replace(/\s+/g, ' ').trim();
      }
    } else {
      if (align === 'right') {
        const startS = width - CW;
        const endS = width - CW + SW;
        return `
          M ${R} 0
          L ${width - R} 0
          A ${R} ${R} 0 0 1 ${width} ${R}
          L ${width} ${height - NH - R}
          A ${R} ${R} 0 0 1 ${width - R} ${height - NH}
          L ${endS} ${height - NH}
          C ${endS - CS} ${height - NH}, ${startS + CS} ${height}, ${startS} ${height}
          L ${R} ${height}
          A ${R} ${R} 0 0 1 0 ${height - R}
          L 0 ${R}
          A ${R} ${R} 0 0 1 ${R} 0
          Z
        `.replace(/\s+/g, ' ').trim();
      } else {
        const startS = CW - SW;
        const endS = CW;
        return `
          M ${R} 0
          L ${width - R} 0
          A ${R} ${R} 0 0 1 ${width} ${R}
          L ${width} ${height - R}
          A ${R} ${R} 0 0 1 ${width - R} ${height}
          L ${endS} ${height}
          C ${endS - CS} ${height}, ${startS + CS} ${height - NH}, ${startS} ${height - NH}
          L ${R} ${height - NH}
          A ${R} ${R} 0 0 1 0 ${height - NH - R}
          L 0 ${R}
          A ${R} ${R} 0 0 1 ${R} 0
          Z
        `.replace(/\s+/g, ' ').trim();
      }
    }
  };

  const pathD = generateCardPath(dimensions.width, dimensions.height, isEven, isBottom);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: easeInOut }}
      style={dimensions.width ? { clipPath: `url(#clip-process-${index})` } : { overflow: 'hidden', borderRadius: '2rem' }}
      className={`group relative text-white p-6 md:p-12 min-h-[14rem] md:h-56 lg:h-[260px] flex flex-col justify-between md:justify-center`}
    >
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id={`clip-process-${index}`}>
            <path d={pathD} />
          </clipPath>
        </defs>
      </svg>
      
      <div className="absolute inset-0 bg-[#2b6deb] group-hover:bg-blue-600 transition-colors duration-300 -z-10" />

      <div className="relative z-10 w-full h-full flex flex-col justify-between md:justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
          className={`w-full md:w-1/2 flex flex-col justify-center text-left mb-2 md:mb-0 ${isEven ? "md:ml-auto md:pl-6" : "md:mr-auto md:pr-6"}`}
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
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`text-black font-bold leading-none tracking-tighter transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isEven ? "self-start md:left-4" : "self-end md:right-4"} md:absolute ${isBottom ? "md:-top-10 lg:-top-12 md:group-hover:translate-y-8 lg:group-hover:translate-y-10" : "md:-bottom-14 lg:-bottom-16 md:group-hover:-translate-y-12 lg:group-hover:-translate-y-16"} text-[100px] sm:text-[120px] md:text-[180px] lg:text-[220px] -mb-4 md:mb-0`}
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
      className="relative bg-black text-white py-20 lg:py-28 overflow-hidden lg:pb-36"
    >
      {/* linear accents */}
      <div className="absolute bottom-10 right-10 h-64 w-64 bg-linear-to-tr from-cyan-500 to-blue-400 opacity-20 blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <ProcessCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
