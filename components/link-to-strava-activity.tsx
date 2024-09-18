import { SquareArrowOutUpRight } from "lucide-react";

function StravaLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
    </svg>
  );
}

function LinkToStravaActivity({ activityId }: { activityId: string }) {
  return (
    <a
      className="inline-flex items-center justify-center w-6 h-6 text-orange-500 hover:text-orange-600 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      href={`https://www.strava.com/activities/${activityId}`}
      title="View on Strava"
    >
      <StravaLogo />
    </a>
  );
}

export default LinkToStravaActivity;
