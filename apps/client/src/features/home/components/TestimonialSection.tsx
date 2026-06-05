"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "motion/react";

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
        offset: ["0 1", "0 0"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const targetProgress = isMobile ? 0.5 : 1;
    const startWidth = isMobile ? 90 : 50;
    const startRadius = isMobile ? 60 : 300;

    const widthVal = useTransform(smoothProgress, [0, targetProgress], [startWidth, 100]);
    const width = useMotionTemplate`${widthVal}%`;

    const radiusVal = useTransform(smoothProgress, [0, targetProgress], [startRadius, 0]);
    const borderRadius = useMotionTemplate`${radiusVal}px`;

    return (
        <div id="testimonials" ref={containerRef} className="w-full flex justify-center pt-10 bg-black">
            <motion.section 
                style={{ width, borderRadius }}
                className="relative text-blue-500 py-20 overflow-hidden bg-white"
            >
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
            </motion.section>
        </div>
    );
}
