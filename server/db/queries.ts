import "server-only";

import prisma from "./db";
import { convertEpochTimeToDateTime } from "@/lib/utils";
import { StravaAPI } from "@/global";
import { verifySession } from "../auth/session";
import { translateActivities } from "../translations";
import { calcNewUserBonus } from "../calculations";
import { User } from "@prisma/client";

//WITHOUT SESSION VERIFYING
export async function createUser(
  data: StravaAPI.StravaGetAccessTokenResponse,
  scope: string,
  fromStravaCallback: boolean = false
) {
  console.log(data);

  if (!fromStravaCallback) {
    await verifySession();
  }

  let username_to_use = data.athlete.username
    ? data.athlete.username
    : `${data.athlete.firstname.toLowerCase()}_${data.athlete.lastname.toLowerCase()}`;

  const user = await prisma.user.create({
    data: {
      athleteId: data.athlete.id,
      username: username_to_use,
      name: data.athlete.firstname + " " + data.athlete.lastname,
      country: data.athlete.country,
      profile: data.athlete.profile,
      profileMedium: data.athlete.profile_medium,
      stravaSession: {
        create: {
          accessTokenCode: data.access_token,
          refreshTokenCode: data.refresh_token,
          expiresAt: convertEpochTimeToDateTime(data.expires_at),
          scope,
        },
      },
    },
  });

  return user;
}

export async function findUserByAthleteId(athleteId: number, fromStravaCallback: boolean = false) {
  if (!fromStravaCallback) {
    await verifySession();
  }

  const user = await prisma.user.findUnique({
    where: {
      athleteId,
    },
  });

  return user;
}

export async function createUnsafeTransaction(athleteId: number, amount: number, desc: string = "new_user_bonus") {
  const transaction = await prisma.transaction.create({
    data: {
      userAthleteId: athleteId as number,
      amount,
      desc,
    },
  });

  return transaction;
}

//WITH SESSION VERIFYING
export async function findUniqueUser() {
  const { athleteId } = await verifySession();

  const user = await prisma.user.findUnique({
    where: {
      athleteId: athleteId as number,
    },
  });

  return user;
}

export async function findStravaSessionByAthleteId(athleteId: number) {
  await verifySession();

  const stravaSession = await prisma.stravaSession.findFirst({
    where: {
      userAthleteId: athleteId,
    },
  });

  return stravaSession;
}

export async function createMultipleActivities(resData: StravaAPI.StravaActivity[]) {
  const { athleteId } = await verifySession();

  const data = translateActivities(athleteId as number, resData);

  //this function will only add new activities, based on the activityId uniqness
  //we probably need also other version to sync and check also the contents if they are the same as on Strava
  await prisma.activity.createMany({
    data,
    skipDuplicates: true,
  });
}

export async function findAllActivities() {
  const { athleteId } = await verifySession();

  const activities = await prisma.activity.findMany({
    where: {
      userAthleteId: athleteId as number,
    },
    orderBy: {
      startDate: "desc",
    },
  });

  const ids = activities.map((activity) => activity.id);

  return { activities, ids };
}

export async function findActivitiesByIdsAndBonusTrigger(ids: number[], expectedBonusTrigger: boolean = false) {
  await verifySession();

  const activities = await prisma.activity.findMany({
    where: {
      id: {
        in: ids,
      },
      bonusTriggered: expectedBonusTrigger,
    },
  });

  return activities;
}

export async function updateActivitiesBonusTriggeredByIds(ids: number[], bonusTriggeredFlag: boolean = true) {
  await verifySession();

  const activities = await prisma.activity.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      bonusTriggered: bonusTriggeredFlag,
    },
  });

  return activities;
}

export async function updateUser(
  data: StravaAPI.StravaAthlete,
  totalDistances: { runs: number; rides: number; walks: number },
  newActivityIds: number[],
  newAccountBalance: number
) {
  const { athleteId } = await verifySession();

  let username_to_use = data.username
    ? data.username
    : `${data.firstname.toLowerCase()}_${data.lastname.toLowerCase()}`;

  const user = await prisma.user.update({
    where: {
      athleteId: athleteId as number,
    },
    data: {
      username: username_to_use,
      name: data.firstname + " " + data.lastname,
      country: data.country,
      city: data.city,
      profile: data.profile,
      profileMedium: data.profile_medium,
      totalRunDistance: totalDistances.runs,
      totalRideDistance: totalDistances.rides,
      totalWalkDistance: totalDistances.walks,
      lastStravaRefresh: new Date(),
      newActivityIds: newActivityIds.length > 0 ? newActivityIds : undefined,
      accountBalance: newAccountBalance,
      //empty the array of lastOpenedPack, so we always have clean state
      lastOpenedPack: [],
    },
  });

  return user;
}

export async function updateUserGeneric(data: Partial<User>) {
  const { athleteId } = await verifySession();

  const user = await prisma.user.update({
    where: {
      athleteId: athleteId as number,
    },
    data,
  });

  return user;
}

export async function updateStravaSession(data: StravaAPI.StravaRefreshAccessTokenResponse) {
  const { athleteId } = await verifySession();

  const updatedSession = await prisma.stravaSession.update({
    where: {
      userAthleteId: athleteId as number,
    },
    data: {
      accessTokenCode: data.access_token,
      expiresAt: convertEpochTimeToDateTime(data.expires_at),
      refreshTokenCode: data.refresh_token,
    },
  });

  return updatedSession.accessTokenCode;
}

export async function findStravaSession() {
  const { athleteId } = await verifySession();

  const stravaSession = await prisma.stravaSession.findFirst({
    where: {
      userAthleteId: athleteId,
    },
  });

  return stravaSession;
}

export async function createTransaction(amount: number, desc: string = "activity", linkedActivity: string = "") {
  const { athleteId } = await verifySession();

  const transaction = await prisma.transaction.create({
    data: {
      userAthleteId: athleteId as number,
      amount,
      linkedActivity,
      desc,
    },
  });

  return transaction;
}

export async function findAllTransactions() {
  const { athleteId } = await verifySession();

  const transactions = await prisma.transaction.findMany({
    where: {
      userAthleteId: athleteId as number,
    },
  });

  return transactions;
}

export async function getCollectionSizeFromDB() {
  return await prisma.card.count();
}
