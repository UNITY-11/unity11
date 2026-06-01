"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

const initialProjects = [
  {
    id: "ai-insights-1",
    tag1: "AI + Analytics",
    tag2: "Dashboard",
    title: "AI-Powered Insights Platform",
    description: "Built an insights dashboard with real-time analytics, LLM automation, and advanced monitoring tools.",
    image: "/images/blog/blog2.png",
    bg: "bg-gradient-to-t from-purple-600 to-blue-300",
    date: "2024-03-15T00:00:00Z",
    status: "Completed",
  },
  {
    id: "fintech-app-1",
    tag1: "Finance",
    tag2: "Mobile App",
    title: "Fintech App Modernization",
    description: "A complete redesign + modernization of an outdated fintech application, improving speed, UX, and scalability.",
    image: "/images/blog/blog1.png",
    bg: "bg-gradient-to-tl from-gray-700 to-gray-300",
    date: "2024-02-10T00:00:00Z",
    status: "Working On",
  },
  {
    id: "ecommerce-1",
    tag1: "E-commerce",
    tag2: "Branding",
    title: "Next-Gen Storefront",
    description: "A complete e-commerce revamp with improved conversion flow, brand identity, and blazing fast UI.",
    image: "/images/blog/blog3.png",
    bg: "bg-gradient-to-t from-white to-blue-700",
    date: "2023-11-20T00:00:00Z",
    status: "Completed",
  },
  {
    id: "health-tracker",
    tag1: "HealthTech",
    tag2: "Mobile App",
    title: "Vitals Health Tracker",
    description: "A wearable-integrated health application that syncs metrics in real-time to alert users of anomalies.",
    image: "/images/home/heroImg1.png",
    bg: "bg-gradient-to-tl from-teal-700 to-teal-300",
    date: "2024-01-05T00:00:00Z",
    status: "Pending",
  },
  {
    id: "saas-crm",
    tag1: "SaaS",
    tag2: "Web App",
    title: "Enterprise CRM Dashboard",
    description: "Scalable CRM web application built for enterprise clients with deep integrations into accounting software.",
    image: "/images/home/heroImg3.png",
    bg: "bg-gradient-to-t from-indigo-900 to-indigo-400",
    date: "2023-09-12T00:00:00Z",
    status: "Working On",
  },
  {
    id: "crypto-wallet",
    tag1: "Web3",
    tag2: "Blockchain",
    title: "Secure Crypto Wallet UI",
    description: "A non-custodial crypto wallet interface with advanced security alerts, staking pools, and portfolio tracking.",
    image: "/images/about/mission.png",
    bg: "bg-gradient-to-bl from-orange-500 to-yellow-300",
    date: "2024-04-01T00:00:00Z",
    status: "New",
  }
];

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');

  const total = initialProjects.length;
  const completed = initialProjects.filter(p => p.status === "Completed").length;
  const newProjects = initialProjects.filter(p => p.status === "New").length;
  const pending = initialProjects.filter(p => p.status === "Pending").length;
  const workingOn = initialProjects.filter(p => p.status === "Working On").length;

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.tag1) tags.add(p.tag1);
      if (p.tag2) tags.add(p.tag2);
    });
    return Array.from(tags);
  }, []);

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...initialProjects];

    if (selectedTag !== "All") {
      result = result.filter(
        (p) => p.tag1 === selectedTag || p.tag2 === selectedTag
      );
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.id.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      result = result.filter(p => p.status === statusFilter);
    }

    return result;
  }, [searchQuery, statusFilter, selectedTag]);

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Projects</h1>
          <p className="text-[#888888] mt-1">Manage your portfolio projects and track their current status.</p>
        </div>
        <Link 
          href="/projects/new"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#007ee1] to-[#00b4d8] text-white font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-all flex items-center gap-2 shrink-0"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Project
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-[#007ee1]/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#007ee1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[23px] p-5 flex flex-col relative z-10 border-b-2 border-black/50 shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#888888] text-sm font-medium">Total Projects</p>
              <div className="w-8 h-8 rounded-full bg-[#007ee1]/10 flex items-center justify-center border border-[#007ee1]/20 shadow-inner">
                <svg className="w-4 h-4 text-[#007ee1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-md">{total}</p>
          </div>
        </div>

        {/* Completed Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-[#007ee1]/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#007ee1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[23px] p-5 flex flex-col relative z-10 border-b-2 border-black/50 shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#888888] text-sm font-medium">Completed</p>
              <div className="w-8 h-8 rounded-full bg-[#007ee1]/10 flex items-center justify-center border border-[#007ee1]/20 shadow-inner">
                <svg className="w-4 h-4 text-[#007ee1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-md">{completed}</p>
          </div>
        </div>

        {/* Working On Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-[#007ee1]/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#007ee1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[23px] p-5 flex flex-col relative z-10 border-b-2 border-black/50 shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#888888] text-sm font-medium">Working On</p>
              <div className="w-8 h-8 rounded-full bg-[#007ee1]/10 flex items-center justify-center border border-[#007ee1]/20 shadow-inner">
                <svg className="w-4 h-4 text-[#007ee1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-md">{workingOn}</p>
          </div>
        </div>

        {/* Pending Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-[#007ee1]/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#007ee1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[23px] p-5 flex flex-col relative z-10 border-b-2 border-black/50 shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#888888] text-sm font-medium">Pending</p>
              <div className="w-8 h-8 rounded-full bg-[#007ee1]/10 flex items-center justify-center border border-[#007ee1]/20 shadow-inner">
                <svg className="w-4 h-4 text-[#007ee1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-md">{pending}</p>
          </div>
        </div>

        {/* New Card */}
        <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-[#007ee1]/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#007ee1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="h-full bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-[23px] p-5 flex flex-col relative z-10 border-b-2 border-black/50 shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[#888888] text-sm font-medium">New</p>
              <div className="w-8 h-8 rounded-full bg-[#007ee1]/10 flex items-center justify-center border border-[#007ee1]/20 shadow-inner">
                <svg className="w-4 h-4 text-[#007ee1]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-white tracking-tight drop-shadow-md">{newProjects}</p>
          </div>
        </div>
      </div>

      {/* Toolbar: Search, Filters, View Toggles */}
      <div className="flex flex-col xl:flex-row gap-4 items-center bg-[#111111]/95 backdrop-blur-md p-4 rounded-[20px] border border-[#222222] sticky -top-4 md:-top-6 lg:-top-8 z-50 shadow-2xl self-start w-full">
        
        <div className="relative w-full xl:w-64 shrink-0">
          <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#333333] rounded-full py-2.5 pl-10 pr-4 text-white placeholder:text-[#555555] focus:outline-none focus:ring-2 focus:ring-[#007ee1] transition-all"
          />
        </div>

        {/* Tags Row - Flex 1 allows it to take remaining middle space */}
        <div className="flex-1 w-full overflow-x-auto flex items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center gap-2 w-max px-1">
            <button
              onClick={() => setSelectedTag("All")}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all shadow-sm ${selectedTag === "All" ? "bg-[#007ee1] text-white border border-[#007ee1]" : "bg-[#1a1a1a] border border-[#333333] text-[#888888] hover:bg-[#222222] hover:text-white"}`}
            >
              All Tags
            </button>
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all shadow-sm ${selectedTag === tag ? "bg-[#007ee1] text-white border border-[#007ee1]" : "bg-[#1a1a1a] border border-[#333333] text-[#888888] hover:bg-[#222222] hover:text-white"}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full xl:w-auto shrink-0">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#0a0a0a] border border-[#333333] rounded-full py-2.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#007ee1] transition-all cursor-pointer flex-1 xl:flex-none appearance-none"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Working On">Working On</option>
            <option value="Pending">Pending</option>
            <option value="New">New</option>
          </select>

          <div className="flex items-center bg-[#0a0a0a] border border-[#333333] rounded-full p-1 shrink-0">
            <button 
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-full transition-all ${viewMode === 'table' ? 'bg-[#222222] text-white shadow-sm' : 'text-[#888888] hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20" /></svg>
            </button>
            <button 
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-full transition-all ${viewMode === 'card' ? 'bg-[#222222] text-white shadow-sm' : 'text-[#888888] hover:text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Projects List Content */}
      {filteredAndSortedProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#111111] rounded-[24px] border border-[#222222]">
          <svg className="w-16 h-16 text-[#333333] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <p className="text-xl font-medium text-white mb-1">No projects found</p>
          <p className="text-[#888888]">Try adjusting your search query or filters.</p>
        </div>
      ) : viewMode === 'table' ? (
        <div className="bg-[#111111] rounded-[24px] shadow-2xl border border-[#222222] flex flex-col flex-1 min-h-0">
          <div className="overflow-auto flex-1 custom-scrollbar rounded-[24px]">
            <table className="w-full text-left border-collapse relative min-w-[800px]">
              <thead className="bg-[#111111] z-30 shadow-[0_1px_0_0_#222222] sticky top-0">
                <tr className="text-[#888888] text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-medium">Project</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222222]">
                {filteredAndSortedProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-[#333333] relative">
                        <Image src={project.image} alt={project.title} fill className="object-cover" sizes="64px" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{project.title}</p>
                        <p className="text-[#555555] text-xs mt-0.5">{project.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1 flex-wrap">
                        <span className="bg-[#222222] px-3 py-1 rounded-full text-xs text-[#888888] border border-[#333333]">
                          {project.tag1}
                        </span>
                        {project.tag2 && (
                          <span className="bg-[#222222] px-3 py-1 rounded-full text-xs text-[#888888] border border-[#333333]">
                            {project.tag2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 relative">
                      <div className="relative inline-block">
                        <select 
                          defaultValue={project.status}
                          className={`appearance-none px-3 py-1.5 pr-8 rounded-full text-xs font-medium border bg-[#111111] hover:bg-[#1a1a1a] transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#007ee1] ${
                            project.status === 'Completed' ? 'text-[#007ee1] border-[#007ee1]/30' :
                            project.status === 'Working On' ? 'text-[#00b4d8] border-[#00b4d8]/30' :
                            project.status === 'New' ? 'text-white border-white/30' :
                            'text-[#888888] border-[#333333]'
                          }`}
                        >
                          <option value="Completed" className="text-white bg-[#111111]">Completed</option>
                          <option value="Working On" className="text-white bg-[#111111]">Working On</option>
                          <option value="Pending" className="text-white bg-[#111111]">Pending</option>
                          <option value="New" className="text-white bg-[#111111]">New</option>
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#888888] text-sm">
                      {new Date(project.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/projects/${project.id}/edit`} className="inline-block p-2 text-[#888888] hover:text-[#00b4d8] transition-colors" title="Edit Project">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProjects.map((project) => (
            <div key={project.id} className={`group ${project.bg} w-full rounded-[2rem] overflow-hidden shadow-sm flex flex-col justify-between relative min-h-[400px]`}>
              
              <div className="p-6 pb-0 flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex gap-2">
                    <span className="text-xs px-3 py-1.5 rounded-full text-white bg-white/40 backdrop-blur-3xl shadow-sm">
                      {project.tag1}
                    </span>
                    {project.tag2 && (
                      <span className="text-xs px-3 py-1.5 rounded-full text-white bg-white/40 backdrop-blur-3xl shadow-sm">
                        {project.tag2}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white leading-none">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 line-clamp-3 leading-snug">
                  {project.description}
                </p>
              </div>

              <div className="relative w-full aspect-[4/3] rounded-t-3xl overflow-hidden mt-6 mt-auto">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                {/* Status Indicator Bottom Right */}
                <div className="absolute bottom-4 right-4 z-20">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md shadow-lg bg-black/60 text-white border-white/20`}>
                    {project.status}
                  </span>
                </div>

                {/* Hover Overlay with Edit Button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <Link 
                    href={`/projects/${project.id}/edit`} 
                    className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-all duration-300 hover:bg-[#007ee1] hover:text-white" 
                    title="Edit Project"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
