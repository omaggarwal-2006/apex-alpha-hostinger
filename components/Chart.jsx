"use client";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import { Search, LayoutTemplate, Grid2X2, Square } from "lucide-react";

// ─── Symbol Resolver ──────────────────────────────────────────
const SYMBOL_MAP = {
  'BTC-USD': 'BINANCE:BTCUSDT', 'BITCOIN USD': 'BINANCE:BTCUSDT',
  'ETH-USD': 'BINANCE:ETHUSDT', 'ETHEREUM USD': 'BINANCE:ETHUSDT',
  'SOL-USD': 'BINANCE:SOLUSDT', 'SOLANA USD': 'BINANCE:SOLUSDT',
  'AAPL': 'NASDAQ:AAPL', 'APPLE': 'NASDAQ:AAPL',
  'TSLA': 'NASDAQ:TSLA', 'TESLA': 'NASDAQ:TSLA',
  'NVDA': 'NASDAQ:NVDA', 'NVIDIA': 'NASDAQ:NVDA',
  'MSFT': 'NASDAQ:MSFT', 'GOOGL': 'NASDAQ:GOOGL', 'AMZN': 'NASDAQ:AMZN',
  'NIFTY 50': 'NSE:NIFTY', 'BANK NIFTY': 'NSE:BANKNIFTY',
  'NIFTY BANK': 'NSE:BANKNIFTY', 'RELIANCE': 'NSE:RELIANCE',
  'RELIANCE INDUSTRIES LTD': 'NSE:RELIANCE', 'TCS': 'NSE:TCS',
  'HDFC BANK': 'NSE:HDFCBANK', 'INFOSYS': 'NSE:INFY',
  'NASDAQ 100': 'NASDAQ:NDX', 'S&P 500': 'AMEX:SPY',
  'CRUDE OIL': 'OANDA:WTICOUSD', 'CRUDE': 'OANDA:WTICOUSD',
  'GOLD': 'OANDA:XAUUSD', 'GOLD JUN 26': 'OANDA:XAUUSD', 'GC=F': 'OANDA:XAUUSD',
  'USD/INR': 'OANDA:USDINR'
};

function mapToTVSymbol(asset) {
  if (!asset) return 'BINANCE:BTCUSDT';
  const clean = asset.toUpperCase().trim();
  if (SYMBOL_MAP[clean]) return SYMBOL_MAP[clean];
  if (SYMBOL_MAP[asset]) return SYMBOL_MAP[asset];
  if (clean.includes(':')) return clean;
  if (clean.endsWith('.NS')) return `NSE:${clean.replace('.NS', '')}`;
  if (['BTC','ETH','SOL','DOGE','ADA','XRP','USDT'].some(c => clean.includes(c))) {
    const raw = clean.replace(/[-_]/g, '');
    if (raw.endsWith('USD')) return `BINANCE:${raw}T`;
    if (!raw.endsWith('USDT')) return `BINANCE:${raw}USDT`;
    return `BINANCE:${raw}`;
  }
  if (clean === 'NIFTY' || clean === 'NIFTY50') return 'NSE:NIFTY';
  if (clean === 'BANKNIFTY') return 'NSE:BANKNIFTY';
  if (clean === 'SPY' || clean === 'SPX' || clean === 'S&P 500') return 'AMEX:SPY';
  if (clean === 'QQQ' || clean === 'NASDAQ') return 'NASDAQ:QQQ';
  if (clean.length === 6 && ['EUR','GBP','USD','AUD','NZD','CAD','CHF'].some(c => clean.startsWith(c)))
    return `OANDA:${clean}`;
  if (clean.length >= 2 && clean.length <= 5) return `NASDAQ:${clean}`;
  return `OANDA:${clean.replace(/[-/]/g, '')}`;
}

const TF_INTERVAL = { '1m': '1', '5m': '5', '15m': '15', '1h': '60', '4h': '240', '1D': 'D' };

