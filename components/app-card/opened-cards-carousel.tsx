import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Card as CardType } from "@prisma/client";
import AppCard from "./app-card";
import { CardDescription } from "../ui/card";

export function OpenedCardsCarousel({ cards }: { cards: CardType[] }) {
  return (
    <div className="flex flex-col gap-4">
      <CardDescription className="text-center">Swipe to see them all</CardDescription>
      <Carousel
        className="w-full max-w-[var(--card-width)]"
        opts={{
          containScroll: "keepSnaps",
        }}
      >
        <CarouselContent>
          {cards.map((_, index) => (
            <CarouselItem className="z-99" key={index}>
              <AppCard card={cards[index]} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
      <CarouselNext /> */}
      </Carousel>
    </div>
  );
}
