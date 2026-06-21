"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/features/blogs/types";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const sideDistance = 200;

const getCardVariants = (i: number, isMobile: boolean) => { 
  if (isMobile) {
    return {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0, scale: 1, x: 0 },
    };
  }

  if (i === 0) {
    return {
      initial: { opacity: 0, x: sideDistance, scale: 1 },
      animate: { opacity: 1, x: 0, scale: 0.85 },
    };
  } else if (i === 1) {
    return {
      initial: { opacity: 0, x: 0, y: 30 },
      animate: { opacity: 1, x: 0, y: 0 },
    };
  } else if (i === 2) {
    return {
      initial: { opacity: 0, x: -sideDistance, scale: 1 },
      animate: { opacity: 1, x: 0, scale: 0.85 },
    };
  } else {
    return {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
    };
  }
};

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true);
  const displayPosts = posts.slice(0, 3);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
      target: isMounted && displayPosts.length > 0 ? containerRef : undefined,
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

  if (displayPosts.length === 0) {
    return null;
  }

  return (
    <div id="blog" ref={containerRef} className="w-full flex justify-center bg-white">
      <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-black text-white">
        {/* Top Notched Shape Cutout */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[60px] pointer-events-none z-20">
            <svg width="480" height="60" viewBox="0 0 480 60">
                <motion.path 
                    d={notchPath as any}
                    fill="white" 
                />
            </svg>
        </div>
        <div className="container mx-auto px-2 sm:px-4 lg:px-4 max-w-7xl">
          <div className="relative flex items-center justify-center mb-12 md:mb-16 lg:mb-20 px-6 md:px-0">
            <h2 className="text-3xl md:text-6xl text-transparent bg-clip-text bg-linear-to-r pb-1 from-[#2052bd] to-[#7fcbe4]">
              Our Blogs
            </h2>
          </div>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6 md:px-0 pb-8 md:pb-0">
          {displayPosts.map((post, i) => {
            const cardVariants = getCardVariants(i, isMobile);

            return (
              <Link href={`/blog/${post.slug}`} key={post.id} className="block shrink-0 w-[85vw] sm:w-[350px] md:w-auto snap-center">
                <motion.div
                  className={`group h-full bg-linear-to-t backdrop-blur-xl shadow-2xl rounded-4xl p-4 hover:bg-white/10 transition-all duration-300 ${post.bgColor} ${i == 1 ? 'z-20' : 'z-10'}`}
                  initial={cardVariants.initial}
                  whileInView={cardVariants.animate}
                  viewport={{ once: isMobile, margin: "-50px" }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-4">
                     <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-sm ">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-semibold transition">
                    {post.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 text-white text-sm opacity-0 group-hover:opacity-100 transition">
                    Read more →
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-12 md:mt-16 lg:mt-20 right-0 flex justify-center text-blue-500 w-full overflow-hidden px-4">
        <div className="flex justify-between items-center w-full max-w-md mx-auto">
          <button className="w-10 h-10 shrink-0 rounded-full border-2 flex items-center justify-center border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
            <IoIosArrowBack className="text-lg" />
          </button>
          <button
            onClick={() => router.push("/blog")}
            className="flex items-center justify-center rounded-full border-2 border-blue-500 px-8 sm:px-12 py-2 text-[#2052bd] shadow-lg transition-all gap-2 sm:gap-4 hover:gap-8 duration-500 flex-1 whitespace-nowrap font-semibold"
          >
            See More
          </button>
          <button className="w-10 h-10 shrink-0 rounded-full border-2 flex items-center justify-center border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-white transition-all">
            <IoIosArrowForward className="text-lg" />
          </button>
        </div>
      </div>
      </section>
    </div>
  );
}
