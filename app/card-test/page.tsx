import AppCard from "@/components/app-card/app-card";
import { verifySession } from "@/server/auth/session";
import { collectionSync } from "@/server/interface/synchronizers";

export default async function Collection() {
  const { athleteId } = await verifySession();
  const { cards, ownedCardsIds } = await collectionSync(athleteId as number);

  return (
    <div id="card-test" className="flex justify-center items-center gap-2">
      <AppCard />
      <AppCard />
    </div>
  );
}
