import { SquareArrowOutUpRight } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { StravaIcon } from "./strava-icon";

function LinkToStravaActivity({ activityId }: { activityId: string }) {
  return (
    <a
      className={buttonVariants({ variant: "secondary" })}
      target="_blank"
      href={`https://www.strava.com/activities/${activityId}`}
    >
      {/* <span className="hidden xs:inline-block text-xs mr-1">View on </span> */}
      {/* <StravaIcon /> */}
      <SquareArrowOutUpRight size={15} color={"orange"} />
    </a>
  );
}

export default LinkToStravaActivity;
