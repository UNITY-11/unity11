import { useState } from "react";
import { mockClients } from "../data/mockClients";

export function useClients() {
  const [clients, setClients] = useState(mockClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("start-desc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const total = clients.length;
  const active = clients.filter(c => c.projectStatus === "Active").length;
  const pending = clients.filter(c => c.projectStatus === "Pending").length;
  const completed = clients.filter(c => c.projectStatus === "Completed").length;
  const onHold = clients.filter(c => c.projectStatus === "On Hold").length;

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          client.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.projectStatus.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === "start-desc") return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    if (sortBy === "start-asc") return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    if (sortBy === "end-desc") return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    if (sortBy === "end-asc") return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
    return 0;
  });

  return {
    clients, setClients,
    searchQuery, setSearchQuery,
    filterStatus, setFilterStatus,
    sortBy, setSortBy,
    isFilterOpen, setIsFilterOpen,
    isSortOpen, setIsSortOpen,
    total, active, pending, completed, onHold,
    filteredClients
  };
}
