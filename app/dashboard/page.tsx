import DashboardRefreshCard from "@/components/dashboard-refresh-card";
import DashboardStatusCards from "@/components/dashboard-status-cards";
import DashboardTable from "@/components/dashboard-table";

export default function Dashboard() {
  return <div id="dashboard" className="flex flex-col gap-2">
    <DashboardRefreshCard />
    <DashboardStatusCards />
    <DashboardTable />
  </div>;
}
