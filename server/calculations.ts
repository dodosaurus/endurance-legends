import { Activity } from "@prisma/client";

export function calculateTotalDistances(activities: Activity[]) {
  const total_distance = {
    runs: 0,
    rides: 0,
  };

  for (const activity of activities) {
    if (activity.type === "Run") {
      total_distance.runs += activity.distance;
    }
    if (activity.type === "Ride") {
      total_distance.rides += activity.distance;
    }
  }

  return total_distance;
}