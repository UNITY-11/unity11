"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { IoIosArrowBack } from "react-icons/io";

import { ArticleProps } from "../types";
import { AuthorAvatar } from "./AuthorAvatar";

export const ArticleLayout = ({
  title,
  excerpt,
  content,
  bodyHtml,
  image,
  date,
  readTime,
  category,
  author,
  bgColor,
}: ArticleProps) => {
  return (
    <article className="min-h-screen bg-black text-white relative w-full overflow-hidden">
      {/* Background ambient gradient */}
      <div
        className={`absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b ${
          bgColor ? bgColor : "from-[#2052bd]"
        } opacity-10 pointer-events-none blur-3xl`}
      />

      {/* Navigation Bar inside Article */}
      <div className="absolute top-24 left-0 right-0 z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
        >
          <IoIosArrowBack />
          Back to Blog
        </Link>
      </div>

      {/* Hero Section */}
      <header className="relative pt-36 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 text-sm text-blue-400 font-semibold mb-6 uppercase tracking-wider">
            <span>{category}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-gray-400 font-medium">{date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            <span className="text-gray-400 font-medium">{readTime} read</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl leading-relaxed mb-10">
            {excerpt}
          </p>

          {/* Author Block */}
          <div className="flex items-center gap-4 border-t border-white/10 pt-8 mt-8">
            <AuthorAvatar name={author.name} avatar={author.avatar} size={48} />
            <div>
              <div className="text-white font-medium">{author.name}</div>
              <div className="text-gray-400 text-sm">{author.role}</div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Main Feature Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 relative z-10"
      >
        <div className="relative w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
          <Image
            src={image}
            alt={title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </motion.div>

      {/* Article Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="prose prose-lg prose-invert prose-blue max-w-none
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-8
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
            prose-strong:text-white prose-strong:font-semibold"
        >
          {bodyHtml ? (
            <div
              className="text-lg md:text-xl text-gray-300 font-light leading-[1.8] tracking-wide [&_p]:mb-8 [&_h2]:text-white [&_h3]:text-white"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          ) : (
            content.map((paragraph, idx) => (
              <p key={idx} className="text-lg md:text-xl text-gray-300 font-light leading-[1.8] tracking-wide">
                {paragraph}
              </p>
            ))
          )}
        </motion.div>

        {/* Article Footer */}
        <div className="mt-20 pt-10 border-t border-white/10 flex flex-col items-center text-center">
          <h3 className="text-2xl font-semibold text-white mb-6">Enjoyed this article?</h3>
          <Link
            href="/blog"
            className="group relative inline-flex h-12 items-center overflow-hidden rounded-full border border-blue-400 bg-white p-0.5 transition-transform"
          >
            <div className="flex h-full items-center justify-center rounded-full bg-gradient-to-tr from-[#2052bd] to-[#7fcbe4] px-8 text-white font-bold tracking-tight">
              Read more on our Blog
            </div>
          </Link>
        </div>
      </main>
    </article>
  );
};
