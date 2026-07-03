import { fetchProjectRawById } from "@/sanity/lib/fetchers";
import { ProjectEditForm } from "@/features/projects/components/ProjectEditForm";
import { notFound } from "next/navigation";
import { getImageUrl } from "@/sanity/lib/helpers";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await fetchProjectRawById(id);

  if (!project) notFound();

  return (
    <ProjectEditForm
      project={{
        id: project._id,
        title: project.title ?? "",
        description: project.description ?? "",
        status: project.status ?? "new",
        tags: project.tags ?? [],
        bgStart: project.bgStart ?? "#2052bd",
        bgEnd: project.bgEnd ?? "#7fcbe4",
        date: project.completionDate ?? project._createdAt ?? new Date().toISOString(),
        image: getImageUrl(project.mainImage, "/images/blog/blog2.png"),
        visibility: project.visibility,
        liveLink: project.liveLink,
      }}
    />
  );
}
