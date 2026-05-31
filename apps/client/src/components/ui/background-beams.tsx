"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useInView } from "motion/react";
import { useEffect, useRef } from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    // Only track mouse movement when this background is actually visible on screen
    if (!isInView) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / 25;
      const y = (e.clientY - window.innerHeight / 2) / 25;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isInView]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden", className)}>
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_100%_60vh_at_50%_0%,#000_60%,transparent_100%)]">
        <motion.div 
          style={{ x: springX, y: springY }}
          className="absolute -inset-[10%] w-[120%] h-[120%] bg-gradient-to-br from-blue-500/40 via-cyan-400/40 to-blue-600/40 [mask-image:radial-gradient(circle_at_2px_2px,#000_2px,transparent_0)] [mask-size:32px_32px]" 
        />
      </div>
    </div>
  );
};
