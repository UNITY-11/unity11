import { performanceTrends } from "../data/mockDashboard";

export function DashboardPerformance() {
  // Helper to generate a simple SVG line chart
  const renderLineChart = (data: number[], colorClass: string, strokeClass: string) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    // Normalize data to a 0-100 scale for SVG coordinates
    const points = data.map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((val - min) / range) * 100;
      return `${x},${y}`;
    }).join(" ");

    return (
      <svg viewBox="0 -10 100 120" className="w-full h-full preserve-aspect-ratio-none overflow-visible">
        <defs>
          <linearGradient id={`grad-${colorClass}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Filled Area */}
        <polygon points={`0,100 ${points} 100,100`} fill={`url(#grad-${colorClass})`} className={colorClass} />
        {/* Stroke Line */}
        <polyline points={points} fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={strokeClass} />
      </svg>
    );
  };

  return (
    <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base w-full">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-foreground font-medium flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          Performance Trends
        </h3>
        <span className="text-text-muted text-xs">Last 12 Months</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Team Velocity */}
        <div className="flex flex-col">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Team Velocity</p>
              <h4 className="text-2xl font-bold text-foreground">90 <span className="text-sm font-normal text-text-muted">pts</span></h4>
            </div>
            <span className="text-primary text-xs font-bold">+12%</span>
          </div>
          <div className="h-24 w-full mt-2">
            {renderLineChart(performanceTrends.teamVelocity, "text-primary/30", "stroke-primary")}
          </div>
        </div>

        {/* Delivery Time */}
        <div className="flex flex-col">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Avg Delivery Time</p>
              <h4 className="text-2xl font-bold text-foreground">75 <span className="text-sm font-normal text-text-muted">days</span></h4>
            </div>
            <span className="text-primary text-xs font-bold">-5%</span>
          </div>
          <div className="h-24 w-full mt-2">
            {/* We invert the data visually so a drop in delivery time looks like a positive (downward) trend */}
            {renderLineChart(performanceTrends.deliveryTime, "text-primary-light/30", "stroke-primary-light")}
          </div>
        </div>

        {/* Client NPS */}
        <div className="flex flex-col">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-text-muted text-xs font-semibold uppercase tracking-wider mb-1">Client NPS</p>
              <h4 className="text-2xl font-bold text-foreground">92</h4>
            </div>
            <span className="text-primary text-xs font-bold">+4</span>
          </div>
          <div className="h-24 w-full mt-2">
            {renderLineChart(performanceTrends.clientNps, "text-primary/30", "stroke-primary")}
          </div>
        </div>
      </div>
    </div>
  );
}
