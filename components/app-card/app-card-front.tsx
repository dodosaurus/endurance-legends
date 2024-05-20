import { CircleFlag } from "react-circle-flags";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import AppCardLayout from "./app-card-layout";
import type { Card as CardType } from "@prisma/client";
import { getIsoCountryCode } from "@/lib/utils";

function AppCardFront({ card }: { card: CardType }) {
  const getRightCountryCodeForFlag = (countryString: string) => {
    //if given string is three chars or lower long just conver it to lowerCase and return
    if (countryString.length <= 3) {
      return countryString.toLowerCase();
    }

    //else call getIsoCountryCode
    return getIsoCountryCode(countryString);
  };

  return (
    <AppCardLayout rarity={card.rarity}>
      <Image
        className="bg-img border rounded-lg"
        src="https://psziumetrhqiqfckluyr.supabase.co/storage/v1/object/sign/master-collection-1/cyclists/10-wout-van-aert.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJtYXN0ZXItY29sbGVjdGlvbi0xL2N5Y2xpc3RzLzEwLXdvdXQtdmFuLWFlcnQud2VicCIsImlhdCI6MTcxNjE4MTkzOCwiZXhwIjoxNzQ3NzE3OTM4fQ.YXYF4jeMbs3a1RPaswzOcCgs2HpHy4ISCA53nzDB0Tg&t=2024-05-20T05%3A12%3A18.763Z"
        alt="app card image"
        width={400}
        height={330}
      />
      <Badge className="absolute z-10 top-3 right-3 text-xs" variant="secondary">
        <div className="flex justify-start items-center gap-1">
          <span>{card.rarity}</span>
        </div>
      </Badge>
      <Card className="h-24">
        <CardHeader>
          <CardTitle className="flex justify-between items-center gap-2">
            <span>{card.id}</span>
            <div className="flex justify-end items-center gap-3">
              <CircleFlag className="w-6 h-6" countryCode={getRightCountryCodeForFlag(card.country) || ""} />
              <h2 className={card.name.length >= 20 ? "text-sm" : "text-xl"}>{card.name}</h2>
            </div>
          </CardTitle>
          <CardDescription className="flex justify-end items-center">
            <p>{card.additionalInfo1}</p>
          </CardDescription>
        </CardHeader>
        {/* <CardContent>
        <div className="text-xs text-muted-foreground">content goes here</div>
      </CardContent>
      <CardFooter></CardFooter> */}
      </Card>
    </AppCardLayout>
  );
}

export default AppCardFront;
