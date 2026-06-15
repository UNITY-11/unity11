import { useState, useMemo, useCallback } from "react";
import { useLocalList } from "@/hooks/useLocalList";
import { Blog } from "../types";
import { updateBlogStatus, deleteBlog } from "../actions/blogActions";

export function useBlogs(initialBlogs: Blog[] = []) {
  const { items: blogs, updateItem, removeItem } = useLocalList("blogs", initialBlogs);

  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const total = blogs.length;
  const published = blogs.filter((b) => b.status === "Published").length;
  const drafts = blogs.filter((b) => b.status === "Draft").length;
  const totalViews = blogs.reduce((sum, b) => sum + b.views, 0);
  const totalLikes = blogs.reduce((sum, b) => sum + b.likes, 0);

  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    blogs.forEach((b) => {
      if (b.category) cats.add(b.category);
    });
    return Array.from(cats);
  }, [blogs]);

  const filteredAndSortedBlogs = useMemo(() => {
    let result = [...blogs];

    if (selectedCategory !== "All") {
      result = result.filter((b) => b.category === selectedCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((b) => b.status === statusFilter);
    }

    return result;
  }, [blogs, searchQuery, statusFilter, selectedCategory]);

  const handleStatusChange = useCallback(
    async (id: string, status: string) => {
      const existing = blogs.find((b) => b.id === id);
      if (!existing) return;

      const optimistic = { ...existing, status };
      updateItem(optimistic);

      const result = await updateBlogStatus(id, status);
      if (result?.error) {
        updateItem(existing);
        alert(result.error);
      }
    },
    [blogs, updateItem]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const existing = blogs.find((b) => b.id === id);
      if (!existing) return false;

      removeItem(id);
      const result = await deleteBlog(id);
      if (result?.error) {
        updateItem(existing);
        alert(result.error);
        return false;
      }
      return true;
    },
    [blogs, removeItem, updateItem]
  );

  return {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedCategory,
    setSelectedCategory,
    total,
    published,
    drafts,
    totalViews,
    totalLikes,
    availableCategories,
    filteredAndSortedBlogs,
    handleStatusChange,
    handleDelete,
  };
}
