import "server-only";

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

export function getAthleteActivities(access_token: string) {
  const res = fetch(STRAVA_BASE_PATH + "/athlete/activities", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  return res;
}
