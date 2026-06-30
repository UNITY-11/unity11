import { fetchProjects } from "@/sanity/lib/fetchers";
import { ProjectsView } from "@/features/projects/components/ProjectsView";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await fetchProjects();
  return <ProjectsView projects={projects} />;
}
