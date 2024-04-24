import { StravaAPI } from "@/global";
import { getAuthenticatedAthlete, listAthleteActivities, revalidateStravaAccessToken } from "./strava";
import { createMultipleActivities, findAllActivities, updateUser } from "./db/queries";
import { calculateTotalDistances } from "./calculations";
import { Activity, User } from "@prisma/client";

type DashboardSyncResponse = {
  user: User | null;
  activities: Activity[];
};

export async function dashboardSync(athleteId: number): Promise<DashboardSyncResponse> {
  //refresh access token if needed
  const access_token = await revalidateStravaAccessToken(athleteId);

  if (!access_token) {
    throw new Error("App cannot refresh the Strava access token.");
  }

  //get new athlete profile and update it in DB
  const newAthleteData: StravaAPI.StravaAthlete = await getAuthenticatedAthlete(access_token);

  //get activities since login and skip duplicates
  // const timeCap = (new Date(user.inAppSince).getTime() / 1000).toFixed(0).toString();
    const timeCap = "1709323790"; //set to 1.3.2024 for testing
  // const timeCap = "1711958785"; //set to 1.4.2024 for testing
  // const timeCap = "1713168385"; //set to 15.4.2024 for testing

  const newActivities = await listAthleteActivities(timeCap, access_token);
  await createMultipleActivities(newActivities);
  const activities = await findAllActivities();

  //ADDITIONAL BUSINESS LOGIC (recalculation of total distances)

  //recalculate total distances and save it to DB
  const totalDistances = calculateTotalDistances(activities);

  //at the end update all props of user and get newest version of user
  const user = await updateUser(newAthleteData, totalDistances);

  return { user, activities };
}
