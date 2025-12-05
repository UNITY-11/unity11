"use client";

import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Types
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

// Constants
const PRIMARY_BLUE = "#2052bd";
const LIGHT_BLUE = "#7fcbe4";
const DARK_BLUE = "#1e3a5f";

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Hero: React.FC = () => {
  const tabs: Tab[] = useMemo(
    () => [
      { 
        id: "02", 
        label: "Marketing", 
        isActive: true,
        description: "Strategic digital marketing solutions that drive growth and engagement"
      },
      { 
        id: "03", 
        label: "Innovate", 
        isActive: false,
        description: "Cutting-edge technology solutions that push boundaries"
      },
      { 
        id: "05", 
        label: "Elevate", 
        isActive: true,
        description: "Elevate your brand with premium design and strategy"
      },
      { 
        id: "06", 
        label: "Transform", 
        isActive: false,
        description: "Transform your business with data-driven insights"
      },
    ],
    []
  );

  const labels = useMemo(
    () => [
      { name: "SEO", description: "Search Engine Optimization" },
      { name: "Digital Marketing", description: "Multi-channel campaigns" },
      { name: "Content Strategy", description: "Engaging content creation" },
      { name: "Video Marketing", description: "Visual storytelling" },
      { name: "Data Analytics", description: "Insights-driven decisions" },
      { name: "Email Marketing", description: "Targeted communications" },
    ],
    []
  );

  const metrics: MetricCard[] = useMemo(
    () => [
      {
        label: "Impressions:",
        value: "2.3M",
        icon: (
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-[#2052bd]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        ),
      },
      {
        label: "Conversion:",
        value: "35%",
        icon: (
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-[#2052bd]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        ),
      },
      {
        label: "Customers:",
        value: "2,341",
        icon: (
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-[#2052bd]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        ),
      },
      {
        label: "Clicks:",
        value: "+83.3%",
        icon: (
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-[#2052bd]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </svg>
        ),
      },
    ],
    []
  );

  const socialLinks: SocialLink[] = useMemo(
    () => [
      {
        name: "Behance",
        href: "https://behance.net",
        ariaLabel: "Visit our Behance profile",
        icon: <span className="text-[10px] md:text-xs font-bold">Be</span>,
      },
      {
        name: "Instagram",
        href: "https://instagram.com",
        ariaLabel: "Visit our Instagram profile",
        icon: (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="5"
              ry="5"
              strokeWidth="2"
            />
            <path
              d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
              strokeWidth="2"
            />
            <line
              x1="17.5"
              y1="6.5"
              x2="17.51"
              y2="6.5"
              strokeWidth="2"
            />
          </svg>
        ),
      },
      {
        name: "X (Twitter)",
        href: "https://x.com",
        ariaLabel: "Visit our X (Twitter) profile",
        icon: (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        ),
      },
    ],
    []
  );

  // Helper component for vertical tabs
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
            ? "bg-linear-to-t from-[#2052bd] to-[#7fcbe4]"
            : "bg-linear-to-b from-[#2052bd] to-[#7fcbe4]",
          isBold ? "shadow-lg" : "shadow-md",
          "hover:shadow-xl"
        )}
        aria-label={`${tab.label} tab${tab.description ? `: ${tab.description}` : ""}`}
        type="button"
        title={tab.description}
      >
        <div
          className={cn(
            "text-xs text-white transition-all",
            isBold ? "font-bold" : "font-normal"
          )}
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}
        >
          {tab.label}
        </div>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gray-200/80 flex items-center justify-center group-hover:bg-white transition-colors">
          <span className="text-[10px] text-gray-700 group-hover:text-blue-600 transition-colors font-semibold">{tab.id}</span>
        </div>
      </motion.button>
    </div>
  );

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center w-full bg-white overflow-x-hidden pt-[100px] pb-8"
      aria-label="Hero section"
    >
      {/* Animated Background Effects - Bent Lines Only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Animated Bent Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
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
          />
          <motion.path
            d="M0,400 Q200,300 400,400 T800,400 T1200,400"
            stroke="url(#gradient1)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
        </svg>
      </div>
      <div className="relative z-10 flex justify-between items-stretch container mx-auto px-4 gap-2 lg:gap-4 w-full">
        {/* Hero Card 01 */}
        <motion.article
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full lg:flex-[1.6] h-[280px] md:h-[350px] lg:h-[300px] rounded-2xl md:rounded-3xl overflow-hidden bg-[url('/images/home/heroImg1.png')] bg-cover bg-center shadow-2xl shrink-0"
          aria-label="Hero card with service labels"
        >
          {/* Textured/Fabric-like Background with Highlights and Shadows */}
          <div className="absolute inset-0" aria-hidden="true">
            {/* Base texture layers */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 25%, rgba(0,0,0,0.1) 50%, transparent 75%, rgba(255,255,255,0.08) 100%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.12) 30%, transparent 40%, rgba(0,0,0,0.08) 50%, transparent 60%, rgba(255,255,255,0.1) 70%, transparent 80%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 40%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 80% 70%, rgba(0,0,0,0.1) 0%, transparent 50%)",
              }}
            />
            {/* Folds and creases */}
            <div
              className="absolute top-0 left-0 w-full h-1/3"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
              }}
            />
            <div
              className="absolute bottom-0 right-0 w-2/3 h-1/2"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.12), transparent)",
              }}
            />
          </div>

          {/* Pill Labels - Light blue background with white text, connected by dots, arranged in 2 rows of 3 */}
          <div
            className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-1 md:gap-2 z-10"
            aria-label="Service labels"
          >
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
              {labels.slice(0, 3).map((label, idx) => (
                <React.Fragment key={label.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="group relative px-2 py-1 md:px-3 md:py-1.5 bg-transparent border border-blue-600 backdrop-blur-md rounded-full text-[10px] md:text-xs font-medium text-white shadow-sm hover:bg-blue-600/20 transition-colors cursor-pointer"
                    title={label.description}
                  >
                    {label.name}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                      {label.description}
                    </span>
                  </motion.div>
                  {idx < 2 && (
                    <div
                      className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-300/80 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
              {labels.slice(3).map((label, idx) => (
                <React.Fragment key={label.name}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="group relative px-2 py-1 md:px-3 md:py-1.5 backdrop-blur-sm rounded-full text-[10px] md:text-xs font-medium text-white shadow-sm hover:bg-blue-600/20 transition-colors cursor-pointer"
                    title={label.description}
                  >
                    {label.name}
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                      {label.description}
                    </span>
                  </motion.div>
                  {idx < 2 && (
                    <div
                      className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-300/80 rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Bottom Text with Icon - Light blue circle with white swirl */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex items-center gap-1.5 md:gap-2 text-white/90 text-[10px] md:text-xs z-10">
            <motion.div 
              className="w-6 h-6 rounded-full bg-blue-200/80 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </motion.div>
            <span className="font-light">Creativity, innovation, progress</span>
          </div>

          {/* Section Number - Light gray circle with dark gray number */}
          <div
            className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200/80 flex items-center justify-center z-10"
            aria-label="Section 01"
          >
            <span className="text-base md:text-xl font-medium text-gray-700">
              01
            </span>
          </div>
        </motion.article>

        {/* Vertical Tabs - Left Side */}
        <VerticalTab tab={tabs[0]} delay={0.4} gradientDirection="to-t" isBold />
        <VerticalTab tab={tabs[1]} delay={0.5} gradientDirection="to-b" />

        {/* Main Content Card - Section 04 */}
        <motion.article
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full lg:flex-[0.9] h-[280px] md:h-[350px] lg:h-[300px] rounded-2xl md:rounded-3xl overflow-hidden shrink-0"
          aria-label="Main content card"
        >
          {/* Glassmorphism Background with gradient - Light blue at top to white at bottom */}
          <div className="absolute inset-0 bg-white backdrop-blur-3xl border border-white/40 rounded-2xl md:rounded-3xl shadow-2xl">
            {/* Gradient Background behind glass */}
            <div className="absolute inset-0 bg-linear-to-b from-blue-200/40 via-blue-100/20 to-white rounded-2xl md:rounded-3xl">
                {/* Abstract swirling blue patterns */}
                <div className="absolute inset-0 opacity-60">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl"></div>
                  <div className="absolute top-10 left-20 w-64 h-64 bg-blue-400/30 rounded-full blur-2xl"></div>
                  <div className="absolute top-20 left-40 w-48 h-48 bg-blue-200/50 rounded-full blur-xl"></div>
                  {/* Swirling brushstroke patterns */}
                  <svg
                    className="absolute top-0 left-0 w-full h-full opacity-40"
                    viewBox="0 0 400 600"
                  >
                    <path
                      d="M50 100 Q150 50, 200 150 T350 200"
                      stroke="rgba(59, 130, 246, 0.3)"
                      strokeWidth="3"
                      fill="none"
                    />
                    <path
                      d="M100 200 Q200 150, 300 250 T450 300"
                      stroke="rgba(96, 165, 250, 0.3)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M150 300 Q250 250, 350 350"
                      stroke="rgba(147, 197, 253, 0.3)"
                      strokeWidth="2.5"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-4 z-10 bg-[url('/images/home/heroImg2.jpg')] bg-cover bg-center rounded-2xl md:rounded-3xl shadow-2xl">
              <div className="backdrop-blur-md border border-blue-500/20 p-4 md:p-6 rounded-2xl shadow-lg h-full flex flex-col justify-between">
                {/* Section Number - Light gray circle with dark gray number */}
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200/80 flex items-center justify-center self-start">
                  <span className="text-xs md:text-sm font-medium text-gray-700">
                    04
                  </span>
                </div>

                {/* Main Content - Centered */}
                <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2 md:space-y-4 my-4 md:my-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] tracking-tight px-2 bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent"
                  >
                    SPARK YOUR CREATIVITY
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-xs md:text-sm text-gray-600 max-w-lg leading-relaxed font-light text-center px-2"
                  >
                    Discover endless possibilities with our innovative design solutions. 
                    We transform ideas into reality through cutting-edge technology and 
                    creative excellence.
                  </motion.p>
                  
                  {/* Feature Highlights */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-2 md:mt-3"
                  >
                    <span className="text-[9px] md:text-[10px] px-2 py-0.5 bg-blue-100/50 rounded-full text-blue-700 font-medium">
                      ✓ Award Winning
                    </span>
                    <span className="text-[9px] md:text-[10px] px-2 py-0.5 bg-blue-100/50 rounded-full text-blue-700 font-medium">
                      ✓ 10+ Years Experience
                    </span>
                    <span className="text-[9px] md:text-[10px] px-2 py-0.5 bg-blue-100/50 rounded-full text-blue-700 font-medium">
                      ✓ Global Reach
                    </span>
                  </motion.div>
                </div>

                {/* Explore Now Button - Light blue background with white border and white text, positioned bottom left */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="self-start px-3 py-1.5 md:px-4 md:py-2 bg-linear-to-t from-[#2052bd] to-[#7fcbe4] backdrop-blur-sm rounded-full border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1.5 md:gap-2 text-white text-xs md:text-sm font-semibold hover:opacity-90"
                  type="button"
                  aria-label="Explore now"
                >
                  Explore Now
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.article>

        {/* Vertical Tabs - Right Side */}
        <VerticalTab tab={tabs[2]} delay={0.6} gradientDirection="to-b" isBold />
        <VerticalTab tab={tabs[3]} delay={0.7} gradientDirection="to-t" />
        </div>
        {/* ===== METRICS/DATA SECTION (LIGHT BACKGROUND) ===== */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 py-6 md:py-8 w-full">
          {/* Top Bar - Metrics and Social Icons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 md:mb-6">
            {/* Left Side - Metrics */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-6 flex-wrap">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-1.5"
              >
                <span className="text-green-600 font-bold text-sm md:text-base">98%</span>
                <span className="text-gray-700 font-medium text-xs md:text-sm whitespace-nowrap">
                  Satisfied Clients
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-1.5"
              >
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 font-medium text-xs md:text-sm whitespace-nowrap">
                  24/7 Customer Support
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-1.5"
              >
                <span className="text-blue-600 font-bold text-sm md:text-base">10K+</span>
                <span className="text-gray-700 font-medium text-xs md:text-sm whitespace-nowrap">
                  Happy Customers
                </span>
              </motion.div>
            </div>

            {/* Right Side - Social Media Icons */}
            <div className="flex items-center gap-2 md:gap-3" role="list">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#2052bd] flex items-center justify-center text-white hover:bg-[#1e3a5f]/90 transition-colors"
                  aria-label={link.ariaLabel}
                  role="listitem"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
            {/* Left Side - Heading and Button */}
            <div className="flex-1 w-full lg:max-w-2xl">
              <motion.h1
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent leading-[1.1] mb-4 md:mb-6"
                style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
              >
                <span className="inline-flex items-center">
                  THE{" "}
                  <span className="relative inline-block mx-1.5 text-white">
                    DREAM
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="currentColor"
                      className="absolute -top-0.5 -right-1.5 text-blue-500"
                      aria-hidden="true"
                    >
                      <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
                    </svg>
                  </span>
                </span>
                <br className="hidden sm:block" />
                <span className="inline-flex items-center">IS OUR REALITY</span>
              </motion.h1>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 md:px-5 md:py-2.5 bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] text-white rounded-full font-semibold flex items-center gap-2 hover:gap-4 transition-all duration-300 shadow-lg text-xs md:text-sm"
                  type="button"
                  aria-label="Create project"
                >
                  Create project
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 md:px-5 md:py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-semibold flex items-center gap-2 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 shadow-md text-xs md:text-sm"
                  type="button"
                  aria-label="Learn more"
                >
                  Learn more
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm text-gray-500"
              >
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Trusted by 500+ Companies</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9/5 Average Rating</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>10+ Years Experience</span>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Data Cards */}
            <div
              className="flex-1 w-full lg:w-auto grid grid-cols-2 lg:flex gap-3 md:gap-4 lg:gap-3"
              role="list"
            >
              {metrics.map((metric, idx) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                  className="flex-1 bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] rounded-xl p-3 md:p-4 flex items-center gap-2 md:gap-3 min-w-0 shadow-lg"
                  role="listitem"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                    {metric.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] md:text-xs text-white/90 mb-0.5 md:mb-1 font-medium">
                      {metric.label}
                    </p>
                    <p className="text-sm md:text-lg font-bold text-white leading-tight">
                      {metric.value}
                    </p>
                    <p className="text-[9px] md:text-[10px] text-white/70 mt-0.5">
                      {metric.label === "Impressions:" && "Monthly reach"}
                      {metric.label === "Conversion:" && "Average rate"}
                      {metric.label === "Customers:" && "Active users"}
                      {metric.label === "Clicks:" && "Growth rate"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default Hero;
