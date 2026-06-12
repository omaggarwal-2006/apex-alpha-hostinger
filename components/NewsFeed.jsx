"use client";
import { useState, useEffect } from "react";
import { Newspaper, ChevronRight, Award, Globe, Loader2, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

const SIMULATED_TEMPLATES = [
  {
    category: "MACRO",
    titles: [
      "FED Rate Cut Speculations Rise After Core CPI Drop",
      "US Treasury Yields Flatline Amid Inflation Concerns",
      "ECB Signals Readiness to Adjust Policy Rates Next Month",
      "Retail Sales Outperform Expectations in Key G7 Economies"
    ],
    summaries: [
      "Macroeconomic indicators suggest a potential 25 bps rate cut in the upcoming FOMC meeting, driving global equity indices to historic highs.",
      "Yield curve changes prompt asset managers to reallocate capital to commodity vault reserves as stability becomes key focus.",
      "Presidential press briefing hints at tax restructuring that could impact multi-national corporations' capital allocation strategy.",
      "Consumer spending resilience suggests stronger GDP growth numbers in Q3, complicating near-term interest rate trajectory forecasts."
    ],
    impacts: ["+1.42%", "+0.85%", "-0.34%", "+2.11%"],
    sources: ["Gemini Financial", "Reuters Synth", "Bloomberg Terminal"]
  },
  {
    category: "CRYPTO",
    titles: [
      "Binance Liquidates $400M in Leveraged Crypto Shorts",
      "Institutional Inflows into Bitcoin Vaults Hit Record Highs",
      "Ethereum Spot Volume Surges Ahead of Shanghai Protocol Update",
      "Solana Network Activity Reaches All-Time High on Dex Volume"
    ],
    summaries: [
      "Market-wide short squeeze triggers rapid acceleration in BTC-USD beyond the primary $69,000 resistance level.",
      "Exchange reserves hit multi-year lows as long-term holders move digital assets into offline cold storage and private vaults.",
      "Smart contract deployments grow by 42% week-over-week, indicating strong developer retention despite volatile pricing.",
      "High-throughput transaction processing rates reduce network latency to under 400ms, beating previous records."
    ],
    impacts: ["+5.82%", "+3.24%", "+1.95%", "+4.88%"],
    sources: ["Gemini Sentinel", "CoinDesk Core", "Blockworks Intel"]
  },
  {
    category: "VANTAGE IB",
    titles: [
      "Vantage Introduces Direct Clearing For Ultra-HNW Segment",
      "Apex Alpha Partner Node Integrates Vantage Liquidity Pools",
      "Record Volumes Reported in Apex Alpha Sovereign Elite Tiers",
      "Institutional Vantage IB Portal Launches New Risk Auditing API"
    ],
    summaries: [
      "High-net-worth client onboarding speeds increase by 300% under the new unified Introducing Broker framework.",
      "Sub-millisecond trade execution latency achieved across BTC, Nifty, and Gold CFD markets.",
      "Multi-million dollar trade ledger audit successfully completed locally inside sovereign client sandboxes.",
      "Vanguard risk protocols upgraded to allow 200x leverage structures with custom stop-loss guards."
    ],
    impacts: ["+2.89%", "+1.45%", "+4.12%", "+3.10%"],
    sources: ["Vantage Press Room", "Apex Alpha Newsroom"]
  }
];

function generateRandomStory() {
  const template = SIMULATED_TEMPLATES[Math.floor(Math.random() * SIMULATED_TEMPLATES.length)];
  const title = template.titles[Math.floor(Math.random() * template.titles.length)];
  const summary = template.summaries[Math.floor(Math.random() * template.summaries.length)];
  const impactPercent = template.impacts[Math.floor(Math.random() * template.impacts.length)];
  const source = template.sources[Math.floor(Math.random() * template.sources.length)];
  
  return {
    id: `sim-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    category: template.category,
    title,
    summary,
    impactPercent,
    source,
    time: "JUST NOW",
    tacticalTip: "Position size calibration recommended for active specualtion."
  };
}

function getSimulatedStories() {
  return Array.from({ length: 6 }).map((_, i) => {
    const story = generateRandomStory();
    const times = ["2M AGO", "5M AGO", "12M AGO", "24M AGO", "1H AGO", "3H AGO"];
    story.time = times[i] || `${i * 10}M AGO`;
    return story;
  });
}

export default function NewsFeed() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStories = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await axios.get("/api/market/news");
      let dataList = Array.isArray(res.data) ? res.data : [];
      if (dataList.length === 0) {
        dataList = getSimulatedStories();
      }
      setStories(dataList);
    } catch (err) {
      console.error("Failed to fetch news feed, using fallback", err);
      setStories(getSimulatedStories());
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStories();
    
    // Periodically insert new simulated breaking news to keep wire alive
    const interval = setInterval(() => {
      setStories(prev => {
        const newStory = generateRandomStory();
        return [newStory, ...prev.slice(0, 9)];
      });
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-black/40 border border-white/5 rounded-lg overflow-hidden relative font-mono">
      {/* Top Telemetry Header */}
      <div className="p-3 border-b border-white/5 bg-black/60 flex justify-between items-center flex-shrink-0">
        <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-500 flex items-center gap-2">
          <Newspaper size={12} className="text-[#D4AF37]" /> Gemini News Wire
        </h3>
        <button
          onClick={() => fetchStories(true)}
          disabled={refreshing}
          className="text-gray-600 hover:text-white transition-colors disabled:opacity-30"
          title="Force Hot Refresh"
        >
          <RefreshCw size={10} className={refreshing ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Stories list with locked internal scrollbar */}
      <div className="flex-1 overflow-y-scroll custom-scrollbar p-3 flex flex-col gap-2.5">
        {loading ? (
          <div className="h-full w-full flex flex-col items-center justify-center gap-2 py-12">
            <Loader2 className="animate-spin text-[#D4AF37]" size={16} />
            <span className="text-[8px] text-gray-600 uppercase tracking-widest font-black">Syncing Satellites...</span>
          </div>
        ) : stories.length === 0 ? (
          <div className="py-12 text-center text-gray-600 text-[10px] uppercase font-black">No feeds active.</div>
        ) : (
          stories.map((story) => {
            const isBullish = story.impactPercent && story.impactPercent.startsWith("+");
            return (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="p-3 bg-white/[0.01] hover:bg-white/[0.03] border border-white/5 hover:border-[#D4AF37]/30 transition-all cursor-pointer flex flex-col gap-1.5 relative group"
              >
                {/* Accent line */}
                <div className={`absolute left-0 top-0 bottom-0 w-0.5 transition-all ${isBullish ? "bg-[#00FF41]" : "bg-[#FF3131]"}`} />
                
                <div className="flex justify-between items-center text-[7.5px] font-bold">
                  <span className="text-[#D4AF37] uppercase tracking-wider font-black">{story.category}</span>
                  <div className="flex items-center gap-1 text-gray-600 font-mono">
                    <span>{story.time || "JUST NOW"}</span>
                    <span>·</span>
                    <span className={isBullish ? "text-[#00FF41]" : "text-[#FF3131]"}>
                      {story.impactPercent || "VOLATILE"}
                    </span>
                  </div>
                </div>

                <h4 className="text-[10.5px] font-bold text-white group-hover:text-[#D4AF37] transition-colors leading-tight uppercase font-['Inter']">
                  {story.title}
                </h4>

                <p className="text-[9px] text-gray-500 leading-normal line-clamp-2 font-mono">
                  {story.summary}
                </p>

                <div className="flex justify-between items-center text-[7px] text-gray-700 uppercase font-mono mt-1 pt-1.5 border-t border-white/5">
                  <span>Source: {story.source}</span>
                  <span className="text-[#D4AF37] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    READ <ChevronRight size={8} />
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Inline Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#020205]/95 z-50 p-4 flex flex-col justify-between font-mono border border-[#D4AF37]/30 animate-fade-in"
          >
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 pr-1">
              <div className="flex justify-between items-start border-b border-white/5 pb-2">
                <div>
                  <span className="text-[8px] text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-1.5 py-0.5 uppercase tracking-wider font-black rounded-sm">
                    {selectedStory.category}
                  </span>
                  <h3 className="text-[11px] font-bold text-white uppercase mt-2 font-['Inter'] leading-snug">
                    {selectedStory.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[7.5px] text-gray-500">
                <p>FEED: <span className="text-white font-bold">{selectedStory.source}</span></p>
                <p>TIME: <span className="text-white font-bold">{selectedStory.time}</span></p>
                <p>IMPACT: <span className={selectedStory.impactPercent?.startsWith("+") ? "text-[#00FF41] font-bold" : "text-[#FF3131] font-bold"}>{selectedStory.impactPercent}</span></p>
              </div>

              <p className="text-[9.5px] text-gray-300 leading-relaxed bg-black/40 border border-white/5 p-2.5 rounded">
                {selectedStory.summary}
              </p>

              {selectedStory.tacticalTip && (
                <div className="border-t border-[#D4AF37]/10 pt-2.5 flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-[8.5px] text-[#D4AF37] font-black">
                    <Award size={10} />
                    <span>TACTICAL INTEL</span>
                  </div>
                  <p className="text-[8.5px] text-gray-400 leading-relaxed italic bg-[#D4AF37]/2 border border-[#D4AF37]/10 p-2 rounded">
                    "{selectedStory.tacticalTip}"
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/5 mt-3 flex gap-2">
              <button
                onClick={() => {
                  toast.success("Impact simulation analysis triggered!");
                  setSelectedStory(null);
                }}
                className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[8px] font-black uppercase tracking-wider transition-all"
              >
                Simulate
              </button>
              <button
                onClick={() => setSelectedStory(null)}
                className="flex-1 py-2 bg-[#D4AF37] hover:brightness-110 text-black text-[8px] font-black uppercase tracking-wider transition-all"
              >
                Close Wire
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
