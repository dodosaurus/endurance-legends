"use client";

import { Card } from "@prisma/client";
import React from "react";

type AppContextProviderProps = {
  children: React.ReactNode;
};

type AppContextType = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newCards: Card[];
  setNewCards: React.Dispatch<React.SetStateAction<Card[]>>;
  clientAccBalance: number;
  setClientAccBalance: React.Dispatch<React.SetStateAction<number>>
};

export const AppContext = React.createContext<AppContextType | null>(null);

export default function AppContextProvider({ children }: AppContextProviderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [newCards, setNewCards] = React.useState<Card[]>([]);
  const [clientAccBalance, setClientAccBalance] = React.useState<number>(0);

  return (
    <AppContext.Provider
      value={{
        isDrawerOpen,
        setIsDrawerOpen,
        newCards,
        setNewCards,
        clientAccBalance,
        setClientAccBalance
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
}
