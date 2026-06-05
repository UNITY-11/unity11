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

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
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
                className="relative w-full text-blue-500 py-20 overflow-hidden bg-white"
            >
                {/* Top Notched Shape Cutout */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[60px] pointer-events-none z-20">
                    <svg width="480" height="60" viewBox="0 0 480 60">
                        <motion.path 
                            d={notchPath as any}
                            fill="black" 
                        />
                    </svg>
                </div>
                <div className="container max-w-7xl mx-auto text-start px-6">
                <div className="relative w-full flex flex-col justify-center items-center text-start">
                    <h2 className="text-4xl sm:text-6xl text-[#2052bd]">
                        What{" "}
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
                            People Say
                        </span>
                    </h2>
                    <p className="text-gray-600 mb-12 mt-6 text-center">
                        Hear from our clients who trusted Unity11 to bring their digital <br />
                        visions to life with scalable, future-ready software solutions.
                    </p>
                </div>

            </div>

            <div className="w-full relative z-10 my-10">
                <StaggerTestimonials ref={testimonialsRef} />
            </div>
            <div className="mt-10 right-0 flex justify-center text-blue-500 relative z-20 w-full overflow-hidden px-4">
                <div className="flex justify-between items-center w-full max-w-md mx-auto">
                    <button 
                        onClick={() => testimonialsRef.current?.handleMove(-1)}
                        className="w-10 h-10 shrink-0 rounded-full border-2 flex items-center justify-center border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                    >
                        <IoIosArrowBack className="text-lg" />
                    </button>
                    <button
                        onClick={() => router.push("/about")}
                        className="flex items-center justify-center rounded-full bg-linear-to-r px-8 sm:px-12 py-2 text-[#2052bd] border-2 border-blue-500 shadow-lg transition-all gap-2 sm:gap-4 hover:gap-8 duration-500 flex-1 whitespace-nowrap"
                    >
                        See More
                    </button>
                    <button 
                        onClick={() => testimonialsRef.current?.handleMove(1)}
                        className="w-10 h-10 shrink-0 rounded-full border-2 flex items-center justify-center border-blue-500/30 text-blue-500 hover:bg-blue-500 hover:text-white transition-all"
                    >
                        <IoIosArrowForward className="text-lg" />
                    </button>
                </div>
            </div>
            </section>
        </div>
    );
}
