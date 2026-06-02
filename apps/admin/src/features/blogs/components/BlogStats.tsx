export function BlogStats({ total, totalViews, totalLikes, published, drafts }: { total: number, totalViews: number, totalLikes: number, published: number, drafts: number }) {
  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Total Blogs Card */}
      <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-sm font-medium">Total Blogs</p>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" /></svg>
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

      {/* Total Views Card */}
      <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-sm font-medium">Total Views</p>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{formatNumber(totalViews)}</p>
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

      {/* Total Likes Card */}
      <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-sm font-medium">Total Likes</p>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{formatNumber(totalLikes)}</p>
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

      {/* Published Card */}
      <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-sm font-medium">Published</p>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{published}</p>
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

      {/* Drafts Card */}
      <div className="relative group rounded-[24px] p-[1px] bg-gradient-to-b from-primary/40 to-transparent overflow-hidden shadow-[0_10px_40px_rgba(0,126,225,0.05)] transition-all duration-300 hover:scale-[1.02]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="h-full bg-surface rounded-[23px] p-5 flex flex-col relative z-10 border border-border-base shadow-[inset_0_1px_15px_rgba(0,126,225,0.08)]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-muted text-sm font-medium">Drafts</p>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
            </div>
          </div>
          <p className="text-4xl font-bold text-primary tracking-tight drop-shadow-md">{drafts}</p>
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
