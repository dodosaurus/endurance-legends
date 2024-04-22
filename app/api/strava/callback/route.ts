import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'No code provided from Strava' })
  }

  //call oauth Strava API for access token and refresh token and save them to DB
  

  //save user to DB

  //create our own JWT (ex with athlete.id), save it to DB to user + set is as cookie to user's browser

  return NextResponse.json({ code })
}
