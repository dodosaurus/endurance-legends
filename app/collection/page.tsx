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
        <div className="flex justify-between items-center my-3">
          <TabsList>
            <TabsTrigger value="owned">Owned only</TabsTrigger>
            <TabsTrigger value="all">All cards</TabsTrigger>
          </TabsList>
          <div>
            <p>
              Collected{" "}
              <span className="font-semibold">
                {ownedCardsCount} / {cards.length}
              </span>{" "}
            </p>
          </div>
        </div>
        <TabsContent value="owned" className="w-full">
          {ownedCardsCount > 0 ? (
            <OwnedCardsGrid cards={cards} ownedCardsIds={ownedCardsIds} newCardsIds={newCardsIds} />
          ) : (
            <Card className="w-full">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground flex items-center justify-center gap-2">
                  No owned cards found yet. Go out and earn your coins <CoinIcon w="16" />
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
