import { useState, useMemo } from "react";
import { mockProjects } from "@/features/projects";

export function useProjects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  // Format images for the 3D marquee
  const marqueeImages = useMemo(() => {
    return mockProjects.map((p) => ({
      src: p.image,
      alt: p.title,
    }));
  }, []);

  // Extract unique tags from mock data
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    mockProjects.forEach((p) => {
      if (p.tag1) tags.add(p.tag1);
      if (p.tag2) tags.add(p.tag2);
    });
    return Array.from(tags);
  }, []);

  // Filter and sort the projects
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...mockProjects];

    // Filter by tag
    if (selectedTag !== "All") {
      result = result.filter(
        (p) => p.tag1 === selectedTag || p.tag2 === selectedTag
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Sort
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
  }, [searchQuery, selectedTag, sortBy]);

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
