import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { DashboardPerformance } from "@/features/dashboard/components/DashboardPerformance";
import { DashboardCharts } from "@/features/dashboard/components/DashboardCharts";

export function AnalyticsView() {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6 pb-12 px-6 lg:px-8 mt-6">

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardStats />
      </div>

      {/* Main Performance Chart */}
      <div className="w-full">
        <DashboardPerformance />
      </div>

      {/* Additional Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCharts />
      </div>
    </div>
  );
}
