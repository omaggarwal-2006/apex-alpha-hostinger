"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { Shield, Lock, Zap, Wallet, Activity, ShieldAlert, TrendingDown, Plus } from "lucide-react";
import TradeHistory from "@/components/TradeHistory";
import { useSovereignCore } from "@/hooks/useSovereignCore";

function RollingNumber({ value }) {
  return (
    <motion.span
      key={value}
      initial={{ y: 12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="inline-block tabular-nums"
    >
      {value}
    </motion.span>
  );
}

function StatCard({ label, value, color = "text-white", icon: Icon, bar, barPct, accent }) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="glass-panel p-5 flex flex-col justify-between relative overflow-hidden"
      style={accent ? { borderColor: accent + "22" } : {}}
    >
      {accent && (
        <div
          className="absolute top-0 left-0 w-full h-[1px]"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}60, transparent)` }}
        />
      )}
      <div className="flex justify-between items-start mb-3">
        <p className="text-gray-500 text-[9px] uppercase tracking-[0.2em] font-black">{label}</p>
        {Icon && <Icon size={13} className={color} />}
      </div>
      <h2 suppressHydrationWarning={true} className={`text-2xl font-black tracking-tighter mono-nums leading-none ${color}`}>
        <motion.div
          key={value}
          initial={{ scale: 1.05, filter: "brightness(1.5)" }}
          animate={{ scale: 1, filter: "brightness(1)" }}
          transition={{ duration: 0.3 }}
        >
          <RollingNumber value={value} />
        </motion.div>
      </h2>
      {bar && (
        <div className="w-full h-1 bg-white/5 mt-3 overflow-hidden">
          <motion.div
            className="h-full"
            animate={{ width: `${barPct}%` }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ background: accent || "#fff" }}
          />
        </div>
      )}
    </motion.div>
  );
}

export default function Vault() {
  const { 
    balance, 
    equity, 
    unrealizedPnL, 
    marginUsed, 
    marginPct, 
    peakEquity, 
    drawdown, 
    openTrades,
    closedTrades,
    loading 
  } = useSovereignCore();

  const [mounted, setMounted] = useState(false);
  const [showFunding, setShowFunding] = useState(false);
  useEffect(() => setMounted(true), []);

  const fmt = (n) => {
    if (!mounted) return "0.00";
    return (n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white font-body selection:bg-[#f0c040]/30 overflow-x-hidden">
      <motion.div
        initial={{ y: -100 }} animate={{ y: 0 }}
        className="px-6 py-4 border-b border-white/5 bg-black/60 backdrop-blur-2xl sticky top-0 z-50"
      >
        <Navbar />
      </motion.div>

      <motion.div
        variants={containerVariants} initial="hidden" animate="visible"
        className="max-w-[1600px] mx-auto px-6 py-10"
      >
        {/* ── Page Header ── */}
        <motion.div variants={itemVariants} className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 border border-[#f0c040]/30 text-[#f0c040]">
                <Shield size={22} />
              </div>
              <div>
                <h1 className="text-3xl font-header font-black tracking-[0.1em] uppercase text-white">
                  Sovereign Vault
                </h1>
                <p className="text-[10px] text-gray-600 font-mono uppercase tracking-[0.3em] mt-1">
                  Institutional Asset Management · Live P&L Engine
                </p>
              </div>
            </div>
            <div className="h-px w-64 bg-gradient-to-r from-[#f0c040]/40 to-transparent" />
          </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => setShowFunding(true)}
                className="glass-panel px-4 py-2 border-[#f0c040]/30 hover:bg-[#f0c040]/10 text-[#f0c040] flex items-center gap-2 transition-all group"
              >
                <Plus size={14} className="group-hover:rotate-90 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest">Add Fake Funds</span>
              </button>
              <div className="flex items-center gap-1.5 ml-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse" />
              <span className="text-[9px] font-mono text-[#00FF41] uppercase tracking-widest">
                Live P&L Active
              </span>
            </div>
            <div className="glass-panel px-5 py-2.5 border-white/5 flex items-center gap-2">
              <Lock size={12} className="text-[#f0c040]" />
              <span className="text-[9px] font-header font-black uppercase tracking-widest text-white/40">
                Tier 5 Encryption
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Inventory Matrix ── */}
          <motion.div variants={itemVariants} className="lg:col-span-12">
            <div className="glass-panel border-white/10 shadow-3xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                <h2 className="text-[10px] font-header font-black text-gray-400 uppercase tracking-[0.25em]">
                  Inventory Matrix
                </h2>
                <div className="flex items-center gap-2">
                  <Zap size={9} className="text-[#f0c040] animate-pulse" />
                  <span className="text-[8px] font-mono text-[#f0c040]/50 uppercase tracking-widest">
                    Updates every tick
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4">
                <StatCard
                  label="Total Equity"
                  value={`$${fmt(Math.max(0, equity))}`}
                  color={Math.max(0, equity) >= balance ? "text-white" : "text-[#FF3131]"}
                  icon={Wallet}
                  accent="#f0c040"
                />
                <StatCard
                  label="Live Unrealized P&L"
                  value={`${unrealizedPnL >= 0 ? "+" : "-"}$${fmt(Math.abs(unrealizedPnL))}`}
                  color={unrealizedPnL >= 0 ? "text-[#00FF41]" : "text-[#FF3131]"}
                  icon={Activity}
                  accent={unrealizedPnL >= 0 ? "#00FF41" : "#FF3131"}
                />
                <StatCard
                  label="Locked Margin (200x)"
                  value={`$${fmt(marginUsed)}`}
                  color="text-white"
                  icon={ShieldAlert}
                  bar
                  barPct={marginPct}
                  accent="#f0c040"
                />
                <StatCard
                  label="Max Drawdown"
                  value={`${fmt(drawdown)}%`}
                  color={drawdown > 5 ? "text-[#FF3131]" : "text-white"}
                  icon={TrendingDown}
                  accent="#FF3131"
                />
              </div>
            </div>
          </motion.div>

          {/* ── Trade Ledger ── */}
          <motion.div variants={itemVariants} className="lg:col-span-12">
            <div className="glass-panel border-white/10 shadow-3xl overflow-hidden relative">
              <div className="absolute inset-0 pointer-events-none opacity-[0.02] scanlines" />
              <div className="px-6 py-4 border-b border-white/5 bg-white/[0.01] flex justify-between items-center relative z-10">
                <h2 className="text-[10px] font-header font-black text-gray-400 uppercase tracking-[0.25em]">
                  Ledger Synchronization
                </h2>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00FF41] rounded-full animate-pulse" />
                  <span className="text-[8px] font-mono text-[#00FF41]/60 uppercase tracking-widest">
                    Firestore · Live Stream
                  </span>
                </div>
              </div>
              <div className="p-2">
                <TradeHistory optimisticTrades={[...openTrades, ...closedTrades]} />
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      <div className="fixed bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[#f0c040]/30 to-transparent opacity-50" />
      <div className="fixed inset-0 pointer-events-none z-[100] scanlines opacity-[0.025]" />
      
      <ManualFundingModal isOpen={showFunding} onClose={() => setShowFunding(false)} />
    </div>
  );
}
