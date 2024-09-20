import { CoinIcon } from "../coin-icon";
import { CardDescription, CardHeader, CardTitle } from "../ui/card";

function AccountBalance({ accountBalance }: { accountBalance: number }) {
  return (
    <CardHeader className="pb-2 flex flex-col items-center justify-center">
      <CardDescription>Coin balance</CardDescription>
      <CardTitle className="flex gap-2 justify-center items-center text-4xl">
        <span>{accountBalance.toLocaleString("en-GB")}</span>
        <CoinIcon w="25px" />
      </CardTitle>
    </CardHeader>
  );
}

export default AccountBalance;
