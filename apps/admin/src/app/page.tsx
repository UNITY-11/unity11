import { fetchDashboardData } from "@/sanity/lib/fetchers";
import { DashboardView } from "@/features/dashboard/components/DashboardView";

export default async function Dashboard() {
  const data = await fetchDashboardData();
  return <DashboardView data={data} />;
}
