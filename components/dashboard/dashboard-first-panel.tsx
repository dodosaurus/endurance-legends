import { User } from "@prisma/client";
import DashboardCoinsAndOpenCard from "./panel-cards/dashboard-coins-and-open-card";
import DashboardCollectionCard from "./panel-cards/dashboard-collection-card";
import DashboardDistanceStatusCard from "./panel-cards/dashboard-distance-status-card";

type Props = {
  user: User;
}

export default function DashboardFirstPanel({ user }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <DashboardCoinsAndOpenCard athleteId={user.athleteId} accountBalance={user.accountBalance}/>
      <DashboardCollectionCard userOwnedCards={user.collectedCards}/>
      {/* <DashboardDistanceStatusCard distanceFromRuns={user.totalRunDistance} distanceFromRides={user.totalRideDistance} distanceFromWalks={user.totalWalkDistance}/> */}
    </div>
  );
}