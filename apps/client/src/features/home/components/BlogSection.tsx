"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/features/blogs/data/blogs";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

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
      initial: {x: sideDistance, scale:1},
      animate: {x: 0, scale:0.85},
    };
  } else if (i === 1) {
    return {
      initial: { x: 0,},
      animate: {x:0,},
    };
  } else if (i === 2) {
    return {
      initial: {x: -sideDistance, scale:1,},
      animate: {x: 0, scale:0.85},
    };
  } else {
    return {
      initial: {x: 30 },
      animate: {x: 0 },
    };
  }
};

export default function BlogSection() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true); // default true to prevent huge cards before hydration

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto md:px-6">
        <div className="relative flex items-center justify-center mb-10 px-6 md:px-0">
          <h2 className="text-3xl md:text-6xl text-transparent bg-clip-text bg-linear-to-r pb-1 from-[#2052bd] to-[#7fcbe4]">
            Our Blogs
          </h2>
        </div>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-6 md:px-0 pb-8 md:pb-0">
          {posts.map((post, i) => {
            const cardVariants = getCardVariants(i, isMobile);

            return (
              <Link href={`/blog/${post.slug}`} key={i} className="block shrink-0 w-[85vw] sm:w-[350px] md:w-auto snap-center">
                <motion.div
                  className={`group h-full bg-linear-to-t backdrop-blur-xl shadow-2xl rounded-4xl p-4 hover:bg-white/10 transition-all duration-300 ${post.bgColor} ${i == 1 ? 'z-20' : 'z-10'}`}
                  initial={cardVariants.initial}
                  whileInView={cardVariants.animate}
                  viewport={{ once: true, margin: "-50px" }}
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
      <div className="mt-10 right-0 flex justify-center text-blue-500 w-full overflow-hidden px-4">
        <div className="flex justify-between items-center gap-2 sm:gap-4 w-full max-w-sm mx-auto">
          <button className="w-10 h-10 shrink-0 rounded-full border-2 flex items-center justify-center">
            <IoIosArrowBack className="text-lg" />
          </button>
          <button
            onClick={() => router.push("/blogs")}
            className="flex items-center justify-center rounded-full bg-linear-to-r px-8 sm:px-20 py-2 text-[#2052bd] border-2 border-blue-500 shadow-lg transition-all gap-2 sm:gap-4 hover:gap-8 duration-500 flex-1 whitespace-nowrap"
          >
            See More
          </button>
          <button className="w-10 h-10 shrink-0 rounded-full border-2 flex items-center justify-center">
            <IoIosArrowForward className="text-lg" />
          </button>
        </div>
      </div>
    </section>
  );
}
