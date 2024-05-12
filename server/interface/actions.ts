"use server";

import { redirect } from "next/navigation";
import { deleteSession } from "../auth/session";
import { dashboardSync } from "./synchronizers";
import { revalidateStravaAccessToken } from "../strava";
import { assignNewCardSetToOwner, generateAssignmentOfNewCards } from "../opening-engine";

export async function logout() {
  deleteSession();
  redirect("/");
}

export async function synchronize(athleteId: number) {
  await dashboardSync(athleteId);
  redirect("/dashboard");
}

export async function openPack(athleteId: number) {
  console.log("opening pack " + athleteId);

  //refresh access token if needed
  const access_token = await revalidateStravaAccessToken(athleteId);

  if (!access_token) {
    throw new Error("App cannot refresh the Strava access token.");
  }

  //algorithm will generate random 4-card acquirement - 3 common + 1 higher rarity
  const { chosenCards } = await generateAssignmentOfNewCards(athleteId);

  //this will add cards to user and reduce account balance
  await assignNewCardSetToOwner(athleteId, chosenCards);
}
