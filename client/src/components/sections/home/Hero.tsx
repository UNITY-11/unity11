'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface ProcessStep {
  id: number;
  label: string;
  active: boolean;
  expanded?: boolean;
}

interface Stat {
  icon: string;
  label: string;
  value: string;
}

export const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpVariants: Variants = {
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

  const fadeInVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const scaleVariants: Variants = {
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

  const processSteps: ProcessStep[] = [
    { id: 1, label: '', active: false },
    { id: 2, label: 'Marketing', active: true },
    { id: 3, label: 'Innovate', active: false },
    { id: 4, label: 'SPARK YOUR CREATIVITY', active: true, expanded: true },
    { id: 5, label: 'Elevate', active: false },
    { id: 6, label: 'Transform', active: false },
  ];

  const stats: Stat[] = [
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
              <div className="relative bg-[#a0b0d9]/20 rounded-2xl p-4 border border-[#a0b0d9]/30 backdrop-blur-sm">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="currentColor"
                  className="absolute -top-1 -left-1 text-[#2a408c]"
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
                    className="absolute -top-0.5 -right-1.5 text-[#2a408c]"
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
                  className="text-[#2A408] mr-2"
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
                    className="absolute -top-0.5 -right-1.5 text-[#2a408c]"
                  >
                    <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z" />
                  </svg>
                </span>
              </span>
            </motion.h1>
          </div>

          {/* Mid Section - Main Content Area */}
          {/* ... the rest of your JSX remains unchanged ... */}
        </motion.div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#a0b0d9]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#2a408c]/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};
