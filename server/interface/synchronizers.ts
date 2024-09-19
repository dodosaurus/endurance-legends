"use server";

import { getAuthenticatedAthlete, listAthleteActivities, revalidateStravaAccessToken } from "../strava";
import { createMultipleActivities, findAllActivities, findUniqueUser, updateUser } from "../db/queries";
import { calcTotalDistances, recalcAccountBalance } from "../calculations";
import { Activity, Card, User } from "@prisma/client";
import { checkAndAssignActivityBonusToMany } from "../transactions";
import prisma from "../db/db";

type DashboardSyncResponse = {
  user: User | null;
  activities: Activity[];
};

export async function dashboardSync(athleteId: number): Promise<DashboardSyncResponse> {
  // Parallel execution of token refresh and user fetch
  const [access_token, dbUser] = await Promise.all([revalidateStravaAccessToken(athleteId), findUniqueUser()]);

  if (!access_token) throw new Error("App cannot refresh the Strava access token.");
  if (!dbUser) throw new Error("App cannot set the time cap for activities. User not found.");

  // Calculate timeCap
  const oneWeekAgo = new Date(dbUser.inAppSince.getTime() - 7 * 24 * 60 * 60 * 1000);
  const timeCap = Math.floor(oneWeekAgo.getTime() / 1000).toString();

  //Calculate timeCap for test purposes, instead of 1 week, it's 6 months
  // const halfYearAgo = new Date(dbUser.inAppSince.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
  // const timeCap = Math.floor(halfYearAgo.getTime() / 1000).toString();

  // Parallel execution of athlete data fetch and activities fetch
  const [newAthleteData, newActivities, { ids: oldIds }] = await Promise.all([
    getAuthenticatedAthlete(access_token),
    listAthleteActivities(timeCap, access_token),
    findAllActivities(),
  ]);

  // Create new activities and fetch updated list
  await createMultipleActivities(newActivities);
  const { activities, ids: newIds } = await findAllActivities();

  // Calculate new IDs
  const newIdsFromDiff = newIds.filter((id) => !oldIds.includes(id));

  // Parallel execution of bonus assignment and account balance recalculation
  const [, newAccountBalance] = await Promise.all([
    checkAndAssignActivityBonusToMany(newIdsFromDiff),
    recalcAccountBalance(),
  ]);

  // Calculate total distances
  const totalDistances = calcTotalDistances(activities);

  // Update user and return results
  const user = await updateUser(newAthleteData, totalDistances, newIdsFromDiff, newAccountBalance);

  return { user, activities };
}

export async function collectionSync(
  athleteId: number
): Promise<{ cards: Card[]; ownedCardsIds: number[]; newCardsIds: number[] }> {
  // Parallel execution of token refresh and database queries
  const [access_token, cards, ownedCards] = await Promise.all([
    revalidateStravaAccessToken(athleteId),
    prisma.card.findMany({
      orderBy: { id: "asc" },
      where: { collectionId: 1 },
    }),
    prisma.ownedCard.findMany({
      where: { userAthleteId: athleteId },
      select: { cardId: true, isNew: true },
    }),
  ]);

  if (!access_token) {
    throw new Error("App cannot refresh the Strava access token.");
  }

  // Process owned cards data
  const ownedCardsIds = ownedCards.map((card) => card.cardId);
  const newCardsIds = ownedCards.filter((card) => card.isNew).map((card) => card.cardId);

  return { cards, ownedCardsIds, newCardsIds };
}

export async function openingSync(athleteId: number): Promise<{ newestCards: Card[] }> {
  // Parallel execution of token refresh and database queries
  const [access_token, newestCardsIds] = await Promise.all([
    revalidateStravaAccessToken(athleteId),
    prisma.ownedCard.findMany({
      where: { userAthleteId: athleteId, isNew: true },
      select: { cardId: true, isNew: true },
    }),
  ]);

  if (!access_token) {
    throw new Error("App cannot refresh the Strava access token.");
  }

  // return from prisma.card.findMany card objects that are in newestCardsIds
  const newestCards = await prisma.card.findMany({
    where: {
      id: {
        in: newestCardsIds.map((card) => card.cardId),
      },
    },
  });

  return { newestCards };
}
