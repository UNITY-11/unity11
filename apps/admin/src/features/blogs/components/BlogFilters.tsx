export function BlogFilters({
  searchQuery, setSearchQuery,
  statusFilter, setStatusFilter,
  selectedCategory, setSelectedCategory,
  availableCategories,
  viewMode, setViewMode
}: {
  searchQuery: string; setSearchQuery: (val: string) => void;
  statusFilter: string; setStatusFilter: (val: string) => void;
  selectedCategory: string; setSelectedCategory: (val: string) => void;
  availableCategories: string[];
  viewMode: 'table' | 'card'; setViewMode: (val: 'table' | 'card') => void;
}) {
  return (
    <div className="flex flex-col xl:flex-row gap-4 items-center bg-surface/95 backdrop-blur-md p-4 rounded-[20px] border border-border-base sticky top-0 z-50 shadow-sm self-start w-full">
      
      <div className="relative w-full xl:w-64 shrink-0">
        <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
        <input 
          type="text" 
          placeholder="Search blogs..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-surface border border-border-muted rounded-full py-2.5 pl-10 pr-4 text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-[#007ee1] transition-all"
        />
      </div>

      <div className="flex-1 w-full overflow-x-auto flex items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center gap-2 w-max px-1">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all shadow-sm ${selectedCategory === "All" ? "bg-primary text-white border border-primary" : "bg-surface border border-border-muted text-text-muted hover:bg-surface-hover hover:text-foreground"}`}
          >
            All Categories
          </button>
          {availableCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all shadow-sm ${selectedCategory === cat ? "bg-primary text-white border border-primary" : "bg-surface border border-border-muted text-text-muted hover:bg-surface-hover hover:text-foreground"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center gap-3 w-full xl:w-auto shrink-0">
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-surface border border-border-muted rounded-full py-2.5 px-4 text-foreground focus:outline-none focus:ring-2 focus:ring-[#007ee1] transition-all cursor-pointer flex-1 xl:flex-none appearance-none"
        >
          <option value="All">All Statuses</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
        </select>

        <div className="flex items-center bg-surface border border-border-muted rounded-full p-1 shrink-0">
          <button 
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-full transition-all ${viewMode === 'table' ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-foreground'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
          </button>
          <button 
            onClick={() => setViewMode('card')}
            className={`p-2 rounded-full transition-all ${viewMode === 'card' ? 'bg-primary text-white shadow-md' : 'text-text-muted hover:text-foreground'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
