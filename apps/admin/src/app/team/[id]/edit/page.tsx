import { fetchTeamMemberRawById } from "@/sanity/lib/fetchers";
import { TeamForm } from "@/features/team/components/TeamForm";
import { notFound } from "next/navigation";
import { getImageUrl } from "@/sanity/lib/helpers";

export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await fetchTeamMemberRawById(id);

  if (!member) notFound();

  return (
    <TeamForm
      member={{
        id: member._id,
        name: member.name ?? "",
        role: member.role ?? "",
        department: member.department ?? "Engineering",
        email: member.email ?? "",
        phone: member.phone ?? "",
        bio: member.bio ?? "",
        status: member.status ?? "Active",
        avatar: getImageUrl(member.image, ""),
        joinDate: member.joinDate ?? member._createdAt ?? "",
      }}
    />
  );
}
