"use server";

import { deleteSession, verifySessionWithoutRedirect } from "../auth/session";
import { revalidateStravaAccessToken } from "../strava";
import { assignNewCardSetToOwner, generateAssignmentOfNewCards } from "../opening-engine";
import { Card, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { findUserByAthleteId, getCollectionSizeFromDB } from "../db/queries";

export async function logout() {
  deleteSession();
  revalidatePath("/");
}

export async function synchronize() {
  revalidatePath("/dashboard");
}

export async function openPack(athleteId: number) {
  //algorithm will generate random 4-card acquirement - 3 common + 1 higher rarity
  const { chosenCards } = await generateAssignmentOfNewCards(athleteId);

  //this will add cards to user and reduce account balance
  await assignNewCardSetToOwner(athleteId, chosenCards);

}

export async function getUserForProfileSegment(): Promise<User | null> {
  const { isAuth, athleteId } = await verifySessionWithoutRedirect();

  if (!isAuth) {
    return null;
  } else {
    return await findUserByAthleteId(athleteId as number, true);
  }
}

export async function getCollectionSize(): Promise<number | null> {
  return await getCollectionSizeFromDB();
}
