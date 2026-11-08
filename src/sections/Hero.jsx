import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  UsersRound,
  Sparkles,
  ArrowRight,
  FileText,
  Terminal,
  Code2,
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
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&";
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
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-900/90 border border-acm-blue/40 shadow-glow-sm mb-6"
            >
              <img
                src={EVENT_DATA.organizer.acmLogo}
                alt="ACM Logo"
                className="w-5 h-5 object-contain"
              />
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
              {EVENT_DATA.chips.map((chip, index) => (
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

          {/* Right Column: 3D Floating Interactive Code Card & Terminal */}
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
                className="bg-navy-900/90 border border-acm-blue/40 shadow-glow-md p-0 overflow-hidden"
              >
                {/* Terminal Window Header */}
                <div className="px-4 py-3 bg-navy-950/90 border-b border-acm-blue/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-acm-cyan" />
                    <span>codenite-config.json</span>
                  </div>
                  <div className="w-10" />
                </div>

                {/* Terminal Body Code */}
                <div className="p-5 font-mono text-xs leading-relaxed text-slate-300 space-y-2 select-none overflow-x-auto">
                  <div className="text-slate-500">// ACM MITS Student Chapter Hackathon Protocol</div>
                  <div>
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-sky-300">hackathon</span> = &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">event</span>:{" "}
                    <span className="text-emerald-300">"CodeNite 2027"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">organizer</span>:{" "}
                    <span className="text-emerald-300">"ACM MITS Student Chapter"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">date</span>:{" "}
                    <span className="text-emerald-300">"17 January 2027"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">duration</span>:{" "}
                    <span className="text-amber-300">12</span>, <span className="text-slate-500">// Overnight</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">allowedTeamSizes</span>: [
                    <span className="text-cyan-300 font-bold">4</span>,{" "}
                    <span className="text-cyan-300 font-bold">6</span>
                    ], <span className="text-slate-500">// Strictly 4 or 6 members</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">femaleParticipantMandatory</span>:{" "}
                    <span className="text-rose-400 font-bold">false</span>, <span className="text-slate-500">// Open to all</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">registrationFee</span>:{" "}
                    <span className="text-emerald-400 font-bold">0</span>, <span className="text-slate-500">// 100% Free</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-sky-400">totalPrizePool</span>:{" "}
                    <span className="text-emerald-300">"₹1,50,000+"</span>
                  </div>
                  <div>&#125;;</div>

                  <div className="pt-2 text-slate-500">// Status check</div>
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>System Online & Ready for Registrations</span>
                  </div>
                </div>

                {/* Footer status bar */}
                <div className="px-4 py-2 bg-navy-950/60 border-t border-acm-blue/20 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-acm-cyan animate-pulse" />
                    <span>Branch: main</span>
                  </div>
                  <span>UTF-8 • Node.js</span>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
