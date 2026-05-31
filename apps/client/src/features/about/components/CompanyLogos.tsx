"use client";

import { motion } from "motion/react";
import { SiGoogle, SiMeta, SiSpotify, SiNetflix, SiApple, SiTesla, SiVercel, SiFigma } from "react-icons/si";

const COMPANIES = [
  { name: "ANIMUS", number: "01", icon: SiGoogle },
  { name: "PRISMA", number: "02", icon: SiMeta },
  { name: "KPCO", number: "03", icon: SiSpotify },
  { name: "BOON", number: "04", icon: SiNetflix },
  { name: "NEON", number: "05", icon: SiApple },
  { name: "KLMX", number: "06", icon: SiTesla },
  { name: "VORTEX", number: "07", icon: SiVercel },
  { name: "ZENITH", number: "08", icon: SiFigma },
];

export const CompanyLogos = () => {
  return (
    <section className="py-24 bg-black relative border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Trusted By Leaders</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">Partnering with forward-thinking companies to build the digital future.</p>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Outer container with rounded corners and 1px border gap trick */}
        <div className="relative bg-white/10 p-[1px] rounded-3xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] rounded-[23px] overflow-hidden">
            {COMPANIES.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative bg-black aspect-[4/3] md:aspect-auto md:h-64 flex flex-col items-center justify-center p-6 hover:bg-white/[0.02] transition-colors"
              >
                {/* Top Left Number */}
                <div className="absolute top-6 left-6 text-xs font-mono text-slate-500">
                  {company.number}
                </div>
                
                {/* Center Logo */}
                <div className="flex flex-col items-center justify-center gap-4 text-white w-full">
                  <company.icon className="w-12 h-12 md:w-16 md:h-16 text-white/90" />
                  <span className="font-bold tracking-[0.2em] text-xl md:text-2xl uppercase hidden">{company.name}</span>
                </div>

                {/* Bottom Left Dot */}
                <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-slate-500"></div>

                {/* Bottom Right Name */}
                <div className="absolute bottom-6 right-6 text-[10px] font-mono tracking-widest uppercase text-slate-500">
                  {company.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
