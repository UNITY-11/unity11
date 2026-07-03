import { fetchDashboardData } from "@/sanity/lib/fetchers";
import { AnalyticsView } from "@/features/analytics/components/AnalyticsView";

export default async function AnalyticsPage() {
  const data = await fetchDashboardData();
  return <AnalyticsView data={data} />;
}
