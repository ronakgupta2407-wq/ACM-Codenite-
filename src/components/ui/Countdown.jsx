import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCountdown } from "../../hooks/useCountdown";
import { EVENT_DATA } from "../../data/codeniteData";

function DigitBlock({ value, label }) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      {/* Digit Container */}
      <div className="relative group w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-2xl bg-navy-900/90 border border-acm-blue/30 backdrop-blur-xl shadow-glow-sm flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-acm-cyan hover:shadow-glow-md">
        {/* Top reflective edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent pointer-events-none" />

        {/* Center horizontal split divider line mimicking flip clock */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-navy-950/80 shadow-sm z-20 pointer-events-none" />

        {/* Digit with smooth flip/fade animation */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formatted}
            initial={{ y: -20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="font-orbitron font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-widest bg-gradient-to-b from-white via-sky-100 to-slate-400 bg-clip-text text-transparent z-10"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>

        {/* Neon corner accents */}
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-acm-cyan/10 rounded-full blur-lg pointer-events-none" />
      </div>

      {/* Label */}
      <span className="mt-2 text-[10px] sm:text-xs font-mono font-medium uppercase tracking-widest text-slate-400">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ targetDate = EVENT_DATA.dates.isoTargetDate }) {
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 my-6">
      <DigitBlock value={days} label="Days" />
      <span className="text-xl sm:text-2xl font-bold text-acm-cyan/60 animate-pulse pb-6">:</span>
      <DigitBlock value={hours} label="Hours" />
      <span className="text-xl sm:text-2xl font-bold text-acm-cyan/60 animate-pulse pb-6">:</span>
      <DigitBlock value={minutes} label="Minutes" />
      <span className="text-xl sm:text-2xl font-bold text-acm-cyan/60 animate-pulse pb-6">:</span>
      <DigitBlock value={seconds} label="Seconds" />
    </div>
  );
}
