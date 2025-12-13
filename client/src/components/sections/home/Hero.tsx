"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// --- Types ---
interface Tab {
  id: string;
  label: string;
  isActive: boolean;
  description?: string;
}

interface MetricCard {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

// --- Constants (Moved outside component to prevent re-creation) ---
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

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com",
    ariaLabel: "Visit our GitHub profile",
    icon: <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />,
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    ariaLabel: "Visit our Instagram profile",
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" />
      </>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com",
    ariaLabel: "Visit our X (Twitter) profile",
    icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  },
];

const FADE_UP_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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
    {index < 2 && <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-300/80 rounded-full" aria-hidden="true" />}
  </React.Fragment>
);

const VerticalTab: React.FC<{
  tab: Tab;
  delay: number;
  gradientDirection: "to-t" | "to-b";
  isBold?: boolean;
}> = ({ tab, delay, gradientDirection, isBold = false }) => (
  <div className="hidden lg:flex flex-col gap-5 h-[280px] md:h-[350px] lg:h-[300px] justify-center items-center shrink-0 group">
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "relative w-12 md:w-14 h-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-300",
        gradientDirection === "to-t"
          ? "bg-gradient-to-t from-[#2052bd] to-[#7fcbe4]"
          : "bg-gradient-to-b from-[#2052bd] to-[#7fcbe4]",
        isBold ? "shadow-lg" : "shadow-md",
        "hover:shadow-xl"
      )}
      aria-label={`${tab.label} tab`}
      title={tab.description}
    >
      <div
        className="text-white transition-all text-xl font-medium tracking-wide"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}
      >
        {tab.label}
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-200/80 flex items-center justify-center group-hover:bg-white transition-colors">
        <span className="text-[10px] text-gray-700 group-hover:text-blue-600 transition-colors font-semibold">
          {tab.id}
        </span>
      </div>
    </motion.button>
  </div>
);

const MetricItem = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="flex items-center gap-1.5"
  >
    <span className="text-blue-600 font-bold text-sm md:text-base">{value}</span>
    <span className="text-gray-700 font-medium text-xs md:text-sm whitespace-nowrap">{label}</span>
  </motion.div>
);

// --- Main Component ---

export const Hero: React.FC = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center w-full overflow-x-hidden pt-[80px] pb-8"
      aria-label="Hero section"
    >
      <div className="relative z-10 flex justify-between items-stretch container mx-auto px-4 gap-2 lg:gap-4 w-full">
        {/* --- Hero Card 01: TECH STACK --- */}
        <motion.article
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full lg:flex-[1.6] h-[280px] md:h-[350px] lg:h-[300px] rounded-2xl md:rounded-3xl overflow-hidden bg-[url('/images/home/heroImg1.png')] bg-cover bg-center shadow-2xl shrink-0"
        >
          {/* Overlays */}
          <div className="absolute inset-0 bg-gray-900/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />

          {/* Tech Pills Container */}
          <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-1 md:gap-2 z-10">
            {/* Row 1 */}
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
              {TECH_LABELS.slice(0, 3).map((label, idx) => (
                <TechPill key={label.name} label={label} index={idx} offset={0.3} />
              ))}
            </div>
            {/* Row 2 */}
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
              {TECH_LABELS.slice(3).map((label, idx) => (
                <TechPill key={label.name} label={label} index={idx} offset={0.6} />
              ))}
            </div>
          </div>

          {/* Rotating Icon & Text */}
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

          {/* Section ID */}
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200/80 flex items-center justify-center z-10">
            <span className="text-base md:text-xl font-medium text-gray-700">01</span>
          </div>
        </motion.article>

        {/* --- Vertical Tabs (Left) --- */}
        <VerticalTab tab={TABS[0]} delay={0.4} gradientDirection="to-t" isBold />
        <VerticalTab tab={TABS[1]} delay={0.5} gradientDirection="to-b" />

        {/* --- Hero Card 04: MAIN CONTENT --- */}
        <motion.article
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full lg:flex-[0.9] h-[280px] md:h-[350px] lg:h-[300px] rounded-2xl md:rounded-3xl overflow-hidden shrink-0"
        >
           {/* Background layers */}
          <div className="absolute inset-0 bg-white backdrop-blur-3xl border border-white/40 shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-b from-blue-200/40 via-blue-100/20 to-white" />
          </div>

          <div className="relative h-full flex flex-col justify-between p-4 z-10 bg-[url('/images/home/heroImg2.jpg')] bg-cover bg-center">
            <div className="backdrop-blur-md border border-blue-500/20 p-4 md:p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between">
              {/* Section ID */}
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200/80 flex items-center justify-center self-start">
                <span className="text-xs md:text-sm font-medium text-gray-700">04</span>
              </div>

              {/* Title */}
              <div className="flex w-full h-full justify-center items-center text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-5xl tracking-wide font-bold text-[#2052bd] uppercase"
                >
                  Scalable Software Solutions
                </motion.h1>
              </div>
            </div>
          </div>
        </motion.article>

        {/* --- Vertical Tabs (Right) --- */}
        <VerticalTab tab={TABS[2]} delay={0.6} gradientDirection="to-b" isBold />
        <VerticalTab tab={TABS[3]} delay={0.7} gradientDirection="to-t" />
      </div>

      {/* --- Lower Section --- */}
      <div className="container mx-auto px-4 mt-10">
        {/* Metrics & Socials Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 w-full">
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6">
            <MetricItem value="100%" label="Code Ownership" delay={0.1} />
            <MetricItem value="99.9%" label="On-Time Delivery" delay={0.15} />
            <MetricItem value="50+" label="Successful Launches" delay={0.2} />
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#2052bd] flex items-center justify-center text-white hover:bg-[#1e3a5f]/90 transition-colors"
                aria-label={link.ariaLabel}
              >
                <svg className="w-5 h-5" fill={link.name === "Instagram" ? "none" : "currentColor"} stroke={link.name === "Instagram" ? "currentColor" : "none"} viewBox="0 0 24 24">
                  {link.icon}
                </svg>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Large Heading */}
        <div className="w-full lg:max-w-3xl">
          <motion.h1
            variants={FADE_UP_VARIANTS}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl bg-gradient-to-tr from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent leading-[1.1] font-sans"
          >
            <span className="inline-flex items-center">
              BUILD{" "}
              <span className="relative inline-block mx-2 text-white">
                FUTURE
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="absolute -top-1 -right-3 text-blue-500">
                  <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
                </svg>
              </span>
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block">PROOF SOFTWARE</span>
          </motion.h1>
        </div>
      </div>

      {/* --- Background Animation --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
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
      </div>
    </section>
  );
};

export default Hero;