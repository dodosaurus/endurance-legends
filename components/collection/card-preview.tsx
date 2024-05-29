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
      return "bg-emerald-50 dark:bg-emerald-900";
    }
    if (rarity === "rare") {
      return "bg-sky-50 dark:bg-sky-900";
    }
    if (rarity === "epic") {
      return "bg-violet-50 dark:bg-violet-900";
    }
    if (rarity === "legendary") {
      return "bg-amber-50 dark:bg-amber-900";
    }
    return "bg-cyan-50 dark:bg-cyan-900";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={`flex flex-col md:flex-row justify-between items-center p-8 ${getRarityColorClass(card.rarity)}`}>
        <AppCardFront card={card} />
        <CardPreviewInfo card={card} />
      </DialogContent>
    </Dialog>
  );
}

export default CardPreview;
