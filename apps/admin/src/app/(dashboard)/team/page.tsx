import { fetchTeamMembers } from "@/sanity/lib/fetchers";
import { TeamView } from "@/features/team/components/TeamView";

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const team = await fetchTeamMembers();
  return <TeamView team={team} />;
}