// ─── Single TradingView Pane ──────────────────────────────────
function TVPane({ id, symbol, interval = '15', scriptLoaded, compact = false }) {
  const containerRef = useRef(null);
  const widgetRef    = useRef(null);
  const prevSymbolRef = useRef(symbol);
  const prevIntervalRef = useRef(interval);

  useEffect(() => {
    if (!scriptLoaded || !window.TradingView || !containerRef.current) return;
    
    // Only construct if not already constructed
    if (!widgetRef.current) {
      containerRef.current.innerHTML = '';
      widgetRef.current = new window.TradingView.widget({
        autosize:          true,
        symbol:            mapToTVSymbol(symbol),
        interval,
        timezone:          'exchange',
        theme:             'dark',
        style:             '1',
        locale:            'en',
        toolbar_bg:        '#050505',
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        backgroundColor:   '#050505',
        gridColor:         'rgba(212,175,55,0.03)',
        container_id:      id,
      });
      prevSymbolRef.current = symbol;
      prevIntervalRef.current = interval;
    }
  }, [scriptLoaded, id]);

  // Update symbol / interval without recreating widget
  useEffect(() => {
    if (!widgetRef.current || !scriptLoaded) return;
    const tvSymbol = mapToTVSymbol(symbol);
    if (symbol !== prevSymbolRef.current || interval !== prevIntervalRef.current) {
      try {
        if (widgetRef.current.ready) {
          widgetRef.current.ready(() => {
            try {
              widgetRef.current.setSymbol(tvSymbol, interval);
            } catch (err) {
              console.warn("setSymbol ready callback error", err);
            }
          });
        } else {
          widgetRef.current.setSymbol(tvSymbol, interval);
        }
        prevSymbolRef.current = symbol;
        prevIntervalRef.current = interval;
      } catch (err) {
        console.warn("setSymbol failed, attempting recreation", err);
        try {
          containerRef.current.innerHTML = '';
          widgetRef.current = new window.TradingView.widget({
            autosize:          true,
            symbol:            tvSymbol,
            interval,
            timezone:          'exchange',
            theme:             'dark',
            style:             '1',
            locale:            'en',
            toolbar_bg:        '#050505',
            enable_publishing: false,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            backgroundColor:   '#050505',
            gridColor:         'rgba(212,175,55,0.03)',
            container_id:      id,
          });
          prevSymbolRef.current = symbol;
          prevIntervalRef.current = interval;
        } catch (recreateErr) {
          console.error("Widget recreation failed", recreateErr);
        }
      }
    }
  }, [symbol, interval, scriptLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
      widgetRef.current = null;
    };
  }, []);

  return <div id={id} ref={containerRef} className="w-full h-full bg-[#050505]" />;
}

// ─── Split Pane Symbol Header ─────────────────────────────────
function PaneHeader({ symbol, onSymbolChange, paneIdx }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(symbol);
  const commit = () => { if (val.trim()) onSymbolChange(val.trim().toUpperCase()); setEditing(false); };
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex items-center gap-2 px-2 py-1 bg-black/60 backdrop-blur-xl border-b border-white/5">
      <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest">Pane {paneIdx + 1}</span>
      {editing ? (
        <input autoFocus value={val} onChange={e => setVal(e.target.value)}
          onBlur={commit}
          onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false); }}
          className="text-[10px] font-mono font-black text-white bg-transparent border-b border-[#D4AF37] outline-none w-24 px-0.5" />
      ) : (
        <button onClick={() => setEditing(true)}
          className="text-[10px] font-mono font-black text-[#D4AF37] hover:text-white transition-colors">
          {symbol}
        </button>
      )}
    </div>
  );
}

