"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { BlogPost } from "@/features/blogs/types";

interface BlogGridProps {
  posts: BlogPost[];
}

export const BlogGrid = ({ posts }: BlogGridProps) => {
  if (posts.length === 0) {
    return (
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <p className="text-center text-gray-400">No blog posts published yet.</p>
      </section>
    );
  }

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <Link href={`/blog/${post.slug}`} key={post.id}>
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            className={`group bg-linear-to-t backdrop-blur-xl shadow-2xl rounded-4xl p-4 hover:bg-white/10 transition-all duration-300 ${post.bgColor}`}
          >
            <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-4">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="flex items-center gap-2 mb-3 text-sm text-gray-200">
              <span>{post.category}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            <h3 className="text-xl font-semibold transition text-white">
              {post.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-gray-200">
              {post.excerpt}
            </p>

            <div className="mt-4 text-white text-sm opacity-0 group-hover:opacity-100 transition">
              Read more &rarr;
            </div>
          </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};
