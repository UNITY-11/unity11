import type { DashboardCharts as ChartsData } from "../types";

export function DashboardCharts({ data }: { data: ChartsData }) {
  const maxBar = Math.max(...data.weeklyBlogViews, 1);
  const peakIndex = data.weeklyBlogViews.indexOf(Math.max(...data.weeklyBlogViews));

  return (
    <>
      <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base">
        <div className="flex justify-between items-start mb-8">
          <h3 className="text-foreground font-medium flex items-center gap-2">
            <svg className="w-5 h-5 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Blog Views (Weekly)
          </h3>
        </div>
        <div className="flex items-end justify-between h-32 gap-2 mt-4 relative">
          {peakIndex >= 0 && data.weeklyBlogViews[peakIndex] > 0 && (
            <div className="absolute top-0 left-[calc(14%*var(--peak))] -mt-8 bg-surface-active text-foreground text-xs px-2 py-1 rounded border border-border-muted" style={{ left: `${(peakIndex / 6) * 100}%` }}>
              Peak day
            </div>
          )}
          {data.weeklyBlogViews.map((val, i) => (
            <div
              key={i}
              className={`w-full rounded-full ${i === peakIndex ? "bg-gradient-to-t from-primary to-primary-light shadow-[0_0_15px_rgba(0,180,216,0.3)]" : "bg-surface-hover"}`}
              style={{ height: `${Math.max((val / maxBar) * 100, 8)}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-text-dim text-xs mt-4 px-1 uppercase font-semibold tracking-wider">
          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
        </div>
      </div>

      <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-foreground font-medium flex items-center gap-2">
            <svg className="w-5 h-5 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Project & Team Health
          </h3>
        </div>
        <div className="flex justify-around items-center h-40">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border-base)" strokeWidth="4" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#blueGradient)" strokeWidth="4" strokeDasharray={`${data.projectCompletionRate}, 100`} />
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--primary-light)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-foreground font-semibold">{data.projectCompletionRate}%</span>
            </div>
          </div>
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border-base)" strokeWidth="4" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#blueGradient2)" strokeWidth="4" strokeDasharray={`${data.activeTeamRate}, 100`} />
              <defs>
                <linearGradient id="blueGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--primary-light)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-foreground font-semibold">{data.activeTeamRate}%</span>
            </div>
          </div>
        </div>
        <div className="flex justify-around text-xs text-text-muted">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> Completion Rate</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> Active Team</span>
        </div>
      </div>
    </>
  );
}
