import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, CheckCircle2, Users, FileCheck } from "lucide-react";

/**
 * FormAssistantBot ("Regi-Bot")
 * An animated 3D cartoon registration drone that encourages squads,
 * confirms 4-6 members validity, and delivers high-tech feedback.
 */
export function FormAssistantBot({ memberCount = 4 }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#0b163a]/90 via-[#070f2b]/95 to-[#020514]/98 border border-cyan-400/35 mb-6 shadow-[0_0_25px_rgba(6,182,212,0.15)] select-none">
      {/* 3D Animated Form Bot Avatar */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-b from-[#f0f9ff] via-[#bae6fd] to-[#7dd3fc] border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center shrink-0"
      >
        {/* Antenna */}
        <div className="absolute -top-1.5 w-1 h-2 bg-slate-400 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping -translate-x-0.25 -translate-y-1" />
        </div>

        {/* Visor with Happy Cheerful LED Eyes */}
        <div className="w-10 h-7 rounded-xl bg-[#03091e] border border-cyan-400/70 flex items-center justify-center gap-1.5">
          <motion.div
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 3.2, times: [0, 0.88, 0.94, 1] }}
            className="w-2 h-3 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]"
          />
          <motion.div
            animate={{ scaleY: [1, 1, 0.1, 1] }}
            transition={{ repeat: Infinity, duration: 3.2, times: [0, 0.88, 0.94, 1] }}
            className="w-2 h-3 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]"
          />
        </div>

        <div className="mt-0.5 text-[7px] font-mono font-bold text-navy-950 uppercase">
          FORM-BOT
        </div>
      </motion.div>

      {/* Encouragement message */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>PORTAL READY // SQUAD OF {memberCount} DETECTED</span>
          </span>
        </div>
        <p className="text-xs sm:text-sm font-heading font-medium text-slate-200">
          "Fill all details accurately! Download your instant digital ticket & slip right upon completion."
        </p>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-950/80 border border-cyan-400/30 text-[10px] font-mono text-cyan-300 font-bold">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
        <span>100% FREE ENTRY</span>
      </div>
    </div>
  );
}
