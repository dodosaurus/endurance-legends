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
    .setExpirationTime("6h")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS512"],
    });
    return payload;
  } catch (error) {
    console.log(error)
    console.log("Failed to verify session");
  }
}

export async function createSession(payload: Session.Payload) {
  const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000); //adding 6 hours
  const session = await encrypt(payload);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
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