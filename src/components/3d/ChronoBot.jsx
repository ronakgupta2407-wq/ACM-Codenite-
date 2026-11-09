import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, Flame, ShieldAlert, Sparkles } from "lucide-react";

/**
 * ChronoBot
 * 3D cartoon mechanical timekeeper robot with spinning gears
 * and an interactive schedule ticker.
 */
export function ChronoBot() {
  const [pulseClock, setPulseClock] = useState(false);
  const [statusMessage, setStatusMessage] = useState("12-Hour Midnight Clock Calibrated. Code Freeze at 06:00 AM!");

  const timelineAlerts = [
    "🔥 08:00 PM: Official Opening Ceremony & Track Matrix Release!",
    "🍕 12:00 AM: Midnight Energy Pizza & Caffeine Fuel Drop!",
    "💻 02:00 AM: Mentor Checkpoint 2 - Code Architecture Review!",
    "❄️ 06:00 AM: Hard Code Freeze & Repository Lock!",
    "🏆 08:00 AM: Grand Jury Evaluation & Winner Accolades!",
  ];

  const handlePoke = () => {
    setPulseClock(true);
    const nextAlert = timelineAlerts[Math.floor(Math.random() * timelineAlerts.length)];
    setStatusMessage(nextAlert);
    setTimeout(() => setPulseClock(false), 500);
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-r from-[#0a1333]/90 via-[#060e26]/95 to-[#020514]/98 border border-cyan-400/35 shadow-[0_0_30px_rgba(6,182,212,0.18)] mb-12 select-none">
      <div className="flex items-center gap-4">
        {/* 3D Robot Timekeeper Avatar */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePoke}
          className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-b from-[#f1f5f9] via-[#cbd5e1] to-[#93c5fd] border-2 border-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center cursor-pointer group shrink-0"
          title="Click ChronoBot for schedule checkpoint alert!"
        >
          {/* Dual spinning mechanical clock gear ears */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-amber-400 border-dashed animate-spin" />
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-amber-400 border-dashed animate-spin" />

          {/* Clock Visor Screen */}
          <div className="w-12 h-9 rounded-xl bg-[#040818] border border-cyan-400 flex flex-col items-center justify-center">
            <Clock className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span className="text-[7px] font-mono font-bold text-amber-300">12:00 HR</span>
          </div>

          <div className="absolute -bottom-1.5 px-1.5 py-0.2 bg-navy-950 border border-cyan-400/80 rounded-full text-[7px] font-mono font-bold text-cyan-300">
            CHRONO
          </div>
        </motion.div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300">
              CHRONOBOT // OVERNIGHT TIMEKEEPER
            </span>
          </div>
          <p className="text-xs sm:text-sm font-heading font-medium text-slate-200">
            {statusMessage}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePoke}
        className="px-3.5 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/50 text-xs font-mono font-bold text-cyan-300 hover:text-white transition-all shrink-0 cursor-pointer shadow-sm"
      >
        Poke Timekeeper ↻
      </button>
    </div>
  );
}