// ─── Main Chart Component ─────────────────────────────────────
export default function Chart({
  selectedAsset,
  onAssetSearch,
  slPrice,
  tpPrice,
  setSlPrice,
  setTpPrice,
  splitMode,
  onSplitChange,
  setActiveInsight = () => {},
  activeTimeframe = '15m',
  setActiveTimeframe = () => {},
}) {
  const chartAreaRef  = useRef(null);
  const widgetRef     = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [searchInput, setSearchInput]   = useState('');
  const [slY, setSlY] = useState(450);
  const [tpY, setTpY] = useState(150);
  const [paneSymbols, setPaneSymbols]   = useState(['BTC-USD', 'Nifty 50', 'ETH-USD', 'Bank Nifty']);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const interval = TF_INTERVAL[activeTimeframe] ?? '15';

  // Sync pane[0] when selectedAsset changes
  useEffect(() => {
    setPaneSymbols(prev => { const n = [...prev]; n[0] = selectedAsset; return n; });
  }, [selectedAsset]);

  // Sync TP/SL prices from Y positions
  const calculatePrice = (y) => (80000 - (y / 600) * 20000).toFixed(2);
  useEffect(() => { setSlPrice(calculatePrice(slY)); }, [slY, setSlPrice]);
  useEffect(() => { setTpPrice(calculatePrice(tpY)); }, [tpY, setTpPrice]);

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    onAssetSearch(searchInput.trim().toUpperCase());
    setSearchInput('');
  };

  return (
    <div className="bento-card border-[#1a1a1a] flex flex-col relative overflow-hidden w-full" style={{ height: isMobile ? '40vh' : (splitMode === '4' ? 620 : 600) }}>
      <Script src="https://s3.tradingview.com/tv.js" strategy="lazyOnload" onLoad={() => setScriptLoaded(true)} />

      {/* Draggable TP/SL lines — only in single mode */}
      {!splitMode && (
        <div ref={chartAreaRef} className="absolute inset-0 z-30 pointer-events-none">
          <motion.div
            drag="y"
            dragConstraints={chartAreaRef}
            onDrag={(_, info) => chartAreaRef.current && setTpY(info.point.y - chartAreaRef.current.getBoundingClientRect().top)}
            style={{ top: tpY }}
            className="absolute left-0 w-full h-[2px] bg-[#00FF94]/40 shadow-[0_0_10px_rgba(0,255,148,0.5)] cursor-ns-resize pointer-events-auto flex items-center justify-end pr-4"
          >
            <div className="bg-[#00FF94] text-black text-[9px] font-black px-2 py-0.5 rounded-l-md uppercase tracking-widest shadow-lg">
              TP: ${tpPrice}
            </div>
          </motion.div>
          <motion.div
            drag="y"
            dragConstraints={chartAreaRef}
            onDrag={(_, info) => chartAreaRef.current && setSlY(info.point.y - chartAreaRef.current.getBoundingClientRect().top)}
            style={{ top: slY }}
            className="absolute left-0 w-full h-[2px] bg-[#FF3131]/40 shadow-[0_0_10px_rgba(255,49,49,0.5)] cursor-ns-resize pointer-events-auto flex items-center justify-end pr-4"
          >
            <div className="bg-[#FF3131] text-white text-[9px] font-black px-2 py-0.5 rounded-l-md uppercase tracking-widest shadow-lg">
              SL: ${slPrice}
            </div>
          </motion.div>
        </div>
      )}

      {/* Gold circuit top line */}
      {!splitMode && <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/50 shadow-[0_0_10px_#D4AF37] z-40 pointer-events-none" />}

      {/* Top toolbar */}
      <div className={`p-3 border-b border-[#1a1a1a] flex items-center gap-3 bg-black/40 backdrop-blur-xl relative z-20 ${splitMode ? 'h-11' : ''}`}>
        {!splitMode && (
          <>
            {/* Symbol search */}
            <div className="relative flex-1 max-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={13} />
              <input
                placeholder="Symbol (BTC, NIFTY, GOLD…)"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="w-full bg-black/40 border border-white/10 py-2 pl-9 pr-4 rounded-xl focus:outline-none focus:border-[#D4AF37]/50 text-xs text-white placeholder-gray-700 transition-all font-bold backdrop-blur-md"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#D4AF37] hover:brightness-110 text-black font-black py-2 px-4 rounded-xl transition-all text-[10px] uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              Load
            </button>

            {/* Timeframe selector */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-lg">
              {Object.keys(TF_INTERVAL).map(tf => (
                <button
                  key={tf}
                  onClick={() => setActiveTimeframe(tf)}
                  className={`px-2 py-1 rounded text-[9px] font-mono font-bold border transition-all ${activeTimeframe === tf ? 'bg-[#FFBF00]/10 text-[#FFBF00] border-[#FFBF00] shadow-[0_0_8px_rgba(255,191,0,0.5)]' : 'text-gray-500 border-transparent hover:text-white hover:border-white/10'}`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </>
        )}

        {splitMode && (
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 flex-1">
            {splitMode === '2' ? '2-Chart Split' : '4-Chart Grid'} · Click symbol to change
          </span>
        )}

        {/* Split mode toggles */}
        <div className="flex items-center gap-1 ml-auto">
          {[
            { mode: null,  Icon: Square,         title: 'Single' },
            { mode: '2',   Icon: LayoutTemplate, title: '2-split' },
            { mode: '4',   Icon: Grid2X2,        title: '4-split' },
          ].map(({ mode, Icon, title }) => (
            <button key={title} title={title} onClick={() => onSplitChange(mode)}
              className={`p-1.5 rounded-lg transition-all ${splitMode === mode ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'text-gray-600 hover:text-white hover:bg-white/5'}`}>
              <Icon size={13} />
            </button>
          ))}
        </div>
      </div>

      {/* Chart body */}
      <div className="flex-1 relative overflow-hidden bg-[#020205]">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        {!splitMode ? (
          <TVPane
            key={`main-${selectedAsset}-${interval}`}
            id="tv_chart_main"
            symbol={selectedAsset}
            interval={interval}
            scriptLoaded={scriptLoaded}
          />
        ) : splitMode === '2' ? (
          <div className="grid grid-cols-2 h-full gap-0.5 bg-[#111]">
            {paneSymbols.slice(0, 2).map((sym, i) => (
              <div key={i} className="relative bg-[#020205]">
                <PaneHeader symbol={sym} paneIdx={i} onSymbolChange={s => setPaneSymbols(p => { const n=[...p]; n[i]=s; return n; })} />
                <div className="w-full h-full pt-7">
                  <TVPane key={`pane-${i}-${sym}-${interval}`} id={`tv_pane_${i}`} symbol={sym} interval={interval} scriptLoaded={scriptLoaded} compact />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 grid-rows-2 h-full gap-0.5 bg-[#111]">
            {paneSymbols.map((sym, i) => (
              <div key={i} className="relative bg-[#020205]">
                <PaneHeader symbol={sym} paneIdx={i} onSymbolChange={s => setPaneSymbols(p => { const n=[...p]; n[i]=s; return n; })} />
                <div className="w-full h-full pt-7">
                  <TVPane key={`pane-${i}-${sym}-${interval}`} id={`tv_pane_${i}`} symbol={sym} interval={interval} scriptLoaded={scriptLoaded} compact />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
