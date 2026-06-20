import { useState, useMemo } from "react";
import type { Project } from "../types";

export function useProjects(projects: Project[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  const marqueeImages = useMemo(() => {
    return projects.map((p) => ({
      src: p.image,
      alt: p.title,
    }));
  }, [projects]);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => {
      if (p.tag1) tags.add(p.tag1);
      if (p.tag2) tags.add(p.tag2);
    });
    return Array.from(tags);
  }, [projects]);

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects];

    if (selectedTag !== "All") {
      result = result.filter(
        (p) => p.tag1 === selectedTag || p.tag2 === selectedTag
      );
    }

    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery)
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (sortBy === "latest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    return result;
  }, [projects, searchQuery, selectedTag, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    marqueeImages,
    availableTags,
    filteredAndSortedProjects,
  };
}
