import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Bike, DoorOpen, LibraryBig, SendToBack } from "lucide-react";
import { CoinIcon } from "./coin-icon";

const HowToModal = ({ triggerVariant = "default" }: { triggerVariant?: "default" | "secondary" }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <span className={buttonVariants({ variant: triggerVariant })}>How it works?</span>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto mt-12 sm:mt-4">
        <DialogHeader className="pb-3">
          <DialogTitle className="text-cyan-700 text-2xl font-bold">How Endurance Vault works?</DialogTitle>
        </DialogHeader>
        <ul className="flex flex-col gap-10">
          <li className="flex justify-start items-center gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-5">
                <DoorOpen size={40} />
                <h3 className="text-lg font-bold">Log in with your Strava account.</h3>
              </div>
              <p>
                From moment of <b className="text-cyan-500">your first login</b>, your journey will begin and activities
                will be taken in consideration and when uploaded, they will be recalculated into Vault coins.
              </p>
            </div>
          </li>

          <li className="flex justify-start items-center gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-5">
                <Bike size={40} />
                <h3 className="text-lg font-bold">Go out and earn the Vault coins.</h3>
              </div>
              <p>
                Everyone needs cardio. We support only <b className="text-cyan-500">walking, hiking, running</b> and{" "}
                <b className="text-cyan-500">cycling</b> activities for now. It doesn't matter how long it takes you and
                how hard the activity was. What matters are the distance of an activity.
              </p>
              <p className="flex justify-start items-center gap-1">
                One kilometer on feet = 100 <CoinIcon w="15px" />
              </p>
              <p className="flex justify-start items-center gap-1">
                One kilometer by bike = 33 <CoinIcon w="15px" /> 
              </p>
            </div>
          </li>

          <li className="flex justify-start items-center gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-5">
                <SendToBack size={40} />
                <h3 className="text-lg font-bold">Spend your Vault coins on card packs.</h3>
              </div>
              <p className="flex justify-start items-center gap-1">
                One pack = 1000 <CoinIcon w="15px" />
              </p>
              <p>
                Each pack always contains <b className="text-cyan-500">4 cards</b>. Fourth card has chance to have
                higher rarity (<span className="text-green-500">uncommon</span>, <span className="text-sky-500">rare</span>, <span className="text-violet-500">epic</span> or <span className="text-amber-500">legendary</span>).
              </p>
            </div>
          </li>

          <li className="flex justify-start items-center gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex justify-start items-center gap-5">
                <LibraryBig size={40} />
                <h3 className="text-lg font-bold">Expand your collection.</h3>
              </div>
              <p>
                Current collection is: <b>World Tour Cycling 2024</b>. It contains{" "}
                <b className="text-cyan-500">100 rider cards</b> (first 100 ranked riders by UCI points from March 2024)
                and <b className="text-cyan-500">35 race cards</b> (all of World Tour races in 2024).
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
