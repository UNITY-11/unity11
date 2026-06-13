"use client";

import Link from "next/link";
import { useBlogs } from "../hooks/useBlogs";
import { BlogStats } from "./BlogStats";
import { BlogFilters } from "./BlogFilters";
import { BlogTable } from "./BlogTable";
import { BlogGrid } from "./BlogGrid";

export function BlogsView({ blogs }: { blogs: import("../types").Blog[] }) {
  const {
    viewMode, setViewMode,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    selectedCategory, setSelectedCategory,
    total, published, drafts, totalViews, totalLikes,
    availableCategories,
    handleStatusChange,
    filteredAndSortedBlogs
  } = useBlogs(blogs);

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6">

      <BlogStats 
        total={total} 
        totalViews={totalViews} 
        totalLikes={totalLikes} 
        published={published} 
        drafts={drafts} 
      />

      {/* Toolbar: Search, Filters, View Toggles */}
      <div className="flex flex-col xl:flex-row gap-4 items-center bg-surface/95 backdrop-blur-md p-4 rounded-[20px] border border-border-base sticky top-0 z-50 shadow-sm self-start w-full">
        <div className="flex-1 w-full">
          <BlogFilters
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            statusFilter={statusFilter} setStatusFilter={setStatusFilter}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            availableCategories={availableCategories}
            viewMode={viewMode} setViewMode={setViewMode}
          />
        </div>
        
        <Link 
          href="/blogs/new"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-all flex items-center gap-2 shrink-0 xl:ml-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Blog
        </Link>
      </div>

      {/* Blogs List Content */}
      {filteredAndSortedBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-surface rounded-[24px] border border-border-base">
          <svg className="w-16 h-16 text-border-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <p className="text-xl font-medium text-foreground mb-1">No blogs found</p>
          <p className="text-text-muted">Try adjusting your search query or filters.</p>
        </div>
      ) : viewMode === 'table' ? (
        <BlogTable blogs={filteredAndSortedBlogs} onStatusChange={handleStatusChange} />
      ) : (
        <BlogGrid blogs={filteredAndSortedBlogs} />
      )}
    </div>
  );
}
