import "server-only";

import prisma from "./db";
import { convertEpochTimeToDateTime } from "@/lib/utils";
import { StravaAPI } from "@/global";
import { verifySession } from "../session";
import { translateActivities } from "../translations";
import { calcNewUserBonus } from "../calculations";

export async function createUser(
  data: StravaAPI.StravaGetAccessTokenResponse,
  scope: string,
  fromStravaCallback: boolean = false
) {
  if (!fromStravaCallback) {
    await verifySession();
  }

  const user = await prisma.user.create({
    data: {
      athleteId: data.athlete.id,
      username: data.athlete.username,
      name: data.athlete.firstname + " " + data.athlete.lastname,
      country: data.athlete.country,
      profile: data.athlete.profile,
      profileMedium: data.athlete.profile_medium,
      accountBalance: calcNewUserBonus(),
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

  return activities;
}

export async function updateUser(data: StravaAPI.StravaAthlete, totalDistances: { runs: number, rides: number }) {
  const { athleteId } = await verifySession();

  const user = await prisma.user.update({
    where: {
      athleteId: athleteId as number,
    },
    data: {
      username: data.username,
      name: data.firstname + " " + data.lastname,
      country: data.country,
      city: data.city,
      profile: data.profile,
      profileMedium: data.profile_medium,
      totalRunDistance: totalDistances.runs,
      totalRideDistance: totalDistances.rides,
      lastStravaRefresh: new Date(),
    },
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
