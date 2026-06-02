export function DashboardCharts() {
  return (
    <>
      {/* Bottom Left: Bar Chart */}
      <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base">
        <div className="flex justify-between items-start mb-8">
          <h3 className="text-foreground font-medium flex items-center gap-2"><svg className="w-5 h-5 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> Tickets Resolved</h3>
          <button className="text-text-muted hover:text-foreground">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" /></svg>
          </button>
        </div>
        <div className="flex items-end justify-between h-32 gap-2 mt-4 relative">
          {/* Tooltip mockup on one bar */}
          <div className="absolute top-0 right-[20%] -mt-8 bg-surface-active text-foreground text-xs px-2 py-1 rounded border border-border-muted">
            12 Tickets
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-border-base"></div>
          </div>

          <div className="w-full bg-surface-hover rounded-full h-[40%]"></div>
          <div className="w-full bg-surface-hover rounded-full h-[60%]"></div>
          <div className="w-full bg-surface-hover rounded-full h-[50%]"></div>
          <div className="w-full bg-surface-hover rounded-full h-[30%]"></div>
          <div className="w-full bg-surface-hover rounded-full h-[70%]"></div>
          <div className="w-full bg-gradient-to-t from-primary to-primary-light rounded-full h-[90%] shadow-[0_0_15px_rgba(0,180,216,0.3)]"></div>
          <div className="w-full bg-surface-hover rounded-full h-[50%]"></div>
        </div>
        <div className="flex justify-between text-text-dim text-xs mt-4 px-1 uppercase font-semibold tracking-wider">
          <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span className="text-foreground">S</span><span>S</span>
        </div>
      </div>

      {/* Bottom Middle: Donut Charts */}
      <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-foreground font-medium flex items-center gap-2"><svg className="w-5 h-5 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> Server Uptime</h3>
          <div className="bg-surface-hover text-text-muted text-xs px-3 py-1 rounded-full border border-border-base">
            Last 24h ⌄
          </div>
        </div>
        <div className="flex justify-around items-center h-40">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--primary-light)" />
                </linearGradient>
              </defs>
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border-base)" strokeWidth="4" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#blueGradient)" strokeWidth="4" strokeDasharray="99, 100" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-foreground font-semibold">99.9%</span>
            </div>
          </div>
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <defs>
                <linearGradient id="blueGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--primary-light)" />
                </linearGradient>
              </defs>
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border-base)" strokeWidth="4" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#blueGradient2)" strokeWidth="4" strokeDasharray="80, 100" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-foreground font-semibold">80%</span>
            </div>
          </div>
        </div>
        <div className="flex justify-around text-xs text-text-muted">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> Target SLA</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> CPU Load</span>
        </div>
      </div>
    </>
  );
}
