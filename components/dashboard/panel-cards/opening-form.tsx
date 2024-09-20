import OpenPackButton from "@/components/opening/open-pack-button";
import { PACK_PRICE } from "@/lib/constants";
import { openPack } from "@/server/interface/actions";
import { redirect } from "next/navigation";

export default async function OpeningForm({ athleteId, accountBalance }: { athleteId: number, accountBalance: number }) {
  const userHasEnoughCoins = () => {
    return accountBalance >= PACK_PRICE;
  };
  
  return (
    <form
      action={async () => {
        "use server";
        await openPack(athleteId);
        redirect("/opening");
      }}
    >
      <OpenPackButton userHasEnoughCoins={userHasEnoughCoins()} />
    </form>
  );
}
