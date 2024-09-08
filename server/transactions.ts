import { Activity } from "@prisma/client";
import { calcActivityCoins, calcNewUserBonus } from "./calculations";
import { createTransaction, createUnsafeTransaction, findActivitiesByIdsAndBonusTrigger, updateActivitiesBonusTriggeredByIds } from "./db/queries";

export async function assignNewUserBonus(athleteId: number) {
  console.log(`New user bonus assigned to athlete with id ${athleteId}`)
  await createUnsafeTransaction(athleteId, calcNewUserBonus(), "new_user_bonus");
}

export async function assignActivityBonus(activity: Activity) {
  const coinsAcquired = calcActivityCoins(activity)

  console.log(`New activity ${activity.activityId} recorder by athlete with id ${activity.userAthleteId}. Activity was recalculated to ${coinsAcquired} coins.`)
  await createTransaction(coinsAcquired, "activity", activity.activityId);
}

export async function checkAndAssignActivityBonusToMany(internalActivityIds: number[]) {
  //get all activities by ids and maybe directly query prisma if they already have bonus assigned
  const affectedActs = await findActivitiesByIdsAndBonusTrigger(internalActivityIds, false);

  //ones returned that doesn't have yet bonus assigned call on each assignActivityBonus()
  if (affectedActs.length > 0) {
    for (const activity in affectedActs) {
      let act = affectedActs[activity]
      await createTransaction(calcActivityCoins(act), "activity", act.activityId);
    }
    await updateActivitiesBonusTriggeredByIds(internalActivityIds, true);
  }
}
