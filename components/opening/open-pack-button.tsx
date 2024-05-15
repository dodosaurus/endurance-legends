"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { PACK_PRICE } from "@/lib/constants";
import { useOpeningContext } from "@/context/opening-context";

function OpenPackButton() {
  const { clientAccBalance } = useOpeningContext();

  const userHasEnoughCoins = () => {
    return clientAccBalance >= PACK_PRICE
  }

  const { pending } = useFormStatus();
  
  return (
    <Button
      disabled={pending || !userHasEnoughCoins()}
      className={"bg-purple-500 hover:bg-purple-500/80 font-semibold w-32 " + (!userHasEnoughCoins() ? "pointer-events-none" : "")}
      aria-disabled={!userHasEnoughCoins()}
      tabIndex={userHasEnoughCoins() ? 0 : -1}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Open pack"}
    </Button>
  );
}

export default OpenPackButton;
