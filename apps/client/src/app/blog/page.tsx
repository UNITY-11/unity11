import React from "react";
import { BlogHero, BlogGrid } from "@/features/blogs/components";
export const metadata = {
  title: "Blog | Our Thoughts & Ideas",
  description: "Dive into our latest articles on software engineering, modern web architecture, and design systems.",
};

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white w-full">
      <BlogHero />
      <BlogGrid />
    </main>
  );
}
