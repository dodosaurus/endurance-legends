import { SquareArrowOutUpRight } from "lucide-react";
import { buttonVariants } from "./ui/button";

function LinkToStravaActivity({ activityId }: { activityId: string }) {
  return (
    <a
      className={buttonVariants({ variant: "secondary" })}
      target="_blank"
      href={`https://www.strava.com/activities/${activityId}`}
    >
      <span className="mr-2">View on Strava</span><SquareArrowOutUpRight size={15} color={"orange"} />
    </a>
  );
}

export default LinkToStravaActivity;
