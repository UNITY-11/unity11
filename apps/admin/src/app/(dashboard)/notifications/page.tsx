import { fetchNotifications } from "@/sanity/lib/fetchers";
import { NotificationsView } from "@/features/notifications/components/NotificationsView";

export default async function NotificationsPage() {
  const notifications = await fetchNotifications();
  return <NotificationsView initialNotifications={notifications} />;
}
