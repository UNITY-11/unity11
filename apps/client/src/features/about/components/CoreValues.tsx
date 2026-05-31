"use client";

import { CardSpotlight } from "@/components/ui/cards/card-spotlight";
import { Shield, Zap, Users, Globe, Lightbulb, Target } from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  {
    title: "Innovation First",
    description: "We constantly push the boundaries of what's possible, adopting cutting-edge technologies to solve complex problems.",
    icon: Lightbulb,
  },
  {
    title: "Ironclad Security",
    description: "In a world of evolving threats, we build systems where security is foundational, not an afterthought.",
    icon: Shield,
  },
  {
    title: "Client-Centric",
    description: "Your success is our success. We partner closely with our clients to ensure our solutions align perfectly with their goals.",
    icon: Users,
  },
  {
    title: "Lightning Fast",
    description: "Performance matters. We engineer highly optimized applications that deliver seamless experiences at scale.",
    icon: Zap,
  },
  {
    title: "Global Perspective",
    description: "With a diverse team and international clientele, we build software designed for a connected global economy.",
    icon: Globe,
  },
  {
    title: "Result Driven",
    description: "We don't just write code; we deliver measurable business outcomes, from increased revenue to operational efficiency.",
    icon: Target,
  },
];

export const CoreValues = () => {
  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Core Values</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">The principles that guide our engineering, our partnerships, and our growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <CardSpotlight className="h-full p-8 flex flex-col items-start bg-white/[0.02]">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 mb-6 border border-blue-500/20">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 z-20 relative">{value.title}</h3>
                <p className="text-slate-400 leading-relaxed z-20 relative">
                  {value.description}
                </p>
              </CardSpotlight>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
