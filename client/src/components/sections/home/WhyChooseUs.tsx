"use client";

import { motion, Transition } from "framer-motion"; // Added Transition import
import {
  ShieldCheck,
  Sparkles,
  Rocket,
  Users2,
  HeartHandshake,
  Timer,
} from "lucide-react";
import React from "react";
import { transition } from "three/examples/jsm/tsl/display/TransitionNode.js";

interface Reason {
  icon: any;
  img: string;
  title: string;
  desc: string;
}

interface ReasonItemProps {
  item: Reason;
  index: number;
}

const ReasonItem: React.FC<ReasonItemProps> = ({ item, index }) => {
  const isImageLeft = index % 2 === 0;

  const textAnimation = (index: number) => ({
    initial: { opacity: 0, x: index % 2 === 0 ? 30 : -30 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 1 },
  });

  const imageAnimation = (index: number) => ({
    initial: { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 1 },
  });

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
        isImageLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <motion.div
        {...imageAnimation(index)}
        className="w-full md:w-1/2 p-4 flex justify-center relative"
      >
        <div className="relative w-full max-w-sm p-4 aspect-4/5 rounded-4xl overflow-hidden shadow-2xl bg-blue-500/30 backdrop-blur-sm ">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover rounded-4xl"
          />
        </div>
      </motion.div>

      <motion.div {...textAnimation(index)} className="w-full md:w-1/2 md:p-8">
        <div className="flex items-center justify-center text-center mb-4">
          <item.icon className="w-14 h-14 mr-4 text-blue-500" />
          <h3 className="text-3xl md:text-5xl text-transparent text-nowrap pb-2 bg-clip-text bg-linear-to-r from-blue-700 to-cyan-500 text-center">
            {item.title}
          </h3>
        </div>
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-slate-300 text-center">
          {item.desc}
        </p>
      </motion.div>
    </div>
  );
};

export default function WhyChooseUs() {
  const reasons: Reason[] = [
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
    <section id="why-choose-us" className="relative py-30 overflow-hidden">
      <motion.div
      initial={{y:50}}
      whileInView={{y:0}}
      transition={{duration:1}}
      className="absolute top-60 w-[150vw] h-[150vw] -ml-[25vw] rounded-full scale-120 bg-linear-to-r from-blue-700 to-cyan-400 pt-3">
        <div className="w-full h-full rounded-full bg-black"></div>
      </motion.div>

      <div className="absolute bottom-0 bg-linear-to-t from-black to-blue-700 w-screen h-16" />
      <div className="absolute bottom-10 right-10 h-64 w-64 bg-blue-500 opacity-10 blur-3xl" />
      <div className="container mx-auto px-6 lg:px-8 relative z-10 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-6xl text-[#0062ff]">
            Why{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
              Choose Us
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
            We’re not just another software company — we’re your growth partner,
            driven by technology, design, and results.
          </p>
        </motion.div>

        <div className="flex flex-col mb-20">
          {reasons.map((item, index) => (
            <ReasonItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
