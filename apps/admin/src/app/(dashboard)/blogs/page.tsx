import { fetchBlogs } from "@/sanity/lib/fetchers";
import { BlogsView } from "@/features/blogs/components/BlogsView";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await fetchBlogs();
  return <BlogsView blogs={blogs} />;
}
