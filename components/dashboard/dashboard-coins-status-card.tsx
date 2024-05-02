import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { calcAvailablePacks } from "@/server/calculations";
import { CoinIcon } from "../coin-icon";

type Props = {
  accountBalance: number;
};

export default function DashboardCoinsStatusCard({ accountBalance }: Props) {
  return (
    <Card className="flex flex-col justify-center items-center flex-grow bg-purple-100 dark:bg-orange-950">
      <CardHeader className="pb-2 flex flex-col items-center justify-center">
        <CardDescription>Coin balance</CardDescription>
        <CardTitle className="flex gap-2 justify-center items-center text-4xl">
          <CoinIcon w="25px" /> <span>{accountBalance.toLocaleString("en-GB")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <Button className="bg-purple-500 hover:bg-purple-500/80 font-semibold mt-2">Buy & Open (1 pack)</Button>
        <div className="flex flex-col justify-center items-center text-xs text-muted-foreground">
          <span className="font-semibold">{calcAvailablePacks(accountBalance)} total available</span>
          <span>
            (1 = <CoinIcon w="10px" /> 1000)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
