import { Activity } from "@prisma/client";
import { findAllTransactions, updateUser, updateUserGeneric } from "./db/queries";

const NEW_USER_BONUS_AMOUNT = 300;

export function calcActivityCoins(activity: Activity) {
  if (activity.type === "Run") {
    return Math.round(activity.distance / 10); //we give 100 coins for each kilometer
  }
  if (activity.type === "Ride") {
    return Math.round(activity.distance / 10 / 4); //cycling kilometer is easier, we assume 4 x easier in general
  }
  return 0;
}

export function calcTotalDistances(activities: Activity[]) {
  const total_distance = {
    runs: 0,
    rides: 0,
  };

  for (const activity of activities) {
    if (activity.type === "Run") {
      total_distance.runs += activity.distance;
    }
    if (activity.type === "Ride") {
      total_distance.rides += activity.distance;
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
