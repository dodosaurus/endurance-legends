import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardRefreshCard() {
  return (
    <Card className="sm:col-span-2">
      <CardHeader className="pb-3">
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Last refresh at: 01/01/2021 10:00
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Synchronize latest activites</Button>
      </CardFooter>
    </Card>
  )
}
