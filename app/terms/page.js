"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Terminal, Scale, ShieldAlert, Cpu } from "lucide-react";

export default function TermsPage() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#f0c040]/30 bg-[#f0c040]/5 text-[#f0c040] text-[10px] font-mono tracking-[0.3em] uppercase mb-4 rounded-sm">
              <Scale size={10} /> Sovereign User Agreement
            </div>
            <h1 className="text-3xl md:text-5xl font-header font-black tracking-tighter uppercase glow-gold">
              Terms & Conditions
            </h1>
            <p className="text-gray-500 font-mono text-[11px] uppercase tracking-widest mt-2">
              LAST COMPLIANCE RUN: JUNE 06, 2026 // ESTABLISHING PROTOCOLS
            </p>
          </motion.div>

          {/* Quick Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="glass-panel p-6 border border-white/5 bg-black/40 flex items-start gap-4">
              <Terminal size={18} className="text-[#f0c040] mt-1 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider mb-1">VIRTUAL SCOPE</h4>
                <p className="text-[9px] text-gray-500 font-mono leading-relaxed">No real assets are traded. Simulated operations only.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-6 border border-[#f0c040]/10 bg-[#f0c040]/2 flex items-start gap-4">
              <Cpu size={18} className="text-[#f0c040] mt-1 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono font-bold text-[#f0c040] uppercase tracking-wider mb-1">INTELLECTUAL IP</h4>
                <p className="text-[9px] text-gray-400 font-mono leading-relaxed">Sovereign Sentinel patterns and algorithms are proprietary property.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-6 border border-white/5 bg-black/40 flex items-start gap-4">
              <ShieldAlert size={18} className="text-[#f0c040] mt-1 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider mb-1">LIMIT OF LIABILITY</h4>
                <p className="text-[9px] text-gray-500 font-mono leading-relaxed">We assume zero liability for simulation discrepancies or real-world losses.</p>
              </div>
            </motion.div>
          </div>

          {/* Terms Content */}
          <motion.div variants={itemVariants} className="glass-panel p-8 border border-white/5 bg-black/40 space-y-8 text-[11px] text-gray-400 font-mono leading-relaxed">
            
            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">1.0 ACCEPTANCE OF TERMS</h3>
              <p>
                By registering for an account, authenticating credentials, or loading the APEX ALPHA simulation terminal, you acknowledge that you have read, understood, and agreed to be bound by this Sovereign User Agreement. If you do not agree, session termination is required immediately.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">2.0 SIMULATION SCOPE LIMITATION</h3>
              <p>
                All modules, candlestick charts, order panels, balances, and portfolios on APEX ALPHA are 100% simulated:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Virtual balances are populated inside your browser local storage database. They do not constitute deposits, real fiat currency, or any digital asset.</li>
                <li>Order clearing and trade match calculations do not route to any liquidity provider, exchange, or broker.</li>
                <li>The platform is constructed for educational quantitative practice and strategy research.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">3.0 INTELLECTUAL PROPERTY</h3>
              <p>
                All proprietary mathematical models (specifically the candlestick pattern recognition models inside <code>patterns.js</code> and visual overlays in <code>AlphaSentinel.jsx</code>), visual terminal styling, custom audio synthesizers, and UX elements are the exclusive intellectual property of APEX ALPHA. Users are granted a restricted, non-transferable licence to load these models within their browser sandbox for private study. Copying, distributing, or attempting to reverse-engineer quantitative core structures is strictly prohibited.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">4.0 USER CONDUCT & SECURITY RESPONSIBILITIES</h3>
              <p>
                Users are solely responsible for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Safeguarding their authentication coordinates (username and passwords).</li>
                <li>Ensuring their browser local storage ledger is not manipulated to forge quest outcomes or leaderboard stats.</li>
                <li>Preventing malicious script injections or automated crawling of market telemetry data snapshots.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">5.0 ABSOLUTE LIMITATION OF LIABILITY</h3>
              <p>
                APEX ALPHA and its developer syndicate shall not be held liable for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Any real-world financial losses, opportunity costs, or structural damages incurred by users practicing speculative tactics on this platform or applying virtual terminal strategies to real brokerage accounts.</li>
                <li>Inaccuracies, outages, latency spikes, or bugs in the real-time API market snapshots.</li>
                <li>Loss of browser local storage data resulting in a reset of virtual ledger coordinates or profile ranks.</li>
              </ul>
            </section>

          </motion.div>

          {/* Verification Warning */}
          <motion.div variants={itemVariants} className="text-center bg-[#f0c040]/5 border border-[#f0c040]/20 p-6 rounded-none">
            <span className="text-[10px] font-mono text-white block mb-2">BY CONTINUING TO USE THIS TERMINAL:</span>
            <span className="text-xs font-header font-black text-[#f0c040] uppercase tracking-wider block">
              YOU ACCEPT ALL LIABILITY FOR YOUR SPECULATIVE DECISIONS ▲
            </span>
          </motion.div>

        </motion.div>
      </div>

      <div className="text-center border-t border-white/5 py-8 mt-12">
        <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em]">
          APEX ALPHA LEGAL DESK // USER CODE OF CONDUCT // © {new Date().getFullYear()}
        </p>
      </div>
      
      {/* Global scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanlines" />
    </div>
  );
}
