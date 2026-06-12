"use client";
import { useEffect, useState } from "react";
import { Globe2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const SENTIMENT_CONFIG = {
  BULLISH: { color: "#00FF41", icon: TrendingUp, label: "BULL" },
  BEARISH: { color: "#FF3131", icon: TrendingDown, label: "BEAR" },
  NEUTRAL: { color: "#888888", icon: Minus, label: "NEUT" },
};

const IMPACT_DOT = {
  CRITICAL: "bg-red-500 animate-pulse",
  HIGH: "bg-[#D4AF37]",
  MEDIUM: "bg-gray-500",
};

export default function MacroTicker() {
  const [headlines, setHeadlines] = useState([]);
  const [flashId, setFlashId] = useState(null);

  useEffect(() => {
    const fetchHeadlines = async () => {
      try {
        const res = await axios.get("/api/market/headlines");
        const list = Array.isArray(res.data) ? res.data : [];
        setHeadlines([...list, ...list]); // double for marquee loop
      } catch (err) {
        console.error("Headlines fetch failed", err);
      }
    };
    
    fetchHeadlines();
    const fetchInterval = setInterval(fetchHeadlines, 30000);

    // Occasionally "break" in a new headline (simulate live feed)
    const breakingInterval = setInterval(() => {
      if (headlines.length > 0) {
        const randomHeadline = headlines[Math.floor(Math.random() * (headlines.length / 2))];
        setFlashId(randomHeadline.id);
        setTimeout(() => setFlashId(null), 3000);
      }
    }, 20000);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(breakingInterval);
    };
  }, [headlines.length]);

  return (
    <div className="w-full h-8 bg-[#080808] border-b border-white/5 flex items-center overflow-hidden font-mono relative z-50">
      {/* Label */}
      <div className="px-3 h-full bg-[#D4AF37] text-black flex items-center gap-1.5 font-black text-[9px] uppercase tracking-widest shrink-0 shadow-[6px_0_20px_rgba(0,0,0,0.6)] z-10">
        <Globe2 size={10} />
        Macro
      </div>

      {/* Breaking News Flash */}
      <AnimatePresence>
        {flashId && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="shrink-0 overflow-hidden"
          >
            <div className="bg-red-600 px-3 h-full flex items-center text-[9px] font-black uppercase tracking-widest text-white whitespace-nowrap">
              ⚡ BREAKING
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrolling ticker */}
      <div className="flex-1 overflow-hidden relative h-full">
        <div className="absolute inset-0 flex items-center animate-marquee whitespace-nowrap">
          {headlines.map((item, i) => {
            const cfg = SENTIMENT_CONFIG[item.sentiment] || SENTIMENT_CONFIG.NEUTRAL;
            const Icon = cfg.icon;
            return (
              <div key={`${item.id}-${i}`} className="inline-flex items-center mx-6 gap-2 shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${IMPACT_DOT[item.impact]}`} />
                <span className="text-[9px] text-gray-500 font-bold shrink-0">[{item.source}]</span>
                <span className="text-[10px] text-white font-medium uppercase tracking-wide">{item.text}</span>
                <span
                  className="flex items-center gap-0.5 text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 shrink-0"
                  style={{ color: cfg.color, background: cfg.color + "15", border: `1px solid ${cfg.color}30` }}
                >
                  <Icon size={8} />
                  {cfg.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
