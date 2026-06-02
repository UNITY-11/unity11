import { useState } from "react";
import { mockTeam } from "../data/mockTeam";

export function useTeam() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("join-desc");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const totalMembers = mockTeam.length;
  const engineering = mockTeam.filter(m => m.department === "Engineering").length;
  const design = mockTeam.filter(m => m.department === "Design").length;
  const management = mockTeam.filter(m => m.department === "Management").length;

  const departments = ['all', ...Array.from(new Set(mockTeam.map(m => m.department.toLowerCase())))];

  const filteredTeam = mockTeam.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = filterDepartment === 'all' || member.department.toLowerCase() === filterDepartment;
    return matchesSearch && matchesDept;
  }).sort((a, b) => {
    if (sortBy === "join-desc") return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
    if (sortBy === "join-asc") return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    return 0;
  });

  return {
    searchQuery, setSearchQuery,
    filterDepartment, setFilterDepartment,
    isFilterOpen, setIsFilterOpen,
    sortBy, setSortBy,
    isSortOpen, setIsSortOpen,
    totalMembers, engineering, design, management,
    departments,
    filteredTeam
  };
}
