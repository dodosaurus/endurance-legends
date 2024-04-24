import DashboardDistanceStatusCard from "./dashboard-distance-status-card";
import { User } from "@prisma/client";

type Props = {
  user: User | null;
}

export default function DashboardSecondPanel({ user }: Props) {
  return <div className="flex gap-2">
    <DashboardDistanceStatusCard  distance={user?.totalRunDistance || 0} activityType={"run"}/>
    <DashboardDistanceStatusCard  distance={user?.totalRideDistance || 0} activityType={"ride"}/>
  </div>;
}
