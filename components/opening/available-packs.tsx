import { CoinIcon } from "../coin-icon";
import { calcAvailablePacks } from "@/lib/utils";

function AvailablePacks({ accountBalance }: { accountBalance: number }) {

  return (
    <div className="flex flex-col justify-center items-center text-sm text-muted-foreground pt-2">
      <span className="font-semibold">{calcAvailablePacks(accountBalance)} total available</span>
      <span className="flex items-center">
        (1 = 1000 <CoinIcon w="10" className="ml-1 inline-block align-text-bottom" />)
      </span>
    </div>
  );
}

export default AvailablePacks;
