import Image from "next/image";
import Link from "next/link";
import { Blog } from "../types";

export function BlogGrid({ blogs }: { blogs: Blog[] }) {
  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {blogs.map((blog) => (
        <div key={blog.id} className="group bg-surface border border-border-base w-full rounded-[2rem] overflow-hidden shadow-lg hover:shadow-[0_10px_40px_rgba(0,126,225,0.1)] transition-all duration-300 flex flex-col relative min-h-[400px]">
          
          {/* Top Image Section */}
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent z-10" />
            
            {/* Status Indicator */}
            <div className="absolute top-4 right-4 z-20">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border backdrop-blur-md shadow-lg ${blog.status === 'Published' ? 'bg-primary/80 border-primary' : 'bg-black/60 border-white/20'} text-white`}>
                {blog.status}
              </span>
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-4 left-4 z-20">
              <span className="text-xs px-3 py-1.5 rounded-full text-white bg-white/20 backdrop-blur-md border border-white/20 shadow-sm font-medium">
                {blog.category}
              </span>
            </div>

            {/* Hover Edit Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30">
              <Link 
                href={`/blogs/${blog.id}/edit`} 
                className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-all duration-300 hover:bg-primary hover:text-foreground" 
                title="Edit Blog"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </Link>
            </div>
          </div>

          {/* Bottom Content Section */}
          <div className="p-6 flex flex-col flex-1 relative z-20">
            <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-2" suppressHydrationWarning>By {blog.author} • {new Date(blog.date).toLocaleDateString()}</p>
            <h3 className="text-xl font-bold mb-3 text-white leading-snug group-hover:text-[#00b4d8] transition-colors">
              {blog.title}
            </h3>
            <p className="text-sm text-text-muted line-clamp-2 leading-relaxed mb-6 flex-1">
              {blog.description}
            </p>

            {/* Metrics Divider & Footer */}
            <div className="pt-4 border-t border-border-base flex items-center justify-between mt-auto">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-text-muted group-hover:text-foreground transition-colors" title="Views">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  <span className="text-sm font-medium">{formatNumber(blog.views)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-muted group-hover:text-foreground transition-colors" title="Likes">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  <span className="text-sm font-medium">{formatNumber(blog.likes)}</span>
                </div>
              </div>
              
              <Link href={`/blogs/${blog.id}/edit`} className="text-primary hover:text-[#00b4d8] text-sm font-medium flex items-center gap-1">
                Edit <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
