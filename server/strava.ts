import "server-only";

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
  const stravaSession = await prisma.stravaSession.findFirst({
    where: {
      userAthleteId: athleteId,
    },
  });

  //comparison
  if (stravaSession && stravaSession?.expiresAt < now) {
    const res = await refreshAccessToken(stravaSession.refreshTokenCode);
    if (res.status !== 200) {
      throw new Error("App cannot refresh the Strava access token.");
    }
    const data: StravaAPI.StravaRefreshAccessTokenResponse = await res.json();

    await prisma.stravaSession.update({
      where: {
        userAthleteId: athleteId,
      },
      data: {
        accessTokenCode: data.access_token,
        expiresAt: convertEpochTimeToDateTime(data.expires_at),
        refreshTokenCode: data.refresh_token,
      },
    });
  } else {
    console.log("No need to refresh Strava access token. Execution will continue.");
  }
}

export async function getAthleteActivities(athleteId: number) {
  await revalidateStravaAccessToken(athleteId);

  //get access token of user
  const queried = await prisma.user.findFirst({
    where: {
      athleteId,
    },
    include: {
      stravaSession: true,
    }
  });

  if (!queried) {
    throw new Error("User not found");
  }

  //convert time to query param passable
  const timeCap = (new Date(queried.inAppSince).getTime() / 1000).toFixed(0).toString();
  
  //get strava session token for auth
  const access_token = queried.stravaSession[0].accessTokenCode;
  
  const res = await fetch(STRAVA_BASE_PATH + "/athlete/activities?" + new URLSearchParams({ after: timeCap }), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  
  const data = await res.json();
  
  return data;
}
