"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { useIsMobile } from "@/hooks/use-mobile";

import { Tab } from "../types";

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
      className="group relative px-2 py-1 md:px-3 md:py-1.5 bg-blue-600/80 backdrop-blur-md rounded-full text-[10px] md:text-xs font-medium text-white shadow-sm hover:bg-blue-500 transition-colors cursor-pointer border border-white/20"
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

const VerticalPillar = ({ text, delay, gradientDirection }: { text: string; delay: number, gradientDirection: "to-t" | "to-b" }) => {
  const pillarRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (pillarRef.current) {
        const { offsetWidth, offsetHeight } = pillarRef.current;
        setDimensions(prev => prev.width === offsetWidth && prev.height === offsetHeight ? prev : { width: offsetWidth, height: offsetHeight });
      }
    };
    
    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (pillarRef.current) {
      observer.observe(pillarRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const generatePillarPath = (width: number, height: number) => {
    if (!width || !height) return "";
    
    const isHorizontal = width > height;
    // Set a fixed 12px border radius for sharper corners
    const R = 12; 
    
    // Notch length is 50% of the item's long dimension
    const notchLen = isHorizontal ? width * 0.5 : height * 0.5;
    // Reduced depth as requested
    const notchDepth = 5;
    // Size of the smooth rounded curve at the notch corners
    const curveSize = 10;

    if (isHorizontal) {
      const cx = width / 2;
      return `
        M ${R} 0
        L ${cx - notchLen/2} 0
        C ${cx - notchLen/2 + curveSize/2} 0, ${cx - notchLen/2 + curveSize/2} ${notchDepth}, ${cx - notchLen/2 + curveSize} ${notchDepth}
        L ${cx + notchLen/2 - curveSize} ${notchDepth}
        C ${cx + notchLen/2 - curveSize/2} ${notchDepth}, ${cx + notchLen/2 - curveSize/2} 0, ${cx + notchLen/2} 0
        L ${width - R} 0
        A ${R} ${R} 0 0 1 ${width} ${R}
        L ${width} ${height - R}
        A ${R} ${R} 0 0 1 ${width - R} ${height}
        L ${cx + notchLen/2} ${height}
        C ${cx + notchLen/2 - curveSize/2} ${height}, ${cx + notchLen/2 - curveSize/2} ${height - notchDepth}, ${cx + notchLen/2 - curveSize} ${height - notchDepth}
        L ${cx - notchLen/2 + curveSize} ${height - notchDepth}
        C ${cx - notchLen/2 + curveSize/2} ${height - notchDepth}, ${cx - notchLen/2 + curveSize/2} ${height}, ${cx - notchLen/2} ${height}
        L ${R} ${height}
        A ${R} ${R} 0 0 1 0 ${height - R}
        L 0 ${R}
        A ${R} ${R} 0 0 1 ${R} 0
        Z
      `.replace(/\s+/g, ' ').trim();
    } else {
      const cy = height / 2;
      return `
        M ${R} 0
        L ${width - R} 0
        A ${R} ${R} 0 0 1 ${width} ${R}
        L ${width} ${cy - notchLen/2}
        C ${width} ${cy - notchLen/2 + curveSize/2}, ${width - notchDepth} ${cy - notchLen/2 + curveSize/2}, ${width - notchDepth} ${cy - notchLen/2 + curveSize}
        L ${width - notchDepth} ${cy + notchLen/2 - curveSize}
        C ${width - notchDepth} ${cy + notchLen/2 - curveSize/2}, ${width} ${cy + notchLen/2 - curveSize/2}, ${width} ${cy + notchLen/2}
        L ${width} ${height - R}
        A ${R} ${R} 0 0 1 ${width - R} ${height}
        L ${R} ${height}
        A ${R} ${R} 0 0 1 0 ${height - R}
        L 0 ${cy + notchLen/2}
        C 0 ${cy + notchLen/2 - curveSize/2}, ${notchDepth} ${cy + notchLen/2 - curveSize/2}, ${notchDepth} ${cy + notchLen/2 - curveSize}
        L ${notchDepth} ${cy - notchLen/2 + curveSize}
        C ${notchDepth} ${cy - notchLen/2 + curveSize/2}, 0 ${cy - notchLen/2 + curveSize/2}, 0 ${cy - notchLen/2}
        L 0 ${R}
        A ${R} ${R} 0 0 1 ${R} 0
        Z
      `.replace(/\s+/g, ' ').trim();
    }
  };

  const pathD = generatePillarPath(dimensions.width, dimensions.height);
  const safeId = text.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const clipId = `clip-pillar-${safeId}`;

  return (
    <motion.div
      ref={pillarRef as any}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      style={dimensions.width ? { clipPath: `url(#${clipId})` } : { overflow: 'hidden', borderRadius: '12px' }}
      className={cn(
        "flex w-full lg:w-12 md:lg:w-14 h-16 lg:h-full flex-row lg:flex-col justify-between px-6 lg:px-0 py-0 lg:py-6 items-center shadow-lg transition-all cursor-pointer relative shrink-0 group hover:shadow-xl",
        gradientDirection === "to-t"
          ? "bg-gradient-to-r lg:bg-gradient-to-t from-[#2052bd] to-[#7fcbe4]"
          : "bg-gradient-to-l lg:bg-gradient-to-b from-[#2052bd] to-[#7fcbe4]"
      )}
    >
      {dimensions.width > 0 && (
        <svg width="0" height="0" className="absolute pointer-events-none">
          <defs>
            <clipPath id={clipId}>
              <path d={pathD} />
            </clipPath>
          </defs>
        </svg>
      )}
      <div className="flex-1 flex items-center justify-start lg:justify-center relative w-full overflow-hidden ml-4 lg:ml-0">
        <div 
          className="text-white text-base md:text-xl font-medium tracking-wide transition-all pointer-events-none lg:[writing-mode:vertical-rl] lg:[text-orientation:mixed] lg:-scale-y-100 lg:-scale-x-100"
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
};

const HeroCard = ({ children, delay, variant, className, xOffset, pathBorderColor }: { children: React.ReactNode, delay: number, variant: "tr-bl" | "tl-br" | "tr-bcenter", className: string, xOffset: number, pathBorderColor?: string }) => {
  const cardRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (cardRef.current) {
        const { offsetWidth, offsetHeight } = cardRef.current;
        setDimensions(prev => prev.width === offsetWidth && prev.height === offsetHeight ? prev : { width: offsetWidth, height: offsetHeight });
      }
    };
    
    updateSize();
    const observer = new ResizeObserver(updateSize);
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const generateCardPath = (width: number, height: number, variant: string) => {
    if (!width || !height) return "";
    
    const R = 32; 
    // Make the curve width identical for all cards (including the first and fourth card)
    let CW = width > 400 ? 200 : 120;
    let SW = width > 400 ? 70 : 50;
    
    // Failsafes to prevent path overlapping the corner radii (which causes spikes)
    if (width - CW < R + 5) CW = Math.max(width - R - 5, R + 10);
    if (CW - SW < R + 5) SW = Math.max(CW - R - 5, 10);
    
    const NH = 35;  // Depth of the step
    const CS = 30;  
    
    if (variant === "tr-bl" || variant === "tr-bcenter") {
      const startTR = width - CW;
      const endTR = width - CW + SW;
      
      let bottomPath = "";
      if (variant === "tr-bcenter") {
        const NW = 240;
        const ND = 35;
        const NC = width / 2;
        const nStart = NC + 120; 
        const nFlatStart = NC + 48;
        const nFlatEnd = NC - 48;
        const nEnd = NC - 120;

        bottomPath = `
        L ${nStart} ${height}
        C ${nStart - 24} ${height}, ${nStart - 36} ${height - ND}, ${nFlatStart} ${height - ND}
        L ${nFlatEnd} ${height - ND}
        C ${nFlatEnd - 36} ${height - ND}, ${nEnd + 24} ${height}, ${nEnd} ${height}
        L ${R} ${height}
        A ${R} ${R} 0 0 1 0 ${height - R}
        `;
      } else {
        const startBL = CW - SW;
        const endBL = CW;
        bottomPath = `
        L ${endBL} ${height}
        C ${endBL - CS} ${height}, ${startBL + CS} ${height - NH}, ${startBL} ${height - NH}
        L ${R} ${height - NH}
        A ${R} ${R} 0 0 1 0 ${height - NH - R}
        `;
      }

      return `
        M ${R} 0
        L ${startTR} 0
        C ${startTR + CS} 0, ${endTR - CS} ${NH}, ${endTR} ${NH}
        L ${width - R} ${NH}
        A ${R} ${R} 0 0 1 ${width} ${NH + R}
        L ${width} ${height - R}
        A ${R} ${R} 0 0 1 ${width - R} ${height}
        ${bottomPath}
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

  const uniqueId = React.useId().replace(/:/g, '');
  const pathD = generateCardPath(dimensions.width, dimensions.height, variant);
  const clipId = `clip-hero-${variant}-${uniqueId}`;

  return (
    <motion.article 
      ref={cardRef as any}
      initial={{ opacity: 0, x: xOffset }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      style={dimensions.width ? { clipPath: `url(#${clipId})` } : { overflow: 'hidden', borderRadius: '1.5rem' }}
      className={className}
    >
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id={clipId}>
            <path d={pathD} />
          </clipPath>
        </defs>
      </svg>
      {pathBorderColor && dimensions.width > 0 && (
        <svg width={dimensions.width} height={dimensions.height} className="absolute inset-0 pointer-events-none z-10" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
          <path d={pathD} stroke={pathBorderColor} strokeWidth="2" fill="none" />
        </svg>
      )}
      {children}
    </motion.article>
  );
};

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const isInView = useInView(containerRef, { once: isMobile, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-auto lg:h-screen min-h-[100svh] bg-black pt-28 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <BackgroundBeams />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-2 sm:px-4 lg:px-4 flex flex-col gap-8 lg:gap-10 h-full flex-1 justify-center">
        
        {/* --- 1. TOP TYPOGRAPHY SECTION --- */}
        <div className="flex flex-col xl:flex-row justify-between items-start gap-8">
          {/* Main Title - Original Content, Reduced Size */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex-1 shrink-0"
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
            className="xl:max-w-xs flex flex-col items-start xl:items-end text-left xl:text-right gap-4 mt-6 xl:mt-0"
          >
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              <strong className="text-white font-semibold">Clean Code, Modern Architecture:</strong> Illuminating your path to digital triumph by decoding complex architectural intricacies and scaling limits.
            </p>
          </motion.div>
        </div>

        {/* --- 2. MIDDLE BENTO ROW --- */}
        <div className="flex flex-col lg:flex-row gap-4 w-full flex-1 min-h-[300px]">
          
          {/* Card 01 - Wide Graphic Card (Original Image 1) */}
          <HeroCard 
            delay={0}
            variant="tr-bl"
            xOffset={-50}
            className="relative w-full lg:flex-[1.6] h-[280px] md:h-[350px] lg:h-auto lg:self-stretch overflow-hidden bg-[url('/images/home/heroImg1.png?v=2')] bg-cover bg-center shadow-2xl shrink-0"
          >
            {/* Overlays (From Original) */}
            <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
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
                animate={isInView ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }} 
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </motion.div>
              <span className="font-light">Clean Code, Modern Architecture</span>
            </div>
          </HeroCard>

          {/* Pillars 02 & 03 (Original Tabs 1 & 2) */}
          <VerticalPillar text={TABS[0].label} delay={0.4} gradientDirection="to-t" />
          <VerticalPillar text={TABS[1].label} delay={0.5} gradientDirection="to-b" />

          {/* Card 04 - Call to Action Card (Original Image 2) */}
          <HeroCard 
            delay={0.2}
            variant="tl-br"
            xOffset={50}
            className="relative w-full lg:flex-[0.9] h-[280px] md:h-[350px] lg:h-auto lg:self-stretch overflow-hidden shrink-0"
          >
             {/* Background layers (From Original) */}
             <div className="absolute inset-0 bg-white backdrop-blur-3xl border border-white/40 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-b from-blue-200/40 via-blue-100/20 to-white" />
             </div>

            <div className="relative h-full flex flex-col justify-between p-4 z-10 overflow-hidden">
              <motion.div
                className="absolute inset-[-50%] bg-[url('/images/home/heroImg2.jpg?v=2')] bg-cover bg-center z-0"
                animate={isInView ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <HeroCard
                delay={0.2}
                variant="tl-br"
                xOffset={0}
                pathBorderColor="rgba(59, 130, 246, 0.2)"
                className="backdrop-blur-md p-4 md:p-6 shadow-lg h-full w-full flex flex-col justify-center relative"
              >
                
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

              </HeroCard>
            </div>
          </HeroCard>

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
