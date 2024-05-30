import { Award, Bike, Medal, MountainSnow, Trophy } from "lucide-react";
import AppCardLayout from "./app-card-layout";

function AppCardBack({ rarity }: { rarity: string }) {
  const getRarityTitle = (rarity: string): string => {
    if (rarity === "common") {
      return "Rider";
    }
    if (rarity === "uncommon") {
      return "Stage Race";
    }
    if (rarity === "rare") {
      return "One Day Race";
    }
    if (rarity === "epic") {
      return "Monument";
    }
    if (rarity === "legendary") {
      return "Grand Tour";
    }
    return "World Tour Rider";
  };

  const getRarityIcon = (rarity: string): JSX.Element => {
    if (rarity === "uncommon") {
      return <Medal size={40} />;
    }
    if (rarity === "rare") {
      return <Trophy size={40} />;
    }
    if (rarity === "epic") {
      return <Award size={40} />;
    }
    if (rarity === "legendary") {
      return <MountainSnow size={40} />;
    }
    return <Bike size={40} />;
  };

  return (
    <AppCardLayout face="back" rarity={rarity} shadowIntensity="lg">
      <div className="card__scale-1"></div>
      <div className="card__scale-2"></div>

      <div className="card__shape-1">
        <div className="card__shape-2"></div>
        <div className="card__shape-3">{getRarityIcon(rarity)}</div>
      </div>

      <div className="card__data">
        <h2 className="card__title">{getRarityTitle(rarity)}</h2>
        <p className="card__description text-sm">Touch to flip!</p>
      </div>
    </AppCardLayout>
  );
}

export default AppCardBack;
