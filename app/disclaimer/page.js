"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle, HelpCircle, Activity } from "lucide-react";

export default function FinancialDisclaimerPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white flex flex-col font-body selection:bg-[#f0c040]/30 overflow-y-auto relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] scanlines z-0" />
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-red-950/5 rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* Navbar */}
      <div className="px-8 py-4 border-b border-white/5 bg-black/60 backdrop-blur-2xl z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-[900px] w-full mx-auto p-6 md:p-12 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-10"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="border-b border-white/5 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-red-500/30 bg-red-500/5 text-red-400 text-[10px] font-mono tracking-[0.3em] uppercase mb-4 rounded-sm">
              <ShieldAlert size={10} /> Risk Warning & Advisory Disclosure
            </div>
            <h1 className="text-3xl md:text-5xl font-header font-black tracking-tighter uppercase glow-gold text-white">
              Financial Disclaimer
            </h1>
            <p className="text-gray-500 font-mono text-[11px] uppercase tracking-widest mt-2">
              COMPLIANCE CLASSIFICATION: PROTOCOL // NOT INVESTMENT ADVICE
            </p>
          </motion.div>

          {/* Critical Danger Warning Banner */}
          <motion.div
            variants={itemVariants}
            className="border border-red-500/30 bg-red-500/5 p-6 flex items-start gap-4 shadow-[0_0_20px_rgba(239,68,68,0.05)]"
          >
            <AlertTriangle size={24} className="text-red-500 shrink-0 mt-1" />
            <div className="space-y-1">
              <h4 className="text-[11px] font-header font-black text-red-500 uppercase tracking-widest">▲ MAXIMUM RISK TELEMETRY WARNING</h4>
              <p className="text-[10px] text-gray-400 font-mono leading-relaxed">
                Speculative financial assets (including equities, option contracts, margin products, and cryptocurrencies) contain extreme risk parameters. Leverage can accelerate equity drawdown rapidly. You must never trade with capital you cannot afford to lose.
              </p>
            </div>
          </motion.div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="glass-panel p-6 border border-white/5 bg-black/40 flex items-start gap-4">
              <HelpCircle size={18} className="text-red-400 mt-1 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider mb-1">NO ADVISORY</h4>
                <p className="text-[9px] text-gray-500 font-mono leading-relaxed">None of the telemetry insights are financial suggestions.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-6 border border-red-500/20 bg-red-500/2 flex items-start gap-4">
              <Activity size={18} className="text-red-400 mt-1 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider mb-1">NO PROFIT GUARANTEES</h4>
                <p className="text-[9px] text-gray-400 font-mono leading-relaxed">Simulated success coordinates carry zero real brokerage outcome correlations.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-6 border border-white/5 bg-black/40 flex items-start gap-4">
              <ShieldAlert size={18} className="text-red-400 mt-1 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider mb-1">USER RESPONSIBLE</h4>
                <p className="text-[9px] text-gray-500 font-mono leading-relaxed">You hold absolute accountability for all live capital executions elsewhere.</p>
              </div>
            </motion.div>
          </div>

          {/* Detailed Copy */}
          <motion.div variants={itemVariants} className="glass-panel p-8 border border-white/5 bg-black/40 space-y-8 text-[11px] text-gray-400 font-mono leading-relaxed">
            
            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">1.0 SOFTWARE AND SIMULATION LIMITATION</h3>
              <p>
                APEX ALPHA is exclusively a financial technology simulator and quantitative analysis software package. Under no circumstances should any virtual transaction, position clearing, cash calculation, quest XP rank, or leaderboard statistic on this platform be interpreted as real brokerage activity, live-market execution, or cash deposits. All platform algorithms run locally in your client environment.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">2.0 NO FINANCIAL ADVISORY</h3>
              <p>
                The developer syndicate, founders, and contributors of APEX ALPHA are software engineering specialists and quantitative analysts—not registered investment advisors (RIAs), certified financial planners (CFPs), commodity trading advisors (CTAs), or registered broker-dealers. 
              </p>
              <p>
                Any heuristic data generated by the Sentinel Engine, support/resistance line plotting, or automated feedback logs provided in the AI AuditMentorship room are engineered strictly to demonstrate mathematical statistics and behavioral rules. None of these telemetry components constitute financial, legal, tax, or investment advice.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">3.0 SIMULATION VS. LIVE BROKERAGE REALITIES</h3>
              <p>
                Virtual simulation results have absolute structural limitations:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Simulated execution lacks the real-world variables of slippage, partial fills, broker commission fees, market impact, exchange-level latency variance, and order book queue priority.</li>
                <li>Favorable coordinates obtained in a paper trading sandbox do not correlate to, nor guarantee, successful executions in a live-capital brokerage environment.</li>
                <li>Any trade grades (A+ to F) generated by our Forensic Audit modules are descriptive behavioral metrics, not predictive indicators of profit.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">4.0 HIGH-RISK DISCLOSURE</h3>
              <p>
                Trading real equities, derivatives, leveraged options, futures, and digital assets is highly speculative and presents extreme levels of risk. You may lose all of your initial capital. By using APEX ALPHA, you agree that you are fully aware of these parameters and that any live trading you execute outside of this software is done entirely at your own risk.
              </p>
            </section>

          </motion.div>

          {/* Confirm Button/Notice */}
          <motion.div variants={itemVariants} className="text-center bg-red-950/20 border border-red-500/20 p-6 rounded-none">
            <span className="text-[10px] font-mono text-white block mb-2">BY CONTINUING TO LOG IN AND SIMULATE:</span>
            <span className="text-xs font-header font-black text-red-500 uppercase tracking-wider block">
              YOU ACKNOWLEDGE THAT APEX ALPHA PROVIDES SIMULATIONS ONLY ▲
            </span>
          </motion.div>

        </motion.div>
      </div>

      <div className="text-center border-t border-white/5 py-8 mt-12">
        <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em]">
          APEX ALPHA COMPLIANCE DESK // FINANCIAL RISK NOTICES // © {new Date().getFullYear()}
        </p>
      </div>
      
      {/* Global scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanlines" />
    </div>
  );
}
