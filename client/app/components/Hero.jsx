'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const processSteps = [
    { id: 1, label: '', active: false },
    { id: 2, label: 'Marketing', active: true },
    { id: 3, label: 'Innovate', active: false },
    { id: 4, label: 'SPARK YOUR CREATIVITY', active: true, expanded: true },
    { id: 5, label: 'Elevate', active: false },
    { id: 6, label: 'Transform', active: false },
  ];

  const stats = [
    { icon: '📊', label: 'Impressions', value: '2.3M' },
    { icon: '📈', label: 'Conversion', value: '35%' },
    { icon: '👥', label: 'Customers', value: '2 341' },
    { icon: '🔄', label: 'Clicks', value: '+83.3%' },
  ];

  return (
    <section className="relative min-h-screen w-full bg-white overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-12 lg:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Top Section - Header */}
          <div className="relative mb-12 lg:mb-16">
            {/* Top Right Marketing Analytics Box */}
            <motion.div
              variants={fadeInVariants}
              className="absolute top-0 right-0 z-10 max-w-xs"
            >
              <div className="relative bg-[#A0B0D9]/20 rounded-2xl p-4 border border-[#A0B0D9]/30 backdrop-blur-sm">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="currentColor"
                  className="absolute -top-1 -left-1 text-[#2A408C]"
                >
                  <path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3L4 0Z" />
                </svg>
                <p className="text-sm text-black/80 leading-relaxed">
                  Marketing analytics: Illuminating your path to digital triumph by decoding data intricacies.
                </p>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeUpVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-[1.1] mb-6 max-w-5xl pr-80"
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
                    className="absolute -top-0.5 -right-1.5 text-[#2A408C]"
                  >
                    <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
                  </svg>
                </span>
              </span>
              <br />
              <span className="inline-flex items-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-[#2A408C] mr-2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                NAVIGATOR IS YOUR PATH TO INSPIRATION
              </span>
              <br />
              <span className="inline-flex items-center">
                AND{' '}
                <span className="relative inline-block mx-1.5">
                  INNOVATION
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                    className="absolute -top-0.5 -right-1.5 text-[#2A408C]"
                  >
                    <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
                  </svg>
                </span>
              </span>
            </motion.h1>
          </div>

          {/* Mid Section - Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {/* Left Visual Block - Index 01 */}
            <motion.div
              variants={scaleVariants}
              className="lg:col-span-5 relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden"
            >
              {/* Crumpled Fabric Texture Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#A0B0D9]/40 via-[#A0B0D9]/30 to-[#A0B0D9]/20 rounded-3xl">
                {/* Texture Pattern */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(42, 64, 140, 0.15) 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                  }}
                />
              </div>

              {/* White Spheres */}
              <div className="absolute inset-0">
                {/* Large Sphere */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 bg-white rounded-full shadow-2xl shadow-[#2A408C]/25"
                  style={{
                    top: '15%',
                    left: '8%',
                  }}
                />
                {/* Small Sphere */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 bg-white rounded-full shadow-xl shadow-[#2A408C]/20"
                  style={{
                    bottom: '20%',
                    right: '12%',
                  }}
                />
              </div>

              {/* Pill Tags */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
                {[
                  'SEO',
                  'Digital Marketing',
                  'Content Strategy',
                  'Video Marketing',
                  'Data Analytics',
                  'Email Marketing',
                ].map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.8 + index * 0.1,
                    }}
                    className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-gray-300 text-xs text-black font-medium shadow-sm"
                  >
                    {tag}
                  </motion.div>
                ))}
              </div>

              {/* Bottom Text with Icon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 1.4,
                }}
                className="absolute bottom-6 left-6 flex items-center gap-2 text-sm text-white font-medium"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white"
                >
                  <path d="M12 2v20M2 12h20" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                <span>Creativity, innovation, progress</span>
              </motion.div>

              {/* Index Number */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.6,
                }}
                className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center text-lg font-bold text-black"
              >
                01
              </motion.div>
            </motion.div>

            {/* Right Panel - Process Steps */}
            <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-6">
              {/* Explore Button Above Card */}
              <motion.div
                variants={fadeInVariants}
                className="flex justify-end mb-2"
              >
                <button className="px-4 py-2 rounded-full bg-[#A0B0D9]/20 text-[#2A408C] font-medium text-sm hover:bg-[#A0B0D9]/30 transition-all duration-300 flex items-center gap-1.5">
                  Explore
                  <span>→</span>
                </button>
              </motion.div>

              {/* Process Steps Container - Vertical Layout */}
              <div className="flex flex-col gap-4 lg:gap-6">
                {processSteps.map((step, index) => {
                  if (step.expanded) {
                    // Expanded Card for Step 04
                    return (
                      <motion.div
                        key={step.id}
                        variants={scaleVariants}
                        className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden"
                      >
                        {/* Glassmorphism Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2A408C]/60 via-[#A0B0D9]/40 to-[#A0B0D9]/30 backdrop-blur-2xl rounded-3xl border border-white/30 shadow-2xl" />

                        {/* Index Number */}
                        <div className="absolute top-6 left-6 text-2xl font-bold text-white/80">
                          0{step.id}
                        </div>

                        {/* Circular Image */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.6,
                          }}
                          className="absolute top-6 right-6 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 overflow-hidden"
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <svg
                              width="60"
                              height="60"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              className="opacity-80"
                            >
                              <circle cx="12" cy="8" r="3" />
                              <path d="M12 14v6M8 18h8" />
                            </svg>
                          </div>
                        </motion.div>

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center px-8 text-center">
                          <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.7,
                              delay: 0.4,
                            }}
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
                          >
                            {step.label}
                          </motion.h2>
                          <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.7,
                              delay: 0.6,
                            }}
                            className="text-white/90 text-sm sm:text-base mb-8 max-w-md"
                          >
                            Discover endless possibilities with Spark's innovative design solutions.
                          </motion.p>
                          <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.7,
                              delay: 0.8,
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 rounded-full bg-white text-[#2A408C] font-semibold text-sm sm:text-base hover:bg-white/90 transition-all duration-300 flex items-center gap-2 shadow-lg"
                          >
                            Explore Now
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  } else {
                    // Regular Process Bar - Vertical
                    return (
                      <motion.div
                        key={step.id}
                        variants={fadeUpVariants}
                        className="relative flex items-center gap-4"
                      >
                        <div
                          className={`flex-1 h-16 lg:h-20 rounded-2xl flex items-center justify-center font-semibold text-sm lg:text-base transition-all duration-300 ${
                            step.active
                              ? 'bg-[#2A408C] text-white'
                              : 'bg-[#A0B0D9]/30 text-white/80'
                          }`}
                        >
                          {step.label}
                        </div>
                        <span className="text-xs text-[#2A408C] font-bold w-8 text-center">
                          0{step.id}
                        </span>
                      </motion.div>
                    );
                  }
                })}
              </div>
            </div>
          </div>

          {/* Statistics Bar */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap items-center justify-center gap-6 lg:gap-12 mb-12 lg:mb-16 text-black font-medium text-sm lg:text-base"
          >
            <span>98% Satisfied Clients</span>
            <span>24/7 Customer Support</span>
            <span>10K+ Happy Customers</span>
          </motion.div>

          {/* Bottom Section - Statistics and CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* Left CTA Block */}
            <motion.div
              variants={fadeUpVariants}
              className="lg:col-span-4"
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-6">
                Fueling growth with data Insights
              </h3>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-[#2A408C] text-white font-semibold text-base sm:text-lg hover:bg-[#1e2f6b] transition-all duration-300 flex items-center gap-2 shadow-lg"
              >
                Create project
                <span className="text-xl">→</span>
              </motion.button>
            </motion.div>

            {/* Statistics Cards */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: 0.2 + index * 0.1,
                  }}
                  className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl sm:text-3xl">{stat.icon}</div>
                  </div>
                  <div className="text-xs sm:text-sm text-black/60 mb-1">
                    {stat.label}:
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-black">
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Social Icons */}
          <motion.div
            variants={fadeInVariants}
            className="flex justify-end gap-3 mt-8 lg:mt-12"
          >
            {['Be', 'O', 'X'].map((social, index) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2A408C] text-white flex items-center justify-center font-semibold text-sm sm:text-base hover:bg-[#1e2f6b] transition-colors duration-300 shadow-lg"
              >
                {social}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#A0B0D9]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#2A408C]/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};
