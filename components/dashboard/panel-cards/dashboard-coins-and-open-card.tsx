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
    <Card className="flex flex-col justify-center items-center w-full border-2 border-cyan-500">
      <AccountBalance accountBalance={accountBalance} />
      <CardContent className="flex flex-col items-center justify-center gap-2 pt-2 w-full">
        <OpeningDrawer athleteId={athleteId} />
        <AvailablePacks />
      </CardContent>
    </Card>
  );
}
