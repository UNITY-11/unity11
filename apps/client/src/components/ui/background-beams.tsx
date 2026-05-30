"use client";

import { cn } from "@/utils/cn";
import { motion } from "motion/react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 z-0 pointer-events-none flex items-center justify-center", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <motion.div
         animate={{ opacity: [0, 1, 0], y: [-100, 100], x: [-100, 100] }}
         transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
         className="absolute top-1/2 left-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rotate-45"
      />
      <motion.div
         animate={{ opacity: [0, 1, 0], y: [100, -100], x: [-100, 100] }}
         transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
         className="absolute top-1/2 left-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent -rotate-45"
      />
    </div>
  );
};
