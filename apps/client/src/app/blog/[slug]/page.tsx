import { notFound } from "next/navigation";
import { posts } from "@/data/blogs";
import { ArticleLayout } from "@/features/blogs/components";
import FooterCTA from "@/components/layout/FooterCTA";

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

  return (
    <>
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
      <div className="bg-black pb-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FooterCTA />
      </div>
    </>
  );
}
