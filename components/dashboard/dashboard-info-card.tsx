import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LogoutButton from "./logout-button";
import { logout } from "@/server/interface/actions";
import InfoTimes from "./info-times";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
      <CardFooter>
        <LogoutButton logout={logout} />
      </CardFooter>
    </Card>
  );
}
