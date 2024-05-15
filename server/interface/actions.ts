"use server";

import { deleteSession } from "../auth/session";
import { revalidateStravaAccessToken } from "../strava";
import { assignNewCardSetToOwner, generateAssignmentOfNewCards } from "../opening-engine";
import { Card } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function logout() {
  deleteSession();
  revalidatePath("/");
}

export async function synchronize() {
  revalidatePath("/dashboard");
}

export async function openPack(athleteId: number): Promise<Card[]> {
  //refresh access token if needed
  const access_token = await revalidateStravaAccessToken(athleteId);

  if (!access_token) {
    throw new Error("App cannot refresh the Strava access token.");
  }

  //algorithm will generate random 4-card acquirement - 3 common + 1 higher rarity
  const { chosenCards } = await generateAssignmentOfNewCards(athleteId);

  //this will add cards to user and reduce account balance
  const newCards = await assignNewCardSetToOwner(athleteId, chosenCards);

  //revalidate dashboard
  // revalidatePath("/dashboard");

  return newCards;
}
