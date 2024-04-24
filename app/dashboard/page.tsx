import DashboardRefreshCard from "@/components/dashboard-refresh-card";
import DashboardStatusCards from "@/components/dashboard-status-cards";
import DashboardTable from "@/components/dashboard-table";
import { findUniqueUser } from "@/server/queries";
export default async function Dashboard() {
  //pass the object props to children if needed later
  // const user = await findUniqueUser();

  return <div id="dashboard" className="flex flex-col gap-2">
    <DashboardRefreshCard />
    <DashboardStatusCards />
    <DashboardTable />
  </div>;
}
