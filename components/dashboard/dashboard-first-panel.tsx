import { User } from "@prisma/client";
import DashboardInfoCard from "./dashboard-info-card";
import DashboardCoinsStatusCard from "./dashboard-coins-status-card";

type Props = {
  user: User;
}

export default function DashboardFirstPanel({ user }: Props) {
  return <div className="flex flex-col sm:flex-row gap-2">
    <DashboardInfoCard lastStravaRefresh={user.lastStravaRefresh} inAppSince={user.inAppSince} profile={user.profile} name={user.name} athleteId={user.athleteId}/>
    <DashboardCoinsStatusCard accountBalance={user.accountBalance}/>
  </div>;
}