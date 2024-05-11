import { Card } from "@prisma/client";
import OpenPackButton from "./open-pack-button";

type OpeningFormProps = {
  athleteId: number;
  openPack: (athleteId: number) => Promise<void>;
};

function OpeningForm({ athleteId, openPack }: OpeningFormProps) {
  const openingWithAthleteId = openPack.bind(null, athleteId);

  // const cannotBuy = accountBalance < PACK_PRICE;

  return (
    <form action={openingWithAthleteId}>
      <OpenPackButton />
    </form>
  );
}

export default OpeningForm;
