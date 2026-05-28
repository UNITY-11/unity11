"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

function FlowCards({
  children,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "30s" : "40s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-screen overflow-hidden p-10 [mask:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </ul>
    </div>
  );
}

function CompanyCardItem({
  img,
  nameImg,
  name,
  width,
}: {
  img: string;
  nameImg: string;
  name: string;
  width?: number;
}) {
  return (
    <li className="w-[20vw] max-w-full relative flex justify-center items-center md:w-[15vw]">
      <blockquote>
        <div className="flex md:max-w-60 max-w-32 gap-2">
          <img src={img} alt={name} className="md:w-10 w-5" />
          <img
            src={nameImg}
            alt={name}
            width={width ?? 150}
            className="md:w-24 w-20"
          />
        </div>
      </blockquote>
    </li>
  );
}

export default FlowCards;
export { CompanyCardItem };

