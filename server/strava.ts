import "server-only";
import { verifySession } from "./session";
import prisma from "./db";
import { StravaAPI } from "@/global";
import { convertEpochTimeToDateTime } from "@/lib/utils";

const STRAVA_BASE_PATH = "https://www.strava.com/api/v3";

export async function getAccessToken(code: string) {
  const res = await fetch(
    `${STRAVA_BASE_PATH}/oauth/token?` +
      new URLSearchParams({
        client_id: process.env.STRAVA_CLIENT_ID || "",
        client_secret: process.env.STRAVA_CLIENT_SECRET || "",
        code,
        grant_type: "authorization_code",
      }),
    {
      method: "POST",
    }
  );
  return res;
}

export async function refreshAccessToken(refresh_token: string) {
  const res = await fetch(
    `${STRAVA_BASE_PATH}/oauth/token?` +
      new URLSearchParams({
        client_id: process.env.STRAVA_CLIENT_ID || "",
        client_secret: process.env.STRAVA_CLIENT_SECRET || "",
        refresh_token,
        grant_type: "refresh_token",
      }),
    {
      method: "POST",
    }
  );
  return res;
}

export async function revalidateStravaAccessToken(athleteId: number) {
  //find out if stravaAccessToken for our user already expired
  const now = new Date(Date.now());
  const valid_result = await prisma.stravaAccessToken.findFirst({
    where: {
      userAthleteId: athleteId,
      expiresAt: {
        gt: now,
      },
    },
  });

  //if null is returned, it means that we haven't found any active token = refreshing
  if (!valid_result) {
    const queried = await prisma.stravaRefreshToken.findFirst({
      where: {
        userAthleteId: athleteId,
      },
    });

    const res = await refreshAccessToken(queried?.refreshTokenCode || "");
    const json: StravaAPI.StravaRefreshAccessTokenResponse = await res.json();

    //now update the accessTokenCode and expiresAt
    const updateAccessToken = await prisma.stravaAccessToken.update({
      where: {
        userAthleteId: athleteId,
      },
      data: {
        accessTokenCode: json.access_token,
        expiresAt: convertEpochTimeToDateTime(json.expires_at),
      },
    });
  }
}

export async function getAthleteActivities() {
  const { athleteId } = await verifySession();
  await revalidateStravaAccessToken(athleteId as number);

  //get access token of user
  const queried = await prisma.stravaAccessToken.findFirst({
    where: {
      userAthleteId: athleteId,
    },
  });

  const res = await fetch(STRAVA_BASE_PATH + "/athlete/activities", {
    headers: {
      Authorization: `Bearer ${queried?.accessTokenCode}`,
    },
  });

  const data = await res.json();

  return data;
}
