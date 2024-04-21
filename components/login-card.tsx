import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getStravaLoginUrl } from "@/lib/utils";
import Link from "next/link";

export default function LoginCard() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Login / Signup</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Login through Strava to let application read activity and profile data, so you can earn coins.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={getStravaLoginUrl()}>
          <Button variant={"outline"}>Login with Strava</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
