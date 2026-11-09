import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Zap, Shield, Sparkles } from "lucide-react";
import { CodeNite3DCore } from "./CodeNite3DCore";
import { CodeNite3DStarfield } from "./CodeNite3DStarfield";

const HACKATHON_BOOT_LOGS = [
  { min: 0, max: 18, msg: "INITIALIZING CODENITE KERNEL v2.7..." },
  { min: 19, max: 38, msg: "CALIBRATING 12-HR OVERNIGHT CAFFEINE PROTOCOLS..." },
  { min: 39, max: 58, msg: "COMPILING 6 TRACK MATRICES & SANDBOX ENVIRONMENTS..." },
  { min: 59, max: 78, msg: "SYNCHRONIZING 1500+ HACKER SQUAD NODES..." },
  { min: 79, max: 94, msg: "OVERCLOCKING GIT REPOSITORIES & DEPLOYMENT PIPELINE..." },
  { min: 95, max: 100, msg: "SYSTEM OPERATIONAL // WELCOME TO CODENITE 2027" },
];

export function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isOverclocked, setIsOverclocked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Progressive counter animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random incremental tick for realistic cyber feel
        const inc = Math.floor(Math.random() * 2) + 1;
        return Math.min(prev + inc, 100);
      });
    }, 28);

    return () => clearInterval(timer);
  }, []);

  // When progress hits 100, call onFinish after short reveal
  useEffect(() => {
    if (progress >= 100) {
      const exitTimer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 550);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onFinish]);

  // Fun Interactive feature: Clicking/Tapping anywhere boosts the progress!
  const handleBoost = useCallback(() => {
    setIsOverclocked(true);
    setClickCount((c) => c + 1);
    setProgress((prev) => Math.min(prev + 5, 100));

    setTimeout(() => {
      setIsOverclocked(false);
    }, 450);
  }, []);

  // Current Boot Log Message based on progress percentage
  const currentLog =
    HACKATHON_BOOT_LOGS.find(
      (log) => progress >= log.min && progress <= log.max
    )?.msg || "EXECUTING CODENITE ENGINE...";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        filter: "blur(8px)",
        transition: { duration: 0.65, ease: [0.65, 0, 0.35, 1] },
      }}
      onClick={handleBoost}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-between py-8 px-4 bg-[#02040b] overflow-hidden select-none cursor-pointer"
    >
      {/* 1. 3D Warp-Speed Depth Starfield Canvas */}
      <CodeNite3DStarfield />

      {/* 2. Cyber Horizon Glow & Hex Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(6,182,212,0.12),transparent_70%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 240, 255, 0.25) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 240, 255, 0.25) 1px, transparent 1px)`,
          backgroundSize: "45px 45px",
        }}
      />

      {/* Top Telemetry Header */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between text-[11px] font-mono text-cyan-400/80 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold tracking-widest text-cyan-300">
            CODENITE.EXE
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400">
            OVERNIGHT HACK ENGINE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 hidden sm:inline">
            SYSTEM STATUS:
          </span>
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-bold">
            {progress < 100 ? "BOOTING" : "ONLINE"}
          </span>
        </div>
      </div>

      {/* Center 3D Interactive Core with Hackathon Identity */}
      <div className="relative z-10 flex flex-col items-center my-auto">
        {/* 3D CodeNite Cube & Gyroscope Orbit */}
        <CodeNite3DCore progress={progress} />

        {/* Hackathon Brand Display (Replaced ACM logo) */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider mb-2 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>MITS GWALIOR HACKATHON</span>
          </div>

          <h1 className="font-orbitron font-black text-3xl sm:text-4xl md:text-5xl tracking-widest text-white uppercase text-glow-cyan">
            &lt;CODE<span className="text-cyan-400">NITE</span>/&gt;
          </h1>

          <div className="font-mono text-xs sm:text-sm font-bold text-slate-400 tracking-[0.3em] uppercase mt-1">
            2027 EDITION • 12-HOUR OVERNIGHT
          </div>
        </div>

        {/* Interactive Overclock Indicator Banner */}
        <div className="h-6 mt-3 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isOverclocked ? (
              <motion.div
                key="overclocked"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-1.5 text-xs font-mono font-black text-amber-300 bg-amber-500/20 px-3 py-0.5 rounded-full border border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce" />
                <span>OVERCLOCK BOOST +5%</span>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[11px] font-mono text-cyan-400/60 flex items-center gap-1.5"
              >
                <Zap className="w-3 h-3 text-cyan-400 animate-pulse" />
                <span>Tap anywhere or move mouse to tilt in 3D</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom HUD: Progress Bar & Realtime Hackathon Logs */}
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        {/* Realtime Terminal Log */}
        <div className="w-full flex items-center justify-between text-xs font-mono mb-2 px-1 text-slate-300">
          <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-cyan-300 font-semibold">{currentLog}</span>
          </div>
          <span className="font-orbitron font-black text-base text-cyan-400 text-glow-cyan shrink-0 ml-3">
            {progress}%
          </span>
        </div>

        {/* High-Tech Segmented Progress Bar */}
        <div className="w-full h-3 rounded-full bg-[#050f28] border border-cyan-500/30 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.25)] relative overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-400 relative"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.15 }}
          >
            {/* Glossy top bevel shine */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/50" />
            {/* Front leading light node */}
            <div className="absolute top-0 right-0 bottom-0 w-2 bg-white rounded-full shadow-[0_0_10px_#ffffff]" />
          </motion.div>
        </div>

        {/* Bottom Credits & Fun Fact */}
        <div className="w-full flex items-center justify-between mt-3 text-[10px] font-mono text-slate-500">
          <span>HOSTED BY ACM MITS CHAPTER</span>
          <span className="text-cyan-400/70">1500+ HACKERS READY</span>
        </div>
      </div>

      {/* Curtain Exit Wipe Animation */}
      <AnimatePresence>
        {progress >= 100 && (
          <>
            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
              style={{ transformOrigin: "top" }}
              className="absolute inset-x-0 top-0 h-1/2 bg-[#02040b] z-30"
            />
            <motion.div
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
              style={{ transformOrigin: "bottom" }}
              className="absolute inset-x-0 bottom-0 h-1/2 bg-[#02040b] z-30"
            />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
