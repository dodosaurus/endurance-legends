"use client";

import { useAppContext } from "@/context/app-context";
import { CoinIcon } from "../coin-icon";
import { calcAvailablePacks } from "@/lib/utils";

function AvailablePacks() {
  const { clientAccBalance } = useAppContext();

  return (
    <div className="flex flex-col justify-center items-center text-xs text-muted-foreground pt-2">
      <span className="font-semibold">{calcAvailablePacks(clientAccBalance)} total available</span>
      <span className="flex items-center">
        (1 = 1000 <CoinIcon w="10" className="ml-1 inline-block align-text-bottom" />)
      </span>
    </div>
  );
}

export default AvailablePacks;
