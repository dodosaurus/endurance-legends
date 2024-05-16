"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { PACK_PRICE } from "@/lib/constants";
import { useAppContext } from "@/context/app-context";

function OpenPackButton() {
  const { clientAccBalance } = useAppContext();

  const userHasEnoughCoins = () => {
    return clientAccBalance >= PACK_PRICE
  }

  const { pending } = useFormStatus();
  
  return (
    <Button
      disabled={pending || !userHasEnoughCoins()}
      className={"bg-cyan-500 hover:bg-cyan-500/80 font-semibold w-32 " + (!userHasEnoughCoins() ? "pointer-events-none" : "")}
      aria-disabled={!userHasEnoughCoins()}
      tabIndex={userHasEnoughCoins() ? 0 : -1}
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Open pack"}
    </Button>
  );
}

export default OpenPackButton;
