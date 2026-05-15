"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface PremiumContextType {
  isPremium: boolean;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PremiumContext.Provider value={{ isPremium: true }}>
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error("usePremium must be used within a PremiumProvider");
  }
  return context;
};
