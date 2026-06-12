"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Terminal, Shield, Info, EyeOff } from "lucide-react";

export default function CookiePolicyPage() {
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
              <Info size={10} /> Local Browser Telemetry Disclosures
            </div>
            <h1 className="text-3xl md:text-5xl font-header font-black tracking-tighter uppercase glow-gold text-white">
              Cookie Policy
            </h1>
            <p className="text-gray-500 font-mono text-[11px] uppercase tracking-widest mt-2">
              AUDIT COMPLIANCE RUN: JUNE 06, 2026 // VERSION 3.1
            </p>
          </motion.div>

          {/* Quick Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="glass-panel p-6 border border-white/5 bg-black/40 flex items-start gap-4">
              <Terminal size={18} className="text-[#f0c040] mt-1 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider mb-1">ESSENTIAL COOKIES</h4>
                <p className="text-[9px] text-gray-500 font-mono leading-relaxed">Required to manage your authenticated Firebase session variables.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-6 border border-[#f0c040]/10 bg-[#f0c040]/2 flex items-start gap-4">
              <Shield size={18} className="text-[#f0c040] mt-1 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono font-bold text-[#f0c040] uppercase tracking-wider mb-1">FUNCTIONAL TRACKERS</h4>
                <p className="text-[9px] text-gray-400 font-mono leading-relaxed">Browser local storage persists user trade ledgers and configurations.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-6 border border-white/5 bg-black/40 flex items-start gap-4">
              <EyeOff size={18} className="text-[#f0c040] mt-1 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider mb-1">ADSENSE ENABLED</h4>
                <p className="text-[9px] text-gray-500 font-mono leading-relaxed">AdSense cookies are deployed to customize promotional layouts.</p>
              </div>
            </motion.div>
          </div>

          {/* Cookies Detailed Copy */}
          <motion.div variants={itemVariants} className="glass-panel p-8 border border-white/5 bg-black/40 space-y-8 text-[11px] text-gray-400 font-mono leading-relaxed">
            
            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">1.0 UNDERSTANDING COOKIES</h3>
              <p>
                Cookies are minute text strings downloaded to your operating unit when accessing websites. They allow platforms to persist secure login states, analyze latency, and target visual adjustments. In addition to cookies, we utilize standard HTML5 local storage systems to cache simulated operations.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">2.0 CATEGORY CLASSIFICATION OF COOKIES</h3>
              <p>
                Our cookies are grouped into three primary functional layers:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Essential Security Cookies:</strong> Deployed to manage secure Firebase authentication nodes. These verify you are the legitimate owner of the active terminal session. Disabling these will break profile synchronization features.
                </li>
                <li>
                  <strong>Functional Telemetry (LocalStorage):</strong> We employ browser local storage to hold simulated logs:
                  <ul className="list-circle pl-5 mt-1 space-y-1">
                    <li><code>apex_local_trades</code> holds your simulated trade database history.</li>
                    <li><code>apex_local_balance</code> coordinates your virtual paper trading cash account balance.</li>
                  </ul>
                  These functional elements are isolated to your local machine and do not upload to central servers.
                </li>
                <li>
                  <strong>Advertising Cookies (Google AdSense):</strong> Google utilizes cookies to serve ads on our site. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">3.0 THIRD-PARTY SERVICES TRACKING</h3>
              <p>
                Our platform integrates with Google Firebase (account databases) and Google AdSense (display advertisements). These external services have independent tracking cookies. You may inspect their respective privacy agreements for details on their data transmission procedures.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">4.0 COOKIE CONTROL & REVOCATION</h3>
              <p>
                You hold absolute control over cookies:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You may configure your browser options to reject all cookies or request permission before accepting one.</li>
                <li>You can clear your local database at any time by executing a cache clear in your browser settings.</li>
                <li>To opt out of personalized interest-based advertising served by Google, visit the Google Ads Settings page.</li>
              </ul>
            </section>

          </motion.div>

          {/* Contact Notice */}
          <motion.div variants={itemVariants} className="text-center bg-[#f0c040]/5 border border-[#f0c040]/20 p-6 rounded-none">
            <span className="text-[10px] font-mono text-white block mb-2">WANT TO MANAGE YOUR PRIVATE TELEMETRY?</span>
            <a href="/contact" className="text-xs font-header font-black text-[#f0c040] hover:text-white transition uppercase tracking-wider">
              REQUEST SYSTEM ASSISTANCE▲
            </a>
          </motion.div>

        </motion.div>
      </div>

      <div className="text-center border-t border-white/5 py-8 mt-12">
        <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em]">
          APEX ALPHA COMPLIANCE DESK // COOKIE CONTROL SYSTEMS // © {new Date().getFullYear()}
        </p>
      </div>
      
      {/* Global scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanlines" />
    </div>
  );
}
