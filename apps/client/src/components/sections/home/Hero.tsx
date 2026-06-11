"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";

// --- Types & Constants (From Original Design) ---
interface Tab {
  id: string;
  label: string;
  isActive: boolean;
  description?: string;
}

const TABS: Tab[] = [
  { id: "01", label: "Web Development", isActive: true, description: "Full-cycle web and mobile application development" },
  { id: "02", label: "App Development", isActive: false, description: "Scalable infrastructure and DevOps automation" },
  { id: "03", label: "API Development", isActive: true, description: "Enterprise software architecture and integration" },
  { id: "04", label: "AI & Automation", isActive: false, description: "Machine learning integration and data engineering" },
];

const TECH_LABELS = [
  { name: "React / Next.js", description: "Modern Frontend" },
  { name: "TypeScript", description: "Type-Safe Code" },
  { name: "Node.js", description: "Backend Runtime" },
  { name: "AWS / Azure", description: "Cloud Infrastructure" },
  { name: "PostgreSQL", description: "Relational Database" },
  { name: "Docker & K8s", description: "Containerization" },
];

// --- Sub-Components ---
const TechPill = ({ label, index, offset }: { label: typeof TECH_LABELS[0]; index: number; offset: number }) => (
  <React.Fragment>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: offset + index * 0.1 }}
      className="group relative px-2 py-1 md:px-3 md:py-1.5 bg-transparent backdrop-blur-md rounded-full text-[10px] md:text-xs font-medium text-white shadow-sm hover:bg-blue-600/20 transition-colors cursor-pointer border border-white/10"
      title={label.description}
    >
      {label.name}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
        {label.description}
      </span>
    </motion.div>
    {index < 2 && <div className="hidden md:block w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-300/80 rounded-full" aria-hidden="true" />}
  </React.Fragment>
);

