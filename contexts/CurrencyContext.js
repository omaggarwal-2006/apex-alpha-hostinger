"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext({});

const RATES = {
  USD: { symbol: "$", rate: 1.0, name: "US Dollar" },
  INR: { symbol: "₹", rate: 83.5, name: "Indian Rupee" },
  EUR: { symbol: "€", rate: 0.92, name: "Euro" },
  GBP: { symbol: "£", rate: 0.78, name: "British Pound" },
  JPY: { symbol: "¥", rate: 156.0, name: "Japanese Yen" }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrencyState] = useState("USD");

  useEffect(() => {
    const saved = localStorage.getItem("apex_currency");
    if (saved && RATES[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (curr) => {
    if (RATES[curr]) {
      setCurrencyState(curr);
      localStorage.setItem("apex_currency", curr);
    }
  };

  const convert = (usdValue) => {
    const rate = RATES[currency]?.rate || 1.0;
    return usdValue * rate;
  };

  const format = (usdValue) => {
    const val = convert(usdValue);
    const sym = RATES[currency]?.symbol || "$";
    return `${sym}${val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, symbol: RATES[currency]?.symbol, convert, format, setCurrency, currencies: Object.keys(RATES) }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
