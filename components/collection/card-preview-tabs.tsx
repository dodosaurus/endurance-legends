import CardPreviewInfo from "./card-preview-info";
import AppCardFront from "../app-card/app-card-front";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card } from "@prisma/client";

function CardPreviewTabs({ card }: { card: Card }) {
  return (
    <Tabs defaultValue="card" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="card">Card</TabsTrigger>
        <TabsTrigger value="info">Info</TabsTrigger>
      </TabsList>
      <TabsContent value="card">
        <AppCardFront card={card} />
      </TabsContent>
      <TabsContent value="info">
        <CardPreviewInfo card={card} />
      </TabsContent>
    </Tabs>
  );
}

export default CardPreviewTabs;
