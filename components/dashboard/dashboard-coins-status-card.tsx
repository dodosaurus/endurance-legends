import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { calcAvailablePacks } from "@/server/calculations";

type Props = {
  accountBalance: number;
};

function SVGCoin({ w }: { w: string }) {
  return (
    <svg className="inline-block" xmlns="http://www.w3.org/2000/svg" width={w} height={w} viewBox="0 0 24 24" fill="none">
      <ellipse
        rx="8.5"
        ry="9"
        transform="matrix(-1 0 0 1 10.5 12)"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 8.8C12.3732 8.29767 11.5941 8 10.7498 8C8.67883 8 7 9.79086 7 12C7 14.2091 8.67883 16 10.7498 16C11.5941 16 12.3732 15.7023 13 15.2"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 3C14.6667 3 22 3.9 22 12C22 20.1 14.6667 21 11 21" stroke="#000000" strokeWidth="2" />
    </svg>
  );
}

export default function DashboardCoinsStatusCard({ accountBalance }: Props) {
  return (
    <Card className="flex flex-col justify-center items-center flex-grow bg-purple-100 dark:bg-orange-950">
      <CardHeader className="pb-2 flex flex-col items-center justify-center">
        <CardDescription>Coin balance</CardDescription>
        <CardTitle className="flex gap-2 justify-center items-center text-4xl">
          <SVGCoin w="25px" /> <span>{accountBalance.toLocaleString("en-GB")}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <Button className="bg-purple-500 hover:bg-purple-500/80 font-semibold mt-2">Buy & Open (1 pack)</Button>
        <div className="flex flex-col justify-center items-center text-xs text-muted-foreground">
          <span className="font-semibold">{calcAvailablePacks(accountBalance)} total available</span>
          <span>
            (1 = <SVGCoin w="10px" /> 1000)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
