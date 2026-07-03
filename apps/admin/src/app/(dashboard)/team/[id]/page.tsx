import { fetchTeamMemberRawById } from "@/sanity/lib/fetchers";
import { TeamMemberDetailView } from "@/features/team/components/TeamMemberDetailView";
import { getImageUrl } from "@/sanity/lib/helpers";
import { notFound } from "next/navigation";

export default async function TeamMemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await fetchTeamMemberRawById(id);

  if (!member) notFound();

  return (
    <TeamMemberDetailView
      member={{
        id: member._id,
        name: member.name ?? "",
        role: member.role ?? "",
        department: member.department ?? "Engineering",
        email: member.email ?? "",
        phone: member.phone ?? "",
        avatar: getImageUrl(member.image, "https://api.dicebear.com/7.x/avataaars/svg?seed=team"),
        status: member.status ?? "Active",
        joinDate: member.joinDate ?? member._createdAt ?? new Date().toISOString(),
        bio: member.bio ?? "",
      }}
    />
  );
}
