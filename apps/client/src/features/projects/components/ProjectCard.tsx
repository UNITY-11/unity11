import { motion } from "motion/react";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { Project, ProjectCardProps } from "../types";

export function ProjectCard({
  tag1,
  tag2,
  title,
  description,
  image,
  bg,
  index = 0,
}: ProjectCardProps) {
  const isGradient = bg.startsWith("linear-gradient");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
      style={isGradient ? { background: bg } : undefined}
      className={`group ${isGradient ? "" : bg} w-full rounded-4xl overflow-hidden shadow-sm flex flex-col justify-between relative`}
    >
      <div className="p-6">
        {/* tags */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs px-3 py-1.5 rounded-full text-white bg-white/40 backdrop-blur-3xl shadow-sm">
            {tag1}
          </span>
          <span className="text-xs px-3 py-1.5 rounded-full text-white bg-white/40 backdrop-blur-3xl shadow-sm">
            {tag2}
          </span>
        </div>

        {/* title & desc */}
        <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white leading-none">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-white/90 line-clamp-3 leading-snug">
          {description}
        </p>
      </div>

      {/* image */}
      <div className="relative w-full aspect-[4/3] rounded-t-3xl overflow-hidden mt-4">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
        {/* CTA */}
        <button className="absolute bottom-6 left-6 text-sm font-medium flex items-center gap-2 bg-black/30 backdrop-blur-2xl rounded-full p-2.5 px-5 text-white hover:bg-black/50 hover:gap-3 transition-all duration-300 shadow-lg border border-white/10">
          View Case Study <IoIosArrowForward className="text-xl" />
        </button>
      </div>
    </motion.div>
  );
}
