import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PACK_PRICE } from "./constants";
import { OwnedCard } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStravaLoginUrl() {
  return `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&redirect_uri=${process.env.STRAVA_REDIRECT_URI}&response_type=code&scope=activity:read,activity:read_all`;
}

export function convertEpochTimeToDateTime(epochTime: number): Date {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(epochTime);

  return d;
}

export function convertSecondsToReadableTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const remainingMinutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${hours ? `${hours}h ` : ""}${remainingMinutes}m ${remainingSeconds}s`;
}

export function convertMetersToKilometersForUI(meters: number): string {
  return (meters / 1000).toFixed(2);
}

export function calcAvailablePacks(totalCoins: number) {
  return Math.floor(totalCoins / PACK_PRICE);
}

export const compareCardToOwnedCards = (cardId: number, ownedCardsIds: number[]): { isOwned: boolean; occurences: number } => {
  const isOwned = ownedCardsIds.includes(cardId);
  let occurences = 0;

  if (isOwned) {
    for (const ownedCardId of ownedCardsIds) {
      if (ownedCardId === cardId) {
        occurences++;
      }
    }
  }

  return { isOwned, occurences };
};
