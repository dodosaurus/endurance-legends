import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { convertSecondsToReadableTime } from "@/lib/utils";
import { verifySession } from "@/server/session";
import { getAthleteActivities } from "@/server/strava";

export default async function DashboardTable() {
  const { athleteId } = await verifySession();
  const activities = await getAthleteActivities(athleteId as number);

  // console.log(activities)

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Your activities</CardTitle>
        <CardDescription>Latest recorded activities. Activity must be public, done later than you first register here and need to be type of Ride or Run. The green are ones converted to vault coins.</CardDescription>
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
            {activities.length === 0 && <TableRow><TableCell colSpan={5} className="text-center">No activities found yet. Go out and earn your coins :)</TableCell></TableRow>}
            {activities.length > 0 && activities.map((activity: any) => (
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
                <TableCell className="hidden md:table-cell">{new Date(activity.start_date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
