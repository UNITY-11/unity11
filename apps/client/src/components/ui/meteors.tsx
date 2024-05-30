"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteors, setMeteors] = useState<Array<{ id: number; left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    const newMeteors = new Array(number).fill(true).map((_, idx) => ({
      id: idx,
      left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
      delay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
      duration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
    }));
    const timer = setTimeout(() => {
      setMeteors(newMeteors);
    }, 0);
    return () => clearTimeout(timer);
  }, [number]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {meteors.map((meteor) => (
        <span
          key={"meteor" + meteor.id}
          className={cn(
            "animate-meteor absolute top-1/2 left-1/2 h-[0.1rem] w-[0.1rem] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
          )}
          style={{
            top: 0,
            left: meteor.left,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        ></span>
      ))}
    </div>
  );
};
