"use client";

import { useTeam } from "../hooks/useTeam";
import { TeamStats } from "./TeamStats";
import { TeamToolbar } from "./TeamToolbar";
import { TeamGrid } from "./TeamGrid";

export function TeamView() {
  const {
    searchQuery, setSearchQuery,
    filterDepartment, setFilterDepartment,
    isFilterOpen, setIsFilterOpen,
    sortBy, setSortBy,
    isSortOpen, setIsSortOpen,
    totalMembers, engineering, design, management,
    departments,
    filteredTeam
  } = useTeam();

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-full">
      <TeamStats 
        totalMembers={totalMembers}
        engineering={engineering}
        design={design}
        management={management}
      />

      <TeamToolbar 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        filterDepartment={filterDepartment} setFilterDepartment={setFilterDepartment}
        isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}
        sortBy={sortBy} setSortBy={setSortBy}
        isSortOpen={isSortOpen} setIsSortOpen={setIsSortOpen}
        departments={departments}
      />

      <TeamGrid team={filteredTeam} />
    </div>
  );
}
