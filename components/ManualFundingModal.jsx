"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, DollarSign, Loader2 } from "lucide-react";
import { injectFunds } from "@/services/PortfolioService";
import { useAuth } from "@/contexts/AuthContext";
import { usePortfolio } from "@/hooks/useFirestore";
import toast from "react-hot-toast";

export default function ManualFundingModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const { data: portfolio } = usePortfolio();
  const currentBalance = portfolio?.accountBalance || 0;
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInject = async () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) {
      toast.error("Enter a valid injection amount.");
      return;
    }

    if (currentBalance + val > 1000000) {
      toast.error(`Injection blocked: Total balance cannot exceed $1,000,000 USD (Current: $${currentBalance.toLocaleString()})`);
      return;
    }

    setLoading(true);
    try {
      await injectFunds(user.uid, val);
      toast.success(`Liquidity Injected: $${val.toLocaleString()}`);
      onClose();
      setAmount("");
    } catch (err) {
      toast.error("Injection failed. Check terminal logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#08080F] border border-[#f0c040]/30 overflow-hidden shadow-[0_0_50px_rgba(240,192,64,0.1)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0c040]/10 bg-[#f0c040]/5">
              <div className="flex items-center gap-3">
                <Zap size={18} className="text-[#f0c040]" />
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                  Liquidity Injection Hub
                </span>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-white transition">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 flex flex-col gap-6">
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-widest font-black block mb-3">
                  Injection Amount (USD)
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#f0c040]">
                    <DollarSign size={20} />
                  </div>
                  <input
                    type="number"
                    autoFocus
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-black/40 border border-[#f0c040]/20 focus:border-[#f0c040]/50 outline-none text-white text-3xl font-mono font-black py-6 pl-12 pr-6 transition-all"
                  />
                </div>
              </div>

              <div className="bg-[#f0c040]/5 border border-[#f0c040]/10 p-4 flex flex-col gap-2">
                <p className="text-[9px] text-[#f0c040] font-mono leading-relaxed uppercase tracking-tighter">
                  Warning: Manual injection bypasses standard treasury protocols. Funds will be credited directly to your sovereign vault.
                </p>
                <p className="text-[9px] text-red-400 font-mono leading-relaxed uppercase tracking-tighter">
                  Max Account Balance Cap: $1,000,000 USD. Current Balance: ${currentBalance.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                </p>
              </div>

              <button
                onClick={handleInject}
                disabled={loading || !amount}
                className="w-full h-14 bg-[#f0c040] hover:bg-[#d4ac37] text-black font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:grayscale"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Zap size={18} fill="currentColor" />
                    Confirm Injection
                  </>
                )}
              </button>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-white/5 border-t border-white/5 flex justify-center">
              <span className="text-[8px] text-gray-600 uppercase tracking-widest font-mono">
                Sovereign Treasury · Alpha Protocol 2.0
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
