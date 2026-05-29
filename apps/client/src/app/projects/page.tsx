"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  ProjectsFilter,
  ProjectsGrid,
  mockProjects,
} from "@/features/projects";
import { ThreeDMarquee } from "@/components/ui/ThreeDMarquee";

export default function ProjectsPage() {
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

  return (
    <main className="min-h-screen bg-black pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Our <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-500">Projects</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-lg">
              Explore our portfolio of digital transformations. From enterprise
              platforms to cutting-edge mobile apps, see how we build software
              that drives results.
            </p>
          </motion.div>

          {/* Right: 3D Marquee Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
            className="rounded-4xl bg-white overflow-hidden shadow-2xl relative"
          >
            <div className="w-full h-full rounded-[1.75rem] overflow-hidden">
               <ThreeDMarquee images={marqueeImages} cols={3} className="bg-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="sticky top-0 z-50 bg-black"
        >
          <ProjectsFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            sortBy={sortBy}
            setSortBy={setSortBy}
            availableTags={availableTags}
          />
        </motion.div>

        {/* Grid */}
        <ProjectsGrid projects={filteredAndSortedProjects} />
      </div>
    </main>
  );
}
