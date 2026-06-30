"use client";

import { motion } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useIsMobile } from "@/hooks/use-mobile";

export const CustomServiceCard = ({ service, index }: { service: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const updateSize = () => {
      if (cardRef.current) {
        const { offsetWidth, offsetHeight } = cardRef.current;
        setDimensions(prev => prev.width === offsetWidth && prev.height === offsetHeight ? prev : { width: offsetWidth, height: offsetHeight });
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
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
