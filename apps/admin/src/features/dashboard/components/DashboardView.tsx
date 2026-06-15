import { ActiveProjectsTable } from "./ActiveProjectsTable";
import { DashboardRecentActivity } from "./DashboardRecentActivity";
import { DashboardFinancials } from "./DashboardFinancials";
import { DashboardDeadlines } from "./DashboardDeadlines";
import type { DashboardData } from "../types";

export function DashboardView({ data }: { data: DashboardData }) {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6 pb-12 mt-6 px-6 lg:px-8">
      <DashboardFinancials data={data.financials} />

      <div className="w-full">
        <ActiveProjectsTable projects={data.projects} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DashboardDeadlines deadlines={data.deadlines} />
        </div>
        <div className="lg:col-span-2">
          <DashboardRecentActivity activities={data.activities} />
        </div>
      </div>
    </div>
  );
}
