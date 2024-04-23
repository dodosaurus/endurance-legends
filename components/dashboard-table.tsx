import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { convertSecondsToReadableTime } from "@/lib/utils";
import { getAthleteActivities } from "@/server/strava";

export default async function DashboardTable() {
  const activities = await getAthleteActivities();

  // console.log(data);

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Your activities</CardTitle>
        <CardDescription>Latest recorded activities (green are most recent).</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Distance</TableHead>
              <TableHead className="hidden sm:table-cell">Duration</TableHead>
              <TableHead className="hidden md:table-cell">Location country</TableHead>
              <TableHead className="table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity: any) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="font-medium">{activity.name}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">{activity.type}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{(activity.distance / 1000).toFixed(2)} km</TableCell>
                <TableCell className="hidden sm:table-cell">{convertSecondsToReadableTime(activity.moving_time)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {activity.location_country}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{new Date(activity.start_date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-accent">
              <TableCell>
                <div className="font-medium">Afternoon Ride</div>
                <div className="hidden text-sm text-muted-foreground md:inline">Ride</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">25,55 km</TableCell>
              <TableCell className="hidden sm:table-cell">01:23:45</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge className="text-xs" variant="secondary">
                  Slovakia
                </Badge>
              </TableCell>
              <TableCell className="text-right">2023-06-23</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
