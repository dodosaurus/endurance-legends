import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function DashboardCoinsStatusCard() {
  return (
    <Card className="flex flex-col justify-center items-center flex-grow bg-orange-100">
      <CardHeader className="pb-2">
        <CardDescription>Coin balance</CardDescription>
        <CardTitle className="text-4xl">1,329</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">+25% from last week</div>
      </CardContent>
    </Card>
  )
}
