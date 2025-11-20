"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-white py-20 lg:py-28"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image or Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-6 -top-6 h-48 w-48 rounded-full bg-linear-to-tr from-blue-600 to-cyan-500 blur-3xl opacity-60" />
            <Image
              src="/gif/cub-illution.gif"
              alt="About Unity11"
              width={520}
              height={420}
              className="relative z-10  w-120"
            />
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl text-[#2052bd] sm:text-6xl">
              About{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
                Company
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-400 max-w-xl">
              At Unity11, we build scalable digital products that help
              businesses grow fast and sustainably. From SaaS platforms to
              mobile apps, our solutions combine innovation, design precision,
              and powerful engineering to create real impact.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 ">
              {/* Mission Card */}
              <div className="bg-linear-to-tr from-blue-500 to-blue-100 rounded-[20%]">
                <div
                className="relative overflow-hidden rounded-4xl h-64 sm:h-50 shadow-md bg-[url('/images/about/mission.png')] bg-cover bg-center"
              >
                <div className="relative inset-0 z-10" />
                <div className="h-full z-20 p-4 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold drop-shadow-md text-white">
                    Our Mission
                  </h3>
                  <p className="mt-2 text-sm text-white/90 drop-shadow-sm max-w-xs">
                    Empower startups and enterprises to achieve digital
                    excellence through human-centered technology.
                  </p>
                </div>
              </div>
              </div>

              {/* Vision Card */}
              <div className="bg-linear-to-tl from-blue-500 to-blue-100 rounded-[20%]">
                <div
                className="relative overflow-hidden rounded-3xl h-64 sm:h-50 shadow-md bg-[url('/images/about/vision.png')] bg-cover bg-center"
              >
                <div className="relative inset-0 z-10" />
                <div className="h-full z-20 p-2 flex flex-col justify-center bottom-0 backdrop-blur-">
                  <h3 className="text-xl font-semibold drop-shadow-md text-white">
                    Our Vision
                  </h3>
                  <p className="mt-2 text-sm text-white/90 drop-shadow-sm max-w-xs">
                    To be a global leader in software development, known for
                    innovation, reliability, and customer trust.
                  </p>
                </div>
              </div>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <a
                href="/about"
                className="flex items-center rounded-full bg-linear-to-r from-[#2052bd] to-[#7fcbe4] px-6 py-3  text-white shadow-lg transition-all gap-4 hover:gap-6 duration-500"
              >
                Learn MOre
                <IoIosArrowForward className="text-xl sm:text-2xl" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-linear-to-br from-blue-600 to-cyan-500  blur-3xl opacity-60" />
    </section>
  );
}
