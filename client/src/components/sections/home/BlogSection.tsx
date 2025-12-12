"use client";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/blogs";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const sideDistance = 200;

const getCardVariants = (i: number) => { 
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
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-center mb-10">
          <h2 className="text-3xl md:text-6xl text-transparent bg-clip-text bg-linear-to-r pb-1 from-[#2052bd] to-[#7fcbe4]">
            Our Blogs
          </h2>

          <Link
            href="/blog"
            className="absolute right-0 text-sm md:text-base text-white/70 hover:text-white transition"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => {
            const cardVariants = getCardVariants(i);

            return (
                <motion.div
                  className={`group bg-linear-to-t backdrop-blur-xl shadow-2xl rounded-4xl p-4 hover:bg-white/10 transition-all duration-300 ${post.bgColor} ${i == 1 ? 'z-20' : 'z-10'}`}
                  initial={cardVariants.initial}
                  whileInView={cardVariants.animate}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
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
            );
          })}
        </div>
      </div>
      <div className="mt-10 right-0 flex justify-center text-blue-500">
        <div className="flex justify-between items-center mx-5">
          <button className="w-10 h-10 rounded-full border-2 flex items-center justify-center">
            <IoIosArrowBack className="text-lg" />
          </button>
          <button
            onClick={() => router.push("/blogs")}
            className="flex items-center rounded-full bg-linear-to-r px-20 py-2 text-[#2052bd] border-2 border-blue-500 shadow-lg transition-all gap-4 hover:gap-8 duration-500"
          >
            See More
          </button>
          <button className="w-10 h-10 rounded-full border-2 flex items-center justify-center">
            <IoIosArrowForward className="text-lg" />
          </button>
        </div>
      </div>
    </section>
  );
}