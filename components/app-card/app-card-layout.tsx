function AppCardLayout({ children, rarity = "common" }: { children: React.ReactNode; rarity?: string }) {
  const shadowBasedOnCardRarity = (rarity: string): string => {
    if (rarity === "uncommon") {
      return "shadow-green-400";
    }
    if (rarity === "rare") {
      return "shadow-blue-400";
    }
    if (rarity === "epic") {
      return "shadow-purple-400";
    }
    if (rarity === "legendary") {
      return "shadow-orange-400";
    }
    return "shadow-slate-400";
  };

  return (
    <div
      className={`relative h-[450px] w-[325px] flex flex-col justify-end border rounded-lg shadow-2xl ${shadowBasedOnCardRarity(
        rarity
      )}`}
    >
      {children}
    </div>
  );
}

export default AppCardLayout;
