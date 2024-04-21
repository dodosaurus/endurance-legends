import React from "react";
import DashboardDistanceStatusCard from "./dashboard-distance-status-card";
import DashboardCoinsStatusCard from "./dashboard-coins-status-card";

export default function DashboardStatusCards() {
  return <div className="flex gap-2">
    <DashboardDistanceStatusCard />
    <DashboardCoinsStatusCard />
  </div>;
}
