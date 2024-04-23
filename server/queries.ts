import "server-only";

import prisma from "./db";
import { convertEpochTimeToDateTime } from "@/lib/utils";
import { StravaAPI } from "@/global";

export function getAthleteActivities(userId: number) {
  //TODO - important here is that athlete should be able to get only his/her activities, so we need verfifySession here
}

export async function createUser(data: StravaAPI.StravaGetAccessTokenResponse, scope: string) {
  const user = await prisma.user.create({
    data: {
      athleteId: data.athlete.id,
      username: data.athlete.username,
      name: data.athlete.firstname + " " + data.athlete.lastname,
      country: data.athlete.country,
      profile: data.athlete.profile,
      profileMedium: data.athlete.profile_medium,
      stravaAccessToken: {
        create: {
          accessTokenCode: data.access_token,
          expiresAt: convertEpochTimeToDateTime(data.expires_at),
          scope,
        },
      },
      stravaRefreshToken: {
        create: {
          refreshTokenCode: data.refresh_token,
          scope,
        },
      },
    },
  });

  return user;
}

export async function findUserByAthleteId(athleteId: number) {
  const user = await prisma.user.findUnique({
    where: {
      athleteId,
    },
  });

  return user;
}
