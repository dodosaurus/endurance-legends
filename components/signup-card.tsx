import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getStravaLoginUrl } from "@/lib/utils";
import Link from "next/link";
import StravaButton from "./login/strava-button";

export default function SignupCard() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Sign Up</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Sign in with your Strava and let application read your activity and profile data. From the moment of your reigstration your journey will start.
          <br />
          {/* <span className="font-semibold text-cyan-500 pt-2">We need at least permission to read your public activties.</span> */}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={getStravaLoginUrl()}>
          <StravaButton />
        </Link>
      </CardFooter>
    </Card>
  );
}
