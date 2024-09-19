import OpenPackButton from "@/components/opening/open-pack-button";
import { openPack } from "@/server/interface/actions";
import { redirect } from "next/navigation";

export default async function OpeningForm({ athleteId }: { athleteId: number }) {
  return (
    <form
      action={async () => {
        "use server";
        await openPack(athleteId);
        redirect("/opening");
      }}
    >
      <OpenPackButton />
    </form>
  );
}
