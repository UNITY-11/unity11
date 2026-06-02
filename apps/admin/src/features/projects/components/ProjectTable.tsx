import Link from "next/link";
import Image from "next/image";
import { Project } from "../types";

export function ProjectTable({ projects }: { projects: Project[] }) {
  return (
    <div className="bg-surface rounded-t-[24px] rounded-b-none border-b-0 shadow-sm border border-border-base flex flex-col flex-1 min-h-0">
      <div className="overflow-auto flex-1 custom-scrollbar rounded-t-[24px] rounded-b-none">
        <table className="w-full text-left border-collapse relative min-w-[800px]">
          <thead className="bg-surface z-30 border-b border-border-base sticky top-0">
            <tr className="text-foreground font-semibold text-sm uppercase tracking-wider">
              <th className="px-6 py-4 font-medium">Project</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-base">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-surface-hover transition-colors">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-border-muted relative">
                    <Image src={project.image} alt={project.title} fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">{project.title}</p>
                    <p className="text-text-muted text-xs mt-0.5">{project.id}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap">
                    <span className="bg-surface-hover px-3 py-1 rounded-full text-xs text-text-muted border border-border-muted">
                      {project.tag1}
                    </span>
                    {project.tag2 && (
                      <span className="bg-surface-hover px-3 py-1 rounded-full text-xs text-text-muted border border-border-muted">
                        {project.tag2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 relative">
                  <div className="relative inline-block">
                    <select 
                      defaultValue={project.status}
                      className={`appearance-none px-3 py-1.5 pr-8 rounded-full text-xs font-medium border bg-surface hover:bg-surface-hover transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#007ee1] ${
                        project.status === 'Completed' ? 'text-primary border-primary/30' :
                        project.status === 'Working On' ? 'text-[#00b4d8] border-[#00b4d8]/30' :
                        project.status === 'New' ? 'text-foreground border-border-muted' :
                        'text-text-muted border-border-muted'
                      }`}
                    >
                      <option value="Completed" className="text-foreground bg-surface">Completed</option>
                      <option value="Working On" className="text-foreground bg-surface">Working On</option>
                      <option value="Pending" className="text-foreground bg-surface">Pending</option>
                      <option value="New" className="text-foreground bg-surface">New</option>
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-text-muted text-sm">
                  {new Date(project.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/projects/${project.id}/edit`} className="inline-block p-2 text-text-muted hover:text-[#00b4d8] transition-colors" title="Edit Project">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
