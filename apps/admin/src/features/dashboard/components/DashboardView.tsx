import { ActiveProjectsTable } from "./ActiveProjectsTable";
import { DashboardRecentActivity } from "./DashboardRecentActivity";
import { DashboardFinancials } from "./DashboardFinancials";
import { DashboardDeadlines } from "./DashboardDeadlines";
import { recentActivities } from "../data/mockDashboard";

export function DashboardView() {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto space-y-6 pb-12 mt-6 px-6 lg:px-8">
      {/* Top Row: Financials */}
      <DashboardFinancials />

      {/* Third Row: Projects (Full Width) */}
      <div className="w-full">
        <ActiveProjectsTable />
      </div>

      {/* Third Row: Deadlines & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DashboardDeadlines />
        </div>
        <div className="lg:col-span-2">
          <DashboardRecentActivity activities={recentActivities} />
        </div>
      </div>
    </div>
  );
}
