"use client";

import { useAppContext } from "@/context/app-context";
import { CoinIcon } from "../coin-icon";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useEffect } from "react";

function AccountBalance({ accountBalance }: { accountBalance: number }) {
  const { clientAccBalance, setClientAccBalance } = useAppContext();

  useEffect(() => {
    setClientAccBalance(accountBalance);
  }, [accountBalance]);

  return (
    <CardHeader className="pb-2 flex flex-col items-center justify-center">
      <CardDescription>Coin balance</CardDescription>
      <CardTitle className="flex gap-2 justify-center items-center text-4xl">
        <span>{clientAccBalance.toLocaleString("en-GB")}</span>
        <CoinIcon w="25px" />
      </CardTitle>
    </CardHeader>
  );
}

export default AccountBalance;
