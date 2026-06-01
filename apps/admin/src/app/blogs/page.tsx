"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const initialBlogs = [
  {
    id: "understanding-ai",
    title: "Understanding AI in 2024",
    author: "Alice Smith",
    category: "AI",
    tags: ["Tech", "Future"],
    description: "A deep dive into how artificial intelligence is shaping the software industry.",
    image: "/images/blog/blog2.png",
    bg: "bg-gradient-to-t from-purple-600 to-blue-300",
    date: "2024-05-10T10:00:00Z",
    status: "Published",
    views: 12500,
    likes: 850
  },
  {
    id: "modern-ui-design",
    title: "Principles of Modern UI Design",
    author: "John Doe",
    category: "Design",
    tags: ["UX", "UI"],
    description: "Learn the fundamentals of creating beautiful, user-centric interfaces.",
    image: "/images/blog/blog1.png",
    bg: "bg-gradient-to-tl from-gray-700 to-gray-300",
    date: "2024-06-01T08:30:00Z",
    status: "Draft",
    views: 0,
    likes: 0
  },
  {
    id: "nextjs-optimization",
    title: "Optimizing Next.js Applications",
    author: "Jane Foster",
    category: "Development",
    tags: ["React", "Performance"],
    description: "Tips and tricks to make your Next.js apps blazing fast.",
    image: "/images/blog/blog3.png",
    bg: "bg-gradient-to-t from-white to-blue-700",
    date: "2024-04-22T14:15:00Z",
    status: "Published",
    views: 3200,
    likes: 210
  },
  {
    id: "startup-growth",
    title: "Bootstrapping Your Startup",
    author: "Bob Martin",
    category: "Business",
    tags: ["Startup", "Growth"],
    description: "A realistic guide to starting and growing a business without VC funding.",
    image: "/images/home/heroImg1.png",
    bg: "bg-gradient-to-tl from-teal-700 to-teal-300",
    date: "2024-03-12T09:00:00Z",
    status: "Published",
    views: 8900,
    likes: 450
  },
  {
    id: "remote-work",
    title: "The Future of Remote Work",
    author: "Alice Smith",
    category: "Business",
    tags: ["Culture"],
    description: "How companies are adapting to a fully remote or hybrid workforce.",
    image: "/images/home/heroImg3.png",
    bg: "bg-gradient-to-t from-indigo-900 to-indigo-400",
    date: "2024-06-10T11:45:00Z",
    status: "Draft",
    views: 0,
    likes: 0
  }
];

