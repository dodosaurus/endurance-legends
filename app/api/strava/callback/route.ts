import { StravaAPI } from "@/global";
import { createUser, findUserByAthleteId } from "@/server/db/queries";
import { createSession } from "@/server/session";
import { getAccessToken } from "@/server/strava";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  //error check
  const error = searchParams.get("error");
  if (error) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  //code check and pre-saving
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "No code provided from Strava" }, { status: 401 });
  }

  //scope check and pre-saving
  const scope = searchParams.get("scope");
  if (!scope?.includes("activity:read")) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  //call oauth Strava API for access token and refresh token and save them to DB
  const res = await getAccessToken(code);

  if (res.status === 400) {
    return NextResponse.json({ error: "Failed to get access token from Strava" }, { status: 401 });
  }

  const json: StravaAPI.StravaGetAccessTokenResponse = await res.json();

  //check if such user exists on our side
  let user = await findUserByAthleteId(json.athlete.id, true);

  if (!user) {
    //save user to DB if it doesn't exist
    user = await createUser(json, scope, true);
  }

  //create our own JWT (ex with athlete.id) and set is as cookie to user's browser
  await createSession({ athleteId: user.athleteId });

  return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
}
