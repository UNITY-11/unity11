import { DashboardStats } from "./DashboardStats";
import { DashboardCharts } from "./DashboardCharts";
import { DashboardRecentActivity } from "./DashboardRecentActivity";
import { recentActivities } from "../data/mockDashboard";

export function DashboardView() {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCharts />
        <DashboardRecentActivity activities={recentActivities} />
      </div>
    </div>
  );
}
