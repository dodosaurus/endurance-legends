"use server";

import { redirect } from "next/navigation";
import { deleteSession } from "../auth/session";
import { dashboardSync } from "./synchronizers";

export async function logout() {
  deleteSession();
  redirect("/")
}

export async function synchronize(athleteId: number) {
  await dashboardSync(athleteId);
}