import { SquareArrowOutUpRight } from "lucide-react";

function LinkToStravaActivity({ activityId } : { activityId: string }) {
  return (
    <a href={`https://www.strava.com/activities/${activityId}`}>
      <SquareArrowOutUpRight size={15} color={"orange"} />
    </a>
  );
}

export default LinkToStravaActivity;
