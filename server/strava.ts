import "server-only";

import prisma from "./db/db";
import { StravaAPI } from "@/global";
import { convertEpochTimeToDateTime } from "@/lib/utils";
import { createMultipleActivities, findAllActivities } from "./db/queries";

const STRAVA_BASE_PATH = "https://www.strava.com/api/v3";

//AUTHENTICATION

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

    const updatedSession = await prisma.stravaSession.update({
      where: {
        userAthleteId: athleteId,
      },
      data: {
        accessTokenCode: data.access_token,
        expiresAt: convertEpochTimeToDateTime(data.expires_at),
        refreshTokenCode: data.refresh_token,
      },
    });

    return updatedSession.accessTokenCode;
  } else {
    console.log("No need to refresh Strava access token. Execution will continue.");
    return stravaSession?.accessTokenCode;
  }
}

//ACTIVITIES
export async function syncAthleteActivities(athleteId: number) {
  const user = prisma.user.findFirst({
    where: {
      athleteId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  //convert time to query param passable
  // const timeCap = (new Date(user.inAppSince).getTime() / 1000).toFixed(0).toString();
  // const timeCap = "1711958785"; //set to 1.4.2024 for testing
  const timeCap = "1713168385"; //set to 15.4.2024 for testing

  const access_token = await revalidateStravaAccessToken(athleteId);
  const res = await fetch(STRAVA_BASE_PATH + "/athlete/activities?" + new URLSearchParams({ after: timeCap }), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await res.json();

  await createMultipleActivities(data);
  const activities = await findAllActivities();

  //recalculate total distances and save it to DB
  const total_distance = {
    runs: 0,
    rides: 0
  }

  for(const activity of activities) {
    if(activity.type === "Run") {
      total_distance.runs += activity.distance
    } 
    if(activity.type === "Ride") {
      total_distance.rides += activity.distance
    }
  }

  await prisma.user.update({
    where: {
      athleteId
    },
    data: {
      totalRunDistance: total_distance.runs,
      totalRideDistance: total_distance.rides
    }
  })

  return activities;
}
