import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { convertMetersToKilometersForUI } from "@/lib/utils"

type Props = {
  distance: number;
  activityType: string;
}

export default function DashboardDistanceStatusCard({ distance, activityType }: Props) {
  return (
    <Card className="flex-grow">
      <CardHeader className="pb-2">
        <CardDescription>Total distance from <span className="font-bold">{activityType}s</span></CardDescription>
        <CardTitle className="text-3xl">{convertMetersToKilometersForUI(distance)} km</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">(recorded from moment of your first login here)</div>
      </CardContent>
    </Card>
  )
}