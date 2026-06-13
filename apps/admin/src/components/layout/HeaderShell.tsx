import { fetchAdminProfile, fetchUnreadNotificationsCount } from "@/sanity/lib/fetchers";
import { Header } from "./Header";

export async function HeaderShell() {
  const [profile, unreadCount] = await Promise.all([
    fetchAdminProfile(),
    fetchUnreadNotificationsCount(),
  ]);

  return <Header profileAvatar={profile.avatar} unreadNotifications={unreadCount ?? 0} />;
}
