import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import BackButton from "./back-button";
import OpeningTable from "./opening-table";
import OpenPackButton from "./open-pack-button";
import { revalidateStravaAccessToken } from "@/server/strava";
import { assignNewCardSetToOwner, generateAssignmentOfNewCards } from "@/server/opening-engine";

type OpeningDrawerProps = {
  athleteId: number;
};

function OpeningDrawer({ athleteId }: OpeningDrawerProps) {
  async function openPack(athleteId: number) {
    "use server";

    console.log("opening pack " + athleteId);

    //refresh access token if needed
    const access_token = await revalidateStravaAccessToken(athleteId);

    if (!access_token) {
      throw new Error("App cannot refresh the Strava access token.");
    }

    //algorithm will generate random 4-card acquirement - 3 common + 1 higher rarity
    const { chosenCards } = await generateAssignmentOfNewCards(athleteId);

    //this will add cards to user and reduce account balance
    await assignNewCardSetToOwner(athleteId, chosenCards);
  }

  const openingWithAthleteId = openPack.bind(null, athleteId);

  return (
    <Drawer>
      <form action={openingWithAthleteId}>
        <OpenPackButton />
      </form>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="py-5 text-center">NICE ! You just opened one pack :)</DrawerTitle>
          <DrawerDescription className="py-5 text-center">A list of acquired cards.</DrawerDescription>
        </DrawerHeader>
        <OpeningTable />
        <DrawerFooter>
          <DrawerClose>
            <BackButton />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default OpeningDrawer;
