"use client";

import { CardDescription } from "@/components/ui/card";

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
    <CardDescription className="max-w-lg text-balance leading-relaxed flex flex-col">
      <span className="whitespace-nowrap">
        <strong>Last refresh at:</strong> {convertToBrowserTime(lastStravaRefresh)}
      </span>
      <span className="whitespace-nowrap">
        <strong>In app since:</strong> {convertToBrowserTime(inAppSince)}
      </span>
    </CardDescription>
  );
}

export default InfoTimes;
