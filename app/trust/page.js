"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Scale, Sliders, BarChart3, Terminal } from "lucide-react";

export default function TrustPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white flex flex-col font-body selection:bg-[#f0c040]/30 overflow-y-auto relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] scanlines z-0" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#D4AF37]/3 rounded-full blur-[140px] pointer-events-none z-0" />
      
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
          {/* Header */}
          <motion.div variants={itemVariants} className="border-b border-white/5 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#f0c040]/30 bg-[#f0c040]/5 text-[#f0c040] text-[10px] font-mono tracking-[0.3em] uppercase mb-4 rounded-sm">
              <ShieldCheck size={10} /> Institutional Integrity Certification
            </div>
            <h1 className="text-4xl md:text-6xl font-header font-black tracking-tighter uppercase glow-gold text-white">
              Trust & Transparency
            </h1>
            <p className="text-gray-500 font-mono text-[11px] uppercase tracking-widest mt-2">
              APEX ALPHA SECURITY DIVISION // COMPLIANCE & RISK AUDITING
            </p>
          </motion.div>

          {/* Core Trust Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Why Choose APEX ALPHA */}
            <motion.div variants={itemVariants} className="glass-panel p-8 border border-white/5 bg-black/40 hover:border-[#f0c040]/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-sm border border-[#f0c040]/20 flex items-center justify-center text-[#f0c040] bg-[#f0c040]/5 mb-6">
                  <BarChart3 size={18} />
                </div>
                <h3 className="text-sm font-header font-black uppercase tracking-wider text-white mb-4">Why Choose APEX ALPHA</h3>
                <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                  Unlike traditional training solutions that rely on lagging execution templates or complex installations, APEX ALPHA runs high-performance quantitative simulations directly in your web browser. We pair institutional-grade candles arrays with gamified progression to isolate and eliminate behavioral speculatory vulnerabilities.
                </p>
              </div>
              <div className="text-[9px] font-mono text-gray-600 mt-6 tracking-widest uppercase">
                PERFORMANCE DNA COGNITION
              </div>
            </motion.div>

            {/* Security & Privacy */}
            <motion.div variants={itemVariants} className="glass-panel p-8 border border-[#f0c040]/10 bg-[#f0c040]/2 hover:border-[#f0c040]/30 flex flex-col justify-between shadow-[0_0_20px_rgba(240,192,64,0.02)]">
              <div>
                <div className="w-10 h-10 rounded-sm border border-[#f0c040]/40 flex items-center justify-center text-[#f0c040] bg-[#f0c040]/10 mb-6">
                  <Lock size={18} />
                </div>
                <h3 className="text-sm font-header font-black uppercase tracking-wider text-[#f0c040] mb-4">Security & Privacy</h3>
                <p className="text-[11px] text-gray-300 font-mono leading-relaxed">
                  Your strategies and executions are yours alone. All simulation logs remain isolated in your browser's localStorage database and are never synced to centralized servers. Handshakes, user accounts, and credentials transit safely via TLS 1.3 security.
                </p>
              </div>
              <div className="text-[9px] font-mono text-[#f0c040]/50 mt-6 tracking-widest uppercase">
                ISOLATION KEY: ENABLED
              </div>
            </motion.div>

            {/* Transparency Statement */}
            <motion.div variants={itemVariants} className="glass-panel p-8 border border-white/5 bg-black/40 hover:border-[#f0c040]/20 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-sm border border-[#f0c040]/20 flex items-center justify-center text-[#f0c040] bg-[#f0c040]/5 mb-6">
                  <Eye size={18} />
                </div>
                <h3 className="text-sm font-header font-black uppercase tracking-wider text-white mb-4">Transparency Statement</h3>
                <p className="text-[11px] text-gray-400 font-mono leading-relaxed">
                  APEX ALPHA holds absolute zero financial interest in your speculative decisions. We do not charge hidden transaction fees, route your simulation data, or operate a proprietary trading desk against users. We are software systems builders focused strictly on speculator engineering.
                </p>
              </div>
              <div className="text-[9px] font-mono text-gray-600 mt-6 tracking-widest uppercase">
                ZERO EXECUTION CONFLICTS
              </div>
            </motion.div>
          </div>

          {/* Compliance & Risk Philosophy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Compliance Information */}
            <motion.div variants={itemVariants} className="glass-panel p-8 border border-white/5 bg-black/40 hover:border-[#f0c040]/20">
              <h3 className="text-sm font-header font-black uppercase tracking-wider text-white mb-6 flex items-center gap-2">
                <Scale size={14} className="text-[#f0c040]" /> Regulatory Compliance Status
              </h3>
              <div className="space-y-4 text-[11px] text-gray-400 font-mono leading-relaxed">
                <p>
                  As an provider of simulated terminal technology, APEX ALPHA does not function as a registered investment broker, fund custodian, or investment advisor. Accordingly, we operate under standard software compliance regimes:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>GDPR & CCPA Aligned:</strong> Full tools for local data erasure (forget options) and CSV exports directly from user profiles.</li>
                  <li><strong>AdSense Ad Standards:</strong> Absolute transparency regarding ad tracking coordinates, cookie disclosures, and content guidelines.</li>
                  <li><strong>Mock SEC Simulation Rules:</strong> All virtual balances and paper trades conform to strict regulatory simulation disclaimers.</li>
                </ul>
              </div>
            </motion.div>

            {/* Risk Management Philosophy */}
            <motion.div variants={itemVariants} className="glass-panel p-8 border border-white/5 bg-black/40 hover:border-[#f0c040]/20">
              <h3 className="text-sm font-header font-black uppercase tracking-wider text-white mb-6 flex items-center gap-2">
                <Sliders size={14} className="text-[#f0c040]" /> Risk Management Philosophy
              </h3>
              <div className="space-y-4 text-[11px] text-gray-400 font-mono leading-relaxed">
                <p>
                  The core system of APEX ALPHA is built on risk discipline. We believe that professional speculators are defined by their management of drawdown rather than raw performance spikes:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Sharpe Maximization:</strong> All virtual ledgers prioritize tracking Sharpe Ratios and Win Factor ratios over absolute dollars.</li>
                  <li><strong>Heuristic Audits:</strong> Our AI mentor room runs programmatic forensic audits, penalizing high-leverage and absent stop-loss coordinates.</li>
                  <li><strong>Ranks & Perks Alignment:</strong> Gamified upgrades prioritize traders maintaining lower commission percentages and higher mathematical consistency.</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Secure Audit Summary */}
          <motion.div variants={itemVariants} className="glass-panel p-6 border border-white/5 bg-black/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Terminal size={20} className="text-[#f0c040]" />
              <div className="text-left">
                <h4 className="text-[11px] font-header font-black text-white uppercase tracking-wider">APEX TERMINAL AUDIT NODE</h4>
                <p className="text-[9px] text-gray-500 font-mono">MD5_HASH: 7a8f90c34efd0928e18db1a3e89f // SYSTEM: COMPLIANT</p>
              </div>
            </div>
            <a href="/contact" className="px-6 py-3 bg-[#f0c040] text-black font-header font-black text-[10px] uppercase tracking-wider hover:brightness-110 transition-all rounded-none cursor-pointer">
              INSPECT AUDIT REPORT
            </a>
          </motion.div>

          {/* Footer Metadata */}
          <motion.div variants={itemVariants} className="text-center border-t border-white/5 pt-8">
            <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em]">
              APEX ALPHA SOVEREIGN TRUST DESK // VERIFIED TRANSPARENT // © {new Date().getFullYear()}
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* Global scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanlines" />
    </div>
  );
}
