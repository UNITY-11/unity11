"use client";

import { motion } from "motion/react";

const STATS = [
  { label: "Projects Shipped", value: "150+", suffix: "" },
  { label: "Global Clients", value: "50+", suffix: "" },
  { label: "System Uptime", value: "99.99", suffix: "%" },
  { label: "Years Experience", value: "10+", suffix: "" },
];

export const Stats = () => {
  return (
    <section className="py-24 bg-black relative border-t border-white/10">
      <div className="absolute inset-0 bg-blue-500/5" />
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6"
            >
              <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2 drop-shadow-sm">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-slate-400 text-sm md:text-base font-medium tracking-wider uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
