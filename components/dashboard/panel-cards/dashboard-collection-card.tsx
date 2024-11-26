import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCollectionSize } from "@/server/interface/actions";
import { Progress } from "@/components/ui/progress";

type Props = {
  userOwnedCards: number;
};

export default async function DashboardCollectionCard({ userOwnedCards }: Props) {
  const collectionSize = (await getCollectionSize()) as number;

  return (
    <Card className="flex flex-col justify-between items-center w-full py-4 shadow-md">
      <CardHeader>
        <Link href="/collection">
          <button className="w-full z-10 collection-glassy-button flex justify-center items-center">
            <span className="w-full text-xl">My collection</span>
          </button>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-between gap-2 w-full">
        <div className="flex flex-col justify-center items-center w-full">
          <CardDescription>Collected</CardDescription>
          <span className="text-2xl font-semibold">
            {userOwnedCards} / {collectionSize}
          </span>
          <Progress className="mt-4 w-full" value={(userOwnedCards / collectionSize) * 100} />
        </div>
      </CardContent>
    </Card>
  );
}
