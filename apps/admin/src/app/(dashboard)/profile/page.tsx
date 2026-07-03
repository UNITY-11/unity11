import { fetchAdminProfile } from "@/sanity/lib/fetchers";
import { ProfileView } from "@/features/profile/components/ProfileView";

export default async function ProfilePage() {
  const profile = await fetchAdminProfile();
  return <ProfileView profile={profile} />;
}
