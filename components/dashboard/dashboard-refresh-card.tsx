import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LogoutButton from "./logout-button"
import { logout } from "@/server/actions"

type Props = {
  lastStravaRefresh: Date;
  inAppSince: Date
}

export default function DashboardRefreshCard( { lastStravaRefresh, inAppSince }: Props) {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Info</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Last refresh at: {lastStravaRefresh.toLocaleString("en-GB")} <br />
          In app since: {inAppSince.toLocaleString("en-GB")}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <LogoutButton logout={logout} />
      </CardFooter>
    </Card>
  )
}
