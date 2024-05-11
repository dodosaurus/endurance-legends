import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import OpeningForm from "./opening-form";
import BackButton from "./back-button";
import OpeningTable from "./opening-table";

type OpeningDrawerProps = {
  athleteId: number;
  openPack: (athleteId: number) => Promise<void>;
};

function OpeningDrawer({ athleteId, openPack }: OpeningDrawerProps) {
  return (
    <Drawer>
      <OpeningForm athleteId={athleteId} openPack={openPack} />
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
