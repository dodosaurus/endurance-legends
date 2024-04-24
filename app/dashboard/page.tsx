import DashboardFirstPanel from "@/components/dashboard/dashboard-first-panel";
import DashboardSecondPanel from "@/components/dashboard/dashboard-second-panel";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { findUniqueUser } from "@/server/db/queries";
export default async function Dashboard() {
  const user = await findUniqueUser();

  return <div id="dashboard" className="flex flex-col gap-2">
    <DashboardFirstPanel user={user} />
    <DashboardSecondPanel user={user} />
    <DashboardTable />
  </div>;
}
