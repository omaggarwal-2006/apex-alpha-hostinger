"use client";
import { useCurrency } from "@/contexts/CurrencyContext";
import { Globe } from "lucide-react";

export default function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
      <Globe size={12} className="text-[#D4AF37]" />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="bg-transparent border-none outline-none text-[10px] font-mono font-bold text-white uppercase cursor-pointer"
      >
        {currencies.map((curr) => (
          <option key={curr} value={curr} className="bg-[#020205] text-white">
            {curr}
          </option>
        ))}
      </select>
    </div>
  );
}
