"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div className={cn("absolute inset-0 z-0 pointer-events-none flex items-center justify-center", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,#ffffff10_2px,transparent_0)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};
