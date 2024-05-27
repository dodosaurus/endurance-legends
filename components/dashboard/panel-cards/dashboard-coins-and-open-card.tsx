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
    <Card className="flex flex-col justify-center items-center min-w-96 border-2 border-cyan-500 flex-grow">
      <AccountBalance accountBalance={accountBalance} />
      <CardContent className="flex flex-col items-center justify-center gap-2 pt-2">
        <OpeningDrawer athleteId={athleteId} />
        <AvailablePacks />
      </CardContent>
    </Card>
  );
}
