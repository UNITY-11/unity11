import Link from "next/link";
import type { Project } from "@/features/projects/types";

export function ActiveProjectsTable({ projects }: { projects: Project[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-primary/10 text-primary border-primary/20";
      case "Working On":
        return "bg-primary-light/10 text-primary-light border-primary-light/20";
      case "Pending":
        return "bg-surface-active text-text-muted border-border-muted";
      case "New":
        return "bg-primary/5 text-primary border-primary/10";
      default:
        return "bg-surface-active text-text-muted border-border-muted";
    }
  };

  const getProgress = (status: string) => {
    switch (status) {
      case "Completed": return 100;
      case "Working On": return 65;
      case "Pending": return 30;
      case "New": return 10;
      default: return 0;
    }
  };

  return (
    <div className="bg-surface rounded-[24px] p-6 shadow-2xl border border-border-base col-span-1 lg:col-span-2">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-foreground font-medium flex items-center gap-2">
          <svg className="w-5 h-5 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Active Projects
        </h3>
        <Link href="/projects" className="text-primary hover:text-primary-light text-sm font-medium transition-colors">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-text-muted text-xs uppercase tracking-wider border-b border-border-base">
              <th className="pb-3 font-semibold">Project</th>
              <th className="pb-3 font-semibold">Tags</th>
              <th className="pb-3 font-semibold">Progress</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-base">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-surface-hover transition-colors group">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${project.bg} shadow-lg shadow-black/20`}>
                      <span className="text-white font-bold text-xs">{project.title.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-foreground text-sm font-medium line-clamp-1">{project.title}</p>
                      <p className="text-text-dim text-xs mt-0.5">Started: {new Date(project.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-text-muted">{project.tag1}</span>
                    <span className="text-xs text-text-dim">{project.tag2}</span>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <div className="w-full max-w-[120px]">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-text-muted">{getProgress(project.status)}%</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-1.5 overflow-hidden border border-border-base">
                      <div
                        className="bg-gradient-to-r from-primary to-primary-light h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${getProgress(project.status)}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <Link href={`/projects/${project.id}/edit`} className="text-text-muted hover:text-primary transition-colors opacity-0 group-hover:opacity-100 p-2 inline-block">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-text-muted text-sm">
                  No projects yet. <Link href="/projects/new" className="text-primary hover:underline">Create one</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
