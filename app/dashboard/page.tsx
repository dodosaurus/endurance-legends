import DashboardFirstPanel from "@/components/dashboard/dashboard-first-panel";
import DashboardSecondPanel from "@/components/dashboard/dashboard-second-panel";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { dashboardSync } from "@/server/interface/synchronizers";
import { verifySession } from "@/server/auth/session";
export default async function Dashboard() {
  const { athleteId } = await verifySession();
  const { activities, user } = await dashboardSync(athleteId as number);

  return (
    <div id="dashboard" className="flex flex-col gap-2">
      {user ? (
        <>
          <DashboardFirstPanel user={user} />
          <DashboardSecondPanel user={user} />
          <DashboardTable user={user} activities={activities} />
        </>
      ) :
        <p>Loading...</p>}
    </div>
  );
}
