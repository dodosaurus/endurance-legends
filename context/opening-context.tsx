"use client";

import { Card } from "@prisma/client";
import React from "react";

type OpeningContextProviderProps = {
  children: React.ReactNode;
};

type OpeningContextType = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newCards: Card[];
  setNewCards: React.Dispatch<React.SetStateAction<Card[]>>;
  clientAccBalance: number;
  setClientAccBalance: React.Dispatch<React.SetStateAction<number>>
};

export const OpeningContext = React.createContext<OpeningContextType | null>(null);

export default function OpeningContextProvider({ children }: OpeningContextProviderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
  const [newCards, setNewCards] = React.useState<Card[]>([]);
  const [clientAccBalance, setClientAccBalance] = React.useState<number>(0);

  return (
    <OpeningContext.Provider
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
    </OpeningContext.Provider>
  );
}

export function useOpeningContext() {
  const context = React.useContext(OpeningContext);

  if (!context) {
    throw new Error("useOpeningContext must be used within an OpeningContextProvider");
  }

  return context;
}
