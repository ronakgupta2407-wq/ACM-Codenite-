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

export function Hero() {
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
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy-900/90 border border-acm-blue/40 shadow-glow-sm mb-6"
            >
              <div className="w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center shrink-0">
                <img
                  src={EVENT_DATA.organizer.acmLogo}
                  alt="ACM Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-acm-cyan">
                ACM MITS Student Chapter Presents
              </span>
            </motion.div>

            {/* Glitch Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-3">
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  {glitchText}
                </span>{" "}
                <span className="bg-gradient-to-r from-acm-blue via-sky-400 to-acm-cyan bg-clip-text text-transparent">
                  2027
                </span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-heading font-semibold text-sky-200 mb-4"
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
              Join 500+ student developers for 12 hours of overnight technical hacking, mentor sessions, high-octane prototyping, and a prize pool of ₹1,50,000+.
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-900/80 border border-acm-blue/30 text-xs font-mono text-slate-200 backdrop-blur-md"
                >
                  <span className="text-acm-cyan font-bold">{chip.label}:</span>
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
                className="bg-navy-900/95 border border-acm-blue/40 shadow-glow-lg p-7 relative overflow-hidden"
              >
                {/* Background ambient radial glow inside card */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-acm-cyan/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-acm-blue/15 rounded-full blur-3xl pointer-events-none" />

                {/* Top Badge & Live Status */}
                <div className="flex items-center justify-between pb-5 border-b border-acm-blue/20">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400">
                      Registrations Live
                    </span>
                  </div>

                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-950 text-acm-cyan border border-sky-600/30">
                    Overnight Edition
                  </span>
                </div>

                {/* Central ACM Chapter Emblem Display - Fitted in Frame */}
                <div className="py-6 flex flex-col items-center text-center">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 mb-4 flex items-center justify-center">
                    {/* Glowing outer ring */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-acm-blue via-sky-400 to-acm-cyan opacity-50 blur-md animate-pulse-slow" />
                    
                    {/* Inner bordered circle perfectly fitted */}
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-white border-2 border-acm-cyan shadow-glow-md flex items-center justify-center p-0">
                      <img
                        src={EVENT_DATA.organizer.acmLogo}
                        alt="ACM MITS Student Chapter"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <h3 className="font-heading font-black text-2xl text-white tracking-tight">
                    CodeNite 2027
                  </h3>
                  <p className="text-xs font-mono text-acm-cyan mt-1">
                    ACM MITS Student Chapter • Est. 2014
                  </p>
                </div>

                {/* Key Event Highlights Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 pb-6 border-y border-acm-blue/20 text-xs">
                  <div className="p-3 rounded-xl bg-navy-950/70 border border-acm-blue/25 flex items-center gap-2.5">
                    <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Prize Pool</div>
                      <div className="font-heading font-bold text-white text-sm">₹1,50,000+</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-navy-950/70 border border-acm-blue/25 flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Duration</div>
                      <div className="font-heading font-bold text-white text-sm">12 Hours</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-navy-950/70 border border-acm-blue/25 flex items-center gap-2.5">
                    <UsersRound className="w-4 h-4 text-acm-cyan shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Team Size</div>
                      <div className="font-heading font-bold text-white text-sm">4 or 6 Only</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-navy-950/70 border border-acm-blue/25 flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-mono">Registration</div>
                      <div className="font-heading font-bold text-white text-sm">100% Free</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick Action */}
                <div className="pt-5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-acm-cyan" />
                    <span>MITS Gwalior Campus</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollTo("register")}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-acm-cyan hover:text-white transition-colors cursor-pointer group"
                  >
                    <span>Register</span>
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
