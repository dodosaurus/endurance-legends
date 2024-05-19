import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { convertMetersToKilometersForUI, convertSecondsToReadableTime } from "@/lib/utils";
import { calcActivityCoins } from "@/server/calculations";
import { Activity, User } from "@prisma/client";
import { CoinIcon } from "../coin-icon";
import LinkToStravaActivity from "../link-to-strava-activity";

type Props = {
  user: User;
  activities: Activity[];
};

export default async function DashboardTable({ user, activities }: Props) {
  const isActivityNew = (id: number) => {
    return user.newActivityIds.includes(id);
  };

  const bgBasedOnActivityAge = (activity: Activity): string => {
    //must be between newest ids and at least 24 hours from loadin
    if (isActivityNew(activity.id) && activity.inSystemSince > new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      return "bg-cyan-100";
    }
    //must be loaded to system in last 7 days
    // if (activity.inSystemSince > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
    //   return "bg-cyan-50";
    // }

    //default is loaded from component itself
    return "";
  };

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Your activities</CardTitle>
        <CardDescription className="flex flex-col gap-2 items-start justify-center">
          <span>
            Latest recorded activities. Activity must be public, done later than you first register here and need to be
            type of Ride or Run.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="table-cell">Distance</TableHead>
              <TableHead className="hidden sm:table-cell">Duration</TableHead>
              <TableHead className="hidden md:table-cell">Location country</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden lg:table-cell">Coins</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No activities found yet. Go out and earn your coins :)
                </TableCell>
              </TableRow>
            )}
            {activities.length > 0 &&
              activities.map((activity) => (
                <TableRow key={activity.id} className={bgBasedOnActivityAge(activity)}>
                  <TableCell>
                    <div className="flex justify-between items-center gap-3">
                      <div className="font-medium">{activity.name}</div>
                      <LinkToStravaActivity activityId={activity.activityId} />
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.type}</div>
                  </TableCell>
                  <TableCell className="table-cell">{convertMetersToKilometersForUI(activity.distance)} km</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {convertSecondsToReadableTime(activity.movingTime)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{activity.locationCountry}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(activity.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="table-cell">
                    <Badge className="text-xs" variant="secondary">
                      <div className="flex justify-start items-center gap-1">
                        <CoinIcon w="10px" /> <span>{calcActivityCoins(activity)}</span>
                      </div>
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
