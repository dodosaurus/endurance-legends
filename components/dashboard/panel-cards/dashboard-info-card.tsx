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
};
export default function DashboardInfoCard({ lastStravaRefresh, inAppSince, profile, name }: Props) {
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
        <SynchronizeForm synchronize={synchronize} />
      </CardFooter>
    </Card>
  );
}
