"use client";

import { useProjects } from "../hooks/useProjects";
import { ProjectStats } from "./ProjectStats";
import { ProjectToolbar } from "./ProjectToolbar";
import { ProjectTable } from "./ProjectTable";
import { ProjectGrid } from "./ProjectGrid";

export function ProjectsView({ projects }: { projects: import("../types").Project[] }) {
  const {
    viewMode, setViewMode,
    searchQuery, setSearchQuery,
    statusFilter, setStatusFilter,
    selectedTag, setSelectedTag,
    total, completed, newProjects, pending, workingOn,
    availableTags,
    handleStatusChange,
    filteredAndSortedProjects
  } = useProjects(projects);

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6">

      <ProjectStats
        total={total}
        completed={completed}
        workingOn={workingOn}
        pending={pending}
        newProjects={newProjects}
      />

      <ProjectToolbar
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        selectedTag={selectedTag} setSelectedTag={setSelectedTag}
        availableTags={availableTags}
        viewMode={viewMode} setViewMode={setViewMode}
      />

      {/* Projects List Content */}
      {filteredAndSortedProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-surface rounded-[24px] border border-border-base">
          <svg className="w-16 h-16 text-[#333333] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <p className="text-xl font-medium text-foreground mb-1">No projects found</p>
          <p className="text-text-muted">Try adjusting your search query or filters.</p>
        </div>
      ) : viewMode === 'table' ? (
        <ProjectTable projects={filteredAndSortedProjects} onStatusChange={handleStatusChange} />
      ) : (
        <ProjectGrid projects={filteredAndSortedProjects} />
      )}
    </div>
  );
}
