import React from "react";
import { motion } from "framer-motion";
import { Boxes, Sparkles, Cpu, Radio, ShieldCheck } from "lucide-react";

/**
 * TrackScannerBot
 * A futuristic hovering drone mascot inspecting the 6 hackathon domains
 * with scanning lasers and interactive track telemetry.
 */
export function TrackScannerBot() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4.5 rounded-3xl bg-gradient-to-r from-[#0a153a]/90 via-[#07102c]/95 to-[#020516]/98 border border-cyan-400/35 shadow-[0_0_25px_rgba(6,182,212,0.18)] mb-10 select-none">
      <div className="flex items-center gap-3.5">
        {/* Animated Flying Drone Avatar */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="relative w-14 h-14 rounded-2xl bg-gradient-to-b from-[#f8fafc] via-[#bae6fd] to-[#60a5fa] border-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center shrink-0"
        >
          {/* Twin Rotating Propeller Wings */}
          <div className="absolute -top-1 -left-2 w-4 h-1 bg-cyan-400 rounded-full animate-spin" />
          <div className="absolute -top-1 -right-2 w-4 h-1 bg-cyan-400 rounded-full animate-spin" />

          {/* Holographic Visor */}
          <div className="w-9 h-6 rounded-lg bg-[#03081a] border border-cyan-400/80 flex items-center justify-center">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          </div>

          <div className="text-[6px] font-mono font-bold text-navy-950 uppercase mt-0.5">
            DRONE-06
          </div>
        </motion.div>

        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-300">
              DRONE-06 // TRACK RECON SCANNER
            </span>
          </div>
          <p className="text-xs sm:text-sm font-heading font-medium text-slate-200">
            6 Specialized Innovation Arenas Detected. Problem matrices locked until Opening Ceremony.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-[10px] font-mono text-cyan-300 font-bold flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>ALL HARDWARE & CLOUD STACKS SUPPORTED</span>
        </span>
      </div>
    </div>
  );
}
