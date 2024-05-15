"use client";

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
import { openPack } from "@/server/interface/actions";
import { useAppContext } from "@/context/app-context";
import { PACK_PRICE } from "@/lib/constants";

type OpeningDrawerProps = {
  athleteId: number;
};

const OpeningDrawer = ({ athleteId }: OpeningDrawerProps) => {
  const { isDrawerOpen, setIsDrawerOpen, newCards, setNewCards, clientAccBalance, setClientAccBalance } = useAppContext();

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <form
        action={async () => {
          setClientAccBalance(clientAccBalance - PACK_PRICE);
          const crds = await openPack(athleteId);
          setNewCards(crds);
          setIsDrawerOpen(true);
        }}
      >
        <OpenPackButton />
      </form>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="py-5 text-center">NICE ! You just opened one pack :)</DrawerTitle>
          <DrawerDescription className="py-5 text-center">A list of acquired cards.</DrawerDescription>
        </DrawerHeader>
        <OpeningTable assignedCards={newCards} />
        <DrawerFooter>
          <DrawerClose>
            <BackButton />
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default OpeningDrawer;
