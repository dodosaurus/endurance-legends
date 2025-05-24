import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getStravaLoginUrl } from "@/lib/utils";
import Link from "next/link";
import StravaButton from "./login/strava-button";
import { ArrowRight, ArrowLeft } from "lucide-react"; // Update this import

export default function SignupCard() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-center mb-2">Login / Signup</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed text-center mb-2">
          Sign in with your Strava and let application read your activity and profile data. From the moment of your first login your journey will start.
          <br />
          {/* <span className="font-semibold text-cyan-500 pt-2">We need at least permission to read your public activties.</span> */}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center justify-center">
        <Link href={getStravaLoginUrl()} className="flex items-center">
          <ArrowRight className="mr-2 text-red-500 animate-pulse" size={24} />
          <StravaButton />
          <ArrowLeft className="ml-2 text-red-500 animate-pulse" size={24} />
        </Link>
      </CardFooter>
    </Card>
  );
}
