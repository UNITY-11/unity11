"use client";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/blogs";

export default function BlogSection() {
  return (
    <section
      className="py-20
"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative flex items-center justify-center mb-10">
          <h2 className="text-3xl md:text-6xl text-transparent bg-clip-text bg-linear-to-r from-[#2052bd] to-[#7fcbe4]">
            Populer Insights
          </h2>

          <Link
            href="/blog"
            className="absolute right-0 text-sm md:text-base text-white/70 hover:text-white transition"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="group bg-white/5 backdrop-blur-xl shadow-2xl rounded-4xl p-4 hover:bg-white/10 transition-all duration-300">
                <div className="relative w-full h-52 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center gap-2 mb-3 text-sm text-blue-300">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-semibold text-blue-400 transition">
                  {post.title}
                </h3>

                <p className="mt-2 text-blue-300 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-4 text-blue-400 text-sm opacity-0 group-hover:opacity-100 transition">
                  Read more →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
