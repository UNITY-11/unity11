export function ProjectStats({ total, completed, workingOn, pending, newProjects }: { total: number, completed: number, workingOn: number, pending: number, newProjects: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Total Card */}
      <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-sm font-medium">Total Projects</p>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
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

      {/* Working On Card */}
      <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-sm font-medium">Working On</p>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{workingOn}</p>
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

      {/* New Card */}
      <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-sm font-medium">New</p>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{newProjects}</p>
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
  );
}
