export function DashboardView() {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Left Card: Next Project / Client */}
        <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-foreground font-medium flex items-center gap-2"><svg className="w-5 h-5 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> Recent Client</h3>
            <button className="text-text-muted hover:text-foreground">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" /></svg>
            </button>
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Acme" alt="Acme" />
            </div>
            <div>
              <p className="text-foreground font-medium">Acme Corporation</p>
              <div className="flex items-center text-sm text-primary">
                <span>★</span>
                <span className="ml-1 text-text-muted">Enterprise Account</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-sm mb-1">Active Project</p>
              <p className="text-foreground text-sm">Cloud Migration Setup</p>
            </div>
            <button className="px-4 py-2 rounded-full bg-surface-active text-foreground text-sm hover:bg-border-muted transition-colors border border-border-muted">
              View Details
            </button>
          </div>
        </div>

        {/* Top Middle Card: Earnings / Revenue */}
        <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2"><svg className="w-5 h-5 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div className="bg-surface-active px-3 py-1 rounded-full text-xs font-medium text-primary border border-border-muted">
              ● 20% Better
            </div>
            </div>
            <button className="text-text-muted hover:text-foreground">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" /></svg>
            </button>
          </div>
          <div className="my-6">
            <p className="text-text-muted text-sm mb-1">Monthly Revenue</p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-semibold text-primary">$128,450</h2>
              {/* Mini sparkline mockup */}
              <div className="w-16 h-8 opacity-80" style={{ backgroundImage: "linear-gradient(to top, rgba(0, 180, 216, 0.2), transparent)", borderBottom: "2px solid var(--primary-light)" }}></div>
            </div>
          </div>
          <button className="w-full py-3 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:from-[#006bbd] hover:to-[#009bc2] transition-colors shadow-[0_0_20px_rgba(0,180,216,0.3)]">
            Download Report
          </button>
        </div>

        {/* Top Right Card: Global Reach / Active Servers */}
        <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base relative overflow-hidden">
          <h3 className="text-foreground font-medium mb-2 flex items-center gap-2"><svg className="w-5 h-5 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg> Global Infrastructure</h3>
          {/* Map placeholder */}
          <div className="absolute inset-0 top-12 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, var(--primary-light) 1px, transparent 1px)", backgroundSize: "10px 10px", maskImage: "linear-gradient(to bottom, black, transparent)" }}></div>
          <div className="absolute top-[40%] left-[30%] w-2 h-2 rounded-full bg-primary-light shadow-[0_0_10px_var(--primary-light)]"></div>
          <div className="absolute top-[50%] left-[60%] w-2 h-2 rounded-full bg-primary-light shadow-[0_0_10px_var(--primary-light)]"></div>
          <div className="absolute top-[35%] left-[80%] w-2 h-2 rounded-full bg-primary-light shadow-[0_0_10px_var(--primary-light)]"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-surface-hover rounded-2xl p-4 border border-border-muted backdrop-blur-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-semibold text-primary">42</span>
                <span className="text-xs bg-surface-active px-2 py-1 rounded text-text-muted">Active Nodes</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full shadow-[0_0_8px_rgba(0,180,216,0.5)]" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
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

        {/* Bottom Right: List (Projects/Rides) */}
        <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-foreground font-medium flex items-center gap-2"><svg className="w-5 h-5 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Recent Activity</h3>
            <button className="text-text-muted hover:text-foreground">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" /></svg>
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Project Launch', desc: '4 June, 2025 - 07:40 PM', tag: 'Web Dev' },
              { title: 'Database Backup', desc: '4 June, 2025 - 06:20 PM', tag: 'DevOps' }
            ].map((item, i) => (
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

      </div>
    </div>
  );
}
