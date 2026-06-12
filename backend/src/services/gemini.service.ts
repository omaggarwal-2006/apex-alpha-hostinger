import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

export class GeminiService {
  /**
   * Generates institutional grade financial trading news stories
   */
  static async generateNews(): Promise<any[]> {
    if (!GEMINI_API_KEY) {
      console.warn("[GeminiService] GEMINI_API_KEY not set. Using high-fidelity fallback.");
      return this.getNewsFallback();
    }

    try {
      const prompt = `
        Generate a JSON array of exactly 6 institutional-grade financial trading news stories.
        Each story object must have these exact fields:
        - id: number (1 to 6)
        - title: string (under 90 chars, uppercase, detailing market breakout, options sweeps, or whale blocks, e.g. "RELIANCE INDUSTRIES: Option Sweeps Ignite Momentum Breakout")
        - category: string ("STOCKS" or "MACRO" or "CRYPTO")
        - time: string (e.g. "2 mins ago", "15 mins ago", "1 hour ago")
        - impact: string (e.g. "HIGHLY BULLISH", "EXTREME BULLISH", "BULLISH BREAKOUT", "MODERATE BEARISH", "HIGH VOLATILITY", "ACCUMULATION PHASE")
        - impactPercent: string (e.g. "+3.5%", "-2.4%", "+1.8%")
        - color: string ("text-emerald-500" for bullish/breakout, "text-red-500" for bearish, "text-cyan-500" for macro breakout, "text-[#FFBF00]" for accumulation)
        - bgColor: string ("bg-emerald-500/10 border-emerald-500/20" for emerald, "bg-red-500/10 border-red-500/20" for red, "bg-cyan-500/10 border-cyan-500/20" for cyan, "bg-[#FFBF00]/10 border-[#FFBF00]/20" for yellow)
        - source: string (e.g. "Sovereign Feed", "Bloomberg Alpha", "Reuters Desk", "NSE Pulse")
        - summary: string (2-3 sentences. Detailed quantitative analysis mentioning support wicks, options gamma, option chains, or order book flow)
        - tacticalTip: string (1 sentence. Actionable trading advice for leveraged positions)

        Respond ONLY with a valid JSON array. Do not include markdown code block formatting (such as \`\`\`json). Just return the raw JSON text.
      `;

      const response = await axios.post(GEMINI_API_URL, {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      });

      const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return JSON.parse(text.trim());
    } catch (error) {
      console.error("[GeminiService] Error generating news:", error);
      return this.getNewsFallback();
    }
  }

  /**
   * Generates macro market ticker headlines
   */
  static async generateHeadlines(): Promise<any[]> {
    if (!GEMINI_API_KEY) {
      return this.getHeadlinesFallback();
    }

    try {
      const prompt = `
        Generate a JSON array of exactly 10 breaking macro financial headlines for a scrolling ticker.
        Each headline object must have these exact fields:
        - id: number (1 to 10)
        - text: string (e.g. "FED CHAIR POWELL: RATE PATH DEPENDENT ON INFLATION DATA TRENDS")
        - source: string (e.g. "REUTERS", "BLOOMBERG", "CNBC", "WSJ", "ECONOMIC TIMES")
        - impact: string ("HIGH" or "CRITICAL" or "MEDIUM")
        - sentiment: string ("BULLISH" or "BEARISH" or "NEUTRAL")

        Respond ONLY with a valid JSON array. Do not include markdown code block formatting (such as \`\`\`json). Just return the raw JSON text.
      `;

      const response = await axios.post(GEMINI_API_URL, {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      });

      const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return JSON.parse(text.trim());
    } catch (error) {
      console.error("[GeminiService] Error generating headlines:", error);
      return this.getHeadlinesFallback();
    }
  }

  /**
   * Generates real-time AI trade signal directive for a selected asset
   */
  static async generateAssetAnalysis(symbol: string, currentPrice: number): Promise<any> {
    if (!GEMINI_API_KEY) {
      return this.getAssetAnalysisFallback(symbol, currentPrice);
    }

    try {
      const prompt = `
        You are APEX AI Sovereign Guide, a high-performance quantitative trading assistant.
        Analyze the asset "${symbol}" currently trading at a market price of $${currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}.
        
        Generate a JSON object with these exact fields:
        - directive: string (e.g. "EXECUTION STRATEGY", "RISK MITIGATION", "MARKET ANOMALY DETECTION")
        - title: string (e.g. "LONG BREAKOUT TARGET", "SHORT FLUID LIQUIDITY SQUEEZE", "SUPPORT REJECTION PROBABLE")
        - text: string (2-3 sentences. Dynamic advice based on current price. Explain what whales are doing, key resistance levels, option chain telemetry, and how to set stops/targets)
        - confidence: string (percentage, e.g. "94.2%", "89.5%")
        - risk: string (e.g. "STABLE", "MODERATE", "HIGH RISK", "OPTIMAL LONG ENTRY")
        - color: string (hex color: "#00e676" for bullish, "#FF3131" for bearish, "#FFBF00" for warning, "#00FFFF" for support/anomaly)

        Respond ONLY with a valid JSON object. Do not include markdown code block formatting (such as \`\`\`json). Just return the raw JSON text.
      `;

      const response = await axios.post(GEMINI_API_URL, {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" }
      });

      const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return JSON.parse(text.trim());
    } catch (error) {
      console.error(`[GeminiService] Error generating asset analysis for ${symbol}:`, error);
      return this.getAssetAnalysisFallback(symbol, currentPrice);
    }
  }

