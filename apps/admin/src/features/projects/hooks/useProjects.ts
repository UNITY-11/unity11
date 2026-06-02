import { useState, useMemo } from "react";
import { initialProjects } from "../data/mockProjects";

export function useProjects() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  const total = initialProjects.length;
  const completed = initialProjects.filter(p => p.status === "Completed").length;
  const newProjects = initialProjects.filter(p => p.status === "New").length;
  const pending = initialProjects.filter(p => p.status === "Pending").length;
  const workingOn = initialProjects.filter(p => p.status === "Working On").length;

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.tag1) tags.add(p.tag1);
      if (p.tag2) tags.add(p.tag2);
    });
    return Array.from(tags);
  }, []);

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...initialProjects];

    if (selectedTag !== "All") {
      result = result.filter(
        (p) => p.tag1 === selectedTag || p.tag2 === selectedTag
      );
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.id.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter(p => p.status === statusFilter);
    }

    return result;
  }, [searchQuery, statusFilter, selectedTag]);

  return {
    viewMode, setViewMode,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    selectedTag, setSelectedTag,
    total, completed, newProjects, pending, workingOn,
    availableTags,
    filteredAndSortedProjects
  };
}
