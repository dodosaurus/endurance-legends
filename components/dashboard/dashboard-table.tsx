import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { convertMetersToKilometersForUI, convertSecondsToReadableTime } from "@/lib/utils";
import { calcActivityCoins } from "@/server/calculations";
import { Activity, User } from "@prisma/client";
import { CoinIcon } from "../coin-icon";
import LinkToStravaActivity from "../link-to-strava-activity";
import { InfoIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ActivityCoinsBadge } from "./dashboard-table/activity-coins-badge";
import Link from "next/link";

type Props = {
  user: User;
  activities: Activity[];
};

export default async function DashboardTable({ user, activities }: Props) {
  const bgBasedOnActivityAge = (activity: Activity): string => {
    //must be between newest ids and at least 24 hours from loadin
    if (activity.startDate > new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      return "bg-cyan-100 dark:bg-cyan-800/75 hover:bg-cyan-200 dark:hover:bg-cyan-700/75";
    }
    //must be loaded to system in last 7 days
    if (activity.startDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      return "bg-cyan-50 dark:bg-cyan-900/75 hover:bg-cyan-100 dark:hover:bg-cyan-800/75";
    }

    //default is loaded from component itself
    return "";
  };

  const spanBasedOnActivityAge = (activity: Activity) => {
    //must be between newest ids and at least 24 hours from loadin
    if (activity.startDate > new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      return (
        <span className="absolute -top-0.5 right-1 text-[1rem] font-light text-cyan-600/50 dark:text-cyan-100/50 italic">
          last 24 hours
        </span>
      );
    }
    //must be loaded to system in last 7 days
    if (activity.startDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      return (
        <span className="absolute -top-0.5 right-1 text-[1rem] font-light text-cyan-400/50 dark:text-cyan-200/50 italic">
          last 7 days
        </span>
      );
    }

    //default is loaded from component itself
    return <span></span>;
  };

  const getDistanceStringForMobile = (activity: Activity) => {
    if (activity.distance) {
      return ` (${convertMetersToKilometersForUI(activity.distance)} km)`;
    }
    return "";
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="flex flex-row justify-between items-center px-4 sm:px-7">
        <CardTitle>Your activity</CardTitle>
        <Popover>
          <PopoverTrigger>
            <InfoIcon className="w-4 h-4 mb-1" />
          </PopoverTrigger>
          <PopoverContent>
            <p>
              Strava activities must be public, done at least 7 days before your first login. For one pack you need to
              either walk or run <span className="font-semibold">10 km</span> or ride{" "}
              <span className="font-semibold">30 km</span>.
            </p>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <Table className="text-xl">
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Title</TableHead>
              <TableHead className="hidden sm:table-cell text-center">Distance</TableHead>
              <TableHead className="hidden sm:table-cell text-center">Duration</TableHead>
              <TableHead className="hidden md:table-cell text-center">Location</TableHead>
              <TableHead className="hidden md:table-cell text-center">Date</TableHead>
              <TableHead className="table-cell text-center">Earned</TableHead>
              {/* <TableHead className="table-cell text-center">Link</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No activities found yet. Go out and earn your coins <CoinIcon w="16" />
                </TableCell>
              </TableRow>
            )}
            {activities.length > 0 &&
              activities.map((activity) => (
                <Link

                  href={`https://www.strava.com/activities/${activity.activityId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  legacyBehavior={true}
                >
                  <TableRow key={activity.id} className={"cursor-pointer " + bgBasedOnActivityAge(activity)}>
                    <TableCell className="relative table-cell">
                      <div className="hidden lg:block mb-2">{spanBasedOnActivityAge(activity)}</div>
                      <div className="font-medium mb-1">{activity.name}</div>
                      <div className="flex flex-col text-[1rem] text-muted-foreground">
                        <span>{activity.type}</span>
                        <span className="inline-block sm:hidden">{getDistanceStringForMobile(activity)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center font-extralight">
                      {convertMetersToKilometersForUI(activity.distance)} km
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-center font-extralight">
                      {convertSecondsToReadableTime(activity.movingTime)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-center font-extralight">
                      {activity.locationCountry}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-center font-extralight">
                      {new Date(activity.startDate).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell className="text-center">
                      <ActivityCoinsBadge activity={activity} />
                    </TableCell>
                    {/* <TableCell className="table-cell text-center">
                    <LinkToStravaActivity activityId={activity.activityId} />
                  </TableCell> */}
                  </TableRow>
                </Link>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
