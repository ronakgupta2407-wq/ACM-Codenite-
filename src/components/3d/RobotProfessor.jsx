import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, GraduationCap, Cpu, Code2, BookOpen } from "lucide-react";

/**
 * RobotProfessor ("Dr. Byte")
 * A whimsical 3D cartoon robot professor guiding users through
 * ACM MITS legacy and CodeNite hackathon milestones.
 */
export function RobotProfessor() {
  const [activeSpeech, setActiveSpeech] = useState(
    "Greetings, Hackers! Did you know ACM MITS was chartered in 2014? Over 10 years of student engineering!"
  );
  const [pulseCap, setPulseCap] = useState(false);

  const facts = [
    "🎓 ACM MITS has trained 5,000+ engineers through peer workshops!",
    "⚡ CodeNite gives you 12 hours of high-octane coding with continuous power & caffeine!",
    "🤖 Squad size is flexible: 4 to 6 hackers per team with cross-college allowed!",
    "🏆 Over ₹1,50,000+ in bounties and ACM merit trophies await winners!",
  ];

  const handleInteract = () => {
    setPulseCap(true);
    const nextFact = facts[Math.floor(Math.random() * facts.length)];
    setActiveSpeech(nextFact);
    setTimeout(() => setPulseCap(false), 600);
  };

  return (
    <div className="relative flex flex-col sm:flex-row items-center gap-6 p-6 rounded-3xl bg-gradient-to-r from-[#0c183d]/90 via-[#07112c]/95 to-[#030718]/98 border border-cyan-400/40 shadow-[0_0_35px_rgba(6,182,212,0.2)] mb-12 overflow-hidden select-none">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 3D Animated Cartoon Professor Character */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleInteract}
        className="relative shrink-0 cursor-pointer group"
        title="Click Dr. Byte to hear a hackathon fact!"
      >
        {/* Anti-gravity plasma thruster aura */}
        <div className="absolute -inset-2 rounded-full bg-cyan-400/20 blur-md group-hover:bg-cyan-400/40 transition-colors animate-pulse" />

        {/* Head / Body Chassis */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#93c5fd] border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center p-2 overflow-hidden">
          {/* Professor Hat / Graduation Cap */}
          <div
            className={`absolute -top-1 w-14 h-4 bg-[#09153a] border border-cyan-400/70 rounded-md flex items-center justify-center transition-transform ${
              pulseCap ? "scale-125 -translate-y-1" : ""
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>

          {/* OLED Screen Visor with Cute Glasses */}
          <div className="relative w-20 h-12 rounded-2xl bg-[#040a1c] border-2 border-cyan-400/80 shadow-inner flex items-center justify-center gap-2 mt-2">
            {/* Round Cartoon Professor Spectacles */}
            <div className="relative w-6 h-6 rounded-full border-2 border-amber-300 flex items-center justify-center">
              <motion.div
                animate={{ scaleY: [1, 1, 0.1, 1] }}
                transition={{ repeat: Infinity, duration: 4, times: [0, 0.9, 0.95, 1] }}
                className="w-2.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]"
              />
            </div>
            {/* Bridge */}
            <div className="w-2 h-0.5 bg-amber-300" />
            <div className="relative w-6 h-6 rounded-full border-2 border-amber-300 flex items-center justify-center">
              <motion.div
                animate={{ scaleY: [1, 1, 0.1, 1] }}
                transition={{ repeat: Infinity, duration: 4, times: [0, 0.9, 0.95, 1] }}
                className="w-2.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE]"
              />
            </div>
          </div>

          {/* Cute Bowtie */}
          <div className="mt-1 flex items-center gap-0.5">
            <span className="w-2.5 h-2 bg-purple-500 rounded-sm" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2 bg-purple-500 rounded-sm" />
          </div>
        </div>

        {/* Small interaction pill */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-navy-950 border border-cyan-400 text-[8px] font-mono font-bold text-cyan-300 tracking-wider whitespace-nowrap shadow-sm">
          CLICK ME ⚡
        </div>
      </motion.div>

      {/* Professor Speech / Fact Bubble */}
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-1">
            <GraduationCap className="w-3 h-3 text-cyan-400" />
            <span>DR. BYTE // CHAPTER GUIDE</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            [ Interactive Guide ]
          </span>
        </div>

        <h4 className="font-heading font-extrabold text-base sm:text-lg text-white mb-1">
          Welcome to the CodeNite 2027 Knowledge Matrix
        </h4>

        <p className="text-xs sm:text-sm text-cyan-100/90 font-medium leading-relaxed bg-[#03091e]/60 p-3 rounded-xl border border-cyan-500/20 shadow-inner">
          "{activeSpeech}"
        </p>
      </div>
    </div>
  );
}
