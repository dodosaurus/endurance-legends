import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getStravaLoginUrl } from "@/lib/utils";
import Link from "next/link";
import StravaButton from "./login/strava-button";
import LoaderButton from "./dashboard/panel-cards/subparts/loader-button";
import { Button } from "./ui/button";

export default function LoginCard() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Login</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Already part of the community? Log in to enter your dashboard.
          <br />
          {/* <span className="font-semibold text-cyan-500 pt-2">We need at least permission to read your public activties.</span> */}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Link href={getStravaLoginUrl()}>
          <Button>Enter the Legends</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
