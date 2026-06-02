export function DashboardStats() {
  return (
    <>
      {/* Top Left Card: Active Projects */}
      <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-24 h-24 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <h3 className="text-foreground font-medium flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            Active Projects
          </h3>
          <div className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium border border-primary/20">
            +3 This Month
          </div>
        </div>
        <div className="relative z-10">
          <div className="flex items-end gap-3 mb-2">
            <h2 className="text-4xl font-bold text-foreground">12</h2>
            <p className="text-text-muted text-sm pb-1">Projects</p>
          </div>
          <div className="w-full bg-background rounded-full h-1.5 mt-4 border border-border-base">
            <div className="bg-primary h-1.5 rounded-full shadow-[0_0_8px_rgba(0,180,216,0.5)]" style={{ width: '65%' }}></div>
          </div>
          <p className="text-text-dim text-xs mt-2">65% overall completion rate</p>
        </div>
      </div>

      {/* Top Middle Card: Earnings / Revenue */}
      <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-24 h-24 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <h3 className="text-foreground font-medium flex items-center gap-2">
             <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            Monthly Revenue
          </h3>
          <div className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium border border-primary/20">
            +12.5%
          </div>
        </div>
        <div className="relative z-10 mb-4">
          <h2 className="text-4xl font-bold text-foreground tracking-tight">$128.4k</h2>
          <p className="text-text-muted text-sm mt-1">vs $114.2k last month</p>
        </div>
        
        {/* Minimal Sparkline */}
        <div className="h-10 flex items-end gap-1 w-full mt-2 relative z-10">
          {[40, 30, 50, 45, 70, 65, 85, 90, 100].map((val, i) => (
            <div key={i} className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary/50 transition-colors" style={{ height: `${val}%` }}></div>
          ))}
        </div>
      </div>

      {/* Top Right Card: Team Bandwidth */}
      <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg className="w-24 h-24 text-primary-light" fill="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        </div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <h3 className="text-foreground font-medium flex items-center gap-2">
            <div className="p-2 bg-primary-light/10 rounded-lg border border-primary-light/20">
              <svg className="w-5 h-5 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            Team Capacity
          </h3>
        </div>
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-lg" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border-base)" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--primary-light)" strokeWidth="3" strokeDasharray="85, 100" className="drop-shadow-[0_0_8px_rgba(0,180,216,0.5)]" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-foreground font-bold text-lg">85%</span>
            </div>
          </div>
          <div>
            <p className="text-foreground font-medium mb-1">High Utilization</p>
            <p className="text-text-dim text-xs leading-relaxed">Most team members are fully allocated for the next 2 weeks.</p>
          </div>
        </div>
      </div>
    </>
  );
}
