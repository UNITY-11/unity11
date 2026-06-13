"use client";

import Image from "next/image";
import Link from "next/link";
import { Blog } from "../types";

function formatBlogDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogTable({
  blogs,
  onStatusChange,
}: {
  blogs: Blog[];
  onStatusChange: (id: string, status: string) => void;
}) {
  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "k";
    return num.toString();
  };

  return (
    <div className="bg-surface rounded-t-[24px] rounded-b-none border-b-0 shadow-sm border border-border-base flex flex-col flex-1 min-h-0">
      <div className="overflow-auto flex-1 custom-scrollbar rounded-t-[24px] rounded-b-none">
        <table className="w-full text-left border-collapse relative min-w-[900px]">
          <thead className="bg-surface z-30 border-b border-border-base sticky top-0">
            <tr className="text-foreground font-semibold text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Post</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Metrics</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-base">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-surface-hover transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-border-muted relative">
                    <Image src={blog.image} alt={blog.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors line-clamp-1">{blog.title}</p>
                    <p className="text-text-muted text-xs mt-0.5">By {blog.author} • {blog.category || "Uncategorized"}</p>
                    {blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-surface-hover border border-border-muted text-text-dim">
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 text-text-dim">+{blog.tags.length - 3}</span>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 relative">
                  <div className="relative inline-block">
                    <select
                      value={blog.status}
                      onChange={(e) => onStatusChange(blog.id, e.target.value)}
                      className={`appearance-none px-3 py-1.5 pr-8 rounded-full text-xs font-medium border bg-surface hover:bg-surface-hover transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#007ee1] ${
                        blog.status === "Published" ? "text-primary border-primary/30" : "text-text-muted border-border-muted"
                      }`}
                    >
                      <option value="Published" className="text-foreground bg-surface">Published</option>
                      <option value="Draft" className="text-foreground bg-surface">Draft</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-text-muted" title="Views">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      <span className="text-sm">{formatNumber(blog.views)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-muted" title="Likes">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      <span className="text-sm">{formatNumber(blog.likes)}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-muted text-sm">
                  {formatBlogDate(blog.date)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/blogs/${blog.id}/edit`} className="inline-block p-2 text-text-muted hover:text-[#00b4d8] transition-colors" title="Edit Blog">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
