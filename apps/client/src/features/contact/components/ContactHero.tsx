"use client";

import { motion } from "framer-motion";

export const ContactHero = () => {
  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-black px-4 sm:px-6 lg:px-8 pt-20">
      {/* Decorative Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#2052bd]/5 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7fcbe4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-32 -left-24 w-72 h-72 bg-[#2052bd]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Available for new projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
        >
          Let&apos;s build something <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2052bd] to-[#7fcbe4]">
            extraordinary together.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-light"
        >
          Whether you have a specific project in mind or just want to explore possibilities, our team is ready to help turn your vision into reality.
        </motion.p>
      </div>
    </section>
  );
};
