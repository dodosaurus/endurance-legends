import OpenedCards from "@/components/app-card/opened-cards";
import BackButton from "@/components/opening/back-button";
import ScrollToTop from "@/components/scroll-to-top";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { verifySession } from "@/server/auth/session";
import { openingSync } from "@/server/interface/synchronizers";

// export const dynamic = "force-dynamic";

export default async function Opening() {
  const { athleteId } = await verifySession();
  const { newestCards } = await openingSync(athleteId as number);

  return (
    <div id="opening" className="flex justify-center items-center mt--12">
      <ScrollToTop />
      <Card>
        <CardHeader className="flex flex-col gap-2 text-center">
          <CardTitle>NICE! You have 4 new cards</CardTitle>
        </CardHeader>
        <CardContent>
          <OpenedCards newestCards={newestCards} />
        </CardContent>
        <CardFooter className="flex justify-center">
          <BackButton />
        </CardFooter>
      </Card>
    </div>
  );
}
