export interface Project {
  id: string;
  tag1: string;
  tag2: string;
  title: string;
  description: string;
  image: string;
  bg: string;
  date: string; // ISO date string for sorting
  visibility?: string;
  liveLink?: string;
  featured?: boolean;
}

export interface ProjectCardProps extends Project {
  index?: number;
}

export interface ProjectsFilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedTag: string;
  setSelectedTag: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  availableTags: string[];
}

export interface ProjectsGridProps {
  projects: Project[];
}
