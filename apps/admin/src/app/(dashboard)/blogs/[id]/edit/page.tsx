import { fetchBlogById } from "@/sanity/lib/fetchers";
import { getImageUrl, normalizeBlogTags } from "@/sanity/lib/helpers";
import { BlogForm } from "@/features/blogs/components/BlogForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await fetchBlogById(id);

  if (!blog) notFound();

  return (
    <BlogForm
      key={blog._id}
      blog={{
        id: blog._id,
        title: blog.title ?? "",
        slug: blog.slug?.current ?? "",
        category: (blog.category as string) ?? "",
        tags: normalizeBlogTags(blog.tags),
        description: blog.description ?? "",
        bodyHtml: blog.bodyHtml ?? "",
        status: blog.status ?? "Draft",
        metaTitle: blog.metaTitle ?? "",
        metaDescription: blog.metaDescription ?? "",
        keywords: blog.keywords ?? "",
        image: getImageUrl(blog.mainImage, ""),
        views: blog.views ?? 0,
        likes: blog.likes ?? 0,
        date: blog.publishedAt ?? blog._createdAt ?? new Date().toISOString(),
      }}
    />
  );
}