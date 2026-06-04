import { Project, ProjectsGridProps } from "../types";
import { ProjectCard } from "./ProjectCard";

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (projects.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center text-center bg-[#0a0a0a] rounded-4xl border border-dashed border-[#333]">
        <h3 className="text-2xl font-semibold text-white mb-2">
          No projects found
        </h3>
        <p className="text-gray-400">
          We didn&apos;t find any projects matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 pb-32 pt-8">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} index={index} {...project} />
      ))}
    </div>
  );
}
