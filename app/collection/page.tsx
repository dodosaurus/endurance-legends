import AllCardsGrid from "@/components/collection/all-cards-grid";
import OwnedCardsGrid from "@/components/collection/owned-cards-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { countUniqueMembers } from "@/lib/utils";
import { verifySession } from "@/server/auth/session";
import { collectionSync } from "@/server/interface/synchronizers";
import Link from "next/link";
import { CoinIcon } from "@/components/coin-icon"; // Update this import
import { Progress } from "@/components/ui/progress"; // Add this import at the top of the file

export default async function Collection() {
  const { athleteId } = await verifySession();
  const { cards, ownedCardsIds, newCardsIds } = await collectionSync(athleteId as number);

  // console.log(cards.map(card => card.cardImageUrl));

  //get number of unique owned cards to display
  const ownedCardsCount = countUniqueMembers(ownedCardsIds);

  return (
    <div id="collection" className="flex flex-col gap-2 min-w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>My collection</CardTitle>
          <CardDescription className="flex flex-col md:flex-row items-center justify-between gap-5">
            <span>
              Below you can see whole collection and which cards you do own. Get out for a run or ride and earn more!
            </span>
            <div>
              <Link href="/dashboard">
                <Button variant={"secondary"}>Back to dashboard</Button>
              </Link>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
      <Tabs defaultValue="owned" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center my-3 gap-4">
          <TabsList>
            <TabsTrigger value="owned">Owned only</TabsTrigger>
            <TabsTrigger value="all">All cards</TabsTrigger>
          </TabsList>
          <div className="flex flex-col items-center w-full sm:w-64">
            <div className="flex justify-between w-full mb-2">
              <span className="text-base">Collected cards</span>
              <span className="text-base font-semibold">
                {ownedCardsCount} / {cards.length}
              </span>
            </div>
            <Progress value={(ownedCardsCount / cards.length) * 100} className="w-full" />
          </div>
        </div>
        <TabsContent value="owned" className="w-full">
          {ownedCardsCount > 0 ? (
            <OwnedCardsGrid cards={cards} ownedCardsIds={ownedCardsIds} newCardsIds={newCardsIds} />
          ) : (
            <Card className="w-full">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No owned cards found yet. Go out and earn your coins <CoinIcon className="inline-block w-4 h-4 ml-1" />
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="all">
          {/* <AllCardsTable cards={cards} ownedCardsIds={ownedCardsIds} /> */}
          <AllCardsGrid cards={cards} ownedCardsIds={ownedCardsIds} newCardsIds={newCardsIds} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
