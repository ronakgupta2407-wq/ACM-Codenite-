import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Sparkles, X, ChevronRight, Zap } from "lucide-react";
import confetti from "canvas-confetti";

/**
 * FloatingCompanionBot ("Sparky" / "Byte")
 * A friendly 3D cartoon robotic companion that floats with the user as they browse,
 * offering interactive hackathon guidance, squad tips, and celebratory confetti.
 */
export function FloatingCompanionBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [eyeExpression, setEyeExpression] = useState("normal"); // normal, happy, wink

  const tips = [
    {
      title: "Flexible Squads!",
      text: "Form your squad with 4 to 6 hackers. Cross-college teams are welcome!",
      action: "Register Squad",
      targetId: "register",
    },
    {
      title: "₹1,50,000+ Prize Pool!",
      text: "Hard cash, prestigious ACM trophies, and interview fast-tracks await top squads.",
      action: "View Prizes",
      targetId: "prizes",
    },
    {
      title: "12-Hour Overnight Push!",
      text: "Continuous power, high-speed WiFi, midnight pizza & caffeine drinks provided!",
      action: "Check Timeline",
      targetId: "timeline",
    },
    {
      title: "Problem Statements!",
      text: "6 real-world domain tracks will unlock soon. Pick your battleground!",
      action: "Explore Tracks",
      targetId: "tracks",
    },
  ];

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % tips.length);
    setEyeExpression("wink");
    setTimeout(() => setEyeExpression("normal"), 400);
  };

  const handleCelebration = () => {
    setEyeExpression("happy");
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x: 0.9, y: 0.85 },
      colors: ["#00f0ff", "#a855f7", "#38bdf8", "#fbbf24"],
    });
    setTimeout(() => setEyeExpression("normal"), 1200);
  };

  const handleNavigate = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end select-none">
      {/* Interactive Speech Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            className="mb-2 sm:mb-3 w-[calc(100vw-1.75rem)] sm:w-80 max-w-sm bg-gradient-to-br from-[#0a1435]/95 via-[#060e28]/95 to-[#020514]/98 backdrop-blur-2xl border border-cyan-400/40 rounded-2xl p-3.5 sm:p-4 shadow-[0_10px_35px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-orbitron font-bold text-xs text-cyan-300">
                  SPARKY // SQUAD DRONE
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tip Content */}
            <div className="space-y-1.5 mb-3">
              <div className="text-xs font-heading font-extrabold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{tips[tipIndex].title}</span>
              </div>
              <p className="text-xs text-slate-300 font-normal leading-relaxed">
                {tips[tipIndex].text}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-cyan-500/20">
              <button
                type="button"
                onClick={() => handleNavigate(tips[tipIndex].targetId)}
                className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-navy-950 font-heading font-black text-xs flex items-center justify-center gap-1 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <span>{tips[tipIndex].action}</span>
                <ChevronRight className="w-3 h-3" />
              </button>

              <button
                type="button"
                onClick={handleNextTip}
                className="py-1.5 px-2.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold transition-colors"
                title="Next Tip"
              >
                Next ↻
              </button>

              <button
                type="button"
                onClick={handleCelebration}
                className="p-1.5 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-purple-300 border border-purple-500/40 transition-colors"
                title="Celebrate!"
              >
                <Zap className="w-4 h-4 fill-purple-300" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Cartoon Drone Trigger Button */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          handleCelebration();
        }}
        className="relative cursor-pointer group"
        title="I am Sparky, your AI Hackathon Assistant! Click to chat!"
      >
        {/* Ambient Plasma Ring Glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-lg group-hover:bg-cyan-400/45 transition-colors animate-pulse" />

        {/* Robot Chassis Sphere */}
        <div className="relative w-14 h-14 rounded-full bg-gradient-to-b from-[#f0f6ff] via-[#dbeafe] to-[#93c5fd] border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center justify-center overflow-hidden">
          {/* Mini Antenna */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-slate-400 rounded-t-full" />

          {/* Glossy Curved Visor Screen */}
          <div className="relative w-10 h-7 rounded-full bg-[#050c22] border border-cyan-400/60 shadow-inner flex items-center justify-center gap-1.5">
            {/* Expressive LED Cartoon Eyes */}
            {eyeExpression === "normal" && (
              <>
                <motion.div
                  animate={{ scaleY: [1, 1, 0.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3.5, times: [0, 0.9, 0.95, 1] }}
                  className="w-2.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]"
                />
                <motion.div
                  animate={{ scaleY: [1, 1, 0.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3.5, times: [0, 0.9, 0.95, 1] }}
                  className="w-2.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]"
                />
              </>
            )}

            {eyeExpression === "happy" && (
              <>
                <div className="w-3 h-2 border-t-2 border-cyan-400 rounded-t-full shadow-[0_0_8px_#22D3EE]" />
                <div className="w-3 h-2 border-t-2 border-cyan-400 rounded-t-full shadow-[0_0_8px_#22D3EE]" />
              </>
            )}

            {eyeExpression === "wink" && (
              <>
                <div className="w-2.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
                <div className="w-3 h-0.5 bg-cyan-400 rounded-full" />
              </>
            )}
          </div>

          {/* Cute Cheek Blush Lights */}
          <span className="absolute bottom-1.5 left-2.5 w-1.5 h-1 rounded-full bg-pink-400/80" />
          <span className="absolute bottom-1.5 right-2.5 w-1.5 h-1 rounded-full bg-pink-400/80" />
        </div>

        {/* Orbiting Repulsor Thruster Dust */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px] animate-pulse" />

        {/* Floating Notification Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 border-2 border-navy-950 flex items-center justify-center text-[9px] font-black text-navy-950 shadow-md">
            !
          </span>
        )}
      </motion.div>
    </div>
  );
}
