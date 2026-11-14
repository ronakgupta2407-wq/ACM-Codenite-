import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  UsersRound,
  Sparkles,
  ArrowRight,
  FileText,
  Trophy,
  Moon,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Countdown } from "../components/ui/Countdown";
import { Hero3DRobotCanvas } from "../components/3d/Hero3DRobotCanvas";
import { EVENT_DATA } from "../data/codeniteData";

export function Hero({ onOpenAdmin }) {
  const [glitchText, setGlitchText] = useState("CodeNite");

  // Glitch effect on title periodically
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const original = "CodeNite";

    const interval = setInterval(() => {
      let iterations = 0;
      const glitchInterval = setInterval(() => {
        setGlitchText(
          original
            .split("")
            .map((char, index) => {
              if (index < iterations) return original[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iterations >= original.length) {
          clearInterval(glitchInterval);
        }
        iterations += 1 / 3;
      }, 30);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-20 md:pt-36 md:pb-28 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines, Chips, Countdown & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Chapter Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#101D3D]/90 border border-[rgba(96,165,250,0.3)] shadow-[0_0_20px_rgba(56,189,248,0.2)] mb-6 backdrop-blur-xl"
            >
              <div className="w-5 h-5 rounded-md overflow-hidden bg-white flex items-center justify-center shrink-0 border border-tech-cyan/40 shadow-sm p-0.5">
                <img
                  src={EVENT_DATA.organizer.acmLogo}
                  alt="ACM Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-tech-cyan">
                ACM MITS Chapter // CodeNite 2027
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-0.5" />
            </motion.div>

            {/* Glitch Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-3">
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)]">
                  {glitchText}
                </span>{" "}
                <span className="bg-gradient-to-r from-tech-cyan via-tech-electric to-tech-violet bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]">
                  2027
                </span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-tech-cyan/95 mb-4 tracking-wide"
            >
              {EVENT_DATA.tagline}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-tech-muted text-sm sm:text-base leading-relaxed max-w-xl mb-6 font-normal"
            >
              Join 1,500+ registered student hackers for 12 hours of overnight technical hacking, mentor checkpoints, high-octane prototyping, and a prize pool of ₹1,50,000+.
            </motion.p>

            {/* Event Chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2.5 mb-8"
            >
              {EVENT_DATA.chips.map((chip) => (
                <div
                  key={chip.label}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#101D3D]/80 border border-[rgba(96,165,250,0.25)] text-xs font-mono text-slate-200 backdrop-blur-md hover:border-tech-cyan/60 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)] transition-all"
                >
                  <span className="text-tech-cyan font-bold tracking-wider">{chip.label}:</span>
                  <span className="text-white font-medium">{chip.value}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto"
            >
              <Button
                variant="primary"
                size="lg"
                pulseRing
                magnetic
                className="w-full sm:w-auto justify-center"
                onClick={() => scrollTo("register")}
              >
                Register Your Team
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>

              <button
                type="button"
                onClick={() => onOpenAdmin && onOpenAdmin()}
                className="px-5 py-3 rounded-xl bg-[#101D3D]/90 hover:bg-[#15244C] text-slate-200 hover:text-tech-cyan border border-[rgba(96,165,250,0.3)] hover:border-tech-cyan text-sm font-mono font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer w-full sm:w-auto"
                title="Organizer Admin Portal"
              >
                <ShieldCheck className="w-4 h-4 text-tech-cyan" />
                <span>Admin</span>
              </button>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto justify-center"
                onClick={() => scrollTo("rules")}
              >
                <FileText className="w-5 h-5 mr-1" />
                View Rules & Guide
              </Button>
            </motion.div>

            {/* Countdown Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full max-w-xl"
            >
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-medium text-tech-cyan">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>HACKATHON CLOCK TICKING DOWN TO 17 JAN 2027</span>
              </div>
              <Countdown targetDate={EVENT_DATA.dates.isoTargetDate} />
            </motion.div>
          </div>

          {/* Right Column: 3D Animated Cartoon Robot Mascot ("NiteBot Prime") */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Outer Holographic Ambient Aura */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-tech-cyan/20 via-tech-electric/20 to-tech-violet/25 blur-3xl pointer-events-none" />

            {/* Three.js Interactive 3D Cartoon Robot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="w-full relative z-10"
            >
              <Hero3DRobotCanvas />
            </motion.div>

            {/* Floating 3D HUD Telemetry Cards Array */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full max-w-md grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2 z-20"
            >
              <div className="p-3 rounded-2xl bg-[#101D3D]/90 border border-[rgba(96,165,250,0.25)] backdrop-blur-xl flex flex-col items-center text-center shadow-[0_4px_20px_rgba(5,11,30,0.6)] hover:border-tech-cyan hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:scale-105 transition-all">
                <Trophy className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[9px] font-mono text-tech-muted uppercase font-semibold">Prize Pool</span>
                <span className="font-orbitron font-bold text-xs text-white">₹1,50,000+</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#101D3D]/90 border border-[rgba(96,165,250,0.25)] backdrop-blur-xl flex flex-col items-center text-center shadow-[0_4px_20px_rgba(5,11,30,0.6)] hover:border-tech-cyan hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:scale-105 transition-all">
                <Clock className="w-4 h-4 text-tech-electric mb-1" />
                <span className="text-[9px] font-mono text-tech-muted uppercase font-semibold">Duration</span>
                <span className="font-orbitron font-bold text-xs text-white">12 Hours</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#101D3D]/90 border border-[rgba(96,165,250,0.25)] backdrop-blur-xl flex flex-col items-center text-center shadow-[0_4px_20px_rgba(5,11,30,0.6)] hover:border-tech-cyan hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:scale-105 transition-all">
                <UsersRound className="w-4 h-4 text-tech-cyan mb-1" />
                <span className="text-[9px] font-mono text-tech-muted uppercase font-semibold">Squad</span>
                <span className="font-orbitron font-bold text-xs text-white">4 to 6</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#101D3D]/90 border border-[rgba(96,165,250,0.25)] backdrop-blur-xl flex flex-col items-center text-center shadow-[0_4px_20px_rgba(5,11,30,0.6)] hover:border-tech-cyan hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:scale-105 transition-all">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mb-1" />
                <span className="text-[9px] font-mono text-tech-muted uppercase font-semibold">Entry</span>
                <span className="font-orbitron font-bold text-xs text-emerald-300">100% Free</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
