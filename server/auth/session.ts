import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { Session } from "@/global";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.JWT_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: Session.Payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS512" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS512"],
    });
    return payload;
  } catch (error) {
    console.log(error);
    console.log("Failed to verify session");
  }
}

export async function createSession(payload: Session.Payload) {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); //adding 30 days to expire
  const session = await encrypt(payload);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  cookies().delete("session");
}

export const verifySession = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.athleteId) {
    //not sure if this will work
    redirect("/");
  }

  return { isAuth: true, athleteId: session.athleteId };
};

export const verifySessionWithoutRedirect = async (): Promise<{ isAuth: boolean, athleteId?: number }> => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.athleteId) {
    //not sure if this will work
    return { isAuth: false };
  }

  return { isAuth: true, athleteId: session.athleteId as number };
};