const VerticalPillar = ({ text, delay, gradientDirection }: { text: string; delay: number, gradientDirection: "to-t" | "to-b" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    className={cn(
      "flex w-full lg:w-12 md:lg:w-14 h-16 lg:h-full rounded-full flex-row lg:flex-col justify-between px-6 lg:px-0 py-0 lg:py-6 items-center shadow-lg transition-all cursor-pointer relative overflow-hidden shrink-0 group hover:shadow-xl",
      gradientDirection === "to-t"
        ? "bg-gradient-to-r lg:bg-gradient-to-t from-[#2052bd] to-[#7fcbe4]"
        : "bg-gradient-to-l lg:bg-gradient-to-b from-[#2052bd] to-[#7fcbe4]"
    )}
  >
    <div className="flex-1 flex items-center justify-start lg:justify-center relative w-full overflow-hidden ml-4 lg:ml-0">
      <div 
        className="text-white text-base md:text-xl font-medium tracking-wide transition-all pointer-events-none lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed] lg:-scale-y-100 lg:-scale-x-100"
      >
        {text}
      </div>
    </div>
  </motion.div>
);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black pt-32 pb-12 overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <BackgroundBeams />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-4 lg:px-8 flex flex-col gap-10 lg:gap-14">
        
        {/* --- 1. TOP TYPOGRAPHY SECTION --- */}
        <div className="flex flex-col xl:flex-row justify-between items-start gap-8">
          {/* Main Title - Original Content, Reduced Size */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-tr from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent font-medium leading-[1.1] uppercase tracking-tight font-sans">
              <span className="inline-flex items-center text-transparent">
                BUILD{" "}
                <span className="relative inline-block mx-2 text-white">
                  FUTURE
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="absolute -top-1 -right-3 text-blue-500">
                    <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
                  </svg>
                </span>
              </span>
              <br className="hidden sm:block" />
              <span className="inline-block text-transparent">PROOF SOFTWARE</span>
            </h1>
          </motion.div>
          
          {/* Side Paragraph */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="xl:max-w-xs flex flex-col items-end text-right gap-4"
          >
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              <strong className="text-white font-semibold">Clean Code, Modern Architecture:</strong> Illuminating your path to digital triumph by decoding complex architectural intricacies and scaling limits.
            </p>
          </motion.div>
        </div>

        {/* --- 2. MIDDLE BENTO ROW --- */}
        <div className="flex flex-col lg:flex-row h-auto lg:h-[300px] gap-4 w-full">
          
          {/* Card 01 - Wide Graphic Card (Original Image 1) */}
          <motion.article 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full lg:flex-[1.6] h-[280px] md:h-[350px] lg:h-full rounded-2xl md:rounded-3xl overflow-hidden bg-[url('/images/home/heroImg1.png')] bg-cover bg-center shadow-2xl shrink-0"
          >
            {/* Overlays (From Original) */}
            <div className="absolute inset-0 bg-gray-900/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
            
            {/* Floating Tags (Original Tech Pills) */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-1 md:gap-2 z-10">
               <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                  {TECH_LABELS.slice(0, 3).map((label, idx) => (
                    <TechPill key={label.name} label={label} index={idx} offset={0.3} />
                  ))}
               </div>
               <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                  {TECH_LABELS.slice(3).map((label, idx) => (
                    <TechPill key={label.name} label={label} index={idx} offset={0.6} />
                  ))}
               </div>
            </div>
            
            {/* Bottom Content (Original Rotating Icon) */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex items-center gap-1.5 md:gap-2 text-white/90 text-[10px] md:text-xs z-10">
              <motion.div
                className="w-6 h-6 rounded-full bg-blue-200/80 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }} 
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </motion.div>
              <span className="font-light">Clean Code, Modern Architecture</span>
            </div>
          </motion.article>

          {/* Pillars 02 & 03 (Original Tabs 1 & 2) */}
          <VerticalPillar text={TABS[0].label} delay={0.4} gradientDirection="to-t" />
          <VerticalPillar text={TABS[1].label} delay={0.5} gradientDirection="to-b" />

          {/* Card 04 - Call to Action Card (Original Image 2) */}
          <motion.article 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full lg:flex-[0.9] h-[280px] md:h-[350px] lg:h-full rounded-2xl md:rounded-3xl overflow-hidden shrink-0"
          >
             {/* Background layers (From Original) */}
             <div className="absolute inset-0 bg-white backdrop-blur-3xl border border-white/40 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-b from-blue-200/40 via-blue-100/20 to-white" />
             </div>

            <div className="relative h-full flex flex-col justify-between p-4 z-10 bg-[url('/images/home/heroImg2.jpg')] bg-cover bg-center">
              <div className="backdrop-blur-md border border-blue-500/20 p-4 md:p-6 rounded-2xl shadow-lg h-full flex flex-col justify-center relative">
                
                {/* Content (Original Text) */}
                <div className="flex w-full justify-center items-center text-center relative z-10">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide font-bold text-[#2052bd] uppercase"
                  >
                    Scalable Software Solutions
                  </motion.h1>
                </div>

              </div>
            </div>
          </motion.article>

          {/* Pillars 05 & 06 (Original Tabs 3 & 4) */}
          <VerticalPillar text={TABS[2].label} delay={0.6} gradientDirection="to-b" />
          <VerticalPillar text={TABS[3].label} delay={0.7} gradientDirection="to-t" />

        </div>

      </div>
      
      {/* --- Background Animation (Original SVG Path) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {isInView && (
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2052bd" stopOpacity="0.3">
                  <animate attributeName="stopOpacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#7fcbe4" stopOpacity="0.3">
                  <animate attributeName="stopOpacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <motion.path
              d="M0,200 Q200,100 400,200 T800,200 T1200,200"
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              style={{ willChange: "stroke-dasharray" }}
            />
            <motion.path
              d="M0,400 Q200,300 400,400 T800,400 T1200,400"
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              style={{ willChange: "stroke-dasharray" }}
            />
          </svg>
        )}
      </div>
    </section>
  );
};

export default Hero;
