"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Activity, ShieldAlert, TrendingDown, Info, Plus, Award } from "lucide-react";
import { auth } from "@/lib/firebase";
import axios from "axios";
import toast from "react-hot-toast";
import { playCoinSound } from "@/utils/sound";
import { useRouter } from "next/navigation";
import { useLiveTrades } from "@/hooks/useLiveTrades";
import { useLivePnL } from "@/hooks/useLivePnL";
import { usePortfolio } from "@/hooks/useFirestore";
import { useAuth } from "@/contexts/AuthContext";
import ManualFundingModal from "@/components/ManualFundingModal";
import { useCurrency } from "@/contexts/CurrencyContext";

function RollingNumber({ value, prefix = "" }) {
  return (
    <motion.span
      key={value}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      className="inline-block"
    >
      {prefix}{value}
    </motion.span>
  );
}

export default function StatsBar({ optimisticTrades = [] }) {
  const { data: portfolio, loading: portfolioLoading } = usePortfolio();
  const balance = portfolio?.accountBalance || 0;
  const peakRef = useRef(0);
  const [peakEquity, setPeakEquity] = useState(balance);
  const [isAdding, setIsAdding] = useState(false);

  // Live PnL from Binance WebSocket
  const { unrealizedPnL: livePnL, marginUsed } = useLivePnL(optimisticTrades);
  const { convert, symbol } = useCurrency();

  useEffect(() => {
    const lvl3Completed = localStorage.getItem("apex_lvl3_index");
    if (lvl3Completed && Number(lvl3Completed) >= 7) {
      setIsCertified(true);
    }
  }, []);

  // Live calculations — uses Binance WebSocket price for open trades
  const unrealizedPnl = livePnL;
  const equity = balance + unrealizedPnl;
  const maintenanceMargin = marginUsed > 0 ? marginUsed : equity * 0.015;

  const convertedEquity = convert(equity);
  const convertedUnrealizedPnl = convert(unrealizedPnl);
  const convertedMaintenanceMargin = convert(maintenanceMargin);

  // Track peak equity without calling setState inside render
  useEffect(() => {
    if (equity > peakRef.current) {
      peakRef.current = equity;
      setPeakEquity(equity);
    }
  }, [equity]);

  const drawdown = peakEquity > 0 ? ((peakEquity - equity) / peakEquity) * 100 : 0;

  const [showFunding, setShowFunding] = useState(false);

  const handleAddFunds = () => {
    setShowFunding(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        {/* Equity Card */}
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-5 relative group/eq flex flex-col justify-between">
          <div className="absolute left-0 top-full mt-2 hidden group-hover/eq:block w-48 bg-[#0A0A0A] border border-white/30 p-2 z-50 shadow-2xl pointer-events-none">
            <p className="text-[10px] font-header text-white uppercase tracking-[0.1em] mb-1 font-bold">What is Total Equity?</p>
            <p className="text-[10px] text-gray-400 font-mono leading-tight">Your total account value. It equals your cash balance plus any Unrealized P&L from open trades.</p>
          </div>
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-1 cursor-help">
              Sovereign Vault <Info size={10} className="opacity-50" />
            </p>
            <Wallet size={14} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tighter mono-nums flex items-center gap-1">
            <RollingNumber prefix={symbol} value={Math.max(0, convertedEquity).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} />
          </h2>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-[10px] text-[#00FF41] font-mono uppercase">Institutional Liquidity</div>
            </div>
            <button 
              onClick={handleAddFunds}
              disabled={isAdding}
              className="text-[9px] uppercase tracking-widest font-bold text-white px-2 py-1 rounded-sm flex items-center gap-1 transition-all bg-[#00FF41]/20 hover:bg-[#00FF41]/40 text-[#00FF41] disabled:opacity-50"
            >
              <Plus size={10} /> Add Fake Funds
            </button>
          </div>
        </motion.div>

        {/* Unrealized P&L Card */}
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-5 relative group/pnl">
          <div className="absolute left-0 top-full mt-2 hidden group-hover/pnl:block w-48 bg-[#0A0A0A] border border-[#00FF41]/30 p-2 z-50 shadow-2xl pointer-events-none">
            <p className="text-[10px] font-header text-[#00FF41] uppercase tracking-[0.1em] mb-1 font-bold">Unrealized P&L</p>
            <p className="text-[10px] text-gray-400 font-mono leading-tight">The current profit or loss of trades that are still open. It's 'unrealized' because it changes with the market until you close the position.</p>
          </div>
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-1 cursor-help">
              Unrealized P&L <Info size={10} className="opacity-50" />
            </p>
            <Activity size={14} className={unrealizedPnl >= 0 ? "text-[#00FF41]" : "text-[#FF3131]"} />
          </div>
          <h2 className={`text-2xl font-black tracking-tighter mono-nums ${unrealizedPnl >= 0 ? "text-[#00FF41]" : "text-[#FF3131]"}`}>
            {unrealizedPnl >= 0 ? "+" : "-"}<RollingNumber prefix={symbol} value={Math.abs(convertedUnrealizedPnl).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} />
          </h2>
        </motion.div>

        {/* Maintenance Margin */}
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-5 relative group/margin">
          <div className="absolute left-0 top-full mt-2 hidden group-hover/margin:block w-48 bg-[#0A0A0A] border border-[#FF3131]/30 p-2 z-50 shadow-2xl pointer-events-none">
            <p className="text-[10px] font-header text-[#FF3131] uppercase tracking-[0.1em] mb-1 font-bold">Maintenance Margin</p>
            <p className="text-[10px] text-gray-400 font-mono leading-tight">The minimum amount of equity required to keep your positions open. If your equity falls below this level, you face a margin call (liquidation).</p>
          </div>
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-1 cursor-help">
              Maint. Margin <Info size={10} className="opacity-50" />
            </p>
            <ShieldAlert size={14} className="text-white" />
          </div>
          <h2 className="text-2xl font-black tracking-tighter mono-nums text-white">
            <RollingNumber prefix={symbol} value={convertedMaintenanceMargin.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} />
          </h2>
          <div className="w-full h-1 bg-white/10 mt-2">
            <div className="h-full bg-white/50" style={{ width: '15%' }}></div>
          </div>
        </motion.div>

        {/* Maximum Drawdown Card */}
        <motion.div whileHover={{ scale: 1.02 }} className="glass-panel p-5 relative group/dd">
          <div className="absolute right-0 top-full mt-2 hidden group-hover/dd:block w-48 bg-[#0A0A0A] border border-[#FF3131]/30 p-2 z-50 shadow-2xl pointer-events-none">
            <p className="text-[10px] font-header text-[#FF3131] uppercase tracking-[0.1em] mb-1 font-bold">Maximum Drawdown</p>
            <p className="text-[10px] text-gray-400 font-mono leading-tight">The largest percentage drop from your peak equity in this session. Tracking drawdown helps manage risk and evaluate strategy consistency.</p>
          </div>
          <div className="flex justify-between items-start mb-2">
            <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center gap-1 cursor-help">
              Max Drawdown <Info size={10} className="opacity-50" />
            </p>
            <TrendingDown size={14} className="text-[#FF3131]" />
          </div>
          <h2 className="text-2xl font-black text-[#FF3131] tracking-tighter mono-nums">
            <RollingNumber value={drawdown.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} />%
          </h2>
        </motion.div>
      </div>
      <ManualFundingModal isOpen={showFunding} onClose={() => setShowFunding(false)} />
    </>
  );
}
