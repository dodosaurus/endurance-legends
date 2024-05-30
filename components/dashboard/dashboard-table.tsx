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
    if (isActivityNew(activity.id) || activity.inSystemSince > new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      return "bg-cyan-100 dark:bg-cyan-800/75 hover:bg-cyan-200 dark:hover:bg-cyan-700/75";
    }
    //must be loaded to system in last 7 days
    if (activity.inSystemSince > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      return "bg-cyan-50 dark:bg-cyan-900/75 hover:bg-cyan-100 dark:hover:bg-cyan-800/75";
    }

    //default is loaded from component itself
    return "";
  };

  const spanBasedOnActivityAge = (activity: Activity) => {
    //must be between newest ids and at least 24 hours from loadin
    if (isActivityNew(activity.id) || activity.inSystemSince > new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      return (
        <span className="absolute -top-0.5 right-1 text-[0.75rem] font-light text-cyan-600/50 dark:text-cyan-100/50 italic">
          last 24 hours
        </span>
      );
    }
    //must be loaded to system in last 7 days
    if (activity.inSystemSince > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      return (
        <span className="absolute -top-0.5 right-1 text-[0.75rem] font-light text-cyan-400/50 dark:text-cyan-200/50 italic">
          last 7 days
        </span>
      );
    }

    //default is loaded from component itself
    return <span></span>;
  };

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Your activities</CardTitle>
        <CardDescription className="flex flex-col gap-2 items-start justify-center">
          <p>
            Activities must be public, done after your registration here and need to be type of Ride or Run. For one
            pack you need to either run <span className="font-semibold">10 km</span> or ride{" "}
            <span className="font-semibold">40 km</span>.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Title</TableHead>
              <TableHead className="hidden sm:table-cell">Distance</TableHead>
              <TableHead className="hidden sm:table-cell">Duration</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="table-cell">Earned</TableHead>
              <TableHead className="table-cell"></TableHead>
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
                  <TableCell className="relative table-cell">
                    {spanBasedOnActivityAge(activity)}
                    <div className="font-medium">{activity.name}</div>
                    <div className="text-sm text-muted-foreground">{activity.type}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{convertMetersToKilometersForUI(activity.distance)} km</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {convertSecondsToReadableTime(activity.movingTime)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{activity.locationCountry}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(activity.startDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge className="text-xs" variant="secondary">
                      <div className="flex justify-start items-center gap-1">
                        <CoinIcon w="10px" /> <span>{calcActivityCoins(activity)}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell className="table-cell">
                    <LinkToStravaActivity activityId={activity.activityId} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