export default function BlogsPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const total = initialBlogs.length;
  const published = initialBlogs.filter(b => b.status === "Published").length;
  const drafts = initialBlogs.filter(b => b.status === "Draft").length;
  const totalViews = initialBlogs.reduce((sum, b) => sum + b.views, 0);
  const totalLikes = initialBlogs.reduce((sum, b) => sum + b.likes, 0);

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    initialBlogs.forEach((b) => {
      if (b.category) cats.add(b.category);
    });
    return Array.from(cats);
  }, []);

  const filteredAndSortedBlogs = useMemo(() => {
    let result = [...initialBlogs];

    if (selectedCategory !== "All") {
      result = result.filter(b => b.category === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(b => 
        b.title.toLowerCase().includes(q) || 
        b.author.toLowerCase().includes(q) || 
        b.description.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      result = result.filter(b => b.status === statusFilter);
    }

    return result;
  }, [searchQuery, statusFilter, selectedCategory]);

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Blogs</h1>
          <p className="text-[#888888] mt-1">Manage your blog posts, track views, and publish new content.</p>
        </div>
        <Link 
          href="/blogs/new"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#007ee1] to-[#00b4d8] text-white font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-all flex items-center gap-2 shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Blog
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Blogs Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-[#007ee1]/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#007ee1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[23px] p-5 flex flex-col relative z-10 border-b-2 border-black/50 shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#888888] text-sm font-medium">Total Blogs</p>
              <div className="w-8 h-8 rounded-full bg-[#007ee1]/10 flex items-center justify-center border border-[#007ee1]/20 shadow-inner">
                <svg className="w-4 h-4 text-[#007ee1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-md">{total}</p>
          </div>
        </div>

        {/* Total Views Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-[#007ee1]/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#007ee1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[23px] p-5 flex flex-col relative z-10 border-b-2 border-black/50 shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#888888] text-sm font-medium">Total Views</p>
              <div className="w-8 h-8 rounded-full bg-[#007ee1]/10 flex items-center justify-center border border-[#007ee1]/20 shadow-inner">
                <svg className="w-4 h-4 text-[#007ee1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-md">{formatNumber(totalViews)}</p>
          </div>
        </div>

        {/* Total Likes Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-[#007ee1]/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#007ee1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[23px] p-5 flex flex-col relative z-10 border-b-2 border-black/50 shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#888888] text-sm font-medium">Total Likes</p>
              <div className="w-8 h-8 rounded-full bg-[#007ee1]/10 flex items-center justify-center border border-[#007ee1]/20 shadow-inner">
                <svg className="w-4 h-4 text-[#007ee1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-md">{formatNumber(totalLikes)}</p>
          </div>
        </div>

        {/* Published Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-[#007ee1]/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#007ee1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[23px] p-5 flex flex-col relative z-10 border-b-2 border-black/50 shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#888888] text-sm font-medium">Published</p>
              <div className="w-8 h-8 rounded-full bg-[#007ee1]/10 flex items-center justify-center border border-[#007ee1]/20 shadow-inner">
                <svg className="w-4 h-4 text-[#007ee1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-md">{published}</p>
          </div>
        </div>

        {/* Drafts Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-[#007ee1]/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#007ee1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[23px] p-5 flex flex-col relative z-10 border-b-2 border-black/50 shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#888888] text-sm font-medium">Drafts</p>
              <div className="w-8 h-8 rounded-full bg-[#007ee1]/10 flex items-center justify-center border border-[#007ee1]/20 shadow-inner">
                <svg className="w-4 h-4 text-[#007ee1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-md">{drafts}</p>
          </div>
        </div>
      </div>

      {/* Toolbar: Search, Filters, View Toggles */}
      <div className="flex flex-col xl:flex-row gap-4 items-center bg-[#111111]/95 backdrop-blur-md p-4 rounded-[20px] border border-[#222222] sticky -top-4 md:-top-6 lg:-top-8 z-50 shadow-2xl self-start w-full">
        
        <div className="relative w-full xl:w-64 shrink-0">
          <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <input 
            type="text" 
            placeholder="Search blogs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#333333] rounded-full py-2.5 pl-10 pr-4 text-white placeholder:text-[#555555] focus:outline-none focus:ring-2 focus:ring-[#007ee1] transition-all"
          />
        </div>

        {/* Categories Row - Flex 1 allows it to take remaining middle space */}
        <div className="flex-1 w-full overflow-x-auto flex items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center gap-2 w-max px-1">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all shadow-sm ${selectedCategory === "All" ? "bg-[#007ee1] text-white border border-[#007ee1]" : "bg-[#1a1a1a] border border-[#333333] text-[#888888] hover:bg-[#222222] hover:text-white"}`}
            >
              All Categories
            </button>
            {availableCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all shadow-sm ${selectedCategory === cat ? "bg-[#007ee1] text-white border border-[#007ee1]" : "bg-[#1a1a1a] border border-[#333333] text-[#888888] hover:bg-[#222222] hover:text-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full xl:w-auto shrink-0">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0a0a0a] border border-[#333333] rounded-full py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#007ee1] transition-all cursor-pointer flex-1 xl:flex-none appearance-none"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          <div className="flex items-center bg-[#0a0a0a] border border-[#333333] rounded-full p-1 shrink-0">
            <button 
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-full transition-all ${viewMode === 'table' ? 'bg-[#222222] text-white shadow-sm' : 'text-[#888888] hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" /></svg>
            </button>
            <button 
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-full transition-all ${viewMode === 'card' ? 'bg-[#222222] text-white shadow-sm' : 'text-[#888888] hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Blogs List Content */}
      {filteredAndSortedBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#111111] rounded-[24px] border border-[#222222]">
          <svg className="w-16 h-16 text-[#333333] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <p className="text-xl font-medium text-white mb-1">No blogs found</p>
          <p className="text-[#888888]">Try adjusting your search query or filters.</p>
        </div>
      ) : viewMode === 'table' ? (
        <div className="bg-[#111111] rounded-[24px] shadow-2xl border border-[#222222] flex flex-col flex-1 min-h-0">
          <div className="overflow-auto flex-1 custom-scrollbar rounded-[24px]">
            <table className="w-full text-left border-collapse relative min-w-[900px]">
              <thead className="bg-[#111111] z-30 shadow-[0_1px_0_0_#222222] sticky top-0">
                <tr className="text-[#888888] text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Post</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Metrics</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222222]">
                {filteredAndSortedBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-[#333333] relative">
                        <Image src={blog.image} alt={blog.title} fill className="object-cover" sizes="80px" />
                      </div>
                      <div>
                        <p className="text-white font-medium line-clamp-1">{blog.title}</p>
                        <p className="text-[#555555] text-xs mt-0.5">By {blog.author} • {blog.category}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 relative">
                      <div className="relative inline-block">
                        <select 
                          defaultValue={blog.status}
                          className={`appearance-none px-3 py-1.5 pr-8 rounded-full text-xs font-medium border bg-[#111111] hover:bg-[#1a1a1a] transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#007ee1] ${
                            blog.status === 'Published' ? 'text-[#007ee1] border-[#007ee1]/30' :
                            'text-[#888888] border-[#333333]'
                          }`}
                        >
                          <option value="Published" className="text-white bg-[#111111]">Published</option>
                          <option value="Draft" className="text-white bg-[#111111]">Draft</option>
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-[#888888]" title="Views">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          <span className="text-sm">{formatNumber(blog.views)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#888888]" title="Likes">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                          <span className="text-sm">{formatNumber(blog.likes)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#888888] text-sm" suppressHydrationWarning>
                      {new Date(blog.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/blogs/${blog.id}/edit`} className="inline-block p-2 text-[#888888] hover:text-[#00b4d8] transition-colors" title="Edit Blog">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedBlogs.map((blog) => (
            <div key={blog.id} className="group bg-[#111111] border border-[#222222] w-full rounded-[2rem] overflow-hidden shadow-lg hover:shadow-[0_10px_40px_rgba(0,126,225,0.1)] transition-all duration-300 flex flex-col relative min-h-[400px]">
              
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
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border backdrop-blur-md shadow-lg ${blog.status === 'Published' ? 'bg-[#007ee1]/80 border-[#007ee1]' : 'bg-black/60 border-white/20'} text-white`}>
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
                    className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-all duration-300 hover:bg-[#007ee1] hover:text-white" 
                    title="Edit Blog"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </Link>
                </div>
              </div>

              {/* Bottom Content Section */}
              <div className="p-6 flex flex-col flex-1 relative z-20">
                <p className="text-[#007ee1] text-xs font-semibold uppercase tracking-wider mb-2" suppressHydrationWarning>By {blog.author} • {new Date(blog.date).toLocaleDateString()}</p>
                <h3 className="text-xl font-bold mb-3 text-white leading-snug group-hover:text-[#00b4d8] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-[#888888] line-clamp-2 leading-relaxed mb-6 flex-1">
                  {blog.description}
                </p>

                {/* Metrics Divider & Footer */}
                <div className="pt-4 border-t border-[#222222] flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[#888888] group-hover:text-white transition-colors" title="Views">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      <span className="text-sm font-medium">{formatNumber(blog.views)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#888888] group-hover:text-white transition-colors" title="Likes">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                      <span className="text-sm font-medium">{formatNumber(blog.likes)}</span>
                    </div>
                  </div>
                  
                  <Link href={`/blogs/${blog.id}/edit`} className="text-[#007ee1] hover:text-[#00b4d8] text-sm font-medium flex items-center gap-1">
                    Edit <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
