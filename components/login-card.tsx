import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getStravaLoginUrl } from "@/lib/utils";
import Link from "next/link";

export default function LoginCard() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Login</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Connect through Strava and let application read your activity and profile data.
          <br />
          <span className="font-semibold text-tertiary pt-2">We need at least permission to read your public activties.</span>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={getStravaLoginUrl()}>
          <Button variant={"tertiary"} className="font-semibold">Connect with Strava</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