  // --- FALLBACK ENGINES ---

  private static getNewsFallback(): any[] {
    return [
      {
        id: 1,
        title: "RELIANCE INDUSTRIES: Strategic Retail Expansion Drives Massive 3.5% Surge",
        category: "STOCKS",
        time: "2 mins ago",
        impact: "HIGHLY BULLISH",
        impactPercent: "+3.5%",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10 border-emerald-500/20",
        source: "NSE Pulse",
        summary: "Reliance Industries announced a series of strategic retail partnerships across major metropolitan nodes. Institutional buying limit orders clustered heavily around support zones, sparking a high-velocity momentum breakout.",
        tacticalTip: "Look for price to test the newly established support at $2,440. Whales are stacking asks at $2,500."
      },
      {
        id: 2,
        title: "NIFTY 50: Breaches Historical 22,500 Resistance on High-Volume Option Sweeps",
        category: "STOCKS",
        time: "15 mins ago",
        impact: "EXTREME BULLISH",
        impactPercent: "+1.8%",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10 border-emerald-500/20",
        source: "Bloomberg Alpha",
        summary: "Nifty 50 breached its critical psychological resistance wall at 22,500. Option chain telemetry indicates a major short-covering rally as retail call writers are forced to liquidate positions.",
        tacticalTip: "Avoid shorting the momentum. A retest of 22,480 is an optimal long continuation entry floor."
      },
      {
        id: 3,
        title: "CPI INFLATION: Cools Down to 2.8% Triggering Global Equity Buying Wave",
        category: "MACRO",
        time: "32 mins ago",
        impact: "BULLISH BREAKOUT",
        impactPercent: "+2.1%",
        color: "text-cyan-500",
        bgColor: "bg-cyan-500/10 border-cyan-500/20",
        source: "Reuters Desk",
        summary: "Global inflation cooling faster than consensus expectations has led to aggressive speculation of rate cuts. Whales are shifting capital from defensive bonds back into high-growth equities.",
        tacticalTip: "A high-beta stocks rally is underway. Leverage can be amplified moderately as risk floors stabilize."
      },
      {
        id: 4,
        title: "TATA MOTORS: Production Bottlenecks Lead to Short-Term Selling Pressure",
        category: "STOCKS",
        time: "1 hour ago",
        impact: "MODERATE BEARISH",
        impactPercent: "-2.4%",
        color: "text-red-500",
        bgColor: "bg-red-500/10 border-red-500/20",
        source: "NSE Pulse",
        summary: "Temporary supply chain constraints inside the microchip division have stalled delivery targets, triggering high-frequency algo sells. However, long-term buy orders remain active.",
        tacticalTip: "Wait for the sell volume to dissipate before evaluating fresh buy triggers."
      },
      {
        id: 5,
        title: "BITCOIN: Whales Sweep Active Sell Walls at $64,000 as Halving Looming",
        category: "CRYPTO",
        time: "2 hours ago",
        impact: "HIGH VOLATILITY",
        impactPercent: "+4.8%",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10 border-emerald-500/20",
        source: "Sovereign Feed",
        summary: "Over $120M in short liquidations cascade as Bitcoin price rockets past $64,200. Order book analytics show massive spot buying blocks from spot ETF custodians.",
        tacticalTip: "Keep tight stops on short leverages. Margin squeeze levels are highly sensitive at $65k."
      },
      {
        id: 6,
        title: "HDFC BANK: Foreign Institutional Investors (FII) Absorb Heavy Sell blocks",
        category: "STOCKS",
        time: "3 hours ago",
        impact: "ACCUMULATION PHASE",
        impactPercent: "+0.8%",
        color: "text-[#FFBF00]",
        bgColor: "bg-[#FFBF00]/10 border-[#FFBF00]/20",
        source: "Bloomberg Alpha",
        summary: "FII blocks have absorbed large selling pressure from domestic retail accounts. FII accumulation implies a strong conviction floor is being established for a medium-term bull rally.",
        tacticalTip: "Accumulate along the channel to coordinate with institutional positioning."
      }
    ];
  }

