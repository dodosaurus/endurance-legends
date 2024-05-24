import AllCardsTable from "@/components/collection/all-cards-table";
import OwnedCardsTable from "@/components/collection/owned-cards-table";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { countUniqueMembers } from "@/lib/utils";
import { verifySession } from "@/server/auth/session";
import { collectionSync } from "@/server/interface/synchronizers";
import Link from "next/link";

export default async function Collection() {
  const { athleteId } = await verifySession();
  const { cards, ownedCardsIds } = await collectionSync(athleteId as number);

  // console.log(cards.map(card => card.cardImageUrl));

  //get number of unique owned cards to display
  const ownedCardsCount = countUniqueMembers(ownedCardsIds);

  return (
    <div id="collection" className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>My collection</CardTitle>
          <CardDescription className="flex flex-col items-start justify-between gap-5">
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
      <Tabs defaultValue="owned">
        <div className="flex justify-between items-center my-3">
          <TabsList>
            <TabsTrigger value="owned">Owned only</TabsTrigger>
            <TabsTrigger value="all">All cards</TabsTrigger>
          </TabsList>
          <div>
            <p>Collected <span className="font-semibold">{ownedCardsCount} / {cards.length}</span> </p>
          </div>
        </div>
        <TabsContent value="owned">
          <OwnedCardsTable cards={cards} ownedCardsIds={ownedCardsIds} />
        </TabsContent>
        <TabsContent value="all">
          <AllCardsTable cards={cards} ownedCardsIds={ownedCardsIds} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
