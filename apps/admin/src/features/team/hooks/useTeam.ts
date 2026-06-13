import { useState, useCallback } from "react";
import { useLocalList } from "@/hooks/useLocalList";
import { TeamMember } from "../types";
import { deleteTeamMember } from "../actions/teamActions";

export function useTeam(initialTeam: TeamMember[] = []) {
  const { items: team, updateItem, removeItem } = useLocalList("team", initialTeam);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("join-desc");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const totalMembers = team.length;
  const engineering = team.filter((m) => m.department === "Engineering").length;
  const design = team.filter((m) => m.department === "Design").length;
  const management = team.filter((m) => m.department === "Management").length;

  const departments = [
    "all",
    ...Array.from(new Set(team.map((m) => m.department.toLowerCase()))),
  ];

  const filteredTeam = team
    .filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept =
        filterDepartment === "all" ||
        member.department.toLowerCase() === filterDepartment;
      return matchesSearch && matchesDept;
    })
    .sort((a, b) => {
      if (sortBy === "join-desc")
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      if (sortBy === "join-asc")
        return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  const handleDelete = useCallback(
    async (id: string) => {
      const existing = team.find((m) => m.id === id);
      if (!existing) return false;

      removeItem(id);
      const result = await deleteTeamMember(id);
      if (result?.error) {
        updateItem(existing);
        alert(result.error);
        return false;
      }
      return true;
    },
    [team, removeItem, updateItem]
  );

  return {
    searchQuery,
    setSearchQuery,
    filterDepartment,
    setFilterDepartment,
    isFilterOpen,
    setIsFilterOpen,
    sortBy,
    setSortBy,
    isSortOpen,
    setIsSortOpen,
    totalMembers,
    engineering,
    design,
    management,
    departments,
    filteredTeam,
    handleDelete,
  };
}
