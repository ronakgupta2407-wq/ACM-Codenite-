import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress counter animation from 0 to 100 over ~2.2s
    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 400);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onFinish]);

  // Circumference for 58px radius circle = 2 * PI * 58 ≈ 364.42
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-950 overflow-hidden select-none"
    >
      {/* Background radial ambient glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-acm-blue/15 blur-[120px] pointer-events-none" />

      {/* Cyber Grid Pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 133, 202, 0.2) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 133, 202, 0.2) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Circular Progress Ring & ACM Logo Container */}
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center">
          {/* SVG Progress Circle */}
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
            {/* Background track */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="rgba(0, 133, 202, 0.15)"
              strokeWidth="4"
              fill="transparent"
            />
            {/* Animated blue stroke */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="url(#blueGradient)"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-75 ease-linear"
            />
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0085CA" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Logo with glow */}
          <div className="absolute inset-4 rounded-full overflow-hidden p-3 bg-navy-900/90 border border-acm-blue/40 shadow-glow-md flex items-center justify-center">
            <motion.img
              src="/acm-mits-logo.png"
              alt="ACM MITS Chapter Logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]"
            />
          </div>
        </div>

        {/* Title */}
        <div className="mt-8 font-heading font-extrabold text-lg sm:text-xl text-white tracking-wide">
          CodeNite 2027
        </div>

        {/* Subtitle & Percentage Counter */}
        <div className="mt-3 flex items-center gap-3">
          <span className="font-heading text-xs tracking-widest uppercase text-slate-400">
            ACM MITS STUDENT CHAPTER
          </span>
          <span className="font-mono text-xs font-bold text-sky-400 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-600/30">
            {progress}%
          </span>
        </div>
      </div>

      {/* Wipe Exit Curtains */}
      <AnimatePresence>
        {progress >= 100 && (
          <>
            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
              style={{ transformOrigin: "top" }}
              className="absolute inset-x-0 top-0 h-1/2 bg-navy-950 z-20"
            />
            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
              style={{ transformOrigin: "bottom" }}
              className="absolute inset-x-0 bottom-0 h-1/2 bg-navy-950 z-20"
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
