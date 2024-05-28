"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { PACK_PRICE } from "@/lib/constants";
import { useAppContext } from "@/context/app-context";

function OpenPackButton() {
  const { clientAccBalance } = useAppContext();

  const userHasEnoughCoins = () => {
    return clientAccBalance >= PACK_PRICE;
  };

  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending || !userHasEnoughCoins()}
      className={
        "w-32 z-10 glassy-button flex justify-center items-center " +
        (!userHasEnoughCoins() ? "pointer-events-none w-full" : "")
      }
      aria-disabled={!userHasEnoughCoins()}
      tabIndex={userHasEnoughCoins() ? 0 : -1}
    >
      {userHasEnoughCoins() ? (
        <span className="w-32">
          {pending ? <Loader2 className="h-4 w-4 animate-spin ml-8" /> : "Open pack"}
        </span>
      ) : (
        <span className="w-full !bg-slate-300">
          Not enough coins
        </span>
      )}
    </button>
  );
}

export default OpenPackButton;
