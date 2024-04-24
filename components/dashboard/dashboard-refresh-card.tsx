import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LogoutButton from "./logout-button"
import { logout } from "@/server/actions"

export default function DashboardRefreshCard() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardTitle>Info</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Last refresh at: 01/01/2021 10:00
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <LogoutButton logout={logout} />
      </CardFooter>
    </Card>
  )
}
