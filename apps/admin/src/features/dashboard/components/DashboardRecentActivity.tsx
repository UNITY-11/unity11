export function DashboardRecentActivity({ activities }: { activities: Array<{ title: string, desc: string, tag: string }> }) {
  return (
    <>
      {/* Bottom Right: List (Projects/Rides) */}
      <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-foreground font-medium flex items-center gap-2"><svg className="w-5 h-5 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Recent Activity</h3>
        <button className="text-text-muted hover:text-foreground">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" /></svg>
        </button>
      </div>
      <div className="space-y-3">
        {activities.map((item, i) => (
          <div key={i} className="flex justify-between items-center bg-surface-hover p-4 rounded-2xl border border-border-muted cursor-pointer hover:bg-surface-active transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.tag}`} alt="Icon" />
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">{item.title}</p>
                <p className="text-text-muted text-xs mt-0.5">{item.desc}</p>
                <p className="text-text-dim text-xs">{item.tag}</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
