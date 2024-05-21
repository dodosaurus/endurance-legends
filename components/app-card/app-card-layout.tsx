function AppCardLayout({ children, rarity = "common" }: { children: React.ReactNode; rarity?: string }) {
  const colorBasedOnCardRarity = (rarity: string): string => {
    if (rarity === "uncommon") {
      return "green-400";
    }
    if (rarity === "rare") {
      return "blue-400";
    }
    if (rarity === "epic") {
      return "purple-400";
    }
    if (rarity === "legendary") {
      return "orange-400";
    }
    return "slate-400";
  };

  return <div className="app-card-border relative h-[450px] w-[325px] flex flex-col justify-end">{children}</div>;
}

export default AppCardLayout;
