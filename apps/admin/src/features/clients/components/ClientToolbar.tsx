import Link from "next/link";

export function ClientToolbar({
  searchQuery, setSearchQuery,
  filterStatus, setFilterStatus,
  sortBy, setSortBy,
  isFilterOpen, setIsFilterOpen,
  isSortOpen, setIsSortOpen
}: {
  searchQuery: string; setSearchQuery: (v: string) => void;
  filterStatus: string; setFilterStatus: (v: string) => void;
  sortBy: string; setSortBy: (v: string) => void;
  isFilterOpen: boolean; setIsFilterOpen: (v: boolean) => void;
  isSortOpen: boolean; setIsSortOpen: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col xl:flex-row justify-between gap-4 items-center bg-surface/95 backdrop-blur-md p-4 rounded-[20px] border border-border-base sticky top-0 z-50 shadow-sm self-start w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
        {/* Search */}
        <div className="relative w-full sm:w-64 shrink-0">
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            type="text" 
            placeholder="Search clients..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-border-muted text-foreground rounded-full pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        
        {/* Filter */}
        <div className="relative w-full sm:w-48 shrink-0">
          <button 
            onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}
            className="w-full bg-surface border border-border-muted text-foreground rounded-full pl-5 pr-4 py-3 focus:outline-none hover:border-primary transition-colors flex items-center justify-between cursor-pointer"
          >
            <span className="truncate text-sm font-medium">
              {filterStatus === 'all' ? 'All Statuses' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
            </span>
            <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isFilterOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsFilterOpen(false)}></div>
              <div className="absolute top-full left-0 mt-2 w-full bg-surface border border-border-base rounded-[16px] shadow-xl overflow-hidden z-40 py-2">
                {['all', 'active', 'pending', 'on hold', 'completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterStatus(status);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-surface-active ${filterStatus === status ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}
                  >
                    {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Sort */}
        <div className="relative w-full sm:w-56 shrink-0">
          <button 
            onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}
            className="w-full bg-surface border border-border-muted text-foreground rounded-full pl-5 pr-4 py-3 focus:outline-none hover:border-primary transition-colors flex items-center justify-between cursor-pointer"
          >
            <span className="truncate text-sm font-medium">
              {sortBy === 'start-desc' && 'Started: Newest'}
              {sortBy === 'start-asc' && 'Started: Oldest'}
              {sortBy === 'end-desc' && 'Ending: Latest'}
              {sortBy === 'end-asc' && 'Ending: Soonest'}
            </span>
            <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isSortOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsSortOpen(false)}></div>
              <div className="absolute top-full left-0 mt-2 w-full bg-surface border border-border-base rounded-[16px] shadow-xl overflow-hidden z-40 py-2">
                <button onClick={() => { setSortBy('start-desc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'start-desc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Started: Newest</button>
                <button onClick={() => { setSortBy('start-asc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'start-asc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Started: Oldest</button>
                <button onClick={() => { setSortBy('end-desc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'end-desc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Ending: Latest</button>
                <button onClick={() => { setSortBy('end-asc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'end-asc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Ending: Soonest</button>
              </div>
            </>
          )}
        </div>
      </div>

      <Link href="/clients/new" className="px-6 py-3 w-full xl:w-auto bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center gap-2 shrink-0">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        Add Client
      </Link>
    </div>
  );
}
