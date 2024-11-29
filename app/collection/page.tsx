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
import { InfoIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import BackToDashboard from "@/components/navbar/back-to-dashboard";

export default async function Collection() {
  const { athleteId } = await verifySession();
  const { cards, ownedCardsIds, newCardsIds } = await collectionSync(athleteId as number);

  // console.log(cards.map(card => card.cardImageUrl));

  //get number of unique owned cards to display
  const ownedCardsCount = countUniqueMembers(ownedCardsIds);

  return (
    <div id="collection" className="flex-grow flex flex-col gap-2 w-full">
      <Card className="w-full">
        <CardHeader className="flex flex-col md:flex-row justify-between items-center">
          <CardTitle>My collection</CardTitle>
          <div className="flex flex-col items-center w-full sm:w-64">
            <div className="flex justify-between w-full mb-2">
              <span className="text-base">Collected cards</span>
              <span className="text-base font-semibold">
                {ownedCardsCount} / {cards.length}
              </span>
            </div>
            <Progress value={(ownedCardsCount / cards.length) * 100} className="w-full" />
          </div>
          {/* <Popover>
            <PopoverTrigger>
              <InfoIcon className="w-4 h-4 mb-1" />
            </PopoverTrigger>
            <PopoverContent>
              <p>
                This is your card collection. You can earn new cards by completing activities on Strava. Each card
                represents a unique achievement in your fitness journey.
              </p>
            </PopoverContent>
          </Popover> */}
        </CardHeader>
      </Card>
      <Tabs defaultValue="owned" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center my-3 gap-4">
          <TabsList>
            <TabsTrigger value="owned">Owned only</TabsTrigger>
            <TabsTrigger value="all">All cards</TabsTrigger>
          </TabsList>
          
        </div>
        <TabsContent value="owned" className="w-full">
          {ownedCardsCount > 0 ? (
            <OwnedCardsGrid cards={cards} ownedCardsIds={ownedCardsIds} newCardsIds={newCardsIds} />
          ) : (
            <Card className="w-full">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  No owned cards found yet. Go out and earn your coins{" "}
                  <CoinIcon className="inline-block w-4 h-4 ml-1" />
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
