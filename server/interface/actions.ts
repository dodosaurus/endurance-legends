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
