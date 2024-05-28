import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PACK_PRICE } from "./constants";

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

export const compareCardToOwnedCards = (
  cardId: number,
  ownedCardsIds: number[]
): { isOwned: boolean; occurences: number } => {
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

export function countUniqueMembers(array: number[]) {
  const uniqueCardIds = new Set(array.map((mem) => mem));
  return uniqueCardIds.size;
}

const isoCountryCodes: Record<string, string> = {
  Slovenia: "si",
  Belgium: "be",
  Denmark: "dk",
  Switzerland: "ch",
  Netherlands: "nl",
  Spain: "es",
  Russia: "ru",
  "Great Britain": "gb",
  "United States": "us",
  Australia: "au",
  Portugal: "pt",
  France: "fr",
  Norway: "no",
  Austria: "at",
  Latvia: "lv",
  Italy: "it",
  Ecuador: "ec",
  Colombia: "co",
  Germany: "de",
  "New Zealand": "nz",
  Kazakhstan: "kz",
  Canada: "ca",
  Ireland: "ie",
  Eritrea: "er",
  Mexico: "mx",
  "United Arab Emirates": "ae", // Added full name for AE for completeness
  Poland: "pl",
  China: "cn",
};

export function getIsoCountryCode(country: string) {
  return isoCountryCodes[country] || null;
}

export const getRarityColorClass = (rarity: string, colorStrength: string): string => {
  if (rarity === "uncommon") {
    return `green-${colorStrength}`;
  }
  if (rarity === "rare") {
    return `blue-${colorStrength}`;
  }
  if (rarity === "epic") {
    return `purple-${colorStrength}`;
  }
  if (rarity === "legendary") {
    return `orange-${colorStrength}`;
  }
  return `slate-${colorStrength}`;
};

export const sortCardsByRarity = (a: any, b: any) => {
  if (a.rarity === "common") return -1;
  if (b.rarity === "common") return 1;
  if (a.rarity === "uncommon") return -1;
  if (b.rarity === "uncommon") return 1;
  if (a.rarity === "rare") return -1;
  if (b.rarity === "rare") return 1;
  if (a.rarity === "epic") return -1;
  if (b.rarity === "epic") return 1;
  if (a.rarity === "legendary") return -1;
  if (b.rarity === "legendary") return 1;
  return 0;
};
