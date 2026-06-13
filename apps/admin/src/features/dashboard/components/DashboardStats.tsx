import type { DashboardStats as StatsData } from "../types";

export function DashboardStats({ stats }: { stats: StatsData }) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 1, notation: amount >= 1000 ? "compact" : "standard" }).format(amount);

  const sparkline = [40, 30, 50, 45, 70, 65, 85, 90, 100].map((v, i) =>
    Math.round(v * (0.5 + (stats.monthlyRevenue > 0 ? 0.5 : 0.1)))
  );

  return (
    <>
      <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base relative overflow-hidden group">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <h3 className="text-foreground font-medium flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
            Active Projects
          </h3>
          {stats.projectsThisMonth > 0 && (
            <div className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-medium border border-primary/20">
              +{stats.projectsThisMonth} This Month
            </div>
          )}
        </div>
        <div className="relative z-10">
          <div className="flex items-end gap-3 mb-2">
            <h2 className="text-4xl font-bold text-foreground">{stats.activeProjects}</h2>
            <p className="text-text-muted text-sm pb-1">of {stats.totalProjects} Projects</p>
          </div>
          <div className="w-full bg-background rounded-full h-1.5 mt-4 border border-border-base">
            <div className="bg-primary h-1.5 rounded-full shadow-[0_0_8px_rgba(0,180,216,0.5)]" style={{ width: `${stats.completionRate}%` }}></div>
          </div>
          <p className="text-text-dim text-xs mt-2">{stats.completionRate}% overall completion rate</p>
        </div>
      </div>

      <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base relative overflow-hidden group">
        <div className="flex justify-between items-start mb-6 relative z-10">
          <h3 className="text-foreground font-medium flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            Collected Revenue
          </h3>
        </div>
        <div className="relative z-10 mb-4">
          <h2 className="text-4xl font-bold text-foreground tracking-tight">{formatCurrency(stats.monthlyRevenue)}</h2>
          <p className="text-text-muted text-sm mt-1">{stats.publishedBlogs} published blogs • {stats.totalBlogViews.toLocaleString()} views</p>
        </div>
        <div className="h-10 flex items-end gap-1 w-full mt-2 relative z-10">
          {sparkline.map((val, i) => (
            <div key={i} className="flex-1 bg-primary/20 rounded-t-sm hover:bg-primary/50 transition-colors" style={{ height: `${val}%` }}></div>
          ))}
        </div>
      </div>

      <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base relative overflow-hidden group">
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
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--primary-light)" strokeWidth="3" strokeDasharray={`${stats.teamUtilization}, 100`} className="drop-shadow-[0_0_8px_rgba(0,180,216,0.5)]" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-foreground font-bold text-lg">{stats.teamUtilization}%</span>
            </div>
          </div>
          <div>
            <p className="text-foreground font-medium mb-1">{stats.activeTeam} of {stats.totalTeam} Active</p>
            <p className="text-text-dim text-xs leading-relaxed">Team utilization based on active members in Sanity.</p>
          </div>
        </div>
      </div>
    </>
  );
}
