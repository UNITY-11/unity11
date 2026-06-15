"use client";

import { useClients } from "../hooks/useClients";
import { ClientStats } from "./ClientStats";
import { ClientToolbar } from "./ClientToolbar";
import { ClientGrid } from "./ClientGrid";

export function ClientsView({ clients }: { clients: import("../types").Client[] }) {
  const {
    searchQuery, setSearchQuery,
    filterStatus, setFilterStatus,
    sortBy, setSortBy,
    isFilterOpen, setIsFilterOpen,
    isSortOpen, setIsSortOpen,
    total, active, pending, completed, onHold,
    filteredClients
  } = useClients(clients);

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto space-y-6">
      <ClientStats 
        total={total}
        active={active}
        pending={pending}
        onHold={onHold}
        completed={completed}
      />

      <ClientToolbar
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        sortBy={sortBy} setSortBy={setSortBy}
        isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}
        isSortOpen={isSortOpen} setIsSortOpen={setIsSortOpen}
      />

      <ClientGrid clients={filteredClients} />
    </div>
  );
}
