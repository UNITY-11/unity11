import { Sidebar } from "@/components/layout/Sidebar";
import { HeaderShell } from "@/components/layout/HeaderShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative">
        <HeaderShell />
        <main className="flex-1 overflow-y-auto relative z-10">{children}</main>
      </div>
    </div>
  );
}
