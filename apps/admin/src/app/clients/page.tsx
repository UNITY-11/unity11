"use client";

import { useState } from "react";
import Link from "next/link";

// Mock data for clients
const mockClients = [
  {
    id: 1,
    name: "Apple Inc.",
    logo: "https://logo.clearbit.com/apple.com",
    contactNumber: "+1 (555) 123-4567",
    projectStatus: "Active",
    email: "contact@apple.com",
  },
  {
    id: 2,
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
    contactNumber: "+1 (555) 987-6543",
    projectStatus: "Pending",
    email: "hello@google.com",
  },
  {
    id: 3,
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    contactNumber: "+1 (555) 555-0199",
    projectStatus: "Completed",
    email: "info@microsoft.com",
  },
  {
    id: 4,
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    contactNumber: "+1 (555) 444-3322",
    projectStatus: "Active",
    email: "partners@amazon.com",
  },
  {
    id: 5,
    name: "Meta",
    logo: "https://logo.clearbit.com/meta.com",
    contactNumber: "+1 (555) 666-7788",
    projectStatus: "On Hold",
    email: "inquiries@meta.com",
  },
];

export default function ClientsPage() {
  const [clients, setClients] = useState(mockClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredClients = clients
    .filter(client => 
      (filterStatus === 'all' || client.projectStatus.toLowerCase() === filterStatus.toLowerCase()) &&
      (client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       client.projectStatus.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      // Default to sorting by status priority
      const statusOrder: Record<string, number> = {
        'Active': 1,
        'Pending': 2,
        'On Hold': 3,
        'Completed': 4
      };
      const orderA = statusOrder[a.projectStatus] || 99;
      const orderB = statusOrder[b.projectStatus] || 99;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name);
    });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-[#00c853] bg-[#00c853]/10 border-[#00c853]/20';
      case 'pending':
        return 'text-[#ffc107] bg-[#ffc107]/10 border-[#ffc107]/20';
      case 'completed':
        return 'text-[#007ee1] bg-[#007ee1]/10 border-[#007ee1]/20';
      case 'on hold':
        return 'text-[#ff4444] bg-[#ff4444]/10 border-[#ff4444]/20';
      default:
        return 'text-[#888888] bg-[#222222] border-[#333333]';
    }
  };

  return (
    <div className="flex flex-col h-full max-w-[1600px] w-full mx-auto px-4 md:px-6 lg:px-8 pb-16 lg:pb-24">
      {/* Header Section */}
      <div className="sticky top-0 z-30 bg-[#000000] py-6 mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#222222]">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Clients</h1>
          <p className="text-[#888888]">Manage your client relationships and ongoing projects.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] border border-[#333333] text-white rounded-full pl-12 pr-4 py-3 focus:outline-none focus:border-[#007ee1] transition-colors"
            />
          </div>
          <div className="relative w-full sm:w-48 shrink-0">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full bg-[#111111] border border-[#333333] text-white rounded-full pl-5 pr-4 py-3 focus:outline-none hover:border-[#007ee1] transition-colors flex items-center justify-between cursor-pointer"
            >
              <span className="truncate text-sm font-medium">
                {filterStatus === 'all' ? 'All Statuses' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
              </span>
              <svg className={`w-4 h-4 text-[#888888] transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setIsFilterOpen(false)}></div>
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#333333] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-40 py-2">
                  {['all', 'active', 'pending', 'on hold', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilterStatus(status);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 hover:bg-[#2a2a2a] transition-colors flex items-center gap-3 text-sm ${filterStatus === status ? 'text-[#007ee1] bg-[#007ee1]/5 font-medium' : 'text-[#cccccc]'}`}
                    >
                      {status !== 'all' ? (
                        <div className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-[#00c853] shadow-[0_0_8px_#00c853]' : status === 'pending' ? 'bg-[#ffc107] shadow-[0_0_8px_#ffc107]' : status === 'completed' ? 'bg-[#007ee1]' : 'bg-[#ff4444]'}`}></div>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-[#555555]"></div>
                      )}
                      {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <Link href="/clients/new" className="px-6 py-3 w-full sm:w-auto bg-gradient-to-r from-[#007ee1] to-[#00b4d8] text-white rounded-full font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center gap-2 shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Client
          </Link>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="group relative bg-[#0a0a0a] rounded-[24px] p-[1px] shadow-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,126,225,0.15)] overflow-hidden">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#222222] via-[#111111] to-[#222222] group-hover:from-[#007ee1] group-hover:via-[#00b4d8] group-hover:to-[#007ee1] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Card Content Background */}
            <div className="relative h-full bg-[#111111] rounded-[23px] overflow-hidden flex flex-col z-10 pb-6">
              
              {/* Subtle Top Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#007ee1]/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <Link href={`/clients/${client.id}`} className="flex flex-col flex-1 relative z-20 group/link">
                <div className="p-6 pb-5 flex items-center gap-4 border-b border-[#222222]/50">
                  <div className="w-16 h-16 rounded-[16px] bg-white border border-[#2a2a2a] p-3 shrink-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] flex items-center justify-center group-hover/link:border-[#007ee1]/30 transition-colors duration-500">
                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain group-hover/link:scale-110 transition-transform duration-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-white truncate group-hover/link:text-[#007ee1] transition-colors mb-1.5">{client.name}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      {/* Status Indicator */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1a1a1a] border border-[#222222]">
                        <div className={`w-1.5 h-1.5 rounded-full ${client.projectStatus === 'Active' ? 'bg-[#00c853] shadow-[0_0_5px_#00c853]' : client.projectStatus === 'Pending' ? 'bg-[#ffc107] shadow-[0_0_5px_#ffc107]' : client.projectStatus === 'Completed' ? 'bg-[#007ee1]' : 'bg-[#ff4444]'}`}></div>
                        <span className="text-[#888888] font-medium tracking-wide uppercase text-[10px]">{client.projectStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-5 flex-1">
                  <div className="flex items-center gap-3 text-[#888888] text-sm group-hover/link:text-[#a0a0a0] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#222222] group-hover/link:border-[#333] transition-colors">
                      <svg className="w-4 h-4 text-[#666]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    </div>
                    <span className="font-mono tracking-wide">{client.contactNumber}</span>
                  </div>
                </div>
              </Link>

              <div className="px-6 pb-6 pt-2 bg-gradient-to-b from-transparent to-[#0a0a0a]/80 relative z-20">
                <div className="flex w-full bg-white rounded-full overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <a 
                    href={`tel:${client.contactNumber.replace(/[^0-9+]/g, '')}`} 
                    className="flex-1 flex items-center justify-center py-3 text-[#007ee1] hover:bg-[#007ee1] hover:text-white transition-colors duration-300 border-r border-gray-200"
                    title="Call"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </a>
                  <a 
                    href={`mailto:${client.email}`}
                    className="flex-1 flex items-center justify-center py-3 text-[#ff4444] hover:bg-[#ff4444] hover:text-white transition-colors duration-300 border-r border-gray-200"
                    title="Email"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                  </a>
                  <a 
                    href={`https://wa.me/${client.contactNumber.replace(/[^0-9+]/g, '')}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center py-3 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-300"
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
        <div className="flex flex-col items-center justify-center py-20 text-center bg-[#111111] border border-[#222222] rounded-[24px]">
          <div className="w-20 h-20 bg-[#1a1a1a] border border-[#222222] rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No clients found</h3>
          <p className="text-[#888888] max-w-md">We couldn't find any clients matching your criteria. Try adjusting your search or sort parameters.</p>
        </div>
      )}
    </div>
  );
}
