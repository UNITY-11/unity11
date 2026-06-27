"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { motion, useScroll, useTransform } from "motion/react";

export default function TestimonialSection() {
    const router = useRouter();
    const testimonialsRef = useRef<{ handleMove: (direction: number) => void } | null>(null);
    const containerRef = useRef(null);

    const [isMobile, setIsMobile] = useState(true);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: isMounted ? containerRef : undefined,
        offset: ["start 80%", "start 20%"]
    });

    const notchPath = useTransform(
        scrollYProgress,
        [0, 1],
        [
            "M 0 0 C 48 0, 72 0, 144 0 L 336 0 C 408 0, 432 0, 480 0 Z",
            "M 0 0 C 48 0, 72 56, 144 56 L 336 56 C 408 56, 432 0, 480 0 Z"
        ]
    );

    return (
        <div id="testimonials" ref={containerRef} className="w-full flex justify-center bg-black">
            <section
                className="relative w-full text-blue-500 py-24 lg:py-32 overflow-hidden bg-white"
            >
                {/* Top Notched Shape Cutout */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[380px] md:w-[480px] pointer-events-none z-20">
                    <svg viewBox="0 0 480 60" className="w-full h-auto">
                        <motion.path
                            d={notchPath as any}
                            fill="black"
                        />
                    </svg>
                </div>
                <div className="container mx-auto px-2 sm:px-4 lg:px-4 max-w-7xl">
                    <div className="relative w-full flex flex-col justify-center items-center text-start">
                        <h2 className="text-4xl sm:text-6xl text-[#2052bd]">
                            What{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
                                People Say
                            </span>
                        </h2>
                        <p className="text-gray-600 mb-12 md:mb-16 lg:mb-20 mt-6 text-center">
                            Hear from our clients who trusted Unity11 to bring their digital <br />
                            visions to life with scalable, future-ready software solutions.
                        </p>
                    </div>

                </div>

                <div className="w-full relative z-10 md:my-16">
                    <StaggerTestimonials ref={testimonialsRef} />
                </div>
                <div className="mt-10 right-0 flex justify-center text-blue-500 relative z-20 w-full overflow-hidden px-4">
                    <div className="flex justify-center items-center gap-4">
                        <button
                            onClick={() => testimonialsRef.current?.handleMove(-1)}
                            className="group relative flex items-center justify-center w-10 h-10 text-[#0062ff] transition-colors duration-300"
                        >
                            <svg className="absolute inset-0 z-0" width="40" height="40" viewBox="0 0 40 40">
                                <path 
                                    d="M 1 1 L 27 1 L 39 13 L 39 39 L 13 39 L 1 27 Z" 
                                    className="fill-transparent stroke-current group-hover:fill-current transition-colors duration-300" 
                                    strokeWidth="2" 
                                />
                            </svg>
                            <IoIosArrowBack className="relative z-10 text-lg transition-colors duration-300 group-hover:text-white" />
                        </button>

                        <button
                            onClick={() => router.push("/about")}
                            className="group relative flex items-center justify-center w-56 h-10 text-[#0062ff] transition-colors duration-300"
                        >
                            <svg className="absolute inset-0 z-0" width="224" height="40" viewBox="0 0 224 40">
                                <path 
                                    d="M 17 1 L 223 1 L 223 23 L 207 39 L 1 39 L 1 17 Z" 
                                    className="fill-transparent stroke-current group-hover:fill-current transition-colors duration-300" 
                                    strokeWidth="2" 
                                />
                            </svg>
                            <span className="relative z-10 font-semibold tracking-wide transition-colors duration-300 group-hover:text-white">
                                See More
                            </span>
                        </button>

                        <button
                            onClick={() => testimonialsRef.current?.handleMove(1)}
                            className="group relative flex items-center justify-center w-10 h-10 text-[#0062ff] transition-colors duration-300"
                        >
                            <svg className="absolute inset-0 z-0" width="40" height="40" viewBox="0 0 40 40">
                                <path 
                                    d="M 1 1 L 27 1 L 39 13 L 39 39 L 13 39 L 1 27 Z" 
                                    className="fill-transparent stroke-current group-hover:fill-current transition-colors duration-300" 
                                    strokeWidth="2" 
                                />
                            </svg>
                            <IoIosArrowForward className="relative z-10 text-lg transition-colors duration-300 group-hover:text-white" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
