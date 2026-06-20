import React from "react";
import { BlogHero, BlogGrid } from "@/features/blogs/components";
import { fetchPublishedBlogs } from "@/sanity/lib/fetchers";

export const revalidate = 60;

export const metadata = {
  title: "Blog | Our Thoughts & Ideas",
  description: "Dive into our latest articles on software engineering, modern web architecture, and design systems.",
  openGraph: {
    title: "Blog | Our Thoughts & Ideas",
    description: "Dive into our latest articles on software engineering, modern web architecture, and design systems.",
    type: "website",
    url: "https://unity11.com/blog",
  },
};

export default async function BlogPage() {
  const posts = await fetchPublishedBlogs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Unity11 Blog",
    "url": "https://unity11.com/blog",
    "description": "Dive into our latest articles on software engineering, modern web architecture, and design systems."
  };

  return (
    <main className="flex min-h-screen flex-col bg-black text-white w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHero />
      <BlogGrid posts={posts} />
    </main>
  );
}
