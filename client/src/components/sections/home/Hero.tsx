'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  // DEFINED `fadeUpVariants`
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const tabs = [
    { id: '02', label: 'Marketing', active: true },
    { id: '03', label: 'Innovate', active: false },
    { id: '05', label: 'Elevate', active: true },
    { id: '06', label: 'Transform', active: false },
  ];

  const labels = [
    'SEO',
    'Digital Marketing',
    'Content Strategy',
    'Video Marketing',
    'Data Analytics',
    'Email Marketing',
  ];

  return (
    <>
      {/* ===== HERO CARD SECTION (BLACK BACKGROUND) ===== */}
      <section className="relative min-h-screen justify-center items-center w-full bg-black overflow-x-hidden">
        <div className="h-screen flex justify-between items-center container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full lg:flex-[1.6] h-[280px] md:h-[350px] lg:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden bg-[#1e3a5f] shadow-2xl"
          >
            {/* Textured/Fabric-like Background with Highlights and Shadows */}
            <div className="absolute inset-0">
              {/* Base texture layers */}
              <div className="absolute inset-0 bg-[linear-linear(135deg,rgba(255,255,255,0.1)_0%,transparent_25%,rgba(0,0,0,0.1)_50%,transparent_75%,rgba(255,255,255,0.08)_100%)]"></div>
              <div className="absolute inset-0 bg-[linear-linear(45deg,transparent_20%,rgba(255,255,255,0.12)_30%,transparent_40%,rgba(0,0,0,0.08)_50%,transparent_60%,rgba(255,255,255,0.1)_70%,transparent_80%)]"></div>
              <div className="absolute inset-0 bg-[radial-linear(ellipse_at_20%_30%,rgba(255,255,255,0.15)_0%,transparent_40%)]"></div>
              <div className="absolute inset-0 bg-[radial-linear(ellipse_at_80%_70%,rgba(0,0,0,0.1)_0%,transparent_50%)]"></div>
              {/* Folds and creases */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-[linear-linear(to_bottom,rgba(255,255,255,0.08),transparent)]"></div>
              <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-[linear-linear(to_top,rgba(0,0,0,0.12),transparent)]"></div>
            </div>

            {/* White Spheres - One on left, one centered, one on right */}
            {/* ✅ FIXED: Replaced arbitrary values with standard classes */}
            <div className="absolute -left-5 md:-left-10 top-[20%] w-24 h-24 md:w-32 md:h-32 bg-white rounded-full opacity-70 shadow-2xl"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-white rounded-full opacity-65 shadow-2xl"></div>
            <div className="absolute right-[5%] md:right-[10%] top-[30%] w-28 h-28 md:w-36 md:h-36 bg-white rounded-full opacity-65 shadow-2xl"></div>

            {/* Pill Labels - Light blue background with white text, connected by dots, arranged in 2 rows of 3 */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 flex flex-col gap-1 md:gap-2 z-10">
              <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                {labels.slice(0, 3).map((label, idx) => (
                  <React.Fragment key={label}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="px-2 py-1 md:px-3 md:py-1.5 bg-blue-200/80 backdrop-blur-sm rounded-full text-[10px] md:text-xs font-medium text-white shadow-sm"
                    >
                      {label}
                    </motion.div>
                    {idx < 2 && (
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-300/80 rounded-full"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                {labels.slice(3).map((label, idx) => (
                  <React.Fragment key={label}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      className="px-2 py-1 md:px-3 md:py-1.5 bg-blue-200/80 backdrop-blur-sm rounded-full text-[10px] md:text-xs font-medium text-white shadow-sm"
                    >
                      {label}
                    </motion.div>
                    {idx < 2 && (
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-blue-300/80 rounded-full"></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Bottom Text with Icon - Light blue circle with white swirl */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex items-center gap-1.5 md:gap-2 text-white/90 text-[10px] md:text-xs z-10">
              <div className="w-6 h-6 rounded-full bg-blue-200/80 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <span className="font-light">Creativity, innovation, progress</span>
            </div>

            {/* Section Number - Light gray circle with dark gray number */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200/80 flex items-center justify-center z-10">
              <span className="text-base md:text-xl font-medium text-gray-700">01</span>
            </div>
          </motion.div>

          {/* Tab 02 - Marketing */}
          <div className="hidden lg:flex flex-col gap-5 h-[280px] md:h-[350px] lg:h-[400px] justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative w-12 md:w-14 h-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 bg-[#1e3a5f] shadow-lg"
            >
              <div
                className="text-xs font-bold text-white"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                }}
              >
                {tabs[0].label}
              </div>
              <div className="absolute bottom-3 w-6 h-6 rounded-full bg-gray-200/80 flex items-center justify-center">
                <span className="text-[10px] text-gray-700">{tabs[0].id}</span>
              </div>
            </motion.div>
          </div>

          {/* Tab 03 - Innovate */}
          <div className="hidden lg:flex flex-col gap-5 h-[280px] md:h-[350px] lg:h-[400px] justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative w-12 md:w-14 h-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 bg-blue-200/50 shadow-md"
            >
              <div
                className="text-xs font-normal text-white"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                }}
              >
                {tabs[1].label}
              </div>
              <div className="absolute bottom-3 w-6 h-6 rounded-full bg-gray-200/80 flex items-center justify-center">
                <span className="text-[10px] text-gray-700">{tabs[1].id}</span>
              </div>
            </motion.div>
          </div>

          {/* Main Content Card - Section 04 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full lg:flex-[0.9] h-[280px] md:h-[350px] lg:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden"
          >
            {/* Glassmorphism Background with linear - Light blue at top to white at bottom */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl border border-white/40 rounded-2xl md:rounded-3xl shadow-2xl">
              {/* linear Background behind glass */}
              <div className="absolute inset-0 bg-linear-to-b from-blue-200/40 via-blue-100/20 to-white rounded-2xl md:rounded-3xl">
                {/* Abstract swirling blue patterns */}
                <div className="absolute inset-0 opacity-60">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl"></div>
                  <div className="absolute top-10 left-20 w-64 h-64 bg-blue-400/30 rounded-full blur-2xl"></div>
                  <div className="absolute top-20 left-40 w-48 h-48 bg-blue-200/50 rounded-full blur-xl"></div>
                  {/* Swirling brushstroke patterns */}
                  <svg className="absolute top-0 left-0 w-full h-full opacity-40" viewBox="0 0 400 600">
                    <path d="M50 100 Q150 50, 200 150 T350 200" stroke="rgba(59, 130, 246, 0.3)" strokeWidth="3" fill="none" />
                    <path d="M100 200 Q200 150, 300 250 T450 300" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="2" fill="none" />
                    <path d="M150 300 Q250 250, 350 350" stroke="rgba(147, 197, 253, 0.3)" strokeWidth="2.5" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-4 md:p-6 lg:p-8 z-10">
              {/* Section Number - Light gray circle with dark gray number */}
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-200/80 flex items-center justify-center">
                <span className="text-xs md:text-sm font-medium text-gray-700">04</span>
              </div>

              {/* User Icon - Dark blue silhouette in white circle */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center z-20 shadow-lg">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-[#1e3a5f]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              {/* Main Content - Centered */}
              <div className="flex-1 flex flex-col justify-center items-center text-center space-y-2 md:space-y-4 mt-4 md:mt-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  // ✅ FIXED: Removed conflicting `text-white`
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] tracking-tight px-2 bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent"
                >
                  SPARK YOUR CREATIVITY
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-xs md:text-sm text-gray-600 max-w-lg leading-relaxed font-light text-left px-2"
                >
                  Discover endless possibilities with Spark's innovative design
                  solutions.
                </motion.p>
              </div>

              {/* Explore Now Button - Light blue background with white border and white text, positioned bottom left */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="self-start px-3 py-1.5 md:px-4 md:py-2 bg-blue-200/80 backdrop-blur-sm rounded-lg border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-1.5 md:gap-2 text-white text-xs md:text-sm font-semibold hover:bg-blue-200/90"
              >
                Explore Now
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
          </motion.div>

          {/* Tab 05 - Elevate */}
          <div className="hidden lg:flex flex-col gap-5 h-[280px] md:h-[350px] lg:h-[400px] justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="relative w-12 md:w-14 h-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 bg-[#1e3a5f] shadow-lg"
            >
              <div
                className="text-xs font-bold text-white"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                }}
              >
                {tabs[2].label}
              </div>
              <div className="absolute bottom-3 w-6 h-6 rounded-full bg-gray-200/80 flex items-center justify-center">
                <span className="text-[10px] text-gray-700">{tabs[2].id}</span>
              </div>
            </motion.div>
          </div>

          {/* Tab 06 - Transform */}
          <div className="hidden lg:flex flex-col gap-5 h-[280px] md:h-[350px] lg:h-[400px] justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="relative w-12 md:w-14 h-full rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 bg-blue-200/50 shadow-md"
            >
              <div
                className="text-xs font-normal text-white"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  transform: 'rotate(180deg)',
                }}
              >
                {tabs[3].label}
              </div>
              <div className="absolute bottom-3 w-6 h-6 rounded-full bg-gray-200/80 flex items-center justify-center">
                <span className="text-[10px] text-gray-700">{tabs[3].id}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== METRICS/DATA SECTION (LIGHT BACKGROUND) ===== */}
      <div className="max-w-[1800px] mx-auto mt-2 md:mt-4 px-2 md:px-4 py-10">
        {/* Top Bar - Metrics and Social Icons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-3 md:mb-4">
          {/* Left Side - Metrics */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 lg:gap-6">
            <span className="text-gray-700 font-medium text-xs md:text-sm">98% Satisfied Clients</span>
            <span className="text-gray-700 font-medium text-xs md:text-sm">24/7 Customer Support</span>
            <span className="text-gray-700 font-medium text-xs md:text-sm">10K+ Happy Customers</span>
          </div>

          {/* Right Side - Social Media Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Behance Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white hover:bg-[#1e3a5f]/90 transition-colors"
            >
              <span className="text-[10px] md:text-xs font-bold">Be</span>
            </motion.button>
            {/* Instagram Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white hover:bg-[#1e3a5f]/90 transition-colors"
            >
              <svg
                className="w-5 h-5" // Kept `w-5 h-5`
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" />
              </svg>
            </motion.button>
            {/* X/Twitter Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white hover:bg-[#1e3a5f]/90 transition-colors"
            >
              <svg
                className="w-5 h-5" // Kept `w-5 h-5`
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-6">
          {/* Left Side - Heading and Button */}
          <div className="flex-1 w-full lg:w-auto">
            <motion.h1
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-linear-to-tr from-[#2052bd] to-[#7fcbe4] bg-clip-text text-transparent leading-[1.1] mb-6 max-w-5xl"
              style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
            >
              <span className="inline-flex items-center">
                THE{' '}
                <span className="relative inline-block mx-1.5">
                  DREAM
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                    className="absolute -top-0.5 -right-1.5 text-blue-500"
                  >
                    <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
                  </svg>
                </span>
              </span>
              <br />
              <span className="inline-flex items-center">
                IS OUR REALITY
              </span>
            </motion.h1>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-5 md:py-2.5 bg-[#1e3a5f] text-white rounded-lg font-semibold flex items-center gap-1.5 md:gap-2 hover:bg-[#1e3a5f]/90 transition-colors shadow-lg text-xs md:text-sm"
            >
              Create project
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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

          {/* Right Side - Data Cards */}
          <div className="flex-1 w-full lg:w-auto grid grid-cols-2 lg:flex gap-2 md:gap-3">
            {/* Card 1 - Impressions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex-1 bg-gray-100 rounded-lg p-2 md:p-3 flex items-center gap-2 md:gap-3 min-w-0"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs text-gray-500 mb-0.5">Impressions:</p>
                <p className="text-sm md:text-lg font-bold text-gray-900">2.3M</p>
              </div>
            </motion.div>

            {/* Card 2 - Conversion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-1 bg-gray-100 rounded-lg p-2 md:p-3 flex items-center gap-2 md:gap-3 min-w-0"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs text-gray-500 mb-0.5">Conversion:</p>
                <p className="text-sm md:text-lg font-bold text-gray-900">35%</p>
              </div>
            </motion.div>

            {/* Card 3 - Customers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex-1 bg-gray-100 rounded-lg p-2 md:p-3 flex items-center gap-2 md:gap-3 min-w-0"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs text-gray-500 mb-0.5">Customers:</p>
                <p className="text-sm md:text-lg font-bold text-gray-900">2 341</p>
              </div>
            </motion.div>

            {/* Card 4 - Clicks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex-1 bg-gray-100 rounded-lg p-2 md:p-3 flex items-center gap-2 md:gap-3 min-w-0"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 md:w-5 md:h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs text-gray-500 mb-0.5">Clicks:</p>
                <p className="text-sm md:text-lg font-bold text-gray-900">+83.3%</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;