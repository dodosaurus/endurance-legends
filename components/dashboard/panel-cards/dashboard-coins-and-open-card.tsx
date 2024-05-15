import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OpeningDrawer from "@/components/opening/opening-drawer";
import AccountBalance from "@/components/opening/account-balance";
import AvailablePacks from "@/components/opening/available-packs";

type Props = {
  athleteId: number;
  accountBalance: number;
};

export default function DashboardCoinsAndOpenCard({ athleteId, accountBalance }: Props) {
  return (
    <Card className="flex flex-col justify-center items-center flex-grow bg-purple-100 dark:bg-orange-950">
      <AccountBalance accountBalance={accountBalance} />
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <OpeningDrawer athleteId={athleteId} />
        <AvailablePacks />
      </CardContent>
    </Card>
  );
}
