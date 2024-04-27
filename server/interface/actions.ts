"use server";

import { redirect } from "next/navigation";
import { deleteSession } from "../auth/session";

export async function logout() {
  deleteSession();
  redirect("/")
}