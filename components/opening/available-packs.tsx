"use client";

import { useOpeningContext } from "@/context/opening-context";
import { CoinIcon } from "../coin-icon";
import { calcAvailablePacks } from "@/lib/utils";

function AvailablePacks() {
  const { clientAccBalance } = useOpeningContext();

  return (
    <div className="flex flex-col justify-center items-center text-xs text-muted-foreground">
      <span className="font-semibold">{calcAvailablePacks(clientAccBalance)} total available</span>
      <span>
        (1 = <CoinIcon w="10px" /> 1000)
      </span>
    </div>
  );
}

export default AvailablePacks;
