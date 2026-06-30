import Link from "next/link";
import Image from "next/image";
import { Project } from "../types";

export function ProjectGrid({ 
  projects,
  onFeaturedToggle
}: { 
  projects: Project[];
  onFeaturedToggle: (id: string, featured: boolean) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {projects.map((project) => (
        <div key={project.id} className={`group w-full rounded-[2rem] overflow-hidden shadow-sm flex flex-col justify-between relative min-h-[400px]`} style={{ background: project.bg }}>
          
          <div className="p-6 pb-0 flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex gap-2">
                <span className="text-xs px-3 py-1.5 rounded-full text-white bg-white/40 backdrop-blur-3xl shadow-sm">
                  {project.tag1}
                </span>
                {project.tag2 && (
                  <span className="text-xs px-3 py-1.5 rounded-full text-white bg-white/40 backdrop-blur-3xl shadow-sm">
                    {project.tag2}
                  </span>
                )}
              </div>
              <button
                onClick={() => onFeaturedToggle(project.id, !project.featured)}
                className={`p-1.5 rounded-full backdrop-blur-md shadow-sm transition-colors z-20 ${
                  project.featured ? "text-blue-500 bg-white/30 hover:bg-white/40" : "text-white/70 bg-white/10 hover:text-blue-500 hover:bg-white/30"
                }`}
                title={project.featured ? "Unfeature project" : "Feature project"}
              >
                <svg className="w-5 h-5" fill={project.featured ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white leading-none">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 line-clamp-3 leading-snug">
              {project.description}
            </p>
          </div>

          <div className="relative w-full aspect-[4/3] rounded-t-3xl overflow-hidden mt-6 mt-auto">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            
            {/* Status Indicator Bottom Right */}
            <div className="absolute bottom-4 right-4 z-20">
              <span className={`px-4 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md shadow-lg bg-black/60 text-white border-white/20`}>
                {project.status}
              </span>
            </div>

            {/* Hover Overlay with Edit Button */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
              <Link 
                href={`/projects/${project.id}/edit`} 
                className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-50 group-hover:scale-100 transition-all duration-300 hover:bg-primary hover:text-foreground" 
                title="Edit Project"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </Link>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
