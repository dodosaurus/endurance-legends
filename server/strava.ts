import "server-only";

import { StravaAPI } from "@/global";
import { findStravaSession, updateStravaSession } from "./db/queries";

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
  const stravaSession = await findStravaSession();

  //comparison
  if (stravaSession && stravaSession?.expiresAt < now) {
    const res = await refreshAccessToken(stravaSession.refreshTokenCode);
    if (res.status !== 200) {
      throw new Error("App cannot refresh the Strava access token.");
    }
    const data: StravaAPI.StravaRefreshAccessTokenResponse = await res.json();

    const newToken = await updateStravaSession(data);

    return newToken;
  } else {
    console.log("No need to refresh Strava access token. Execution will continue.");
    return stravaSession?.accessTokenCode;
  }
}

//ACTIVITIES
export async function listAthleteActivities(after: string, access_token: string) {
  const res = await fetch(STRAVA_BASE_PATH + "/athlete/activities?" + new URLSearchParams({ after }), {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: {
      revalidate: 6000,
    }
  });

  if (res.status === 429) {
    throw new Error("Strava rate limit reached.");
  }

  if (res.status !== 200) {
    throw new Error("Failed to get activities from Strava");
  }

  return res.json();
}

//ATHLETE PROFILE
export async function getAuthenticatedAthlete(access_token: string) {
  const res = await fetch(STRAVA_BASE_PATH + "/athlete", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    next: {
      revalidate: 6000,
    }
  });

  return res.json();
}
