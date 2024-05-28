import React from "react";
import AppCardLayout from "../app-card/app-card-layout";

type AppCardPlaceholderProps = {
  cardNo: number;
  rarity: string;
};

function AppCardPlaceholder({ cardNo, rarity }: AppCardPlaceholderProps) {
  return (
    <AppCardLayout face="back" rarity={rarity} shadowIntensity="md">
      <h3 className="text-5xl text-slate-300">{cardNo}</h3>
    </AppCardLayout>
  );
}

export default AppCardPlaceholder;
