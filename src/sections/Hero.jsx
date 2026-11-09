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
import { Card } from "../components/ui/Card";
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
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 via-navy-900 to-navy-950 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] mb-6 backdrop-blur-xl"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0 border border-cyan-400/50 shadow-sm">
                <img
                  src={EVENT_DATA.organizer.acmLogo}
                  alt="ACM Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-300">
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
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
                  {glitchText}
                </span>{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,240,255,0.45)]">
                  2027
                </span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-cyan-200/90 mb-4 tracking-wide"
            >
              {EVENT_DATA.tagline}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-6 font-normal"
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
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-b from-[#0a1538]/80 to-[#04091e]/90 border border-cyan-500/25 text-xs font-mono text-slate-200 backdrop-blur-md hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
                >
                  <span className="text-cyan-400 font-bold tracking-wider">{chip.label}:</span>
                  <span className="text-white font-medium">{chip.value}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <Button
                variant="primary"
                size="lg"
                pulseRing
                magnetic
                onClick={() => scrollTo("register")}
              >
                Register Your Team
                <ArrowRight className="w-5 h-5 ml-1" />
              </Button>

              <button
                type="button"
                onClick={() => onOpenAdmin && onOpenAdmin()}
                className="px-5 py-3 rounded-xl bg-navy-900/90 hover:bg-navy-800 text-slate-200 hover:text-acm-cyan border border-acm-blue/30 hover:border-acm-cyan text-sm font-mono font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                title="Organizer Admin Portal"
              >
                <ShieldCheck className="w-4 h-4 text-acm-cyan" />
                <span>Admin</span>
              </button>

              <Button
                variant="outline"
                size="lg"
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
              <div className="flex items-center gap-2 mb-2 text-xs font-mono font-medium text-acm-cyan">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>HACKATHON CLOCK TICKING DOWN TO 17 JAN 2027</span>
              </div>
              <Countdown targetDate={EVENT_DATA.dates.isoTargetDate} />
            </motion.div>
          </div>

          {/* Right Column: 3D Floating Official ACM Event Showcase Showcase Card (No raw code) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full max-w-md"
            >
              <Card
                tilt
                spotlight
                className="bg-gradient-to-b from-[#09153b]/95 via-[#050c26]/95 to-[#020516]/98 border-2 border-cyan-400/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] p-7 relative overflow-hidden rounded-3xl"
              >
                {/* Background ambient radial glow inside card */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-44 h-44 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Top Terminal Status Header */}
                <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                    </span>
                    <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-emerald-400">
                      TELEMETRY // LIVE
                    </span>
                  </div>

                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-400/30 shadow-[0_0_10px_rgba(0,240,255,0.15)] font-bold">
                    NODE • MITS-01
                  </span>
                </div>

                {/* Central ACM Chapter Emblem Display - Holographic Cyber Frame */}
                <div className="py-6 flex flex-col items-center text-center relative">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 mb-4 flex items-center justify-center">
                    {/* Glowing outer aura */}
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-400 to-indigo-500 opacity-60 blur-lg animate-pulse-slow" />

                    {/* Cyber ring */}
                    <div className="absolute -inset-1 rounded-full border border-cyan-400/50 border-dashed animate-spin-slow" />
                    
                    {/* Inner bordered circle perfectly fitted */}
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-white border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.5)] flex items-center justify-center p-0">
                      <img
                        src={EVENT_DATA.organizer.acmLogo}
                        alt="ACM MITS Student Chapter"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <h3 className="font-heading font-black text-2xl text-white tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                    CodeNite 2027
                  </h3>
                  <p className="text-xs font-mono text-cyan-300 font-bold mt-1 tracking-wider uppercase">
                    ACM MITS Student Chapter • Est. 2014
                  </p>
                </div>

                {/* Key Event Highlights Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 pb-6 border-y border-cyan-500/20 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#04091f]/80 border border-cyan-500/25 flex items-center gap-2.5 hover:border-cyan-400/50 transition-colors">
                    <Trophy className="w-5 h-5 text-amber-400 shrink-0 drop-shadow-[0_0_8px_#fbbf24]" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Prize Pool</div>
                      <div className="font-heading font-black text-white text-base">₹1,50,000+</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#04091f]/80 border border-cyan-500/25 flex items-center gap-2.5 hover:border-cyan-400/50 transition-colors">
                    <Clock className="w-5 h-5 text-sky-400 shrink-0 drop-shadow-[0_0_8px_#38bdf8]" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Duration</div>
                      <div className="font-heading font-black text-white text-base">12 Hours</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#04091f]/80 border border-cyan-500/25 flex items-center gap-2.5 hover:border-cyan-400/50 transition-colors">
                    <UsersRound className="w-5 h-5 text-cyan-400 shrink-0 drop-shadow-[0_0_8px_#22d3ee]" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Team Size</div>
                      <div className="font-heading font-black text-white text-base">4 to 6</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#04091f]/80 border border-cyan-500/25 flex items-center gap-2.5 hover:border-cyan-400/50 transition-colors">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 drop-shadow-[0_0_8px_#34d399]" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Registration</div>
                      <div className="font-heading font-black text-white text-base">100% Free</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick Action */}
                <div className="pt-5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>MITS Gwalior Campus</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollTo("register")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-400/50 text-xs font-heading font-bold text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all cursor-pointer group shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                  >
                    <span>Register Squad</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
