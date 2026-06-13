import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { DashboardPerformance } from "@/features/dashboard/components/DashboardPerformance";
import { DashboardCharts } from "@/features/dashboard/components/DashboardCharts";
import type { DashboardData } from "@/features/dashboard/types";

export function AnalyticsView({ data }: { data: DashboardData }) {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6 pb-12 px-6 lg:px-8 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardStats stats={data.stats} />
      </div>

      <div className="w-full">
        <DashboardPerformance data={data.performance} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCharts data={data.charts} />
      </div>
    </div>
  );
}
