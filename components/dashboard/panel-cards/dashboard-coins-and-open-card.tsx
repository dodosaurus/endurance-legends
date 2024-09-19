import { Card, CardContent } from "@/components/ui/card";
import AccountBalance from "@/components/opening/account-balance";
import AvailablePacks from "@/components/opening/available-packs";
import OpeningForm from "./opening-form";

type Props = {
  athleteId: number;
  accountBalance: number;
};

export default function DashboardCoinsAndOpenCard({ athleteId, accountBalance }: Props) {
  return (
    <Card className="flex flex-col justify-center items-center w-full border-0 shadow-md">
      <AccountBalance accountBalance={accountBalance} />
      <CardContent className="flex flex-col items-center justify-center gap-2 pt-2 w-full">
        <OpeningForm athleteId={athleteId} />
        <AvailablePacks accountBalance={accountBalance} />
      </CardContent>
    </Card>
  );
}
