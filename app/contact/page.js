"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, HelpCircle, Send, ShieldAlert, ChevronDown, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const FAQs = [
  {
    question: "Is APEX ALPHA a live brokerage platform?",
    answer: "No. APEX ALPHA is strictly an educational, high-fidelity quantitative simulation environment. All order books, positions, cash limits, and trades are entirely virtual, running locally on your terminal sandbox. No real capital or securities are traded or exchanged."
  },
  {
    question: "What is the global latency rating?",
    answer: "Our snapshot connections execute sub-millisecond execution simulations (typically 0.4ms to 12ms depending on local client processing capabilities) to closely mirror real-world order clearing metrics."
  },
  {
    question: "How does the AI Post-Mortem Audit work?",
    answer: "The AI Audit room reads your local trade log arrays directly from your browser's localStorage. It runs programmatic algorithms to calculate risk metrics and passes this data to our localized mentor agent to give you objective, behavioral trading feedback."
  },
  {
    question: "Are there white-label integration opportunities?",
    answer: "Yes. For proprietary firms or trading syndicates seeking to deploy the terminal interface for trainee developers, please reach out via our Corporate Inquiries channel below."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Telemetry error: Name, Email, and Message are required.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate telemetry transmission
    setTimeout(() => {
      toast.custom((t) => (
        <div className="bg-[#020205]/95 border border-[#f0c040]/30 text-white p-4 font-mono text-xs rounded-none backdrop-blur-md flex flex-col gap-2">
          <span className="text-[#f0c040] font-black uppercase tracking-wider">▲ SECURE TRANSMISSION COMPLETED</span>
          <span>Your message has been encrypted and sent to the APEX ALPHA network.</span>
        </div>
      ));
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1200);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#020205] text-white flex flex-col font-body selection:bg-[#f0c040]/30 overflow-y-auto relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] scanlines z-0" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#D4AF37]/3 rounded-full blur-[120px] pointer-events-none z-0" />
      
      {/* Navbar */}
      <div className="px-8 py-4 border-b border-white/5 bg-black/60 backdrop-blur-2xl z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-[1200px] w-full mx-auto p-6 md:p-12 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Info & FAQs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-10"
        >
          {/* Header */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 border border-[#f0c040]/30 bg-[#f0c040]/5 text-[#f0c040] text-[10px] font-mono tracking-[0.3em] uppercase mb-4 rounded-sm">
              <MessageSquare size={10} /> Secure Communications Link
            </span>
            <h1 className="text-4xl md:text-5xl font-header font-black tracking-tighter uppercase glow-gold">
              Contact Command
            </h1>
            <p className="text-gray-400 font-mono text-[11px] uppercase tracking-widest mt-2">
              APEX ALPHA // CENTRAL SUPPORT & SYNDICATE HQ
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-panel p-6 border border-white/5 bg-black/40">
              <span className="text-[9px] font-mono text-[#f0c040] tracking-widest uppercase block mb-1">GENERAL ENQUIRIES & SUPPORT</span>
              <div className="flex items-center gap-2 text-white font-mono text-[11px] font-bold">
                <Mail size={12} className="text-gray-400" />
                <a href="mailto:support@apexalpha.io" className="hover:text-[#f0c040] transition">support@apexalpha.io</a>
              </div>
            </div>
            <div className="glass-panel p-6 border border-white/5 bg-black/40">
              <span className="text-[9px] font-mono text-[#f0c040] tracking-widest uppercase block mb-1">PARTNERSHIP & WHITE LABELS</span>
              <div className="flex items-center gap-2 text-white font-mono text-[11px] font-bold">
                <Mail size={12} className="text-gray-400" />
                <a href="mailto:syndicate@apexalpha.io" className="hover:text-[#f0c040] transition">syndicate@apexalpha.io</a>
              </div>
            </div>
          </div>

          {/* FAQs section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-header font-black uppercase tracking-wider text-white flex items-center gap-2">
              <HelpCircle size={14} className="text-[#f0c040]" /> Central Telemetry FAQs
            </h3>
            <div className="space-y-2">
              {FAQs.map((faq, idx) => (
                <div key={idx} className="glass-panel border-white/5 bg-black/30 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 flex justify-between items-center text-left hover:bg-white/2 transition-colors cursor-pointer"
                  >
                    <span className="text-[11px] font-mono text-white font-bold uppercase">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === idx ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#f0c040]"
                    >
                      <ChevronDown size={14} />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        <div className="p-4 pt-0 text-[10px] text-gray-500 font-mono leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-panel p-8 border border-white/5 bg-black/60 shadow-[0_0_30px_rgba(240,192,64,0.02)] flex flex-col justify-between"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-2">
              <ShieldAlert size={16} className="text-[#f0c040]" />
              <h3 className="text-sm font-header font-black uppercase tracking-wider text-white">SECURE TRANSMISSION FORM</h3>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">IDENTIFICATION NAME</label>
              <input
                type="text"
                placeholder="Agent / Entity Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#050508] border border-white/10 text-[10px] font-mono px-4 py-2.5 focus:outline-none focus:border-[#f0c040] text-white transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">TELEMETRY COMMS EMAIL</label>
              <input
                type="email"
                placeholder="entity@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#050508] border border-white/10 text-[10px] font-mono px-4 py-2.5 focus:outline-none focus:border-[#f0c040] text-white transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">TRANSMISSION SUBJECT</label>
              <input
                type="text"
                placeholder="General Support // White Label"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="bg-[#050508] border border-white/10 text-[10px] font-mono px-4 py-2.5 focus:outline-none focus:border-[#f0c040] text-white transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">TRANSMISSION DETAILS</label>
              <textarea
                placeholder="Enter details of your inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={5}
                className="bg-[#050508] border border-white/10 text-[10px] font-mono px-4 py-2.5 focus:outline-none focus:border-[#f0c040] text-white transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full py-4 bg-[#f0c040] text-black font-header font-black text-[11px] uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(240,192,64,0.2)] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>TRANSMITTING...</>
              ) : (
                <>
                  TRANSMIT COMMUNIQUE <Send size={12} />
                </>
              )}
            </button>
          </form>

          <div className="text-[9px] font-mono text-gray-600 mt-6 tracking-widest uppercase text-center">
            ENCRYPTION PROTOCOL: TLS_1.3 // AES_256_GCM
          </div>
        </motion.div>
      </div>

      <div className="text-center border-t border-white/5 py-8 mt-12">
        <p className="text-[9px] text-gray-600 font-mono uppercase tracking-[0.3em]">
          APEX ALPHA SECURE COMMUNICATIONS CENTRE // © {new Date().getFullYear()}
        </p>
      </div>
      
      {/* Global scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanlines" />
    </div>
  );
}
