import DashboardFirstPanel from "@/components/dashboard/dashboard-first-panel";
import DashboardSecondPanel from "@/components/dashboard/dashboard-second-panel";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { dashboardSync } from "@/server/fetchers";
import { verifySession } from "@/server/session";
export default async function Dashboard() {
  const { athleteId } = await verifySession();
  const { activities, user } = await dashboardSync(athleteId as number);

  return <div id="dashboard" className="flex flex-col gap-2">
    <DashboardFirstPanel user={user} />
    <DashboardSecondPanel user={user} />
    <DashboardTable activities={activities}/>
  </div>;
}
