"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data for clients
const mockClients = [
  {
    id: 1,
    name: "Apple Inc.",
    logo: "https://www.google.com/s2/favicons?sz=128&domain=apple.com",
    contactNumber: "+1 (555) 123-4567",
    projectStatus: "Active",
    email: "contact@apple.com",
    startDate: "2023-01-15",
    endDate: "2024-12-31"
  },
  {
    id: 2,
    name: "Google",
    logo: "https://www.google.com/s2/favicons?sz=128&domain=google.com",
    contactNumber: "+1 (555) 987-6543",
    projectStatus: "Pending",
    email: "hello@google.com",
    startDate: "2023-11-01",
    endDate: "2024-06-30"
  },
  {
    id: 3,
    name: "Microsoft",
    logo: "https://www.google.com/s2/favicons?sz=128&domain=microsoft.com",
    contactNumber: "+1 (555) 555-0199",
    projectStatus: "Completed",
    email: "info@microsoft.com",
    startDate: "2022-05-10",
    endDate: "2023-05-10"
  },
  {
    id: 4,
    name: "Amazon",
    logo: "https://www.google.com/s2/favicons?sz=128&domain=amazon.com",
    contactNumber: "+1 (555) 444-3322",
    projectStatus: "Active",
    email: "partners@amazon.com",
    startDate: "2023-08-20",
    endDate: "2025-01-15"
  },
  {
    id: 5,
    name: "Meta",
    logo: "https://www.google.com/s2/favicons?sz=128&domain=meta.com",
    contactNumber: "+1 (555) 666-7788",
    projectStatus: "On Hold",
    email: "inquiries@meta.com",
    startDate: "2024-02-01",
    endDate: "2024-11-30"
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState(mockClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("start-desc");
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'completed':
        return 'text-primary bg-primary/10 border-primary/20';
      case 'on hold':
        return 'text-danger bg-danger/10 border-danger/20';
      default:
        return 'text-text-muted bg-surface-active border-border-muted';
    }
  };

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto space-y-6">


      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-muted text-sm font-medium">Total Clients</p>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{total}</p>
            {/* Animated High-Tech Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none rounded-[23px] overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              <div className="absolute inset-[-50%]" style={{ 
                backgroundImage: "radial-gradient(var(--primary) 1.5px, transparent 1.5px)", 
                backgroundSize: "20px 20px", 
                animation: "panGrid 4s linear infinite",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, black 100%)",
                maskImage: "linear-gradient(to bottom, transparent 20%, black 100%)"
              }}></div>
            </div>
          </div>
        </div>

        {/* Active Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-muted text-sm font-medium">Active</p>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{active}</p>
            {/* Animated High-Tech Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none rounded-[23px] overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              <div className="absolute inset-[-50%]" style={{ 
                backgroundImage: "radial-gradient(var(--primary) 1.5px, transparent 1.5px)", 
                backgroundSize: "20px 20px", 
                animation: "panGrid 4s linear infinite",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, black 100%)",
                maskImage: "linear-gradient(to bottom, transparent 20%, black 100%)"
              }}></div>
            </div>
          </div>
        </div>

        {/* Pending Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-muted text-sm font-medium">Pending</p>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{pending}</p>
            {/* Animated High-Tech Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none rounded-[23px] overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              <div className="absolute inset-[-50%]" style={{ 
                backgroundImage: "radial-gradient(var(--primary) 1.5px, transparent 1.5px)", 
                backgroundSize: "20px 20px", 
                animation: "panGrid 4s linear infinite",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, black 100%)",
                maskImage: "linear-gradient(to bottom, transparent 20%, black 100%)"
              }}></div>
            </div>
          </div>
        </div>

        {/* On Hold Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-muted text-sm font-medium">On Hold</p>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{onHold}</p>
            {/* Animated High-Tech Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none rounded-[23px] overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              <div className="absolute inset-[-50%]" style={{ 
                backgroundImage: "radial-gradient(var(--primary) 1.5px, transparent 1.5px)", 
                backgroundSize: "20px 20px", 
                animation: "panGrid 4s linear infinite",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, black 100%)",
                maskImage: "linear-gradient(to bottom, transparent 20%, black 100%)"
              }}></div>
            </div>
          </div>
        </div>

        {/* Completed Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-muted text-sm font-medium">Completed</p>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{completed}</p>
            {/* Animated High-Tech Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none rounded-[23px] overflow-hidden opacity-30 group-hover:opacity-50 transition-opacity duration-500">
              <div className="absolute inset-[-50%]" style={{ 
                backgroundImage: "radial-gradient(var(--primary) 1.5px, transparent 1.5px)", 
                backgroundSize: "20px 20px", 
                animation: "panGrid 4s linear infinite",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, black 100%)",
                maskImage: "linear-gradient(to bottom, transparent 20%, black 100%)"
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search, Filters, Sort, Add Client Button */}
      <div className="flex flex-col xl:flex-row justify-between gap-4 items-center bg-surface/95 backdrop-blur-md p-4 rounded-[20px] border border-border-base sticky top-0 z-50 shadow-sm self-start w-full">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64 shrink-0">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-border-muted text-foreground rounded-full pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          
          {/* Filter */}
          <div className="relative w-full sm:w-48 shrink-0">
            <button 
              onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}
              className="w-full bg-surface border border-border-muted text-foreground rounded-full pl-5 pr-4 py-3 focus:outline-none hover:border-primary transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="truncate text-sm font-medium">
                {filterStatus === 'all' ? 'All Statuses' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
              </span>
              <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsFilterOpen(false)}></div>
                <div className="absolute top-full left-0 mt-2 w-full bg-surface border border-border-base rounded-[16px] shadow-xl overflow-hidden z-40 py-2">
                  {['all', 'active', 'pending', 'on hold', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilterStatus(status);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-surface-active ${filterStatus === status ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}
                    >
                      {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sort */}
          <div className="relative w-full sm:w-56 shrink-0">
            <button 
              onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}
              className="w-full bg-surface border border-border-muted text-foreground rounded-full pl-5 pr-4 py-3 focus:outline-none hover:border-primary transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="truncate text-sm font-medium">
                {sortBy === 'start-desc' && 'Started: Newest'}
                {sortBy === 'start-asc' && 'Started: Oldest'}
                {sortBy === 'end-desc' && 'Ending: Latest'}
                {sortBy === 'end-asc' && 'Ending: Soonest'}
              </span>
              <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsSortOpen(false)}></div>
                <div className="absolute top-full left-0 mt-2 w-full bg-surface border border-border-base rounded-[16px] shadow-xl overflow-hidden z-40 py-2">
                  <button onClick={() => { setSortBy('start-desc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'start-desc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Started: Newest</button>
                  <button onClick={() => { setSortBy('start-asc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'start-asc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Started: Oldest</button>
                  <button onClick={() => { setSortBy('end-desc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'end-desc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Ending: Latest</button>
                  <button onClick={() => { setSortBy('end-asc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'end-asc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Ending: Soonest</button>
                </div>
              </>
            )}
          </div>
        </div>

        <Link href="/clients/new" className="px-6 py-3 w-full xl:w-auto bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center gap-2 shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Client
        </Link>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="group relative bg-background rounded-[24px] p-[1px] shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,126,225,0.15)] overflow-hidden">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-border-base via-border-muted to-border-base group-hover:from-primary group-hover:via-[var(--primary-light)] group-hover:to-[var(--primary)] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Card Content Background */}
            <div className="relative h-full bg-surface rounded-[23px] overflow-hidden flex flex-col z-10">
              
              {/* Subtle Top Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <Link href={`/clients/${client.id}`} className="flex flex-col flex-1 relative z-20 group/link">
                <div className="p-6 pb-5 flex items-center gap-4 border-b border-border-base/50">
                  <div className="w-16 h-16 rounded-[16px] bg-surface border border-border-muted p-3 shrink-0 shadow-inner flex items-center justify-center group-hover/link:border-primary/30 transition-colors duration-500">
                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain group-hover/link:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-foreground truncate group-hover/link:text-primary transition-colors mb-1.5">{client.name}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      {/* Status Indicator */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-hover border border-border-base">
                        <div className={`w-1.5 h-1.5 rounded-full ${client.projectStatus === 'Active' ? 'bg-success shadow-[0_0_5px_var(--color-success)]' : client.projectStatus === 'Pending' ? 'bg-warning shadow-[0_0_5px_var(--color-warning)]' : client.projectStatus === 'Completed' ? 'bg-primary' : 'bg-danger'}`}></div>
                        <span className="text-text-muted font-medium tracking-wide uppercase text-[10px]">{client.projectStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 flex-1">
                  <div className="flex items-center gap-3 text-text-muted text-sm group-hover/link:text-text-dim transition-colors">
                    <div className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center border border-border-base group-hover/link:border-border-muted transition-colors">
                      <svg className="w-4 h-4 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <span className="font-mono tracking-wide">{client.contactNumber}</span>
                  </div>
                </div>
              </Link>

              <div className="px-6 pb-6 pt-2 bg-gradient-to-b from-transparent to-surface-active/50 relative z-20">
                <div className="flex w-full gap-3">
                  <a 
                    href={`tel:${client.contactNumber.replace(/[^0-9+]/g, '')}`} 
                    className="flex-1 flex items-center justify-center py-3 bg-surface rounded-full text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-md"
                    title="Call"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </a>
                  <a 
                    href={`mailto:${client.email}`}
                    className="flex-1 flex items-center justify-center py-3 bg-surface rounded-full text-danger hover:bg-danger hover:text-white transition-colors duration-300 shadow-md"
                    title="Email"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                  </a>
                  <a 
                    href={`https://wa.me/${client.contactNumber.replace(/[^0-9+]/g, '')}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center py-3 bg-surface rounded-full text-success hover:bg-success hover:text-white transition-colors duration-300 shadow-md"
                    title="WhatsApp"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredClients.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-surface border border-border-base rounded-[24px]">
          <div className="w-20 h-20 bg-surface-hover border border-border-base rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">No clients found</h3>
          <p className="text-text-muted max-w-md">We couldn't find any clients matching your criteria. Try adjusting your search or sort parameters.</p>
        </div>
      )}
    </div>
  );
}
