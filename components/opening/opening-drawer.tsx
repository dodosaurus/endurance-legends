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
import { useState } from "react";
import { openPack } from "@/server/interface/actions";
import { Card } from "@prisma/client";

type OpeningDrawerProps = {
  athleteId: number;
};

function OpeningDrawer({ athleteId }: OpeningDrawerProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newCards, setNewCards] = useState<Card[]>([])

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <form action={async () => {
        const crds = await openPack(athleteId);
        setNewCards(crds)
        setIsDrawerOpen(true);
      }}>
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
}

export default OpeningDrawer;
