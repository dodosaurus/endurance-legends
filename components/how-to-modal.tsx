import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Bike, DoorOpen, LibraryBig, SendToBack } from "lucide-react";

const HowToModal = ({ triggerVariant = "default" }: { triggerVariant?: "default" | "secondary" }) => {
  return (
    <Dialog>
      <DialogTrigger className="hidden sm:block">
        <span className={buttonVariants({ variant: triggerVariant })}>How it works?</span>
      </DialogTrigger>
      <DialogContent className="min-w-96">
        <DialogHeader className="pb-3">
          <DialogTitle className="text-cyan-700">How Endurance Vault works?</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-10">
          <li className="flex justify-start items-center gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-5">
                <DoorOpen size={40} />
                <h3 className="text-lg font-semibold">Log in with your Strava account.</h3>
              </div>
              <p>
                From moment of your first login, your journey will begin and activities will be taken in consideration
                and when uploaded, they will be recalculated into Vault coins.
              </p>
            </div>
          </li>

          <li className="flex justify-start items-center gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-5">
                <Bike size={40} />
                <h3 className="text-lg font-semibold">Go out and earn the Vault coins.</h3>
              </div>
              <p>
                Everyone needs cardio. We support only running and cycling activities for now. It doesn't matter how
                long it takes you and how hard the activity was. What matters are the distance of an activity.
              </p>
              <p>One kilometer on running feet = 100 Vault coins. One kilometer pushing pedals = 25 Vault coins.</p>
            </div>
          </li>

          <li className="flex justify-start items-center gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-5">
                <SendToBack size={40} />
                <h3 className="text-lg font-semibold">Spend your Vault coins on card packs.</h3>
              </div>
              <p>One pack = 1000 Vault coins.</p>
              <p>
                Each pack always contains 4 cards. Fourth card has chance to have higher rarity (uncommon, rare, epic or
                legendary).
              </p>
            </div>
          </li>

          <li className="flex justify-start items-center gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-5">
                <LibraryBig size={40} />
                <h3 className="text-lg font-semibold">Expand your collection.</h3>
              </div>
              <p>
                Current collection is: World Tour Cycling 2024. It contains 100 rider cards (first 100 ranked riders by
                UCI points from March 2024) and 35 race cards (all of World Tour races in 2024).
              </p>
              <p>
                After end of calendar year, collection will be saved into your Hall of Fame and new collection will be
                added to Endurance Vault.
              </p>
            </div>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default HowToModal;
