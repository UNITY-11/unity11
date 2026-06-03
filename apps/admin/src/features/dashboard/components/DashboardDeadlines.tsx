import { upcomingDeadlines } from "../data/mockDashboard";

export function DashboardDeadlines() {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <span className="bg-red-500/10 text-red-500 text-[10px] px-2 py-0.5 rounded-full font-bold border border-red-500/20 uppercase">Urgent</span>;
      case "medium":
        return <span className="bg-orange-500/10 text-orange-500 text-[10px] px-2 py-0.5 rounded-full font-bold border border-orange-500/20 uppercase">Soon</span>;
      case "low":
        return <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold border border-primary/20 uppercase">Track</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base h-full">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-foreground font-medium flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          Upcoming Deadlines
        </h3>
        <button className="text-primary hover:text-primary-light text-sm font-medium transition-colors">
          View Calendar
        </button>
      </div>

      <div className="space-y-4">
        {upcomingDeadlines.map((item) => (
          <div key={item.id} className="group relative flex flex-col p-4 rounded-xl border border-border-muted bg-background hover:border-primary/50 transition-colors">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary-light rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-sm font-semibold text-foreground leading-tight pr-2">{item.project}</h4>
              {getSeverityBadge(item.severity)}
            </div>
            <div className="flex justify-between items-end mt-auto pt-2 border-t border-border-base">
              <span className="text-xs text-text-muted font-medium">{item.client}</span>
              <span className="text-xs font-bold text-foreground flex items-center gap-1">
                <svg className="w-3 h-3 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {item.due}
              </span>
            </div>
          </div>
        ))}
        {upcomingDeadlines.length === 0 && (
          <div className="text-center py-6 text-text-muted text-sm">
            No deadlines approaching this week.
          </div>
        )}
      </div>
    </div>
  );
}
