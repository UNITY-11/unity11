"use client";

import { motion } from "motion/react";
import { Service, ServiceCardProps } from "../types";
import { 
  FiMonitor, FiSmartphone, FiCode, FiPenTool, 
  FiCloud, FiServer, FiLayers, FiShield, 
  FiSave, FiFileText, FiTarget, FiZap, 
  FiCompass, FiDatabase, FiArrowUpRight
} from "react-icons/fi";
import { ServiceGraphics } from "./ServiceGraphics";
import React from "react";

const iconMap: Record<string, React.ReactNode> = {
  "browser": <FiMonitor className="w-8 h-8" />,
  "smartphone": <FiSmartphone className="w-8 h-8" />,
  "api": <FiCode className="w-8 h-8" />,
  "pen-tool": <FiPenTool className="w-8 h-8" />,
  "cloud-upload": <FiCloud className="w-8 h-8" />,
  "server": <FiServer className="w-8 h-8" />,
  "layers": <FiLayers className="w-8 h-8" />,
  "shield": <FiShield className="w-8 h-8" />,
  "save": <FiSave className="w-8 h-8" />,
  "file-text": <FiFileText className="w-8 h-8" />,
  "target": <FiTarget className="w-8 h-8" />,
  "zap": <FiZap className="w-8 h-8" />,
  "compass": <FiCompass className="w-8 h-8" />,
  "database": <FiDatabase className="w-8 h-8" />
};

export function ServiceCard({ service, index, className = "" }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`group relative flex flex-col bg-linear-to-br from-blue-600 to-blue-900 border border-blue-400/30 rounded-[2.5rem] hover:border-blue-400/60 transition-colors duration-300 overflow-hidden shadow-xl p-6 gap-6 ${className}`}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Header Row */}
      <div className="relative z-10 flex justify-between items-center">
        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
          {iconMap[service.iconName] || <FiCode className="w-6 h-6" />}
        </div>
        <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-blue-200 hover:text-white hover:bg-white/20 transition-colors cursor-pointer shadow-md backdrop-blur-sm">
          <FiArrowUpRight className="w-5 h-5" />
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 px-2">
        <h3 className="text-xl font-bold text-white tracking-wide text-center drop-shadow-md">
          {service.title}
        </h3>
      </div>

      {/* Middle Graphic Section */}
      <div className="relative z-10 w-full h-56 bg-[#0a0a0a] rounded-[2rem] border border-blue-950 shadow-inner overflow-hidden group-hover:border-blue-800 transition-colors duration-300">
        <ServiceGraphics service={service} index={index} />
      </div>

      {/* Bottom Description */}
      <div className="relative z-10 px-2 mt-auto">
        <p className="text-blue-100 leading-relaxed text-sm md:text-base text-center drop-shadow-sm">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}
