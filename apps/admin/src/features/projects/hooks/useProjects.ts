import { useState, useMemo, useCallback } from "react";
import { useLocalList } from "@/hooks/useLocalList";
import { Project } from "../types";
import { updateProjectStatus, deleteProject } from "../actions/createProject";

export function useProjects(initialProjects: Project[] = []) {
  const { items: projects, updateItem, removeItem } = useLocalList(
    "projects",
    initialProjects
  );

  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");

  const total = projects.length;
  const completed = projects.filter((p) => p.status === "Completed").length;
  const newProjects = projects.filter((p) => p.status === "New").length;
  const pending = projects.filter((p) => p.status === "Pending").length;
  const workingOn = projects.filter((p) => p.status === "Working On").length;

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
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((p) => p.status === statusFilter);
    }

    return result;
  }, [projects, searchQuery, statusFilter, selectedTag]);

  const handleStatusChange = useCallback(
    async (id: string, status: string) => {
      const existing = projects.find((p) => p.id === id);
      if (!existing) return;

      const optimistic = { ...existing, status };
      updateItem(optimistic);

      const result = await updateProjectStatus(id, status);
      if (result?.error) {
        updateItem(existing);
        alert(result.error);
      }
    },
    [projects, updateItem]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const existing = projects.find((p) => p.id === id);
      if (!existing) return false;

      removeItem(id);
      const result = await deleteProject(id);
      if (result?.error) {
        updateItem(existing);
        alert(result.error);
        return false;
      }
      return true;
    },
    [projects, removeItem, updateItem]
  );

  return {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    selectedTag,
    setSelectedTag,
    total,
    completed,
    newProjects,
    pending,
    workingOn,
    availableTags,
    filteredAndSortedProjects,
    handleStatusChange,
    handleDelete,
  };
}
