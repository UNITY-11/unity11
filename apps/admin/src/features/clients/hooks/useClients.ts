import { useState, useCallback } from "react";
import { useLocalList } from "@/hooks/useLocalList";
import { Client } from "../types";
import { deleteClient } from "../actions/clientActions";

export function useClients(initialClients: Client[] = []) {
  const { items: clients, updateItem, removeItem } = useLocalList(
    "clients",
    initialClients
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("start-desc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const total = clients.length;
  const active = clients.filter((c) => c.projectStatus === "Active").length;
  const pending = clients.filter((c) => c.projectStatus === "Pending").length;
  const completed = clients.filter((c) => c.projectStatus === "Completed").length;
  const onHold = clients.filter((c) => c.projectStatus === "On Hold").length;

  const filteredClients = clients
    .filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        filterStatus === "all" ||
        client.projectStatus.toLowerCase() === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "start-desc")
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      if (sortBy === "start-asc")
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      if (sortBy === "end-desc")
        return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
      if (sortBy === "end-asc")
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      return 0;
    });

  const handleDelete = useCallback(
    async (id: string) => {
      const existing = clients.find((c) => c.id === id);
      if (!existing) return false;

      removeItem(id);
      const result = await deleteClient(id);
      if (result?.error) {
        updateItem(existing);
        alert(result.error);
        return false;
      }
      return true;
    },
    [clients, removeItem, updateItem]
  );

  return {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    isFilterOpen,
    setIsFilterOpen,
    isSortOpen,
    setIsSortOpen,
    total,
    active,
    pending,
    completed,
    onHold,
    filteredClients,
    handleDelete,
  };
}
