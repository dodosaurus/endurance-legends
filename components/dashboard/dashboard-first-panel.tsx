import { User } from "@prisma/client";
import DashboardRefreshCard from "./dashboard-refresh-card";
import DashboardCoinsStatusCard from "./dashboard-coins-status-card";

type Props = {
  user: User;
}

export default function DashboardFirstPanel({ user }: Props) {
  return <div className="flex gap-2">
    <DashboardRefreshCard lastStravaRefresh={user.lastStravaRefresh} inAppSince={user.inAppSince} />
    <DashboardCoinsStatusCard />
  </div>;
}