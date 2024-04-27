import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LogoutButton from "./logout-button"
import { logout } from "@/server/interface/actions"
import InfoTimes from "./info-times";

type Props = {
  lastStravaRefresh: Date;
  inAppSince: Date
}
export default function DashboardRefreshCard( { lastStravaRefresh, inAppSince }: Props) {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Info</CardTitle>
        <InfoTimes lastStravaRefresh={lastStravaRefresh} inAppSince={inAppSince} />
      </CardHeader>
      <CardFooter>
        <LogoutButton logout={logout} />
      </CardFooter>
    </Card>
  )
}
