"use client";

import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/MagicUi/ScrollBasedVelocity";
import { motion } from "motion/react";
import { Code2, Layers, Smartphone, Cloud, Cpu, Palette } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomServiceCard = ({ service, index }: { service: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
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
    if (cardRef.current) observer.observe(cardRef.current);
    
    return () => observer.disconnect();
  }, []);

  const generatePath = (width: number, height: number) => {
    if (!width || !height) return "";
    const R = 32; // inner/outer corner radius
    
    // Parameters for the tl-br S-curves matching ProcessCard exactly
    let CW = width > 400 ? 200 : 120; // Cut width from edge
    let SW = width > 400 ? 70 : 50;   // Sweep width of the curve
    const NH = 35;                    // Notch depth
    let CS = 30;                      // Control point strength

    // Failsafe for very small cards
    if (width < CW + R + 20) {
      CW = width - R - 20;
      SW = Math.max(CW - 30, 20);
      CS = SW * 0.45;
    }

    return `
      M ${CW} 0
      L ${width - R} 0
      A ${R} ${R} 0 0 1 ${width} ${R}
      L ${width} ${height - NH - R}
      A ${R} ${R} 0 0 1 ${width - R} ${height - NH}
      L ${width - CW + SW} ${height - NH}
      C ${width - CW + SW - CS} ${height - NH}, ${width - CW + CS} ${height}, ${width - CW} ${height}
      L ${R} ${height}
      A ${R} ${R} 0 0 1 0 ${height - R}
      L 0 ${NH + R}
      A ${R} ${R} 0 0 1 ${R} ${NH}
      L ${CW - SW} ${NH}
      C ${CW - SW + CS} ${NH}, ${CW - CS} 0, ${CW} 0
      Z
    `.replace(/\s+/g, ' ').trim();
  };

  const pathD = generatePath(dimensions.width, dimensions.height);
  const uniqueId = React.useId().replace(/:/g, '');
  const clipId = `clip-service-${uniqueId}`;

  return (
    <motion.div
      ref={cardRef as any}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      style={dimensions.width ? { clipPath: `url(#${clipId})` } : { overflow: 'hidden', borderRadius: '32px' }}
      className="relative group shadow-2xl transition-all duration-500 p-1 bg-blue-100"
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
      
      {/* Border overlay */}
      {dimensions.width > 0 && (
        <svg width={dimensions.width} height={dimensions.height} className="absolute inset-0 pointer-events-none z-20" viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}>
          <path d={pathD} stroke="#dbeafe" strokeWidth="8" fill="none" />
        </svg>
      )}

      {/* 1. Background Image */}
      <img
        src={service.imageUrl}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-100 scale-110"
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="h-full flex flex-col justify-between bg-blue-500/60 mt-24 md:mt-30 rounded-4xl p-6 md:p-8 backdrop-blur-md">
          {/* Top content wrapper (Title & Desc) */}
          <div className="w-70">
            <h3 className="text-xl font-semibold text-white">
              {service.title}
            </h3>
            <p className="mt-2 text-white text-sm leading-relaxed">
              {service.desc}
            </p>
          </div>
          <div className="absolute top-6 right-6 rounded-full p-3 bg-white/20 backdrop-blur-xs text-white">
            {service.icon}
          </div>
          {/* Bottom content wrapper (Icon & Button) */}
          <div className="mt-6">
            {/* Button (like 'Check Availability') */}
            <button className="flex justify-center items-center gap-2 hover:gap-4 px-4 py-2 text-sm text-blue-400 bg-white backdrop-blur-2xl rounded-full font-medium transition-all duration-300 focus:ring-offset-black/50">
              Learn More <IoIosArrowForward className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MarqueeImageCard = ({ src, alt, i, direction }: { src: string; alt: string; i: number; direction: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

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

  const generatePath = (width: number, height: number, variant: number) => {
    if (!width || !height) return "";
    
    const scale = Math.min(width, height) / 100; 
    const R = Math.max(8, 16 * scale); 
    
    let CW = width * 0.4;
    let SW = CW * 0.5;
    const NH = Math.max(4, 16 * scale);
    const CS = SW * 0.5;

    if (width < CW + R + 10) {
      CW = width - R - 10;
      SW = CW * 0.5;
    }

    if (variant === 0) {
      // Top-Left and Bottom-Right cut
      return `
        M ${CW} 0
        L ${width - R} 0
        A ${R} ${R} 0 0 1 ${width} ${R}
        L ${width} ${height - NH - R}
        A ${R} ${R} 0 0 1 ${width - R} ${height - NH}
        L ${width - CW + SW} ${height - NH}
        C ${width - CW + SW - CS} ${height - NH}, ${width - CW + CS} ${height}, ${width - CW} ${height}
        L ${R} ${height}
        A ${R} ${R} 0 0 1 0 ${height - R}
        L 0 ${NH + R}
        A ${R} ${R} 0 0 1 ${R} ${NH}
        L ${CW - SW} ${NH}
        C ${CW - SW + CS} ${NH}, ${CW - CS} 0, ${CW} 0
        Z
      `.replace(/\s+/g, ' ').trim();
    } else if (variant === 1) {
      // Top-Right and Bottom-Left cut
      return `
        M ${R} 0
        L ${width - CW} 0
        C ${width - CW + CS} 0, ${width - CW + SW - CS} ${NH}, ${width - CW + SW} ${NH}
        L ${width - R} ${NH}
        A ${R} ${R} 0 0 1 ${width} ${NH + R}
        L ${width} ${height - R}
        A ${R} ${R} 0 0 1 ${width - R} ${height}
        L ${CW} ${height}
        C ${CW - CS} ${height}, ${CW - SW + CS} ${height - NH}, ${CW - SW} ${height - NH}
        L ${R} ${height - NH}
        A ${R} ${R} 0 0 1 0 ${height - NH - R}
        L 0 ${R}
        A ${R} ${R} 0 0 1 ${R} 0
        Z
      `.replace(/\s+/g, ' ').trim();
    } else {
      // Top Center notch
      const cx = width / 2;
      return `
        M ${R} 0
        L ${cx - CW/2} 0
        C ${cx - CW/2 + CS} 0, ${cx - CW/2 + SW - CS} ${NH}, ${cx - CW/2 + SW} ${NH}
        L ${cx + CW/2 - SW} ${NH}
        C ${cx + CW/2 - SW + CS} ${NH}, ${cx + CW/2 - CS} 0, ${cx + CW/2} 0
        L ${width - R} 0
        A ${R} ${R} 0 0 1 ${width} ${R}
        L ${width} ${height - R}
        A ${R} ${R} 0 0 1 ${width - R} ${height}
        L ${R} ${height}
        A ${R} ${R} 0 0 1 0 ${height - R}
        L 0 ${R}
        A ${R} ${R} 0 0 1 ${R} 0
        Z
      `.replace(/\s+/g, ' ').trim();
    }
  };

  const pathD = generatePath(dimensions.width, dimensions.height, i % 3);
  const uniqueId = React.useId().replace(/:/g, '');
  const clipId = `clip-marquee-${uniqueId}`;

  return (
    <div className="relative flex items-center justify-center w-20 h-10 sm:w-28 sm:h-14 md:w-48 md:h-20 mx-6 shrink-0 group cursor-pointer">
      
      {/* Base Notched Image - Completely static */}
      <div 
        ref={cardRef as any}
        style={dimensions.width ? { clipPath: `url(#${clipId})` } : { overflow: 'hidden', borderRadius: '9999px' }}
        className="w-full h-full relative"
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
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>

      {/* Pop-Out Overlay Image - Fades in and sits above text on hover */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-16 sm:w-36 sm:h-24 md:w-56 md:h-32 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[100] pointer-events-none shadow-2xl ${direction === 1 ? 'group-hover:rotate-3' : 'group-hover:-rotate-3'}`}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
      </div>

    </div>
  );
};

export default function seServiceSection() {
  const isMobile = useIsMobile();
  const services = [
    {
      icon: <Layers />,
      title: "UI/UX Design",
      desc:
        "Crafting human-centered designs with stunning visuals and frictionless usability.",
      imageUrl: "images/service/ui.png",
    },
    {
      icon: <Code2 />,
      title: "Web Development",
      desc:
        "Building responsive, high-performance web apps with modern frameworks and clean architecture.",
      imageUrl: "images/service/website.png",
    },
    {
      icon: <Smartphone />,
      title: "Mobile App Development",
      desc:
        "Creating seamless iOS & Android experiences using native and cross-platform technologies.",
      imageUrl: "images/service/mobile.png",
    },
    {
      icon: <Cloud />,
      title: "Cloud Solutions",
      desc:
        "Designing and deploying scalable, secure cloud infrastructures for digital transformation.",
      imageUrl: "images/service/cloud.png",
    },
    {
      icon: <Cpu />,
      title: "AI & Automation",
      desc:
        "Integrating machine learning and intelligent automation to optimize business efficiency.",
      imageUrl: "images/service/aiml.png",
    },
    {
      icon: <Palette />,
      title: "Brand Identity",
      desc:
        "Designing cohesive digital identities that connect technology with creativity.",
      imageUrl: "images/service/branding.png",
    },
  ];

  return (
    <section id="services" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0" />

      {/* Blur background accent */}
      <div className="absolute top-50 -left-20 h-64 w-64 bg-linear-to-tr from-blue-600 to-cyan-400 opacity-30 blur-3xl" />
      <div className="absolute bottom-20 -right-20 h-64 w-64 bg-linear-to-tr from-cyan-500 to-sky-400 opacity-30 blur-3xl" />

      <div className="container mx-auto px-2 sm:px-4 lg:px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-7xl text-[#2052bd]">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
              Services
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            Empowering businesses with innovative digital solutions that merge
            design, development, and technology.
          </p>
        </motion.div>

        <div className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-8 lg:gap-10">
          {services.map((service, index) => (
            <CustomServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-10">
        <ScrollVelocityContainer className="text-4xl md:text-8xl mt-12 md:mt-20 mb-5 bg-clip-text text-blue-500 z-10">
          <ScrollVelocityRow baseVelocity={1} direction={1} className="pb-2 flex items-center overflow-visible">
            {["Custom Software Development", "Mobile Apps", "Web Apps", "SaaS Platforms"].map((item, i) => (
              <React.Fragment key={i}>
                <span className="mx-6">{item}</span>
                <MarqueeImageCard src={`/images/blog/blog${(i % 3) + 1}.png`} alt="project" i={i} direction={1} />
              </React.Fragment>
            ))}
          </ScrollVelocityRow>

          <ScrollVelocityRow
            baseVelocity={1}
            direction={-1}
            className="text-white pb-2 mt-4 flex items-center overflow-visible"
          >
            {["UI/UX Design", "DevOps & Cloud", "API Development", "AI Integrations"].map((item, i) => (
              <React.Fragment key={i}>
                <span className="mx-6">{item}</span>
                <MarqueeImageCard src={`/images/blog/blog${(i % 3) + 1}.png`} alt="project" i={i} direction={-1} />
              </React.Fragment>
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>
    </section>
  );
}
