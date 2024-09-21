import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { convertMetersToKilometersForUI } from "@/lib/utils";

type Props = {
  distanceFromRuns: number;
  distanceFromRides: number;
  distanceFromWalks: number;
};

export default function DashboardDistanceStatusCard({ distanceFromRuns, distanceFromRides, distanceFromWalks }: Props) {
  return (
    <Card className="flex flex-col justify-center items-center w-full border-0 shadow-md">
      <CardHeader>
        <CardDescription>Total distances converted to coins:</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-center gap-2">
        <div>
          Walks: <span className="text-xl font-semibold">{convertMetersToKilometersForUI(distanceFromWalks)} km</span> 
        </div>
        <div>
          Runs: <span className="text-xl font-semibold">{convertMetersToKilometersForUI(distanceFromRuns)} km</span>
        </div>
        <div>
          Rides: <span className="text-xl font-semibold">{convertMetersToKilometersForUI(distanceFromRides)} km</span>
        </div>
      </CardContent>
    </Card>
  );
}
