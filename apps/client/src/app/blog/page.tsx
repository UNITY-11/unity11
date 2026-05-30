import React from "react";
import { BlogHero, BlogGrid } from "@/features/blogs/components";
import FooterCTA from "@/components/layout/FooterCTA";

export const metadata = {
  title: "Blog | Our Thoughts & Ideas",
  description: "Dive into our latest articles on software engineering, modern web architecture, and design systems.",
};

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white w-full">
      <BlogHero />
      <BlogGrid />
      
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20">
        <FooterCTA />
      </div>
    </main>
  );
}
