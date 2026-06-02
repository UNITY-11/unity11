export function ClientStats({ total, active, pending, onHold, completed }: { total: number, active: number, pending: number, onHold: number, completed: number }) {
  return (
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
  );
}
