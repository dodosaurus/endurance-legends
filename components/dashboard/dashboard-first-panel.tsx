import { User } from "@prisma/client";
import DashboardInfoCard from "./panel-cards/dashboard-info-card";
import DashboardCoinsAndOpenCard from "./panel-cards/dashboard-coins-and-open-card";
import DashboardCollectionCard from "./panel-cards/dashboard-collection-card";

type Props = {
  user: User;
}

export default function DashboardFirstPanel({ user }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <DashboardCoinsAndOpenCard athleteId={user.athleteId} accountBalance={user.accountBalance}/>
      <DashboardCollectionCard userOwnedCards={user.collectedCards}/>
    </div>
  );
}