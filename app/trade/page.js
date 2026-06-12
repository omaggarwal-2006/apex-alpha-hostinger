"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import OrderPanel from "@/components/OrderPanel";
import Chart from "@/components/Chart";
import TradeHistory from "@/components/TradeHistory";
import MarketDepth from "@/components/MarketDepth";
import StatsBar from "@/components/StatsBar";
import ErrorBoundary from "@/components/ErrorBoundary";
import TopBarTicker from "@/components/TopBarTicker";

import Watchlist from "@/components/Watchlist";
import GrowwSearch from "@/components/GrowwSearch";
import PortfolioHeatmap from "@/components/PortfolioHeatmap";

import PositionEngine from "@/components/PositionEngine";
import MacroTicker from "@/components/MacroTicker";
import PolymarketPanel from "@/components/PolymarketPanel";
import CommandBar from "@/components/CommandBar";

import { useRouter } from "next/navigation";
import { useLiveTrades } from "@/hooks/useLiveTrades";
import { usePortfolio } from "@/hooks/useFirestore";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import CurrencySelector from "@/components/CurrencySelector";
import AlphaSentinel from "@/components/AlphaSentinel";
import NewsFeed from "@/components/NewsFeed";

export default function TradePage() {
  const { user } = useAuth();
  const { trades: openTrades, loading: tradesLoading } = useLiveTrades(user?.uid, "open");
  const { data: portfolio } = usePortfolio();
  
  const [selectedAsset, setSelectedAsset] = useState("BTC-USD");
  const [showConsole, setShowConsole] = useState(false);
  const [activeInsight, setActiveInsight] = useState('IDLE');
  const [zenMode, setZenMode] = useState(false);
  const [slPrice, setSlPrice] = useState(0);
  const [tpPrice, setTpPrice] = useState(0);
  
  const [balance, setBalance] = useState(0);
  const [optimisticTrades, setOptimisticTrades] = useState([]);
  const [rightActiveTab, setRightActiveTab] = useState("polymarket");
  const [activeTimeframe, setActiveTimeframe] = useState("15m");
  const [mobileTab, setMobileTab] = useState("markets"); // "markets" | "trade" | "vault"

  // Sync balance with Firestore portfolio
  useEffect(() => {
    if (portfolio?.accountBalance !== undefined) {
      setBalance(Math.min(portfolio.accountBalance, 1000000));
    }
  }, [portfolio?.accountBalance]);

  // Sync openTrades with optimisticTrades
  useEffect(() => {
    if (openTrades) {
      setOptimisticTrades(openTrades);
    }
  }, [openTrades]);
  
  const [currentPrice, setCurrentPrice] = useState(0);
  const [marketAnalytics, setMarketAnalytics] = useState(null);
  const [impactActive, setImpactActive] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);
  const [isTrailing, setIsTrailing] = useState(false);
  const [highestSinceOpen, setHighestSinceOpen] = useState(0);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [splitMode, setSplitMode] = useState(null);
  const router = useRouter();

  // Daily P&L Tracker
  useEffect(() => {
    const dailyLoss = optimisticTrades.reduce((acc, trade) => {
      return trade.status === 'CLOSED' && trade.pnl < 0 ? acc + trade.pnl : acc;
    }, 0);

    if (dailyLoss < -500 && !isLocked) {
      setTimeout(() => {
        setIsLocked(true);
        setLockTime(3600);
      }, 0);
    }
  }, [optimisticTrades, isLocked]);

  // Lockout Timer
  useEffect(() => {
    if (lockTime > 0) {
      const timer = setInterval(() => setLockTime(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (lockTime <= 0 && isLocked) {
      setTimeout(() => setIsLocked(false), 0);
    }
  }, [lockTime, isLocked]);

  // No manual balance fetch or listeners needed anymore

  // Price & Analytics Fetch
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get(`/api/market/snapshot?symbol=${encodeURIComponent(selectedAsset)}`);
        setCurrentPrice(res.data.price);
        setMarketAnalytics({
          recommendation: res.data.recommendationMean,
          quoteType: res.data.quoteType,
          volume: res.data.volume,
          avgVolume: res.data.averageVolume
        });
      } catch (err) {
        console.error("Price fetch failed", err);
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 5000);
    return () => clearInterval(interval);
  }, [selectedAsset]);

  // Trailing SL Logic
  useEffect(() => {
    if (isTrailing && currentPrice > highestSinceOpen) {
      setTimeout(() => {
        setHighestSinceOpen(currentPrice);
        if (slPrice > 0 && highestSinceOpen > 0) {
          const movePercent = (currentPrice - highestSinceOpen) / highestSinceOpen;
          if (movePercent > 0.005) {
            setSlPrice(prev => prev * (1 + movePercent));
          }
        }
      }, 0);
    }
  }, [currentPrice, isTrailing, slPrice, highestSinceOpen]);

  const handleFlashTrade = useCallback(async () => {
    if (optimisticTrades.length === 0) return;
    const target = optimisticTrades.find(t => t.status === 'OPEN');
    if (!target) return;

    const livePrice = currentPrice || target.entryPrice || 100;
    const spread = target.type === 'BUY' ? livePrice - target.entryPrice : target.entryPrice - livePrice;
    const localPnl = spread * target.lot - (target.fees?.total ?? 0);
    const returnedCash = livePrice * target.lot;

    // Local balance calculation
    const newBalance = balance + returnedCash;
    setBalance(newBalance);
    localStorage.setItem("apex_local_balance", newBalance.toString());

    // Update optimistic trades list
    const updatedTrades = optimisticTrades.map(t =>
      t.id === target.id ? { ...t, status: 'CLOSED', exitPrice: livePrice, pnl: localPnl } : t
    );
    setOptimisticTrades(updatedTrades);
    localStorage.setItem("apex_local_trades", JSON.stringify(updatedTrades));

    if (localPnl < 0) {
      setImpactActive(true);
      setTimeout(() => setImpactActive(false), 2000);
    }

    toast?.success?.(`Position closed! Yield PnL: $${localPnl.toFixed(2)}`);

    if (!user) return;

    try {
      const token = await user.getIdToken();
      await axios.post(`/api/trade/close/${target.id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.warn("Backend trade close failed, kept local liquidation", err);
    }
  }, [optimisticTrades, balance, currentPrice]);

  // Hotkeys
  useEffect(() => {
    const handleKeyDown = async (e) => {
      // Cmd+K to open Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(true);
      }
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        handleFlashTrade();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlashTrade]);

  const handleAssetChange = (newAsset) => {
    const parts = newAsset.split(':');
    const cleanAsset = newAsset.includes(':') ? parts[parts.length - 1] : newAsset;
    setSelectedAsset(cleanAsset);
    setHighestSinceOpen(0); // Reset for Trailing SL
  }

  const handleCommandAction = (actionId, payload) => {
    switch (actionId) {
      case "performance": router.push("/performance"); break;
      case "portfolio": router.push("/portfolio"); break;
      case "split2": setSplitMode("2"); break;
      case "split4": setSplitMode("4"); break;
      case "splitoff": setSplitMode(null); break;
      case "theme": document.documentElement.classList.toggle("dark"); break;
      case "reset":
        if (user) {
          user.getIdToken().then(token => {
            axios.post("/api/user/reset", {}, { headers: { Authorization: `Bearer ${token}` } })
              .then(r => setBalance(Math.min(r.data.balance, 1000000)));
          });
        }
        break;
      case "selectAsset": handleAssetChange(payload); break;
    }
  };

  // Container Variants for Staggered Load
  const terminalVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 25 } }
  };

  const mainVariants = {
    hidden: { scale: 0.98, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] } }
  };

  const [isVibrating, setIsVibrating] = useState(false);
  const triggerHaptic = () => {
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 300);
  };

  // Modify handleFlashTrade to include haptic
  const baseFlashTrade = handleFlashTrade;
  const wrappedFlashTrade = async () => {
    triggerHaptic();
    await baseFlashTrade();
  };

  return (
    <motion.div
      suppressHydrationWarning={true}
      initial="hidden"
      animate="visible"
      variants={terminalVariants}
      className={`h-screen w-screen flex flex-col text-white overflow-hidden bg-[#020205] selection:bg-[#f0c040]/30 font-body ${isVibrating ? 'haptic-vibration' : ''}`}
    >
      {/* Row 1: Unified Header & Tickers (Global across the screen) */}
      {!zenMode && (
        <div className="flex-shrink-0 flex flex-col z-50">
          <motion.div
            variants={navVariants}
            className="px-6 py-3 border-b border-white/5 flex items-center justify-between gap-12 bg-black/60 backdrop-blur-2xl"
          >
            <div className="flex-shrink-0">
              <Navbar />
            </div>

            <div className="flex-1 max-w-2xl">
              <GrowwSearch onSelect={handleAssetChange} />
            </div>

            <div className="flex items-center gap-6 flex-shrink-0">
              <CurrencySelector />
            </div>
          </motion.div>

          {/* Desktop Tickers */}
          <div className="hidden md:flex flex-col border-b border-white/5 bg-[#080808]/90 backdrop-blur-md shadow-xl">
            <TopBarTicker />
            <MacroTicker />
          </div>
          {/* Mobile Ticker (Compact single row) */}
          <div className="flex md:hidden border-b border-white/5 bg-[#080808]/90 backdrop-blur-md shadow-xl h-8 items-center overflow-hidden">
            <TopBarTicker />
          </div>
        </div>
      )}

      {/* Row 2: Workspace (Viewport height minus header) */}
      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-[20%_55%_25%] overflow-hidden relative pb-16 md:pb-0 h-[calc(100vh-130px)] md:h-[calc(100vh-115px)]">
        {/* Scanline overlay for trade floor */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] scanlines z-10" />

        {/* COLUMN 1: WATCHLIST (Market Watch) - Dominant left sidebar */}
        <AnimatePresence>
          {!zenMode && (
            <motion.div
              variants={sidebarVariants}
              className={`${mobileTab === 'markets' ? 'flex h-[45%] md:h-full' : 'hidden'} md:flex flex-col border-r border-white/5 bg-[#020205]/80 overflow-hidden`}
            >
              <Watchlist
                onAssetSelect={handleAssetChange}
                onAction={(type, symbol) => { triggerHaptic(); handleAssetChange(symbol); }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* COLUMN 2: CENTRAL OPERATIONS MATRIX (Chart + Health Stats + Positions) */}
        <div className={`
          ${(mobileTab === 'markets' || mobileTab === 'vault') ? 'flex' : 'hidden'}
          md:flex flex-col gap-3 p-3 overflow-hidden h-full
        `}>
          {/* Top Panel: Interactive Chart */}
          <div className={`
            ${mobileTab === 'markets' ? 'flex flex-1 md:flex-[0.52]' : 'hidden'}
            md:flex min-h-[250px] md:min-h-[300px] glass-panel border-white/10 overflow-hidden shadow-2xl relative
          `}>
            <Chart
              selectedAsset={selectedAsset}
              onAssetSearch={handleAssetChange}
              slPrice={slPrice}
              tpPrice={tpPrice}
              setSlPrice={setSlPrice}
              setTpPrice={setTpPrice}
              splitMode={splitMode}
              onSplitChange={setSplitMode}
              setActiveInsight={setActiveInsight}
              activeTimeframe={activeTimeframe}
              setActiveTimeframe={setActiveTimeframe}
            />
          </div>

          {/* Middle Panel: Central Account Health Stats Grid */}
          {!zenMode && (
            <div className={`
              ${mobileTab === 'vault' ? 'flex h-[110px]' : 'hidden'}
              md:flex h-[110px] w-full flex-shrink-0 items-center justify-center
            `}>
              <StatsBar optimisticTrades={optimisticTrades} />
            </div>
          )}

          {/* Bottom Panel: Active Positions Engine */}
          <div className={`
            ${mobileTab === 'vault' ? 'flex flex-1' : 'hidden'}
            md:flex overflow-hidden glass-panel border-white/10 p-3 shadow-2xl flex-col
          `}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white mb-2 border-b border-white/5 pb-1.5 flex-shrink-0">
              Active Positions
            </h3>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <PositionEngine 
                trades={optimisticTrades} 
                currentPrice={currentPrice} 
              />
            </div>
          </div>
        </div>

        {/* COLUMN 3: TERMINAL & INTEL DESK (Order panel + News feed + AI Sentinel tabs) */}
        <AnimatePresence>
          {!zenMode && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 25 }}
              className={`
                ${mobileTab === 'trade' ? 'flex flex-col gap-3 p-3' : 'hidden'}
                md:flex md:flex-col gap-3 p-3 md:pl-0 overflow-hidden h-full
              `}
            >
              {/* Top Panel: Execution Terminal */}
              <div className="flex-[0.5] overflow-hidden glass-panel border-white/10 shadow-2xl">
                <OrderPanel
                  balance={balance}
                  setBalance={setBalance}
                  setOptimisticTrades={setOptimisticTrades}
                  selectedAsset={selectedAsset}
                  onAssetChange={handleAssetChange}
                  slPrice={slPrice}
                  tpPrice={tpPrice}
                  setSlPrice={setSlPrice}
                  setTpPrice={setTpPrice}
                  currentPrice={currentPrice}
                  isLocked={isLocked}
                  setActiveInsight={setActiveInsight}
                  lockTime={lockTime}
                  isTrailing={isTrailing}
                  setIsTrailing={setIsTrailing}
                  onTrade={triggerHaptic}
                  activeTimeframe={activeTimeframe}
                  setActiveTimeframe={setActiveTimeframe}
                />
              </div>

              {/* Middle Panel: Anchor News Feed (Stuck, scrollable internally) */}
              <div className="flex-[0.25] min-h-[140px] overflow-hidden shadow-2xl">
                <NewsFeed />
              </div>

              {/* Bottom Panel: Intel Tabs (Polymarket / AI Sentinel) */}
              <div className="flex-[0.25] min-h-[140px] shadow-2xl overflow-hidden glass-panel border-white/10 flex flex-col">
                <div className="flex border-b border-white/5 bg-[#04040A] flex-shrink-0">
                  <button
                    onClick={() => setRightActiveTab("polymarket")}
                    className={`flex-1 py-1.5 text-[8.5px] font-black uppercase tracking-widest transition-all ${
                      rightActiveTab === "polymarket"
                        ? "bg-white/5 text-[#D4AF37] border-b border-[#D4AF37]"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    Prediction Markets
                  </button>
                  <button
                    onClick={() => setRightActiveTab("sentinel")}
                    className={`flex-1 py-1.5 text-[8.5px] font-black uppercase tracking-widest transition-all ${
                      rightActiveTab === "sentinel"
                        ? "bg-white/5 text-[#D4AF37] border-b border-[#D4AF37]"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    Alpha AI Sentinel
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {rightActiveTab === "polymarket" ? (
                    <PolymarketPanel />
                  ) : (
                    <AlphaSentinel activeInsight={activeInsight} selectedAsset={selectedAsset} />
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Navigation Bar (Stick to bottom on screens < 768px) */}
      {!zenMode && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#04040A] border-t border-white/5 flex items-center justify-around z-[150] backdrop-blur-xl">
          <button
            onClick={() => { triggerHaptic(); setMobileTab("markets"); }}
            className={`flex flex-col items-center gap-1 transition-all py-2 px-4 ${mobileTab === 'markets' ? 'text-[#D4AF37]' : 'text-gray-500 hover:text-white'}`}
          >
            <Zap size={18} className={mobileTab === 'markets' ? 'text-[#D4AF37]' : 'text-gray-500'} />
            <span className="text-[9px] font-header font-black uppercase tracking-wider">Markets</span>
          </button>
          <button
            onClick={() => { triggerHaptic(); setMobileTab("trade"); }}
            className={`flex flex-col items-center gap-1 transition-all py-2 px-4 ${mobileTab === 'trade' ? 'text-[#D4AF37]' : 'text-gray-500 hover:text-white'}`}
          >
            <Activity size={18} className={mobileTab === 'trade' ? 'text-[#D4AF37]' : 'text-gray-500'} />
            <span className="text-[9px] font-header font-black uppercase tracking-wider">Trade</span>
          </button>
          <button
            onClick={() => { triggerHaptic(); setMobileTab("vault"); }}
            className={`flex flex-col items-center gap-1 transition-all py-2 px-4 ${mobileTab === 'vault' ? 'text-[#D4AF37]' : 'text-gray-500 hover:text-white'}`}
          >
            <Wallet size={18} className={mobileTab === 'vault' ? 'text-[#D4AF37]' : 'text-gray-500'} />
            <span className="text-[9px] font-header font-black uppercase tracking-wider">Vault</span>
          </button>
        </div>
      )}

      {/* Zen Mode Escape Alert */}
      <AnimatePresence>
        {zenMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-8 text-[11px] font-header font-black uppercase tracking-[0.4em] text-[#f0c040] glass-panel bg-black/50 px-6 py-3 rounded-none shadow-[0_0_40px_rgba(0,0,0,0.8)]"
          >
            Terminal Mode: Zen Alpha // [ESC] to Abort
          </motion.div>
        )}
      </AnimatePresence>

      <CommandBar
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onAction={handleCommandAction}
      />
    </motion.div>
  );
}
