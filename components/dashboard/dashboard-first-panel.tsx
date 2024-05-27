import { User } from "@prisma/client";
import DashboardInfoCard from "./panel-cards/dashboard-info-card";
import DashboardCoinsAndOpenCard from "./panel-cards/dashboard-coins-and-open-card";
import DashboardCollectionCard from "./panel-cards/dashboard-collection-card";

type Props = {
  user: User;
}

export default function DashboardFirstPanel({ user }: Props) {
  return <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
    {/* <DashboardInfoCard lastStravaRefresh={user.lastStravaRefresh} inAppSince={user.inAppSince} profile={user.profile} name={user.name}/> */}
    <DashboardCoinsAndOpenCard athleteId={user.athleteId} accountBalance={user.accountBalance}/>
    <DashboardCollectionCard userOwnedCards={user.collectedCards}/>
  </div>;
}