"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Rocket,
  Users2,
  HeartHandshake,
  Timer,
} from "lucide-react";
import React from "react";
import Image from "next/image";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: ShieldCheck,
      img: "images/why/trust2.png",
      title: "Trusted Expertise",
      desc:
        "We deliver scalable and secure software, backed by years of engineering experience and proven success.",
    },
    {
      icon: Sparkles,
      img: "images/why/innovation1.png",
      title: "Innovation First",
      desc:
        "We embrace emerging technologies to keep your business ahead of the curve, not behind it.",
    },
    {
      icon: Rocket,
      img: "images/why/fast.png",
      title: "Fast Execution",
      desc:
        "Our agile teams move with startup speed, delivering quality results in record time.",
    },
    {
      icon: Users2,
      img: "images/why/connect2.png",
      title: "Collaborative Approach",
      desc:
        "We work as your tech partner, aligning every step with your business goals.",
    },
    {
      icon: Timer,
      img: "images/why/time.png",
      title: "On-Time Delivery",
      desc:
        "No delays, no excuses — just consistent, reliable timelines that businesses trust.",
    },
    {
      icon: HeartHandshake,
      img: "images/why/connect.png",
      title: "Long-Term Partnership",
      desc:
        "We don’t just finish projects — we build relationships that last through growth and evolution.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="relative py-20 overflow-hidden"
    >
      {/* linear accents */}
      <div className="absolute top-10 left-10 h-64 w-64 bg-linear-to-tr from-blue-600 to-cyan-400 opacity-20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-64 w-64 bg-linear-to-tr from-cyan-500 to-blue-400 opacity-20 blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-6xl text-[#2052bd]">
            Why{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
              Choose Us
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            We’re not just another software company — we’re your growth partner,
            driven by technology, design, and results.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="relative group p-6 rounded-4xl bg-white/5 backdrop-blur-xl border border-blue-500/20 hover:border-cyan-400/40 hover:shadow-blue-300/80 shadow-md transition-all duration-500"
            >
              <div className="absolute -top-[10%] left-0 w-40 h-[120%] flex justify-center items-center bg-linear-to-tr from-blue-600 to-blue-300 text-white rounded-4xl  border-blue-300/50 overflow-hidden">
                <img
                  src={item.img}
                  alt="trust"
                  className="absolute inset-0 object-fill w-full h-full "
                />
              </div>
              <div className="ml-44">
                <h3 className="text-xl font-semibold text-blue-400 transition">
                  {item.title}
                </h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
