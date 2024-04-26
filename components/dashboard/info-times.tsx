"use client";
import { CardDescription } from "../ui/card";

type Props = {
  lastStravaRefresh: Date;
  inAppSince: Date;
};

function InfoTimes({ lastStravaRefresh, inAppSince }: Props) {
  const convertToBrowserTime = (date: Date) => {
    const tmz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return date.toLocaleString("en-GB", { timeZone: tmz });
  };

  return (
    <CardDescription className="max-w-lg text-balance leading-relaxed">
      Last refresh at: {convertToBrowserTime(lastStravaRefresh)} <br />
      In app since: {convertToBrowserTime(inAppSince)}
    </CardDescription>
  );
}

export default InfoTimes;
