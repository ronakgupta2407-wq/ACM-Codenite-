import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Coins, Sparkles, Award, Crown } from "lucide-react";
import confetti from "canvas-confetti";

/**
 * VaultBot
 * 3D cartoon robotic prize vault guardian with interactive bounty confetti.
 */
export function VaultBot() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenVault = () => {
    setIsOpened(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#fbbf24", "#00f0ff", "#a855f7", "#38bdf8"],
    });
    setTimeout(() => setIsOpened(false), 2000);
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5 p-5 rounded-3xl bg-gradient-to-r from-[#171103]/90 via-[#0a071f]/95 to-[#030617]/98 border border-amber-400/40 shadow-[0_0_35px_rgba(245,158,11,0.22)] mb-12 select-none">
      <div className="flex items-center gap-4">
        {/* 3D Animated Vault Guardian Mascot */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenVault}
          className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-b from-[#fef08a] via-[#fde047] to-[#ca8a04] border-2 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)] flex flex-col items-center justify-center cursor-pointer group shrink-0"
          title="Click VaultBot to shower champion confetti!"
        >
          {/* Floating Crown above */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-amber-300 animate-bounce">
            <Crown className="w-4 h-4 fill-amber-300" />
          </div>

          {/* Screen Visor */}
          <div className="w-12 h-9 rounded-xl bg-[#080614] border border-amber-400/80 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>

          <div className="text-[6px] font-mono font-bold text-navy-950 uppercase mt-0.5">
            VAULT-BOT
          </div>
        </motion.div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300">
              VAULT-BOT // GLORY GUARDIAN
            </span>
          </div>
          <p className="text-xs sm:text-sm font-heading font-medium text-slate-200">
            ₹1,50,000+ Prize Vault Secured. Hard cash, ACM trophies & fast-track interviews locked for top 3 squads!
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleOpenVault}
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-heading font-black text-xs flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Celebrate Bounty!</span>
      </button>
    </div>
  );
}
