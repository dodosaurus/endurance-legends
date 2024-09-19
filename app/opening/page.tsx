import OpenedCards from "@/components/app-card/opened-cards";
import BackButton from "@/components/opening/back-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verifySession } from "@/server/auth/session";
import { openingSync } from "@/server/interface/synchronizers";

// export const dynamic = "force-dynamic";

export default async function Opening() {
  const { athleteId } = await verifySession();
  const { newestCards } = await openingSync(athleteId as number);

  return (
    <div id="opening">
      <Card>
        <CardHeader>
          <CardTitle>NICE ! You have just opened one pack :)</CardTitle>
        </CardHeader>
        <CardContent>
          <OpenedCards newestCards={newestCards} />
          <BackButton />
        </CardContent>
      </Card>
    </div>
  );
}
