"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Currency = {
  name: string;
  symbol: string;
  value: number;
};

type CurrencyContextType = {
  currency: Currency | null;
  refreshCurrency: () => void;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
};

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<Currency | null>(null);

  const fetchCurrency = async () => {
    const res = await fetch("/api/currency/default");
    const data = await res.json();
    setCurrency(data);
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, refreshCurrency: fetchCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
