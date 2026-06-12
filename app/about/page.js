"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Shield, Target, Cpu, Award, Terminal, Eye, Bookmark } from "lucide-react";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white flex flex-col font-body selection:bg-[#f0c040]/30 overflow-y-auto relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] scanlines z-0" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/3 rounded-full blur-[140px] pointer-events-none z-0" />
      
      {/* Navbar */}
      <div className="px-8 py-4 border-b border-white/5 bg-black/60 backdrop-blur-2xl z-50">
        <Navbar />
      </div>

      {/* Content wrapper */}
      <div className="flex-1 max-w-[1200px] w-full mx-auto p-6 md:p-12 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-12"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center md:text-left border-b border-white/5 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#f0c040]/30 bg-[#f0c040]/5 text-[#f0c040] text-[10px] font-mono tracking-[0.3em] uppercase mb-4 rounded-sm">
              <Terminal size={10} /> Corporate Intelligence Dossier
            </div>
            <h1 className="text-4xl md:text-6xl font-header font-black tracking-tighter uppercase glow-gold">
              Sovereign Core Systems
            </h1>
            <p className="text-gray-500 font-mono text-[11px] uppercase tracking-widest mt-2">
              APEX ALPHA // QUANT SYSTEM DESK OPERATIONS // ESTABLISHED 2024
            </p>
          </motion.div>

          {/* Main Grid: Mission, Vision, Why Exist */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Why Exist */}
            <motion.div variants={itemVariants} className="glass-panel p-8 border border-white/5 bg-black/40 hover:border-[#f0c040]/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-sm border border-[#f0c040]/20 flex items-center justify-center text-[#f0c040] bg-[#f0c040]/5 mb-6">
                  <Bookmark size={18} />
                </div>
                <h3 className="text-sm font-header font-black uppercase tracking-wider text-white mb-4">Why We Exist</h3>
                <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                  Traditional simulation environments are either built with laggy data grids or lack granular risk heuristics. APEX ALPHA was engineered to bridge this gap, offering retail developers and retail speculators the identical structural execution terminal used by boutique proprietary trading operations.
                </p>
              </div>
              <div className="text-[9px] font-mono text-gray-600 mt-6 tracking-widest uppercase">
                CODE: CORE_DIVERGENCE
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div variants={itemVariants} className="glass-panel p-8 border border-[#f0c040]/10 bg-[#f0c040]/2 hover:border-[#f0c040]/30 flex flex-col justify-between shadow-[0_0_20px_rgba(240,192,64,0.02)]">
              <div>
                <div className="w-10 h-10 rounded-sm border border-[#f0c040]/40 flex items-center justify-center text-[#f0c040] bg-[#f0c040]/10 mb-6">
                  <Target size={18} />
                </div>
                <h3 className="text-sm font-header font-black uppercase tracking-wider text-[#f0c040] mb-4">Our Mission</h3>
                <p className="text-[11px] text-gray-300 font-mono leading-relaxed">
                  To democratize sovereign-tier simulation algorithms. We build advanced client-side mathematical frameworks to calculate patterns, identify density support-resistance areas, and provide objective analytics reports to foster absolute speculatory discipline and risk management.
                </p>
              </div>
              <div className="text-[9px] font-mono text-[#f0c040]/50 mt-6 tracking-widest uppercase">
                CODE: PROTOCOL_DEMOCRATIZATION
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div variants={itemVariants} className="glass-panel p-8 border border-white/5 bg-black/40 hover:border-[#f0c040]/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-sm border border-[#f0c040]/20 flex items-center justify-center text-[#f0c040] bg-[#f0c040]/5 mb-6">
                  <Eye size={18} />
                </div>
                <h3 className="text-sm font-header font-black uppercase tracking-wider text-white mb-4">Our Vision</h3>
                <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                  To establish the absolute benchmark sandbox for institutional speculative training. We foresee a trading industry where individuals are armed with professional risk evaluation engines, removing emotional vulnerabilities and optimizing mathematical performance before deploying hard capital.
                </p>
              </div>
              <div className="text-[9px] font-mono text-gray-600 mt-6 tracking-widest uppercase">
                CODE: FUTURES_ALIGNMENT
              </div>
            </motion.div>
          </div>

          {/* Secondary Grid: Founder Story & Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Founder Story */}
            <motion.div variants={itemVariants} className="md:col-span-2 glass-panel p-8 border border-white/5 bg-black/40 hover:border-[#f0c040]/20 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-header font-black uppercase tracking-wider text-white mb-6 flex items-center gap-2">
                  <Cpu size={14} className="text-[#f0c040]" /> The Genesis Syndicate
                </h3>
                <div className="space-y-4 text-[11px] text-gray-400 font-mono leading-relaxed">
                  <p>
                    APEX ALPHA was conceptualized by a private syndicate of quantitative researchers, software systems architects, and veteran prop traders. Disillusioned by standard consumer charting apps that hide execution inefficiencies behind bloated marketing pages, they collaborated to write a high-fidelity simulator.
                  </p>
                  <p>
                    The terminal provides sub-millisecond execution simulations on options sweeps and candle feeds, combined with a local forensic ledger that grades performance metrics (Sharpe Ratio, Profit Factor). By pairing quantitative tools with gamified XP rank-ups, APEX ALPHA forces speculatory discipline through software structure.
                  </p>
                </div>
              </div>
              <div className="text-[9px] font-mono text-gray-600 mt-6 tracking-widest uppercase">
                ORIGIN: CHICAGO // MUMBAI NODES
              </div>
            </motion.div>

            {/* Core Values */}
            <motion.div variants={itemVariants} className="glass-panel p-8 border border-white/5 bg-black/40 hover:border-[#f0c040]/20 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-header font-black uppercase tracking-wider text-white mb-6 flex items-center gap-2">
                  <Shield size={14} className="text-[#f0c040]" /> Sovereign Values
                </h3>
                <ul className="space-y-4">
                  {[
                    { title: "Mathematical Precision", desc: "No estimations. Every pattern, support coordinate, and grading metric is computed from raw local data." },
                    { title: "Sovereign Autonomy", desc: "Your data stays yours. Local audit ledgers are calculated securely within your client environment." },
                    { title: "Vanguard Security", desc: "Military-grade data structures and authentication keep your trading methodologies confidential." }
                  ].map((value, idx) => (
                    <li key={idx} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">{value.title}</h4>
                      <p className="text-[9px] text-gray-500 leading-relaxed font-mono">{value.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-[9px] font-mono text-[#f0c040] mt-4 tracking-widest uppercase flex items-center gap-1">
                <Award size={10} /> Tier 1 Compliance
              </div>
            </motion.div>
          </div>

          {/* Footer Metadata */}
          <motion.div variants={itemVariants} className="text-center border-t border-white/5 pt-8">
            <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em]">
              APEX ALPHA SOVEREIGN SYSTEMS // ALL DATA RETRIEVED SECURELY // © {new Date().getFullYear()}
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* Global scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanlines" />
    </div>
  );
}