  private static getHeadlinesFallback(): any[] {
    return [
      { id: 1, text: "FED CHAIR POWELL: INFLATION REMAINS ELEVATED, RATE PATH DEPENDENT ON DATA", source: "REUTERS", impact: "HIGH", sentiment: "BEARISH" },
      { id: 2, text: "SEC APPROVES SPOT ETHEREUM ETF — TRADING TO BEGIN NEXT WEEK", source: "BLOOMBERG", impact: "CRITICAL", sentiment: "BULLISH" },
      { id: 3, text: "JAPAN BOJ INTERVENES IN FX MARKET TO SUPPORT WEAK YEN AT ¥158", source: "WSJ", impact: "HIGH", sentiment: "BEARISH" },
      { id: 4, text: "US NON-FARM PAYROLLS BEAT EXPECTATIONS: 275K VS 200K EST — DOLLAR SPIKES", source: "CNBC", impact: "HIGH", sentiment: "BULLISH" },
      { id: 5, text: "OPEC+ EXTENDS VOLUNTARY OIL OUTPUT CUTS THROUGH Q3 2025", source: "FT", impact: "MEDIUM", sentiment: "BULLISH" },
      { id: 6, text: "CHINA PMI MANUFACTURING FALLS TO 47.8, WEAKEST IN 18 MONTHS", source: "XINHUA", impact: "HIGH", sentiment: "BEARISH" },
      { id: 7, text: "BITCOIN BREAKS $100K AS INSTITUTIONAL INFLOWS HIT RECORD $2.4B IN ONE WEEK", source: "COINDESK", impact: "CRITICAL", sentiment: "BULLISH" },
      { id: 8, text: "RBI HOLDS REPO RATE AT 6.5%, MAINTAINS WITHDRAWAL OF ACCOMMODATION STANCE", source: "MINT", impact: "MEDIUM", sentiment: "NEUTRAL" },
      { id: 9, text: "US 10Y TREASURY YIELD SURGES TO 4.8% — EQUITY MARKETS PRESSURED", source: "BARCLAYS", impact: "HIGH", sentiment: "BEARISH" },
      { id: 10, text: "NIFTY 50 HITS ALL-TIME HIGH ON FII INFLOWS AND STRONG EARNINGS", source: "ECONOMIC TIMES", impact: "HIGH", sentiment: "BULLISH" },
    ];
  }

  private static getAssetAnalysisFallback(symbol: string, currentPrice: number): any {
    const isCrypto = symbol.includes('USD') || symbol.includes('BTC') || symbol.includes('ETH') || symbol.includes('SOL');
    const isNse = symbol === 'RELIANCE' || symbol === 'TCS' || symbol === 'HDFC BANK' || symbol === 'INFOSYS';
    
    let directive = "EXECUTION STRATEGY";
    let title = "POSITION RISK ASSISTANCE";
    let text = `You are evaluating ${symbol} at $${currentPrice.toLocaleString()}. The orderbook indicates stable bid depth. Set your stop loss below recent swing lows to manage risk.`;
    let confidence = "92.5%";
    let risk = "MODERATE";
    let color = "#FFBF00";

    if (isCrypto) {
      directive = "CRYPTO ASSET SENSING";
      title = "HIGH VOLATILITY MOVEMENT";
      text = `Sovereign data indicates crypto derivative volumes for ${symbol} are spiking at $${currentPrice.toLocaleString()}. Liquidation maps indicate heavy leverage on longs. Trailing stop protection is recommended.`;
      confidence = "95.2%";
      risk = "HIGH LIQUIDITY RISK";
      color = "#FF3131";
    } else if (isNse) {
      directive = "NSE SECTOR ACCUMULATION";
      title = "INSTITUTIONAL BUYWALL SENSE";
      text = `${symbol} is showing options call writer short-covering at $${currentPrice.toLocaleString()}. Option chain delta suggests strong structural support. Long entries on retests are highly probable.`;
      confidence = "94.8%";
      risk = "OPTIMAL ENTRY";
      color = "#00e676";
    } else if (symbol.toUpperCase().includes('GOLD') || symbol.toUpperCase().includes('XAU')) {
      directive = "BULLION SAFE HAVEN";
      title = "COMMODITY RESERVES REJECTION";
      text = `Bullion buying locks around $${currentPrice.toLocaleString()} indicate geopolitical hedging blocks. Resistance is visible near previous daily high. Rejection at target values is probable.`;
      confidence = "91.2%";
      risk = "STABLE";
      color = "#00FFFF";
    }

    return { directive, title, text, confidence, risk, color };
  }
}
