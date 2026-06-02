import { useState, useMemo } from "react";
import { initialBlogs } from "../data/mockBlogs";
import { Blog } from "../types";

export function useBlogs() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const total = initialBlogs.length;
  const published = initialBlogs.filter(b => b.status === "Published").length;
  const drafts = initialBlogs.filter(b => b.status === "Draft").length;
  const totalViews = initialBlogs.reduce((sum, b) => sum + b.views, 0);
  const totalLikes = initialBlogs.reduce((sum, b) => sum + b.likes, 0);

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

    if (statusFilter !== "All") {
      result = result.filter(b => b.status === statusFilter);
    }

    return result;
  }, [searchQuery, statusFilter, selectedCategory]);

  return {
    viewMode, setViewMode,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    selectedCategory, setSelectedCategory,
    total, published, drafts, totalViews, totalLikes,
    availableCategories,
    filteredAndSortedBlogs
  };
}
