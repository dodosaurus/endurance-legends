"use client";

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
import CardPreviewTabs from "./card-preview-tabs";
import { useMediaQuery } from "../app-card/opened-cards";

function CardPreview({ children, card }: { children: React.ReactNode; card: Card }) {
  const isBreakpoint = useMediaQuery(1280);

  const getRarityColorClass = (rarity: string): string => {
    if (rarity === "uncommon") {
      return "bg-emerald-50/80 dark:bg-emerald-900/80";
    }
    if (rarity === "rare") {
      return "bg-sky-50/80 dark:bg-sky-900/80";
    }
    if (rarity === "epic") {
      return "bg-violet-50/80 dark:bg-violet-900/80";
    }
    if (rarity === "legendary") {
      return "bg-amber-50/80 dark:bg-amber-900/80";
    }
    return "bg-cyan-50/80 dark:bg-cyan-900/80";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={`flex flex-col md:flex-row justify-between items-center p-10 ${getRarityColorClass(
          card.rarity
        )}`}
      >
        {!isBreakpoint && (
          <>
            <AppCardFront card={card} />
            <CardPreviewInfo card={card} />
          </>
        )}
        {isBreakpoint && <CardPreviewTabs card={card} />}
      </DialogContent>
    </Dialog>
  );
}

export default CardPreview;
