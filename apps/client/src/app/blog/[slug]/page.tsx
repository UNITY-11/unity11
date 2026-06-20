import { notFound } from "next/navigation";
import { ArticleLayout } from "@/features/blogs/components";
import { fetchBlogBySlug, fetchBlogSlugs } from "@/sanity/lib/fetchers";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await fetchBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchBlogBySlug(resolvedParams.slug);

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
  const post = await fetchBlogBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const defaultAuthor = {
    name: "Unity11 Team",
    avatar: "",
    role: "Editorial Staff",
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
        bodyHtml={post.bodyHtml}
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
