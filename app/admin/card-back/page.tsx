import AppCardBack from "@/components/app-card/app-card-back";

function CardBack() {
  return (
    <div className="flex justify-center items-center">
      <AppCardBack rarity="common" />
      <AppCardBack rarity="uncommon" />
      <AppCardBack rarity="rare" />
      <AppCardBack rarity="epic" />
      <AppCardBack rarity="legendary" />
    </div>
  );
}

export default CardBack;
