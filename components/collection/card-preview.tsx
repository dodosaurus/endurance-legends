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
import { Button } from "../ui/button";

function CardPreview({ card }: { card: Card }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="pointer-events-auto" variant="outline">
          Show
        </Button>
      </DialogTrigger>
      <DialogContent className="flex justify-center items-center w-min p-10">
        <AppCardFront card={card} />
        {/* <DialogFooter>
        <Button type="button">Save changes</Button>
      </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default CardPreview;
