import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { logout, synchronize } from "@/server/interface/actions";

import Link from "next/link";
import InfoTimes from "./subparts/info-times";
import LogoutForm from "./subparts/logout-form";
import { Button } from "@/components/ui/button";
import SynchronizeForm from "./subparts/synchronize-form";

type Props = {
  lastStravaRefresh: Date;
  inAppSince: Date;
  profile: string;
  name: string;
  athleteId: number;
};
export default function DashboardInfoCard({ lastStravaRefresh, inAppSince, profile, name, athleteId }: Props) {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex justify-start items-center gap-3">
          <Avatar>
            <AvatarImage src={profile} alt="avatar of user" />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <CardTitle>{name}</CardTitle>
        </div>
        <InfoTimes lastStravaRefresh={lastStravaRefresh} inAppSince={inAppSince} />
      </CardHeader>
      <CardFooter className="flex justify-between items-center gap-2">
        <LogoutForm logout={logout} />
        <SynchronizeForm athleteId={athleteId} synchronize={synchronize} />
        <Link href="/collection">
          <Button className="bg-purple-500 hover:bg-purple-500/80 font-semibold w-32">My collection</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
