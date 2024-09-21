import DashboardFirstPanel from "@/components/dashboard/dashboard-first-panel";
import DashboardTable from "@/components/dashboard/dashboard-table";
import { dashboardSync } from "@/server/interface/synchronizers";
import { verifySession } from "@/server/auth/session";
import ScrollToTop from "@/components/scroll-to-top";
export default async function Dashboard() {
  const { athleteId } = await verifySession();
  const { activities, user } = await dashboardSync(athleteId as number);

  return (
    <div id="dashboard" className="flex-grow flex flex-col gap-2 w-full">
      <ScrollToTop />
      {user ? (
        <>
          <DashboardFirstPanel user={user} />
          <DashboardTable user={user} activities={activities} />
        </>
      ) :
        <p>Loading...</p>}
    </div>
  );
}
