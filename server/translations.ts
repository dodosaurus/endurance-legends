import { StravaAPI } from "@/global";
import { Activity } from "@prisma/client";

type PartialActivity = Omit<Activity, "id">;

export function translateActivities(athleteId: number, activitiesFromApi: StravaAPI.StravaActivity[]) {
  const activitiesForDB: PartialActivity[] = activitiesFromApi.map((activity) => {
    return {
      userAthleteId: athleteId,
      activityId: activity.id.toString(),
      name: activity.name,
      type: activity.type,
      distance: activity.distance,
      movingTime: activity.moving_time,
      elapsedTime: activity.elapsed_time,
      totalElevationGain: activity.total_elevation_gain,
      startDate: new Date(activity.start_date),
      startDateLocal: new Date(activity.start_date_local),
      locationCountry: activity.location_country,
      kudosCount: activity.kudos_count,
    };
  });

  return activitiesForDB;
}
