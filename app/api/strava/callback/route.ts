import { StravaAPI } from "@/global";
import { getStravaLoginUrl } from "@/lib/utils";
import { createUser, findUserByAthleteId } from "@/server/queries";
import { getAccessToken } from "@/server/strava-calls";
import { NextRequest, NextResponse } from "next/server";

const rootURL = process.env.API_BASE_PATH ? process.env.API_BASE_PATH : "http://localhost:3000";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  //error check
  const error = searchParams.get("error");
  if (error) {
    return NextResponse.redirect(rootURL);
  }

  //code check and pre-saving
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "No code provided from Strava" }, { status: 401 });
  }

  //scope check and pre-saving
  const scope = searchParams.get("scope");
  if (!scope?.includes("activity:read")) {
    return NextResponse.redirect(rootURL);
  }

  //call oauth Strava API for access token and refresh token and save them to DB
  const res = await getAccessToken(code);

  if (res.status === 400) {
    return NextResponse.json({ error: "Failed to get access token from Strava" }, { status: 401 });
  }

  const json: StravaAPI.StravaGetAccessTokenResponse = await res.json();

  //check if such user exists on our side
  let user = await findUserByAthleteId(json.athlete.id);

  if (user) {
    //user exists, handle this situation and return from function
  } else {
    //save user to DB
    user = await createUser(json, scope);
  }

  //create our own JWT (ex with athlete.id), save it to DB to user + set is as cookie to user's browser

  return NextResponse.json(user);
}
