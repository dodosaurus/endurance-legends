import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCollectionSize } from "@/server/interface/actions";

type Props = {
  userOwnedCards: number;
};

export default async function DashboardCollectionCard({ userOwnedCards }: Props) {
  const collectionSize = await getCollectionSize();

  return (
    <Card className="flex flex-col justify-center items-center min-w-96 border-2 border-cyan-500 flex-grow">
      <CardHeader className="pb-2">
        <Link href="/collection">
          <button className="w-full z-10 collection-glassy-button flex justify-center items-center">
            <span className="w-full">My collection</span>
          </button>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <div className="flex flex-col justify-center items-center">
          <CardDescription>Collected</CardDescription>
          <span className="text-2xl font-semibold">
            {userOwnedCards} / {collectionSize}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
