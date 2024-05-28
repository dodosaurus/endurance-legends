import { Card } from "@prisma/client";
import AppCardFront from "../app-card/app-card-front";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CardPreviewInfo from "./card-preview-info";

function CardPreview({ children, card }: { children: React.ReactNode; card: Card }) {
  const getRarityColorClass = (rarity: string): string => {
    if (rarity === "uncommon") {
      return "bg-emerald-50";
    }
    if (rarity === "rare") {
      return "bg-sky-50";
    }
    if (rarity === "epic") {
      return "bg-violet-50";
    }
    if (rarity === "legendary") {
      return "bg-amber-50";
    }
    return "bg-cyan-50";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={`flex justify-between items-center p-8 ${getRarityColorClass(card.rarity)}`}>
        <AppCardFront card={card} />
        <CardPreviewInfo card={card} />
      </DialogContent>
    </Dialog>
  );
}

export default CardPreview;
