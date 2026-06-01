"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const mockTeam = [
  {
    id: 1,
    name: "Ajmal Faris",
    role: "Lead Full Stack Developer",
    department: "Engineering",
    email: "ajmal@unity11.com",
    phone: "+1 (555) 000-1111",
    avatar: "https://i.pravatar.cc/150?u=ajmal",
    status: "Active",
    joinDate: "2023-01-10",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Senior UI/UX Designer",
    department: "Design",
    email: "sarah@unity11.com",
    phone: "+1 (555) 000-2222",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    status: "Active",
    joinDate: "2023-03-15",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Project Manager",
    department: "Management",
    email: "michael@unity11.com",
    phone: "+1 (555) 000-3333",
    avatar: "https://i.pravatar.cc/150?u=michael",
    status: "On Leave",
    joinDate: "2022-11-01",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Frontend Engineer",
    department: "Engineering",
    email: "elena@unity11.com",
    phone: "+1 (555) 000-4444",
    avatar: "https://i.pravatar.cc/150?u=elena",
    status: "Active",
    joinDate: "2024-02-20",
  },
  {
    id: 5,
    name: "David Kim",
    role: "DevOps Engineer",
    department: "Engineering",
    email: "david@unity11.com",
    phone: "+1 (555) 000-5555",
    avatar: "https://i.pravatar.cc/150?u=david",
    status: "Active",
    joinDate: "2023-07-10",
  },
];

export default function TeamPage() {
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

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-success text-success" : "bg-warning text-warning";
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-full">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-muted text-sm font-medium">Total Team</p>
            </div>
            <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{totalMembers}</p>
          </div>
        </div>
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-muted text-sm font-medium">Engineering</p>
            </div>
            <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{engineering}</p>
          </div>
        </div>
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-muted text-sm font-medium">Design</p>
            </div>
            <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{design}</p>
          </div>
        </div>
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-text-muted text-sm font-medium">Management</p>
            </div>
            <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{management}</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col xl:flex-row justify-between gap-4 items-center bg-surface/95 backdrop-blur-md p-4 rounded-[20px] border border-border-base sticky top-0 z-50 shadow-sm self-start w-full">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64 shrink-0">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search team..." 
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
                {filterDepartment === 'all' ? 'All Departments' : filterDepartment.charAt(0).toUpperCase() + filterDepartment.slice(1)}
              </span>
              <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsFilterOpen(false)}></div>
                <div className="absolute top-full left-0 mt-2 w-full bg-surface border border-border-base rounded-[16px] shadow-xl overflow-hidden z-40 py-2">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => { setFilterDepartment(dept); setIsFilterOpen(false); }}
                      className={`w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-surface-active ${filterDepartment === dept ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}
                    >
                      {dept === 'all' ? 'All Departments' : dept.charAt(0).toUpperCase() + dept.slice(1)}
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
                {sortBy === 'join-desc' && 'Joined: Newest'}
                {sortBy === 'join-asc' && 'Joined: Oldest'}
                {sortBy === 'name-asc' && 'Name: A-Z'}
                {sortBy === 'name-desc' && 'Name: Z-A'}
              </span>
              <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsSortOpen(false)}></div>
                <div className="absolute top-full left-0 mt-2 w-full bg-surface border border-border-base rounded-[16px] shadow-xl overflow-hidden z-40 py-2">
                  <button onClick={() => { setSortBy('join-desc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'join-desc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Joined: Newest</button>
                  <button onClick={() => { setSortBy('join-asc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'join-asc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Joined: Oldest</button>
                  <button onClick={() => { setSortBy('name-asc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'name-asc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Name: A-Z</button>
                  <button onClick={() => { setSortBy('name-desc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'name-desc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Name: Z-A</button>
                </div>
              </>
            )}
          </div>
        </div>

        <Link href="/team/new" className="px-6 py-3 w-full xl:w-auto bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center gap-2 shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Member
        </Link>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {filteredTeam.map((member) => (
          <div key={member.id} className="group relative rounded-[28px] bg-surface border border-border-base shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">
            <Link href={`/team/${member.id}`} className="flex-1 p-6 relative z-10 flex flex-col h-full cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border-base relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.avatar} alt={member.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col items-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(member.status)} bg-opacity-10 border shadow-sm ${member.status === 'Active' ? 'border-success/20' : 'border-warning/20'}`}>
                    {member.status}
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                <p className="text-sm font-medium text-text-dim mb-3">{member.role}</p>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <span className="w-2 h-2 rounded-full bg-primary/40"></span>
                  {member.department}
                </div>
              </div>
            </Link>

            <div className="px-6 pb-6 pt-2 bg-gradient-to-b from-transparent to-surface-active/50 relative z-20 mt-auto">
              <div className="flex w-full gap-3">
                <a 
                  href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`} 
                  className="flex-1 flex items-center justify-center py-3 bg-surface rounded-full text-primary hover:bg-primary hover:text-white transition-colors duration-300 shadow-md"
                  title="Call"
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </a>
                <a 
                  href={`mailto:${member.email}`}
                  className="flex-1 flex items-center justify-center py-3 bg-surface rounded-full text-danger hover:bg-danger hover:text-white transition-colors duration-300 shadow-md"
                  title="Email"
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </a>
                <a 
                  href={`https://wa.me/${member.phone.replace(/[^0-9+]/g, '')}`} 
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
        ))}
      </div>
      
      {filteredTeam.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-surface border border-border-base rounded-[24px] mt-8">
          <div className="w-20 h-20 bg-surface-hover border border-border-base rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">No team members found</h3>
          <p className="text-text-muted max-w-md">We couldn't find any team members matching your criteria. Try adjusting your search or filter parameters.</p>
        </div>
      )}
    </div>
  );
}
