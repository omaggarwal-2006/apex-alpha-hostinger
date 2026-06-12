"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Shield, Eye, Database, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
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
              <Shield size={10} /> Regulatory Security & GDPR Directive
            </div>
            <h1 className="text-3xl md:text-5xl font-header font-black tracking-tighter uppercase glow-gold">
              Privacy Policy
            </h1>
            <p className="text-gray-500 font-mono text-[11px] uppercase tracking-widest mt-2">
              LAST MODIFIED: JUNE 06, 2026 // VERSION 4.0 // COMPLIANCE CHECKED
            </p>
          </motion.div>

          {/* Quick Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div variants={itemVariants} className="glass-panel p-6 border border-white/5 bg-black/40 flex items-start gap-4">
              <Eye size={18} className="text-[#f0c040] mt-1 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider mb-1">DATA MINIMIZATION</h4>
                <p className="text-[9px] text-gray-500 font-mono leading-relaxed">We collect zero tracking telemetry from virtual simulation trades.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-6 border border-[#f0c040]/10 bg-[#f0c040]/2 flex items-start gap-4">
              <Database size={18} className="text-[#f0c040] mt-1 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono font-bold text-[#f0c040] uppercase tracking-wider mb-1">LOCAL STORAGE ISOLATION</h4>
                <p className="text-[9px] text-gray-400 font-mono leading-relaxed">Your simulated trading ledger resides purely inside your browser sandbox.</p>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="glass-panel p-6 border border-white/5 bg-black/40 flex items-start gap-4">
              <FileText size={18} className="text-[#f0c040] mt-1 shrink-0" />
              <div>
                <h4 className="text-[10px] font-mono font-bold text-white uppercase tracking-wider mb-1">GDPR & ADSENSE SYNC</h4>
                <p className="text-[9px] text-gray-500 font-mono leading-relaxed">Complete transparency regarding Google AdSense cookies and tracking regulations.</p>
              </div>
            </motion.div>
          </div>

          {/* Detailed Policy Text */}
          <motion.div variants={itemVariants} className="glass-panel p-8 border border-white/5 bg-black/40 space-y-8 text-[11px] text-gray-400 font-mono leading-relaxed">
            
            {/* Section 1 */}
            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">1.0 INFORMATION WE COLLECT</h3>
              <p>
                At APEX ALPHA, we respect your privacy. Because the platform operates as a sandbox for quantitative simulated execution, we minimize server-side data collection. We collect:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Authentication Coordinates:</strong> Username, Email address, and secure password hash when creating an account (handled securely via Google Firebase).</li>
                <li><strong>Local Database Telemetry:</strong> To enable local trade logs, win-rates, Sharpe ratios, and quests progression, we utilize your web browser's <code>localStorage</code> (e.g., <code>apex_local_trades</code>, <code>apex_local_balance</code>). This data is isolated inside your browser and is never stored on our central servers.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">2.0 GDPR DATA PRIVACY RIGHTS</h3>
              <p>
                Under the General Data Protection Regulation (GDPR), users located within the European Economic Area possess full data rights:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Right to Erase (Forget):</strong> You can instantly clear your entire trade log history and balance calculations by executing the "Clear Database" action in your profile or clearing your browser cookies.</li>
                <li><strong>Right of Access & Portability:</strong> You can export your entire simulated ledger as a raw CSV structure from the Portfolio vault at any time.</li>
                <li><strong>Right to Restrict:</strong> If you wish to use the platform without local storage telemetry, you may configure your browser to block local cookies.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">3.0 GOOGLE ADSENSE & COOKIES DISCLOSURE</h3>
              <p>
                We serve personalized advertising on the platform to offset data feeds and quantitative server maintenance costs:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Google, as a third-party vendor, uses cookies to serve ads on APEX ALPHA.</li>
                <li>Google's use of the DoubleClick DART cookie enables it to serve ads to users based on their visit to our site and other sites on the Internet.</li>
                <li>Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy page.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">4.0 DATA PROTECTION & CRYPTOGRAPHY</h3>
              <p>
                All account profiles and server handshake coordinates are encrypted via Transport Layer Security (TLS 1.3) during transit. We employ advanced database isolation and security rules to prevent proprietary strategy telemetry leakage.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h3 className="text-xs font-header font-black uppercase text-white tracking-wider">5.0 POLICY AMENDMENTS</h3>
              <p>
                We reserve the right to modify this document to adapt to changing FinTech regulatory frameworks. Your continued use of the simulation terminal signifies your consent to the updated terms.
              </p>
            </section>

          </motion.div>

          {/* Contact Link */}
          <motion.div variants={itemVariants} className="text-center bg-[#f0c040]/5 border border-[#f0c040]/20 p-6 rounded-none">
            <span className="text-[10px] font-mono text-white block mb-2">HAVE COMPLIANCE QUESTIONS?</span>
            <a href="/contact" className="text-xs font-header font-black text-[#f0c040] hover:text-white transition uppercase tracking-wider">
              INQUIRE WITH THE SOVEREIGN RISK DESK ▲
            </a>
          </motion.div>

        </motion.div>
      </div>

      <div className="text-center border-t border-white/5 py-8 mt-12">
        <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em]">
          APEX ALPHA COMPLIANCE DESK // SECURE DATA PROTOCOLS // © {new Date().getFullYear()}
        </p>
      </div>
      
      {/* Global scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanlines" />
    </div>
  );
}
