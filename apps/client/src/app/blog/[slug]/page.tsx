import { notFound } from "next/navigation";
import { posts } from "@/features/blogs/data/blogs";
import { ArticleLayout } from "@/features/blogs/components";
// Static generation for known blog posts
export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | Unity11 Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Unity11 Blog`,
      description: post.excerpt,
      type: "article",
      url: `https://unity11.com/blog/${post.slug}`,
      images: [{ url: post.image }],
      publishedTime: post.date,
      authors: [post.author?.name || "Unity11 Team"],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = posts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Provide fallback author if not found in mock data
  const defaultAuthor = {
    name: "Unity11 Team",
    avatar: "/images/logos/unity11-logo.gif",
    role: "Editorial Staff"
  };

  const author = post.author || defaultAuthor;
  const content = post.content || [post.excerpt];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "Unity11",
      "logo": {
        "@type": "ImageObject",
        "url": "https://unity11.com/logo.png"
      }
    },
    "description": post.excerpt
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout 
        title={post.title}
        excerpt={post.excerpt}
        content={content}
        image={post.image}
        date={post.date}
        readTime={post.readTime}
        category={post.category}
        author={author}
        bgColor={post.bgColor}
      />
    </>
  );
}
