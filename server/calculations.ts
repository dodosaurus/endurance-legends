import { Activity } from "@prisma/client";
import { findAllTransactions, updateUserGeneric } from "./db/queries";
import { NEW_USER_BONUS_AMOUNT, PACK_PRICE } from "@/lib/constants";

export function calcActivityCoins(activity: Activity) {
  if (activity.type === "Run") {
    return Math.round(activity.distance / 10); //we give 100 coins for each kilometer
  }
  if (activity.type === "Walk") {
    return Math.round(activity.distance / 10); //we give 100 coins for each kilometer
  }
  //this is because Strava API, we take it as synonym for walk
  if (activity.type === "Hike") {
    return Math.round(activity.distance / 10); //we give 100 coins for each kilometer
  }
  //cycling kilometer is easier, by ChatGPT we found out that cycling is 3x easier than going by feet
  if (activity.type === "Ride") {
    return Math.round(activity.distance / 10 / 3);
  }
  return 0;
}

export function calcTotalDistances(activities: Activity[]) {
  const total_distance = {
    runs: 0,
    rides: 0,
    walks: 0,
  };

  for (const activity of activities) {
    if (activity.type === "Run") {
      total_distance.runs += activity.distance;
    }
    if (activity.type === "Ride") {
      total_distance.rides += activity.distance;
    }
    if (activity.type === "Walk") {
      total_distance.walks += activity.distance;
    }
    if (activity.type === "Hike") {
      total_distance.walks += activity.distance;
    }
  }

  return total_distance;
}

export function calcNewUserBonus() {
  return NEW_USER_BONUS_AMOUNT;
}

export async function recalcAccountBalance(updateUserToo: boolean = false) {
  //after each transaction we need to do this, to update account balance on user
  const transactions = await findAllTransactions();

  //sum all transaction.amount
  const totalAmount = transactions.reduce((acc, curr) => acc + curr.amount, 0);

  //update user.balance
  if (updateUserToo) {
    await updateUserGeneric({ accountBalance: totalAmount });
  }

  return totalAmount;
}
