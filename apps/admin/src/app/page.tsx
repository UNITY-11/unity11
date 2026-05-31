export default function Dashboard() {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Left Card: Next Project / Client */}
        <div className="bg-[#111111] rounded-[24px] p-6 shadow-2xl border border-[#222222]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-white font-medium">Recent Client</h3>
            <button className="text-[#888888] hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" /></svg>
            </button>
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Acme" alt="Acme" />
            </div>
            <div>
              <p className="text-white font-medium">Acme Corporation</p>
              <div className="flex items-center text-sm text-[#007ee1]">
                <span>★</span>
                <span className="ml-1 text-[#888888]">Enterprise Account</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#888888] text-sm mb-1">Active Project</p>
              <p className="text-white text-sm">Cloud Migration Setup</p>
            </div>
            <button className="px-4 py-2 rounded-full bg-[#222222] text-white text-sm hover:bg-[#333333] transition-colors border border-[#333333]">
              View Details
            </button>
          </div>
        </div>

        {/* Top Middle Card: Earnings / Revenue */}
        <div className="bg-[#111111] rounded-[24px] p-6 shadow-2xl border border-[#222222] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-[#222222] px-3 py-1 rounded-full text-xs font-medium text-[#007ee1] border border-[#333333]">
              ● 20% Better
            </div>
            <button className="text-[#888888] hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" /></svg>
            </button>
          </div>
          <div className="my-6">
            <p className="text-[#888888] text-sm mb-1">Monthly Revenue</p>
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-semibold text-white">$128,450</h2>
              {/* Mini sparkline mockup */}
              <div className="w-16 h-8 opacity-80" style={{ backgroundImage: "linear-gradient(to top, rgba(0, 180, 216, 0.2), transparent)", borderBottom: "2px solid #00b4d8" }}></div>
            </div>
          </div>
          <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#007ee1] to-[#00b4d8] text-white font-semibold hover:from-[#006bbd] hover:to-[#009bc2] transition-colors shadow-[0_0_20px_rgba(0,180,216,0.3)]">
            Download Report
          </button>
        </div>

        {/* Top Right Card: Global Reach / Active Servers */}
        <div className="bg-[#111111] rounded-[24px] p-6 shadow-2xl border border-[#222222] relative overflow-hidden">
          <h3 className="text-white font-medium mb-2">Global Infrastructure</h3>
          {/* Map placeholder */}
          <div className="absolute inset-0 top-12 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, #00b4d8 1px, transparent 1px)", backgroundSize: "10px 10px", maskImage: "linear-gradient(to bottom, black, transparent)" }}></div>
          <div className="absolute top-[40%] left-[30%] w-2 h-2 rounded-full bg-[#00b4d8] shadow-[0_0_10px_#00b4d8]"></div>
          <div className="absolute top-[50%] left-[60%] w-2 h-2 rounded-full bg-[#00b4d8] shadow-[0_0_10px_#00b4d8]"></div>
          <div className="absolute top-[35%] left-[80%] w-2 h-2 rounded-full bg-[#00b4d8] shadow-[0_0_10px_#00b4d8]"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-[#2a2a2a] backdrop-blur-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-semibold text-white">42</span>
                <span className="text-xs bg-[#222222] px-2 py-1 rounded text-[#888888]">Active Nodes</span>
              </div>
              <div className="w-full bg-[#0a0a0a] rounded-full h-2">
                <div className="bg-gradient-to-r from-[#007ee1] to-[#00b4d8] h-2 rounded-full shadow-[0_0_8px_rgba(0,180,216,0.5)]" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bottom Left: Bar Chart */}
        <div className="bg-[#111111] rounded-[24px] p-6 shadow-2xl border border-[#222222]">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-white font-medium">Tickets Resolved</h3>
            <button className="text-[#888888] hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" /></svg>
            </button>
          </div>
          <div className="flex items-end justify-between h-32 gap-2 mt-4 relative">
            {/* Tooltip mockup on one bar */}
            <div className="absolute top-0 right-[20%] -mt-8 bg-[#222222] text-white text-xs px-2 py-1 rounded border border-[#333333]">
              12 Tickets
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-4 border-transparent border-t-[#222222]"></div>
            </div>

            <div className="w-full bg-[#1a1a1a] rounded-full h-[40%]"></div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-[60%]"></div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-[50%]"></div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-[30%]"></div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-[70%]"></div>
            <div className="w-full bg-gradient-to-t from-[#007ee1] to-[#00b4d8] rounded-full h-[90%] shadow-[0_0_15px_rgba(0,180,216,0.3)]"></div>
            <div className="w-full bg-[#1a1a1a] rounded-full h-[50%]"></div>
          </div>
          <div className="flex justify-between text-[#555555] text-xs mt-4 px-1 uppercase font-semibold tracking-wider">
            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span className="text-white">S</span><span>S</span>
          </div>
        </div>

        {/* Bottom Middle: Donut Charts */}
        <div className="bg-[#111111] rounded-[24px] p-6 shadow-2xl border border-[#222222]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-white font-medium">Server Uptime</h3>
            <div className="bg-[#1a1a1a] text-[#888888] text-xs px-3 py-1 rounded-full border border-[#222222]">
              Last 24h ⌄
            </div>
          </div>
          <div className="flex justify-around items-center h-40">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#007ee1" />
                    <stop offset="100%" stopColor="#00b4d8" />
                  </linearGradient>
                </defs>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#222" strokeWidth="4" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#blueGradient)" strokeWidth="4" strokeDasharray="99, 100" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-semibold">99.9%</span>
              </div>
            </div>
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <defs>
                  <linearGradient id="blueGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#007ee1" />
                    <stop offset="100%" stopColor="#00b4d8" />
                  </linearGradient>
                </defs>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#222" strokeWidth="4" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="url(#blueGradient2)" strokeWidth="4" strokeDasharray="80, 100" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-semibold">80%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-around text-xs text-[#888888]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#007ee1]"></span> Target SLA</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#007ee1]"></span> CPU Load</span>
          </div>
        </div>

        {/* Bottom Right: List (Projects/Rides) */}
        <div className="bg-[#111111] rounded-[24px] p-6 shadow-2xl border border-[#222222]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-white font-medium">Recent Activity</h3>
            <button className="text-[#888888] hover:text-white">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14a2 2 0 110-4 2 2 0 010 4zm0-6a2 2 0 110-4 2 2 0 010 4zm0 12a2 2 0 110-4 2 2 0 010 4z" /></svg>
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Project Launch', desc: '4 June, 2025 - 07:40 PM', tag: 'Web Dev' },
              { title: 'Database Backup', desc: '4 June, 2025 - 06:20 PM', tag: 'DevOps' }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center bg-[#1a1a1a] p-4 rounded-2xl border border-[#2a2a2a] cursor-pointer hover:bg-[#222222] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.tag}`} alt="Icon" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <p className="text-[#888888] text-xs mt-0.5">{item.desc}</p>
                    <p className="text-[#555555] text-xs">{item.tag}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-[#555555]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
