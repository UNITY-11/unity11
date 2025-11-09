"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power3.out",
      });

      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Hover effects for clickable elements
    const handleMouseEnter = () => {
      gsap.to(ring, {
        scale: 0.5,
        borderColor: "#8B5CF6",
        borderWidth: "0.5px",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(cursor, {
        backgroundColor: "#ffffff",
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "#185fca",
        borderWidth: "2px",
        duration: 0.3,
        ease: "power3.out",
      });
      gsap.to(cursor, {
        backgroundColor: "linear-gradient(to top right, #2052bd, #7fcbe4)",
        duration: 0.3,
      });
    };

    // Reset when leaving the page
    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) handleMouseLeave();
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseout", handleMouseOut);

    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseout", handleMouseOut);

      document.querySelectorAll("a, button").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-9998 w-20 h-20 rounded-full border-2 border-[#185fca] bg-transparent pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>

      {/* Inner Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-9999 w-1.5 h-1.5 rounded-full bg-[linear-gradient(to_top_right,#2052bd,#7fcbe4)] pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>
    </>
  );
}
