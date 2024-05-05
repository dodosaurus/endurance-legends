import { StravaAPI } from "@/global";
import { getAuthenticatedAthlete, listAthleteActivities, revalidateStravaAccessToken } from "../strava";
import { createMultipleActivities, findAllActivities, updateUser } from "../db/queries";
import { calcTotalDistances, recalcAccountBalance } from "../calculations";
import { Activity, Card, User } from "@prisma/client";
import { checkAndAssignActivityBonusToMany } from "../transactions";
import prisma from "../db/db";

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

  //activities sync from timeCap (in prod from time of login of user)
  // const timeCap = (new Date(user.inAppSince).getTime() / 1000).toFixed(0).toString();
  // const timeCap = "1709323790"; //set to 1.3.2024 for testing
  // const timeCap = "1711958785"; //set to 1.4.2024 for testing
  // const timeCap = "1713168385"; //set to 15.4.2024 for testing
  const timeCap = "1714029176"; //set to 25.4.2024 for testing
  // const timeCap = "1714201976"; //set to 27.4.2024 for testing

  //save the previous ids
  const { ids: oldIds } = await findAllActivities();

  const newActivities = await listAthleteActivities(timeCap, access_token);
  await createMultipleActivities(newActivities);

  //get new ids and whole activities
  const { activities, ids: newIds } = await findAllActivities();

  //get list of new ids if we have some - if it is not empty we will allow it and overwrite old array on user
  const newIdsFromDiff = newIds.filter((item) => !oldIds.includes(item));

  //recalculate total distances and save it to DB
  const totalDistances = calcTotalDistances(activities);

  //recalculate account balance, checking the list of new ids, because they should gradually come to system
  //we will probably need safety check which will iterate through all activites if bonus was already assigned
  await checkAndAssignActivityBonusToMany(newIdsFromDiff);
  const newAccountBalance = await recalcAccountBalance();

  //at the end update all props of user and get newest version of user
  const user = await updateUser(newAthleteData, totalDistances, newIdsFromDiff, newAccountBalance);

  return { user, activities };
}

export async function collectionSync(athleteId: number): Promise<{ cards: Card[] }> {
  //refresh access token if needed
  const access_token = await revalidateStravaAccessToken(athleteId);

  if (!access_token) {
    throw new Error("App cannot refresh the Strava access token.");
  }

  //get all cards from master collection for skeleton
  const cards = await prisma.card.findMany({
    where: {
      collectionId: 1,
    },
  });

  //find out which cards user owns and these will be highlithed

  //not owned cards should be greyed out

  return {cards}
}
