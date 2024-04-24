import "server-only";

import prisma from "./db";
import { convertEpochTimeToDateTime } from "@/lib/utils";
import { StravaAPI } from "@/global";
import { verifySession } from "./session";

export async function createUser(data: StravaAPI.StravaGetAccessTokenResponse, scope: string, fromStravaCallback: boolean = false) {
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

export async function findStravaSessionByAthleteId(athleteId: number) {
  await verifySession()

  const stravaSession = await prisma.stravaSession.findFirst({
    where: {
      userAthleteId: athleteId,
    },
  });

  return stravaSession;
}
