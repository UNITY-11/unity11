import Link from "next/link";

export function TeamToolbar({
  searchQuery, setSearchQuery,
  filterDepartment, setFilterDepartment,
  isFilterOpen, setIsFilterOpen,
  sortBy, setSortBy,
  isSortOpen, setIsSortOpen,
  departments
}: {
  searchQuery: string; setSearchQuery: (val: string) => void;
  filterDepartment: string; setFilterDepartment: (val: string) => void;
  isFilterOpen: boolean; setIsFilterOpen: (val: boolean) => void;
  sortBy: string; setSortBy: (val: string) => void;
  isSortOpen: boolean; setIsSortOpen: (val: boolean) => void;
  departments: string[];
}) {
  return (
    <div className="flex flex-col xl:flex-row justify-between gap-4 items-center bg-surface/95 backdrop-blur-md p-4 rounded-[20px] border border-border-base sticky top-0 z-50 shadow-sm self-start w-full">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
        {/* Search */}
        <div className="relative w-full sm:w-64 shrink-0">
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input 
            type="text" 
            placeholder="Search team..." 
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
              {filterDepartment === 'all' ? 'All Departments' : filterDepartment.charAt(0).toUpperCase() + filterDepartment.slice(1)}
            </span>
            <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isFilterOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsFilterOpen(false)}></div>
              <div className="absolute top-full left-0 mt-2 w-full bg-surface border border-border-base rounded-[16px] shadow-xl overflow-hidden z-40 py-2">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => { setFilterDepartment(dept); setIsFilterOpen(false); }}
                    className={`w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-surface-active ${filterDepartment === dept ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}
                  >
                    {dept === 'all' ? 'All Departments' : dept.charAt(0).toUpperCase() + dept.slice(1)}
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
              {sortBy === 'join-desc' && 'Joined: Newest'}
              {sortBy === 'join-asc' && 'Joined: Oldest'}
              {sortBy === 'name-asc' && 'Name: A-Z'}
              {sortBy === 'name-desc' && 'Name: Z-A'}
            </span>
            <svg className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isSortOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsSortOpen(false)}></div>
              <div className="absolute top-full left-0 mt-2 w-full bg-surface border border-border-base rounded-[16px] shadow-xl overflow-hidden z-40 py-2">
                <button onClick={() => { setSortBy('join-desc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'join-desc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Joined: Newest</button>
                <button onClick={() => { setSortBy('join-asc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'join-asc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Joined: Oldest</button>
                <button onClick={() => { setSortBy('name-asc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'name-asc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Name: A-Z</button>
                <button onClick={() => { setSortBy('name-desc'); setIsSortOpen(false); }} className={`w-full text-left px-5 py-2.5 text-sm hover:bg-surface-active ${sortBy === 'name-desc' ? 'text-primary font-medium bg-primary/5' : 'text-foreground'}`}>Name: Z-A</button>
              </div>
            </>
          )}
        </div>
      </div>

      <Link href="/team/new" className="px-6 py-3 w-full xl:w-auto bg-gradient-to-r from-primary to-primary-light text-white rounded-full font-medium shadow-[0_0_20px_rgba(0,180,216,0.3)] hover:opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center gap-2 shrink-0">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        Add Member
      </Link>
    </div>
  );
}
