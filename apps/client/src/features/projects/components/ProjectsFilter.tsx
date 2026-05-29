import { IoIosSearch, IoIosOptions } from "react-icons/io";

interface ProjectsFilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedTag: string;
  setSelectedTag: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  availableTags: string[];
}

export function ProjectsFilter({
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  sortBy,
  setSortBy,
  availableTags,
}: ProjectsFilterProps) {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between bg-[#0a0a0a] border border-[#222] p-4 rounded-full shadow-sm">
      {/* Search Bar */}
      <div className="relative w-full md:w-1/3">
        <IoIosSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-[#111] border border-[#333] text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
        />
      </div>

      {/* Tags Scrollable Row */}
      <div className="w-full md:w-1/2 flex overflow-x-auto hide-scrollbar gap-2 items-center px-1">
        <button
          onClick={() => setSelectedTag("All")}
          className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            selectedTag === "All"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-[#111] text-gray-400 border border-[#333] hover:bg-[#222] hover:text-white"
          }`}
        >
          All Projects
        </button>
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              selectedTag === tag
                ? "bg-blue-600 text-white shadow-md"
                : "bg-[#111] text-gray-400 border border-[#333] hover:bg-[#222] hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="w-full md:w-auto relative flex items-center">
        <div className="absolute left-4 pointer-events-none">
          <IoIosOptions className="text-gray-500 text-lg" />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full md:w-40 appearance-none bg-[#111] border border-[#333] text-white py-3 pl-10 pr-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium cursor-pointer"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}
