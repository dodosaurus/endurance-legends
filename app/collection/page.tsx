import AllCardsTable from "@/components/collection/all-cards-table";
import OwnedCardsTable from "@/components/collection/owned-cards-table";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { verifySession } from "@/server/auth/session";
import { collectionSync } from "@/server/interface/synchronizers";
import Link from "next/link";

export default async function Collection() {
  const { athleteId } = await verifySession();
  const { cards, ownedCardsIds } = await collectionSync(athleteId as number);

  //not automatically syncing like on dashboard, rather add own button for that

  return (
    <div id="collection" className="flex flex-col gap-2">
      <Card>
        <CardHeader>
          <CardTitle>My collection</CardTitle>
          <CardDescription className="flex flex-col items-start justify-between gap-5">
            <span>
              Below you can see whole collection and which cards you do own. Get out for a run or ride and earn more!
            </span>
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
            <Link href="/dashboard">
              <Button variant={"secondary"}>Back to dashboard</Button>
            </Link>
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
