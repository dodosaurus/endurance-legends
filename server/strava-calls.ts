import "server-only";

const STRAVA_BASE_PATH = "https://www.strava.com/api/v3/";

/**
 * Retrieves the access token from Strava using the provided authorization code.
 *
 * @param {string} code - The authorization code received from Strava native authentication.
 * @return {Promise<Response>} A Promise that resolves to the response from the Strava API.
 */
export async function getAccessToken(code: string) {
  const res = await fetch(STRAVA_BASE_PATH + "oauth/token", {
    method: "POST",
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    }),
  });
  return res;
}


/**
 * Refreshes the access token using the provided refresh token.
 *
 * @param {string} refresh_token - The refresh token used for authentication.
 * @return {Promise<Response>} A Promise that resolves to the response from the token refresh request.
 */
export function refreshAccessToken(refresh_token: string) {
  const res = fetch(STRAVA_BASE_PATH + "oauth/token", {
    method: "POST",
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token,
      grant_type: "refresh_token",
    }),
  });
  return res;
}

/**
 * Retrieves the athlete's activities from Strava using the provided access token.
 *
 * @param {string} accessToken - The access token used for authentication.
 * @return {Promise<Response>} A Promise that resolves to the response from the Strava API.
 */
export function getAthleteActivities(accessToken: string) {
  const res = fetch(STRAVA_BASE_PATH + "athlete/activities", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res;
}
